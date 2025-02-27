import React from 'react';
import { 
  Paper, 
  Typography, 
  Grid, 
  Divider, 
  Box,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  Scale as ScaleIcon,
  Straighten as StraightenIcon,
  Face as FaceIcon
} from '@mui/icons-material';
import { BabyData, GrowthData } from '../types';
import { calculateGrowthData } from '../utils/growthCalculator';

interface GrowthResultsProps {
  babyData: BabyData;
}

const GrowthResults: React.FC<GrowthResultsProps> = ({ babyData }) => {
  const theme = useTheme();
  
  // Calculate growth data for different measurements
  const weightData = calculateGrowthData(babyData, 'weight');
  const lengthData = babyData.birthLength && babyData.currentLength 
    ? calculateGrowthData(babyData, 'length') 
    : null;
  const headCircumferenceData = babyData.birthHeadCircumference && babyData.currentHeadCircumference 
    ? calculateGrowthData(babyData, 'headCircumference') 
    : null;

  const renderMeasurementCard = (
    title: string, 
    value: number, 
    unit: string, 
    growthData: GrowthData | null,
    icon: React.ReactNode
  ) => {
    if (!growthData) return null;
    
    return (
      <Card 
        elevation={2}
        sx={{ 
          marginBottom: 2,
          backgroundColor: 'white',
          borderLeft: `4px solid ${growthData.statusColor}`,
          borderRadius: 2,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4
          }
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
                sx={{ 
                  backgroundColor: `${growthData.statusColor}20`,
                  borderRadius: '50%',
                  width: 50,
                  height: 50
                }}
              >
                {icon}
              </Box>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6" component="h3" gutterBottom>
                {title}: {value.toFixed(unit === 'g' ? 0 : 1)}{unit}
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Percentile: <strong>{growthData.percentile.toFixed(1)}%</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Z-score: <strong>{growthData.zScore.toFixed(2)}</strong>
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">
                    Expected: <strong>{growthData.expectedValue.toFixed(unit === 'g' ? 0 : 1)}{unit}</strong>
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color={growthData.differenceFromExpected >= 0 ? 'success.main' : 'error.main'}
                  >
                    Difference: <strong>
                      {growthData.differenceFromExpected >= 0 ? '+' : ''}
                      {growthData.differenceFromExpected.toFixed(unit === 'g' ? 0 : 1)}{unit}
                    </strong>
                  </Typography>
                </Grid>
              </Grid>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  marginTop: 1,
                  color: growthData.statusColor,
                  fontWeight: 500
                }}
              >
                {growthData.statusMessage}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const calculateCorrectedAge = () => {
    const weeksPreterm = 40 - babyData.birthGA;
    const currentWeeksFromBirth = babyData.currentGA - babyData.birthGA;
    const correctedWeeks = currentWeeksFromBirth - weeksPreterm;
    
    if (correctedWeeks < 0) {
      return `${Math.abs(correctedWeeks).toFixed(1)} weeks before term`;
    } else {
      const months = Math.floor(correctedWeeks / 4.348);
      const remainingWeeks = Math.round(correctedWeeks % 4.348);
      
      if (months === 0) {
        return `${remainingWeeks} week${remainingWeeks !== 1 ? 's' : ''} corrected age`;
      } else {
        return `${months} month${months !== 1 ? 's' : ''} ${remainingWeeks} week${remainingWeeks !== 1 ? 's' : ''} corrected age`;
      }
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        padding: 3, 
        marginBottom: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom align="center" color="primary">
        Growth Assessment Results
      </Typography>
      
      <Divider sx={{ marginY: 2 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom color="textSecondary">
            Baby Information
          </Typography>
          
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1">
              <strong>Gender:</strong> {babyData.gender === 'male' ? 'Male' : 'Female'}
            </Typography>
            <Typography variant="body1">
              <strong>Gestational Age at Birth:</strong> {babyData.birthGA.toFixed(1)} weeks
            </Typography>
            <Typography variant="body1">
              <strong>Current Gestational Age:</strong> {babyData.currentGA.toFixed(1)} weeks
            </Typography>
            <Typography variant="body1">
              <strong>Corrected Age:</strong> {calculateCorrectedAge()}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom color="textSecondary">
            Term Comparison (40 weeks)
          </Typography>
          
          <Box sx={{ marginBottom: 2 }}>
            {weightData && (
              <Typography variant="body1">
                <strong>Weight at same percentile:</strong> {weightData.termComparisonValue.toFixed(0)}g
              </Typography>
            )}
            
            {lengthData && (
              <Typography variant="body1">
                <strong>Length at same percentile:</strong> {lengthData.termComparisonValue.toFixed(1)}cm
              </Typography>
            )}
            
            {headCircumferenceData && (
              <Typography variant="body1">
                <strong>Head Circumference at same percentile:</strong> {headCircumferenceData.termComparisonValue.toFixed(1)}cm
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ marginY: 2 }} />
      
      <Typography variant="h6" gutterBottom color="textSecondary">
        Growth Measurements
      </Typography>
      
      {renderMeasurementCard(
        'Weight',
        babyData.currentWeight,
        'g',
        weightData,
        <ScaleIcon sx={{ color: weightData?.statusColor }} />
      )}
      
      {lengthData && renderMeasurementCard(
        'Length',
        babyData.currentLength!,
        'cm',
        lengthData,
        <StraightenIcon sx={{ color: lengthData?.statusColor }} />
      )}
      
      {headCircumferenceData && renderMeasurementCard(
        'Head Circumference',
        babyData.currentHeadCircumference!,
        'cm',
        headCircumferenceData,
        <FaceIcon sx={{ color: headCircumferenceData?.statusColor }} />
      )}
      
      <Box 
        sx={{ 
          backgroundColor: 'rgba(0, 150, 136, 0.1)', 
          padding: 2, 
          borderRadius: 1,
          marginTop: 2
        }}
      >
        <Typography variant="body2" color="textSecondary" align="center">
          Based on Fenton 2013 Preterm Growth Charts for {babyData.gender === 'male' ? 'boys' : 'girls'}.
          These assessments are guidelines and should be discussed with your healthcare provider.
        </Typography>
      </Box>
    </Paper>
  );
};

export default GrowthResults;