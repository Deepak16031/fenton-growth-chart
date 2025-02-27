import { BabyData, GrowthData } from '../types';
import {
  calculateZScore,
  zScoreToPercentile,
  getDataset,
  getDataPointForGA,
  interpolateDataPoint,
  GrowthChartDataPoint
} from '../data/growth-chart-data';

// Calculate growth status based on z-score
function getGrowthStatus(zScore: number): {message: string, color: string} {
  if (zScore < -2) {
    return { 
      message: 'Growth is significantly below average',
      color: '#f44336' // Red 
    };
  } else if (zScore < -1) {
    return { 
      message: 'Growth is below average but within acceptable range',
      color: '#ff9800' // Orange
    };
  } else if (zScore <= 1) {
    return { 
      message: 'Growth is within normal range',
      color: '#4caf50' // Green
    };
  } else if (zScore <= 2) {
    return { 
      message: 'Growth is above average but within acceptable range',
      color: '#2196f3' // Blue
    };
  } else {
    return { 
      message: 'Growth is significantly above average',
      color: '#9c27b0' // Purple
    };
  }
}

// Calculate expected value based on birth percentile
function calculateExpectedValue(
  birthGA: number,
  currentGA: number,
  birthValue: number,
  dataset: GrowthChartDataPoint[]
): number {
  // Get birth data point
  const birthDataPoint = interpolateDataPoint(birthGA, dataset);
  if (!birthDataPoint) return 0;
  
  // Calculate birth z-score and percentile
  const birthZScore = calculateZScore(birthValue, birthDataPoint);
  const birthPercentile = zScoreToPercentile(birthZScore);
  
  // Get current data point
  const currentDataPoint = interpolateDataPoint(currentGA, dataset);
  if (!currentDataPoint) return 0;
  
  // Simple linear interpolation between surrounding percentiles
  if (birthPercentile <= 3) {
    return currentDataPoint.p3;
  } else if (birthPercentile <= 10) {
    const weight = (birthPercentile - 3) / (10 - 3);
    return currentDataPoint.p3 + weight * (currentDataPoint.p10 - currentDataPoint.p3);
  } else if (birthPercentile <= 50) {
    const weight = (birthPercentile - 10) / (50 - 10);
    return currentDataPoint.p10 + weight * (currentDataPoint.p50 - currentDataPoint.p10);
  } else if (birthPercentile <= 90) {
    const weight = (birthPercentile - 50) / (90 - 50);
    return currentDataPoint.p50 + weight * (currentDataPoint.p90 - currentDataPoint.p50);
  } else if (birthPercentile <= 97) {
    const weight = (birthPercentile - 90) / (97 - 90);
    return currentDataPoint.p90 + weight * (currentDataPoint.p97 - currentDataPoint.p90);
  } else {
    return currentDataPoint.p97;
  }
}

// Calculate growth data for a given measurement type
export function calculateGrowthData(
  babyData: BabyData,
  measurementType: 'weight' | 'length' | 'headCircumference'
): GrowthData | null {
  const dataset = getDataset(
    babyData.gender,
    measurementType
  );
  
  let birthValue: number;
  let currentValue: number;
  
  if (measurementType === 'weight') {
    birthValue = babyData.birthWeight;
    currentValue = babyData.currentWeight;
  } else if (measurementType === 'length') {
    if (!babyData.birthLength || !babyData.currentLength) return null;
    birthValue = babyData.birthLength;
    currentValue = babyData.currentLength;
  } else {
    if (!babyData.birthHeadCircumference || !babyData.currentHeadCircumference) return null;
    birthValue = babyData.birthHeadCircumference;
    currentValue = babyData.currentHeadCircumference;
  }
  
  // Get current data point
  const currentDataPoint = interpolateDataPoint(babyData.currentGA, dataset);
  if (!currentDataPoint) return null;
  
  // Calculate z-score and percentile
  const zScore = calculateZScore(currentValue, currentDataPoint);
  const percentile = zScoreToPercentile(zScore);
  
  // Get growth status
  const status = getGrowthStatus(zScore);
  
  // Calculate expected value based on birth percentile
  const expectedValue = calculateExpectedValue(
    babyData.birthGA,
    babyData.currentGA,
    birthValue,
    dataset
  );
  
  // Get term comparison value (40 weeks)
  const termDataPoint = getDataPointForGA(40, dataset);
  if (!termDataPoint) return null;
  
  // Get same percentile for term baby
  let termComparisonValue: number;
  if (percentile <= 3) {
    termComparisonValue = termDataPoint.p3;
  } else if (percentile <= 10) {
    const weight = (percentile - 3) / (10 - 3);
    termComparisonValue = termDataPoint.p3 + weight * (termDataPoint.p10 - termDataPoint.p3);
  } else if (percentile <= 50) {
    const weight = (percentile - 10) / (50 - 10);
    termComparisonValue = termDataPoint.p10 + weight * (termDataPoint.p50 - termDataPoint.p10);
  } else if (percentile <= 90) {
    const weight = (percentile - 50) / (90 - 50);
    termComparisonValue = termDataPoint.p50 + weight * (termDataPoint.p90 - termDataPoint.p50);
  } else if (percentile <= 97) {
    const weight = (percentile - 90) / (97 - 90);
    termComparisonValue = termDataPoint.p90 + weight * (termDataPoint.p97 - termDataPoint.p90);
  } else {
    termComparisonValue = termDataPoint.p97;
  }
  
  return {
    zScore,
    percentile,
    statusMessage: status.message,
    statusColor: status.color,
    expectedValue,
    differenceFromExpected: currentValue - expectedValue,
    termComparisonValue,
  };
}

// Generate chart data points for specific measurement type and baby data
export function generateChartData(
  babyData: BabyData,
  measurementType: 'weight' | 'length' | 'headCircumference'
) {
  const dataset = getDataset(
    babyData.gender,
    measurementType
  );
  
  let birthValue: number;
  let currentValue: number;
  
  if (measurementType === 'weight') {
    birthValue = babyData.birthWeight;
    currentValue = babyData.currentWeight;
  } else if (measurementType === 'length') {
    if (!babyData.birthLength || !babyData.currentLength) return null;
    birthValue = babyData.birthLength;
    currentValue = babyData.currentLength;
  } else {
    if (!babyData.birthHeadCircumference || !babyData.currentHeadCircumference) return null;
    birthValue = babyData.birthHeadCircumference;
    currentValue = babyData.currentHeadCircumference;
  }
  
  // Calculate expected value
  const expectedValue = calculateExpectedValue(
    babyData.birthGA,
    babyData.currentGA,
    birthValue,
    dataset
  );
  
  // Generate data for chart
  const startWeek = Math.max(22, babyData.birthGA - 2);
  const endWeek = Math.min(50, babyData.currentGA + 8);
  const weeks = Array.from({ length: endWeek - startWeek + 1 }, (_, i) => startWeek + i);
  
  const p3Values: number[] = [];
  const p10Values: number[] = [];
  const p50Values: number[] = [];
  const p90Values: number[] = [];
  const p97Values: number[] = [];
  
  weeks.forEach(week => {
    const dataPoint = interpolateDataPoint(week, dataset);
    if (dataPoint) {
      p3Values.push(dataPoint.p3);
      p10Values.push(dataPoint.p10);
      p50Values.push(dataPoint.p50);
      p90Values.push(dataPoint.p90);
      p97Values.push(dataPoint.p97);
    }
  });
  
  return {
    labels: weeks,
    percentileData: {
      p3: p3Values,
      p10: p10Values,
      p50: p50Values,
      p90: p90Values,
      p97: p97Values,
    },
    babyData: {
      birth: birthValue,
      current: currentValue,
      expected: expectedValue,
    },
  };
}