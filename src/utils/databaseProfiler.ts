import { initDatabase, exportDatabase } from '../services/databaseService';

export interface DatabaseStats {
  tableRowCounts: Record<string, number>;
  dbSizeBytes: number;
  timestamp: string;
}

export const getDatabaseStats = async (): Promise<DatabaseStats> => {
  const db = await initDatabase();
  const tableRowCounts: Record<string, number> = {};
  
  // Get table names
  const tablesResult = db.exec(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
  );
  
  if (tablesResult.length > 0) {
    const tables = tablesResult[0].values.map(row => row[0] as string);
    
    // Count rows for each table
    for (const table of tables) {
      const countResult = db.exec(`SELECT COUNT(*) FROM ${table}`);
      tableRowCounts[table] = countResult[0].values[0][0] as number;
    }
  }
  
  // Get database size
  const dbExport = await exportDatabase();
  const dbSizeBytes = dbExport ? dbExport.byteLength : 0;
  
  return {
    tableRowCounts,
    dbSizeBytes,
    timestamp: new Date().toISOString()
  };
};

export const getQueryPerformance = async (
  query: string, 
  params: any[] = []
): Promise<{ executionTimeMs: number; rowCount: number }> => {
  const db = await initDatabase();
  
  const startTime = performance.now();
  
  // Prepare and execute query
  const stmt = db.prepare(query);
  if (params.length > 0) {
    stmt.bind(params);
  }
  
  // Execute and get result
  const rows: any[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  
  const endTime = performance.now();
  
  return {
    executionTimeMs: endTime - startTime,
    rowCount: rows.length
  };
};

export const getDatabaseDiagnostics = async (): Promise<string> => {
  const stats = await getDatabaseStats();
  
  // Format table statistics
  const tableStats = Object.entries(stats.tableRowCounts)
    .map(([table, count]) => `  - ${table}: ${count} rows`)
    .join('\n');
  
  // Format database size
  const sizeInKB = (stats.dbSizeBytes / 1024).toFixed(2);
  const sizeInMB = (stats.dbSizeBytes / (1024 * 1024)).toFixed(2);
  
  // Perform some sample queries to check performance
  const profileQueries = [
    {
      name: 'Select all profiles',
      query: 'SELECT * FROM profiles'
    },
    {
      name: 'Select all baby data',
      query: 'SELECT * FROM baby_data'
    },
    {
      name: 'Select all measurements',
      query: 'SELECT * FROM measurements'
    },
    {
      name: 'Join profiles with baby data',
      query: `
        SELECT p.name, bd.birthGA, bd.currentGA, bd.currentWeight
        FROM profiles p
        LEFT JOIN baby_data bd ON p.id = bd.profileId
      `
    }
  ];
  
  // Run performance tests
  const performanceResults = await Promise.all(
    profileQueries.map(async (q) => {
      const perf = await getQueryPerformance(q.query);
      return `  - ${q.name}: ${perf.executionTimeMs.toFixed(2)}ms (${perf.rowCount} rows)`;
    })
  );
  
  // Format the report
  return `
Database Diagnostics Report
---------------------------
Timestamp: ${new Date(stats.timestamp).toLocaleString()}

Database Size:
  - ${sizeInKB} KB (${sizeInMB} MB)

Table Statistics:
${tableStats}

Query Performance:
${performanceResults.join('\n')}
  `.trim();
};

export const exportDatabaseAsJson = async (): Promise<string> => {
  const db = await initDatabase();
  const result: Record<string, any[]> = {};
  
  // Get table names
  const tablesResult = db.exec(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
  );
  
  if (tablesResult.length > 0) {
    const tables = tablesResult[0].values.map(row => row[0] as string);
    
    // Export data from each table
    for (const table of tables) {
      const tableData = db.exec(`SELECT * FROM ${table}`);
      
      if (tableData.length > 0) {
        const columns = tableData[0].columns;
        const rows = tableData[0].values;
        
        result[table] = rows.map(row => {
          const obj: Record<string, any> = {};
          columns.forEach((col, index) => {
            obj[col] = row[index];
          });
          return obj;
        });
      } else {
        result[table] = [];
      }
    }
  }
  
  return JSON.stringify(result, null, 2);
};