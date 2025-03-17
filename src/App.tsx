import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  Paper,
  Tab,
  Tabs,
  useMediaQuery,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  DownloadForOffline as DownloadIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import BabyDataForm from './components/BabyDataForm';
import GrowthResults from './components/GrowthResults';
import GrowthChart from './components/GrowthChart';
import ProfileManager from './components/ProfileManager';
import GrowthHistory from './components/GrowthHistory';
import { BabyData } from './types';
import { generateChartData } from './utils/growthCalculator';
import { DatabaseProvider, useDatabase } from './context/DatabaseContext';
import { getDatabaseDiagnostics, exportDatabaseAsJson } from './utils/databaseProfiler';

// Create a calming theme with pastel colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#80cbc4', // Soft teal
      light: '#b2fef7',
      dark: '#4f9a94',
    },
    secondary: {
      main: '#9fa8da', // Soft indigo
      light: '#d1d9ff',
      dark: '#6f79a8',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#37474f',
      secondary: '#546e7a',
    },
    error: {
      main: '#ef9a9a', // Soft red
    },
    warning: {
      main: '#ffe082', // Soft amber
    },
    info: {
      main: '#90caf9', // Soft blue
    },
    success: {
      main: '#a5d6a7', // Soft green
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
    },
    h2: {
      fontWeight: 400,
    },
    h3: {
      fontWeight: 400,
    },
    h4: {
      fontWeight: 400,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#80cbc4',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 3px 15px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

// App Content Component (uses DatabaseContext)
const AppContent: React.FC = () => {
  const { isLoading, error, currentProfile } = useDatabase();
  const [babyData, setBabyData] = useState<BabyData | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showDiagnosticsDialog, setShowDiagnosticsDialog] = useState(false);
  const [diagnosticsData, setDiagnosticsData] = useState<string>('');
  const [exportJsonData, setExportJsonData] = useState<string>('');
  const [isLoadingDiagnostics, setIsLoadingDiagnostics] = useState(false);
  
  const handleFormSubmit = (data: BabyData) => {
    setBabyData(data);
    // Switch to results tab after submission
    setTabValue(1);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleHistorySelect = (data: BabyData) => {
    setBabyData(data);
    setTabValue(1);
  };

  const handleOpenDiagnostics = async () => {
    setIsLoadingDiagnostics(true);
    setShowDiagnosticsDialog(true);
    
    try {
      // Load diagnostics data
      const diagnostics = await getDatabaseDiagnostics();
      setDiagnosticsData(diagnostics);
      
      // Load export data
      const exportJson = await exportDatabaseAsJson();
      setExportJsonData(exportJson);
    } catch (error) {
      console.error('Failed to load diagnostics:', error);
    } finally {
      setIsLoadingDiagnostics(false);
    }
  };

  const handleExportDatabase = () => {
    if (!exportJsonData) return;
    
    // Create a download link
    const blob = new Blob([exportJsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fenton-growth-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Generate chart data
  const weightChartData = babyData ? generateChartData(babyData, 'weight') : null;
  const lengthChartData = babyData?.birthLength && babyData?.currentLength 
    ? generateChartData(babyData, 'length') 
    : null;
  const headChartData = babyData?.birthHeadCircumference && babyData?.currentHeadCircumference 
    ? generateChartData(babyData, 'headCircumference') 
    : null;

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', padding: 4 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Loading database...
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ marginY: 2 }}>
        Error loading database: {error.message}
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
        <Typography 
          variant={isMobile ? 'h4' : 'h3'} 
          component="h1" 
          gutterBottom
          sx={{ 
            color: theme.palette.primary.dark,
            fontWeight: 500,
          }}
        >
          Fenton Preterm Growth Charts
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="textSecondary"
          sx={{ maxWidth: 700, margin: '0 auto' }}
        >
          Monitor your premature baby's growth using the Fenton 2013 Preterm Growth Charts.
          This tool helps visualize growth patterns from birth to 50 weeks gestational age.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
          <Tooltip title="Database Diagnostics & Export">
            <IconButton 
              onClick={handleOpenDiagnostics}
              color="primary"
              size="large"
            >
              <AssessmentIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Profile Manager */}
      <ProfileManager />
      
      {/* Growth History for Selected Profile */}
      {currentProfile && (
        <GrowthHistory onSelectData={handleHistorySelect} />
      )}

      <Paper sx={{ marginBottom: 3 }} elevation={0}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          centered
          indicatorColor="primary"
          textColor="primary"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              fontWeight: 500,
              fontSize: '1rem',
              textTransform: 'none',
              minWidth: isMobile ? 100 : 160,
            }
          }}
        >
          <Tab label="Enter Data" />
          <Tab label="Results" disabled={!babyData} />
          <Tab label="Growth Charts" disabled={!babyData} />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <BabyDataForm 
          onSubmit={handleFormSubmit} 
          initialData={babyData}
        />
      )}

      {tabValue === 1 && babyData && (
        <GrowthResults babyData={babyData} />
      )}

      {tabValue === 2 && babyData && (
        <>
          {weightChartData && (
            <GrowthChart 
              data={weightChartData} 
              title="Weight Growth Chart" 
              yAxisLabel="Weight (grams)" 
            />
          )}
          
          {lengthChartData && (
            <GrowthChart 
              data={lengthChartData} 
              title="Length Growth Chart" 
              yAxisLabel="Length (cm)" 
            />
          )}
          
          {headChartData && (
            <GrowthChart 
              data={headChartData} 
              title="Head Circumference Growth Chart" 
              yAxisLabel="Head Circumference (cm)" 
            />
          )}
        </>
      )}
      
      <Box 
        component="footer" 
        sx={{ 
          marginTop: 4, 
          padding: 2, 
          textAlign: 'center',
          backgroundColor: 'rgba(128, 203, 196, 0.1)',
          borderRadius: 2
        }}
      >
        <Typography variant="body2" color="textSecondary">
          The Fenton Growth Chart is based on Fenton 2013 Preterm Growth Charts data.
          This tool is for informational purposes only and should not replace medical advice.
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
          If you have concerns about your baby's growth, please consult your healthcare provider.
        </Typography>
      </Box>
      
      {/* Diagnostics Dialog */}
      <Dialog
        open={showDiagnosticsDialog}
        onClose={() => setShowDiagnosticsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Database Diagnostics & Export
        </DialogTitle>
        <DialogContent>
          {isLoadingDiagnostics ? (
            <Box sx={{ padding: 2 }}>
              <Typography variant="body1" gutterBottom>
                Loading database statistics...
              </Typography>
              <LinearProgress />
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={handleExportDatabase}
                >
                  Export Database
                </Button>
              </Box>
              <Paper 
                elevation={0} 
                sx={{ 
                  padding: 2, 
                  backgroundColor: '#f5f7fa',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  overflow: 'auto',
                  maxHeight: '400px'
                }}
              >
                {diagnosticsData}
              </Paper>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDiagnosticsDialog(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

// Main App Component (provides database context)
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DatabaseProvider>
        <AppContent />
      </DatabaseProvider>
    </ThemeProvider>
  );
}

export default App;