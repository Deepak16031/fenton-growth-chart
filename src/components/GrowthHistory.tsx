import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  useTheme,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Info as InfoIcon, Assessment as AssessmentIcon, LineChart as LineChartIcon } from '@mui/icons-material';
import { useDatabase } from '../context/DatabaseContext';
import { BabyData, GrowthMeasurement } from '../types';
import GrowthChart from './GrowthChart';
import { generateChartData } from '../utils/growthCalculator';

interface GrowthHistoryProps {
  onSelectData?: (data: BabyData) => void;
}

const GrowthHistory: React.FC<GrowthHistoryProps> = ({ onSelectData }) => {
  const theme = useTheme();
  const { currentProfile, getBabyDataForProfile, getMeasurementsForProfile } = useDatabase();
  
  const [babyDataList, setBabyDataList] = useState<BabyData[]>([]);
  const [measurements, setMeasurements] = useState<GrowthMeasurement[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [showChartDialog, setShowChartDialog] = useState(false);
  const [historicalChartType, setHistoricalChartType] = useState<'weight' | 'length' | 'headCircumference'>('weight');
  
  useEffect(() => {
    const loadData = async () => {
      if (currentProfile?.id) {
        const data = await getBabyDataForProfile(currentProfile.id);
        setBabyDataList(data);
        
        const meas = await getMeasurementsForProfile(currentProfile.id);
        setMeasurements(meas);
      } else {
        setBabyDataList([]);
        setMeasurements([]);
      }
    };
    
    loadData();
  }, [currentProfile, getBabyDataForProfile, getMeasurementsForProfile]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleSelectBabyData = (data: BabyData) => {
    if (onSelectData) {
      onSelectData(data);
    }
  };
  
  const openHistoricalChart = (type: 'weight' | 'length' | 'headCircumference') => {
    setHistoricalChartType(type);
    setShowChartDialog(true);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  const generateHistoricalDataForChart = () => {
    if (babyDataList.length === 0) return null;
    
    // Use the most recent record for chart generation base
    const baseData = babyDataList[0];
    
    // Generate chart data based on the selected type
    return generateChartData(baseData, historicalChartType);
  };
  
  if (!currentProfile) {
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
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Please select or create a profile to view growth history.
        </Typography>
      </Paper>
    );
  }
  
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h5" component="h2" color="primary">
          {currentProfile.name}'s Growth History
        </Typography>
        <Box>
          <Tooltip title="View Weight Chart">
            <IconButton onClick={() => openHistoricalChart('weight')} color="primary">
              <LineChartIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}
      >
        <Tab label="Complete Records" icon={<AssessmentIcon />} iconPosition="start" />
        <Tab label="Growth Measurements" icon={<InfoIcon />} iconPosition="start" />
      </Tabs>
      
      {tabValue === 0 && (
        <>
          {babyDataList.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', padding: 2 }}>
              No growth records available. Add a growth record to get started.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Birth GA (weeks)</TableCell>
                    <TableCell>Current GA (weeks)</TableCell>
                    <TableCell>Weight (g)</TableCell>
                    <TableCell>Length (cm)</TableCell>
                    <TableCell>Head (cm)</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {babyDataList.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.measurementDate ? formatDate(data.measurementDate) : 'N/A'}</TableCell>
                      <TableCell>{data.birthGA}</TableCell>
                      <TableCell>{data.currentGA}</TableCell>
                      <TableCell>{data.currentWeight}</TableCell>
                      <TableCell>{data.currentLength || 'N/A'}</TableCell>
                      <TableCell>{data.currentHeadCircumference || 'N/A'}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={() => handleSelectBabyData(data)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
      
      {tabValue === 1 && (
        <>
          {measurements.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', padding: 2 }}>
              No individual measurements available.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>GA (weeks)</TableCell>
                    <TableCell>Weight (g)</TableCell>
                    <TableCell>Length (cm)</TableCell>
                    <TableCell>Head (cm)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {measurements.map((measurement) => (
                    <TableRow key={measurement.id}>
                      <TableCell>{formatDate(measurement.date)}</TableCell>
                      <TableCell>{measurement.gestationalAge}</TableCell>
                      <TableCell>{measurement.weight}</TableCell>
                      <TableCell>{measurement.length || 'N/A'}</TableCell>
                      <TableCell>{measurement.headCircumference || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
      
      {/* Historical Chart Dialog */}
      <Dialog
        open={showChartDialog}
        onClose={() => setShowChartDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {historicalChartType === 'weight' && 'Weight Growth Chart'}
          {historicalChartType === 'length' && 'Length Growth Chart'}
          {historicalChartType === 'headCircumference' && 'Head Circumference Growth Chart'}
        </DialogTitle>
        <DialogContent>
          {babyDataList.length > 0 && (
            <GrowthChart 
              data={generateHistoricalDataForChart()!} 
              title={`${currentProfile.name}'s ${historicalChartType.charAt(0).toUpperCase() + historicalChartType.slice(1)} Growth`} 
              yAxisLabel={
                historicalChartType === 'weight' ? 'Weight (grams)' : 
                historicalChartType === 'length' ? 'Length (cm)' : 
                'Head Circumference (cm)'
              } 
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowChartDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default GrowthHistory;