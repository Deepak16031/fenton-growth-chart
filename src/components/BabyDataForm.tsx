import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Divider,
  useTheme
} from '@mui/material';
import { BabyData } from '../types';

interface BabyDataFormProps {
  onSubmit: (data: BabyData) => void;
}

const defaultData: BabyData = {
  birthGA: 28,
  birthWeight: 1000,
  birthLength: 36,
  birthHeadCircumference: 25,
  gender: 'male',
  currentGA: 36,
  currentWeight: 2500,
  currentLength: 48,
  currentHeadCircumference: 33
};

const BabyDataForm: React.FC<BabyDataFormProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<BabyData>(defaultData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle radio button for gender
    if (name === 'gender') {
      setFormData({
        ...formData,
        gender: value as 'male' | 'female'
      });
      return;
    }
    
    // Handle numeric inputs
    const numericValue = parseFloat(value);
    
    // Validation
    const newErrors = { ...errors };
    if (isNaN(numericValue)) {
      newErrors[name] = 'Please enter a valid number';
    } else {
      delete newErrors[name];
    }
    
    setErrors(newErrors);
    
    // Update form data with the numeric value
    setFormData({
      ...formData,
      [name]: numericValue
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const newErrors: Record<string, string> = {};
    
    if (formData.birthGA < 22 || formData.birthGA > 42) {
      newErrors.birthGA = 'Birth GA must be between 22 and 42 weeks';
    }
    
    if (formData.currentGA < formData.birthGA) {
      newErrors.currentGA = 'Current GA must be greater than or equal to birth GA';
    }
    
    if (formData.currentGA > 50) {
      newErrors.currentGA = 'Current GA must be 50 weeks or less';
    }
    
    if (formData.birthWeight <= 0) {
      newErrors.birthWeight = 'Birth weight must be greater than 0';
    }
    
    if (formData.currentWeight <= 0) {
      newErrors.currentWeight = 'Current weight must be greater than 0';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit the form data
    onSubmit(formData);
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
        Baby Growth Information
      </Typography>
      
      <Divider sx={{ marginY: 2 }} />
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Gender Selection */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
          </Grid>
          
          {/* Birth Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Birth Information
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Gestational Age at Birth (weeks)"
              name="birthGA"
              type="number"
              InputProps={{ inputProps: { min: 22, max: 42, step: 0.1 } }}
              value={formData.birthGA}
              onChange={handleChange}
              error={!!errors.birthGA}
              helperText={errors.birthGA}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Birth Weight (grams)"
              name="birthWeight"
              type="number"
              InputProps={{ inputProps: { min: 300, step: 1 } }}
              value={formData.birthWeight}
              onChange={handleChange}
              error={!!errors.birthWeight}
              helperText={errors.birthWeight}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Birth Length (cm, optional)"
              name="birthLength"
              type="number"
              InputProps={{ inputProps: { min: 20, step: 0.1 } }}
              value={formData.birthLength || ''}
              onChange={handleChange}
              error={!!errors.birthLength}
              helperText={errors.birthLength}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Birth Head Circumference (cm, optional)"
              name="birthHeadCircumference"
              type="number"
              InputProps={{ inputProps: { min: 18, step: 0.1 } }}
              value={formData.birthHeadCircumference || ''}
              onChange={handleChange}
              error={!!errors.birthHeadCircumference}
              helperText={errors.birthHeadCircumference}
            />
          </Grid>
          
          {/* Current Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Current Information
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Current Gestational Age (weeks)"
              name="currentGA"
              type="number"
              InputProps={{ inputProps: { min: formData.birthGA, max: 50, step: 0.1 } }}
              value={formData.currentGA}
              onChange={handleChange}
              error={!!errors.currentGA}
              helperText={errors.currentGA}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Current Weight (grams)"
              name="currentWeight"
              type="number"
              InputProps={{ inputProps: { min: formData.birthWeight, step: 1 } }}
              value={formData.currentWeight}
              onChange={handleChange}
              error={!!errors.currentWeight}
              helperText={errors.currentWeight}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Current Length (cm, optional)"
              name="currentLength"
              type="number"
              InputProps={{ inputProps: { min: formData.birthLength || 20, step: 0.1 } }}
              value={formData.currentLength || ''}
              onChange={handleChange}
              error={!!errors.currentLength}
              helperText={errors.currentLength}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Current Head Circumference (cm, optional)"
              name="currentHeadCircumference"
              type="number"
              InputProps={{ inputProps: { min: formData.birthHeadCircumference || 18, step: 0.1 } }}
              value={formData.currentHeadCircumference || ''}
              onChange={handleChange}
              error={!!errors.currentHeadCircumference}
              helperText={errors.currentHeadCircumference}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
              sx={{ 
                marginTop: 2,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}
            >
              Calculate Growth
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BabyDataForm;