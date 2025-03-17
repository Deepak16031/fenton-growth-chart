import initSqlJs, { Database } from 'sql.js';
import localforage from 'localforage';
import { BabyProfile, BabyData, GrowthMeasurement } from '../types';

// Database instance
let db: Database | null = null;

// Initialize SQL.js and database
export const initDatabase = async (): Promise<Database> => {
  if (db) return db;

  try {
    // Load SQL.js
    const SQL = await initSqlJs({
      // Specify path to WebAssembly files
      locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });

    // Check if we have a stored database
    const storedDBData = await localforage.getItem<Uint8Array>('baby_growth_db');
    
    if (storedDBData) {
      // Load existing database
      db = new SQL.Database(storedDBData);
    } else {
      // Create a new database
      db = new SQL.Database();
      
      // Create database schema
      createTables();
    }
    
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

// Create database tables
const createTables = () => {
  if (!db) return;

  // Profiles table
  db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      dateOfBirth TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
  `);

  // Measurements table
  db.exec(`
    CREATE TABLE IF NOT EXISTS measurements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profileId INTEGER NOT NULL,
      date TEXT NOT NULL,
      gestationalAge REAL NOT NULL,
      weight REAL NOT NULL,
      length REAL,
      headCircumference REAL,
      FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE
    );
  `);

  // Baby data table for full data sets
  db.exec(`
    CREATE TABLE IF NOT EXISTS baby_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profileId INTEGER,
      measurementDate TEXT,
      birthGA REAL NOT NULL,
      birthWeight REAL NOT NULL,
      birthLength REAL,
      birthHeadCircumference REAL,
      gender TEXT NOT NULL,
      currentGA REAL NOT NULL,
      currentWeight REAL NOT NULL,
      currentLength REAL,
      currentHeadCircumference REAL,
      FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE
    );
  `);

  // Save the new database to storage
  saveDatabase();
};

// Save database to storage
export const saveDatabase = async (): Promise<void> => {
  if (!db) return;

  try {
    const data = db.export();
    await localforage.setItem('baby_growth_db', data);
  } catch (error) {
    console.error('Failed to save database:', error);
    throw error;
  }
};

// Profile operations
export const createProfile = async (profile: BabyProfile): Promise<number> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');

  const createdAt = new Date().toISOString();
  
  try {
    const stmt = db.prepare(`
      INSERT INTO profiles (name, dateOfBirth, createdAt)
      VALUES (?, ?, ?)
    `);
    
    stmt.run([profile.name, profile.dateOfBirth, createdAt]);
    stmt.free();
    
    // Get the last inserted ID
    const result = db.exec('SELECT last_insert_rowid() as id');
    const id = result[0].values[0][0] as number;
    
    await saveDatabase();
    return id;
  } catch (error) {
    console.error('Failed to create profile:', error);
    throw error;
  }
};

export const getAllProfiles = async (): Promise<BabyProfile[]> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const result = db.exec(`
      SELECT id, name, dateOfBirth, createdAt
      FROM profiles
      ORDER BY createdAt DESC
    `);
    
    if (result.length === 0) return [];
    
    const profiles: BabyProfile[] = result[0].values.map((row) => ({
      id: row[0] as number,
      name: row[1] as string,
      dateOfBirth: row[2] as string,
      createdAt: row[3] as string
    }));
    
    return profiles;
  } catch (error) {
    console.error('Failed to get profiles:', error);
    throw error;
  }
};

export const getProfileById = async (id: number): Promise<BabyProfile | null> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const stmt = db.prepare(`
      SELECT id, name, dateOfBirth, createdAt
      FROM profiles
      WHERE id = ?
    `);
    
    stmt.bind([id]);
    const row = stmt.getAsObject();
    stmt.free();
    
    if (!row.id) return null;
    
    return {
      id: row.id as number,
      name: row.name as string,
      dateOfBirth: row.dateOfBirth as string,
      createdAt: row.createdAt as string
    };
  } catch (error) {
    console.error(`Failed to get profile with ID ${id}:`, error);
    throw error;
  }
};

export const updateProfile = async (profile: BabyProfile): Promise<void> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');
  if (!profile.id) throw new Error('Profile ID is required');

  try {
    const stmt = db.prepare(`
      UPDATE profiles
      SET name = ?, dateOfBirth = ?
      WHERE id = ?
    `);
    
    stmt.run([profile.name, profile.dateOfBirth, profile.id]);
    stmt.free();
    
    await saveDatabase();
  } catch (error) {
    console.error(`Failed to update profile with ID ${profile.id}:`, error);
    throw error;
  }
};

export const deleteProfile = async (id: number): Promise<void> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    // Begin transaction
    db.exec('BEGIN TRANSACTION;');
    
    // Delete related measurements
    let stmt = db.prepare('DELETE FROM measurements WHERE profileId = ?');
    stmt.run([id]);
    stmt.free();
    
    // Delete related baby data
    stmt = db.prepare('DELETE FROM baby_data WHERE profileId = ?');
    stmt.run([id]);
    stmt.free();
    
    // Delete profile
    stmt = db.prepare('DELETE FROM profiles WHERE id = ?');
    stmt.run([id]);
    stmt.free();
    
    // Commit transaction
    db.exec('COMMIT;');
    
    await saveDatabase();
  } catch (error) {
    // Rollback transaction on error
    if (db) db.exec('ROLLBACK;');
    console.error(`Failed to delete profile with ID ${id}:`, error);
    throw error;
  }
};

// Measurement operations
export const addMeasurement = async (measurement: GrowthMeasurement): Promise<number> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const stmt = db.prepare(`
      INSERT INTO measurements (profileId, date, gestationalAge, weight, length, headCircumference)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run([
      measurement.profileId,
      measurement.date,
      measurement.gestationalAge,
      measurement.weight,
      measurement.length || null,
      measurement.headCircumference || null
    ]);
    stmt.free();
    
    // Get the last inserted ID
    const result = db.exec('SELECT last_insert_rowid() as id');
    const id = result[0].values[0][0] as number;
    
    await saveDatabase();
    return id;
  } catch (error) {
    console.error('Failed to add measurement:', error);
    throw error;
  }
};

export const getMeasurementsByProfileId = async (profileId: number): Promise<GrowthMeasurement[]> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const result = db.exec(`
      SELECT id, profileId, date, gestationalAge, weight, length, headCircumference
      FROM measurements
      WHERE profileId = ?
      ORDER BY date DESC
    `);
    
    if (result.length === 0) return [];
    
    const measurements: GrowthMeasurement[] = result[0].values.map((row) => ({
      id: row[0] as number,
      profileId: row[1] as number,
      date: row[2] as string,
      gestationalAge: row[3] as number,
      weight: row[4] as number,
      length: row[5] as number | undefined,
      headCircumference: row[6] as number | undefined
    }));
    
    return measurements;
  } catch (error) {
    console.error(`Failed to get measurements for profile ID ${profileId}:`, error);
    throw error;
  }
};

// Baby data operations
export const saveBabyData = async (data: BabyData): Promise<number> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');

  const measurementDate = data.measurementDate || new Date().toISOString();
  
  try {
    const stmt = db.prepare(`
      INSERT INTO baby_data (
        profileId, measurementDate, birthGA, birthWeight, birthLength, birthHeadCircumference,
        gender, currentGA, currentWeight, currentLength, currentHeadCircumference
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run([
      data.profileId || null,
      measurementDate,
      data.birthGA,
      data.birthWeight,
      data.birthLength || null,
      data.birthHeadCircumference || null,
      data.gender,
      data.currentGA,
      data.currentWeight,
      data.currentLength || null,
      data.currentHeadCircumference || null
    ]);
    stmt.free();
    
    // Get the last inserted ID
    const result = db.exec('SELECT last_insert_rowid() as id');
    const id = result[0].values[0][0] as number;
    
    await saveDatabase();
    return id;
  } catch (error) {
    console.error('Failed to save baby data:', error);
    throw error;
  }
};

export const getBabyDataByProfileId = async (profileId: number): Promise<BabyData[]> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const result = db.exec(`
      SELECT id, profileId, measurementDate, birthGA, birthWeight, birthLength, birthHeadCircumference,
             gender, currentGA, currentWeight, currentLength, currentHeadCircumference
      FROM baby_data
      WHERE profileId = ?
      ORDER BY measurementDate DESC
    `);
    
    if (result.length === 0) return [];
    
    const babyDataList: BabyData[] = result[0].values.map((row) => ({
      id: row[0] as number,
      profileId: row[1] as number,
      measurementDate: row[2] as string,
      birthGA: row[3] as number,
      birthWeight: row[4] as number,
      birthLength: row[5] as number | undefined,
      birthHeadCircumference: row[6] as number | undefined,
      gender: row[7] as 'male' | 'female',
      currentGA: row[8] as number,
      currentWeight: row[9] as number,
      currentLength: row[10] as number | undefined,
      currentHeadCircumference: row[11] as number | undefined
    }));
    
    return babyDataList;
  } catch (error) {
    console.error(`Failed to get baby data for profile ID ${profileId}:`, error);
    throw error;
  }
};

export const getBabyDataById = async (id: number): Promise<BabyData | null> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const stmt = db.prepare(`
      SELECT id, profileId, measurementDate, birthGA, birthWeight, birthLength, birthHeadCircumference,
             gender, currentGA, currentWeight, currentLength, currentHeadCircumference
      FROM baby_data
      WHERE id = ?
    `);
    
    stmt.bind([id]);
    const row = stmt.getAsObject();
    stmt.free();
    
    if (!row.id) return null;
    
    return {
      id: row.id as number,
      profileId: row.profileId as number,
      measurementDate: row.measurementDate as string,
      birthGA: row.birthGA as number,
      birthWeight: row.birthWeight as number,
      birthLength: row.birthLength as number | undefined,
      birthHeadCircumference: row.birthHeadCircumference as number | undefined,
      gender: row.gender as 'male' | 'female',
      currentGA: row.currentGA as number,
      currentWeight: row.currentWeight as number,
      currentLength: row.currentLength as number | undefined,
      currentHeadCircumference: row.currentHeadCircumference as number | undefined
    };
  } catch (error) {
    console.error(`Failed to get baby data with ID ${id}:`, error);
    throw error;
  }
};

export const getAllBabyData = async (): Promise<BabyData[]> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    const result = db.exec(`
      SELECT id, profileId, measurementDate, birthGA, birthWeight, birthLength, birthHeadCircumference,
             gender, currentGA, currentWeight, currentLength, currentHeadCircumference
      FROM baby_data
      ORDER BY measurementDate DESC
    `);
    
    if (result.length === 0) return [];
    
    const babyDataList: BabyData[] = result[0].values.map((row) => ({
      id: row[0] as number,
      profileId: row[1] as number,
      measurementDate: row[2] as string,
      birthGA: row[3] as number,
      birthWeight: row[4] as number,
      birthLength: row[5] as number | undefined,
      birthHeadCircumference: row[6] as number | undefined,
      gender: row[7] as 'male' | 'female',
      currentGA: row[8] as number,
      currentWeight: row[9] as number,
      currentLength: row[10] as number | undefined,
      currentHeadCircumference: row[11] as number | undefined
    }));
    
    return babyDataList;
  } catch (error) {
    console.error('Failed to get all baby data:', error);
    throw error;
  }
};

// Create a profile and add baby data in one transaction
export const createProfileWithBabyData = async (
  profile: BabyProfile, 
  babyData: BabyData
): Promise<{ profileId: number, babyDataId: number }> => {
  await initDatabase();
  if (!db) throw new Error('Database not initialized');

  try {
    // Begin transaction
    db.exec('BEGIN TRANSACTION;');
    
    // Create profile
    const createdAt = new Date().toISOString();
    let stmt = db.prepare(`
      INSERT INTO profiles (name, dateOfBirth, createdAt)
      VALUES (?, ?, ?)
    `);
    stmt.run([profile.name, profile.dateOfBirth, createdAt]);
    stmt.free();
    
    // Get profile ID
    let result = db.exec('SELECT last_insert_rowid() as id');
    const profileId = result[0].values[0][0] as number;
    
    // Add baby data with profile ID
    const measurementDate = babyData.measurementDate || new Date().toISOString();
    stmt = db.prepare(`
      INSERT INTO baby_data (
        profileId, measurementDate, birthGA, birthWeight, birthLength, birthHeadCircumference,
        gender, currentGA, currentWeight, currentLength, currentHeadCircumference
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run([
      profileId,
      measurementDate,
      babyData.birthGA,
      babyData.birthWeight,
      babyData.birthLength || null,
      babyData.birthHeadCircumference || null,
      babyData.gender,
      babyData.currentGA,
      babyData.currentWeight,
      babyData.currentLength || null,
      babyData.currentHeadCircumference || null
    ]);
    stmt.free();
    
    // Get baby data ID
    result = db.exec('SELECT last_insert_rowid() as id');
    const babyDataId = result[0].values[0][0] as number;
    
    // Commit transaction
    db.exec('COMMIT;');
    
    await saveDatabase();
    
    return { profileId, babyDataId };
  } catch (error) {
    // Rollback transaction on error
    if (db) db.exec('ROLLBACK;');
    console.error('Failed to create profile with baby data:', error);
    throw error;
  }
};

// Export for profiling and debugging
export const exportDatabase = async (): Promise<Uint8Array | null> => {
  if (!db) return null;
  return db.export();
};