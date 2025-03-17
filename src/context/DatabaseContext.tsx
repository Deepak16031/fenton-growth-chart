import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as dbService from '../services/databaseService';
import { BabyProfile, BabyData, GrowthMeasurement } from '../types';

interface DatabaseContextType {
  isLoading: boolean;
  error: Error | null;
  profiles: BabyProfile[];
  currentProfile: BabyProfile | null;
  loadProfiles: () => Promise<void>;
  createProfile: (profile: BabyProfile) => Promise<number>;
  updateProfile: (profile: BabyProfile) => Promise<void>;
  deleteProfile: (id: number) => Promise<void>;
  setCurrentProfile: (profile: BabyProfile | null) => void;
  saveBabyData: (data: BabyData) => Promise<number>;
  getBabyDataForProfile: (profileId: number) => Promise<BabyData[]>;
  addMeasurement: (measurement: GrowthMeasurement) => Promise<number>;
  getMeasurementsForProfile: (profileId: number) => Promise<GrowthMeasurement[]>;
  createProfileWithBabyData: (profile: BabyProfile, babyData: BabyData) => Promise<{ profileId: number, babyDataId: number }>;
  getAllBabyData: () => Promise<BabyData[]>;
  getBabyDataById: (id: number) => Promise<BabyData | null>;
  exportDatabase: () => Promise<Uint8Array | null>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [profiles, setProfiles] = useState<BabyProfile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<BabyProfile | null>(null);

  // Initialize database on component mount
  useEffect(() => {
    const initDb = async () => {
      try {
        await dbService.initDatabase();
        await loadProfiles();
        setIsLoading(false);
      } catch (err) {
        console.error('Database initialization failed:', err);
        setError(err instanceof Error ? err : new Error('Unknown database error'));
        setIsLoading(false);
      }
    };

    initDb();
  }, []);

  const loadProfiles = async () => {
    try {
      const allProfiles = await dbService.getAllProfiles();
      setProfiles(allProfiles);
      return allProfiles;
    } catch (err) {
      console.error('Failed to load profiles:', err);
      setError(err instanceof Error ? err : new Error('Failed to load profiles'));
      throw err;
    }
  };

  const createProfile = async (profile: BabyProfile) => {
    try {
      const id = await dbService.createProfile(profile);
      await loadProfiles();
      return id;
    } catch (err) {
      console.error('Failed to create profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to create profile'));
      throw err;
    }
  };

  const updateProfile = async (profile: BabyProfile) => {
    try {
      await dbService.updateProfile(profile);
      await loadProfiles();
      
      // Update current profile if it's the one being updated
      if (currentProfile && currentProfile.id === profile.id) {
        setCurrentProfile(profile);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      throw err;
    }
  };

  const deleteProfile = async (id: number) => {
    try {
      await dbService.deleteProfile(id);
      await loadProfiles();
      
      // Clear current profile if it's the one being deleted
      if (currentProfile && currentProfile.id === id) {
        setCurrentProfile(null);
      }
    } catch (err) {
      console.error('Failed to delete profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to delete profile'));
      throw err;
    }
  };

  const saveBabyData = async (data: BabyData) => {
    try {
      return await dbService.saveBabyData(data);
    } catch (err) {
      console.error('Failed to save baby data:', err);
      setError(err instanceof Error ? err : new Error('Failed to save baby data'));
      throw err;
    }
  };

  const getBabyDataForProfile = async (profileId: number) => {
    try {
      return await dbService.getBabyDataByProfileId(profileId);
    } catch (err) {
      console.error('Failed to get baby data for profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to get baby data'));
      throw err;
    }
  };

  const addMeasurement = async (measurement: GrowthMeasurement) => {
    try {
      return await dbService.addMeasurement(measurement);
    } catch (err) {
      console.error('Failed to add measurement:', err);
      setError(err instanceof Error ? err : new Error('Failed to add measurement'));
      throw err;
    }
  };

  const getMeasurementsForProfile = async (profileId: number) => {
    try {
      return await dbService.getMeasurementsByProfileId(profileId);
    } catch (err) {
      console.error('Failed to get measurements for profile:', err);
      setError(err instanceof Error ? err : new Error('Failed to get measurements'));
      throw err;
    }
  };

  const createProfileWithBabyData = async (profile: BabyProfile, babyData: BabyData) => {
    try {
      const result = await dbService.createProfileWithBabyData(profile, babyData);
      await loadProfiles();
      return result;
    } catch (err) {
      console.error('Failed to create profile with baby data:', err);
      setError(err instanceof Error ? err : new Error('Failed to create profile with baby data'));
      throw err;
    }
  };

  const getAllBabyData = async () => {
    try {
      return await dbService.getAllBabyData();
    } catch (err) {
      console.error('Failed to get all baby data:', err);
      setError(err instanceof Error ? err : new Error('Failed to get all baby data'));
      throw err;
    }
  };

  const getBabyDataById = async (id: number) => {
    try {
      return await dbService.getBabyDataById(id);
    } catch (err) {
      console.error('Failed to get baby data by ID:', err);
      setError(err instanceof Error ? err : new Error('Failed to get baby data'));
      throw err;
    }
  };

  const exportDatabase = async () => {
    try {
      return await dbService.exportDatabase();
    } catch (err) {
      console.error('Failed to export database:', err);
      setError(err instanceof Error ? err : new Error('Failed to export database'));
      throw err;
    }
  };

  const contextValue: DatabaseContextType = {
    isLoading,
    error,
    profiles,
    currentProfile,
    loadProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    setCurrentProfile,
    saveBabyData,
    getBabyDataForProfile,
    addMeasurement,
    getMeasurementsForProfile,
    createProfileWithBabyData,
    getAllBabyData,
    getBabyDataById,
    exportDatabase
  };

  return (
    <DatabaseContext.Provider value={contextValue}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

export default DatabaseContext;