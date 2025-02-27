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
  useMediaQuery
} from '@mui/material';
import BabyDataForm from './components/BabyDataForm';
import GrowthResults from './components/GrowthResults';
import GrowthChart from './components/GrowthChart';
import { BabyData } from './types';
import { generateChartData } from './utils/growthCalculator';

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

function App() {
  const [babyData, setBabyData] = useState<BabyData | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleFormSubmit = (data: BabyData) => {
    setBabyData(data);
    // Switch to results tab after submission
    setTabValue(1);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Generate chart data
  const weightChartData = babyData ? generateChartData(babyData, 'weight') : null;
  const lengthChartData = babyData?.birthLength && babyData?.currentLength 
    ? generateChartData(babyData, 'length') 
    : null;
  const headChartData = babyData?.birthHeadCircumference && babyData?.currentHeadCircumference 
    ? generateChartData(babyData, 'headCircumference') 
    : null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        </Box>

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
          <BabyDataForm onSubmit={handleFormSubmit} />
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
      </Container>
    </ThemeProvider>
  );
}

export default App;