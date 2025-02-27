export interface BabyData {
  birthGA: number; // Gestational age at birth in weeks
  birthWeight: number; // Weight at birth in grams
  birthLength?: number; // Length at birth in cm (optional)
  birthHeadCircumference?: number; // Head circumference at birth in cm (optional)
  gender: 'male' | 'female';
  currentGA: number; // Current gestational age in weeks
  currentWeight: number; // Current weight in grams
  currentLength?: number; // Current length in cm (optional)
  currentHeadCircumference?: number; // Current head circumference in cm (optional)
}

export interface GrowthData {
  zScore: number;
  percentile: number;
  statusMessage: string;
  statusColor: string;
  expectedValue: number; // Expected value at current GA based on birth GA percentile
  differenceFromExpected: number; // Difference from expected value
  termComparisonValue: number; // Value for a term baby (40 weeks) at same percentile
}

export interface GrowthChartPoint {
  age: number; // Gestational age in weeks
  value: number; // Measured value (weight, length, or head circumference)
  p3: number; // 3rd percentile at this age
  p10: number; // 10th percentile at this age  
  p50: number; // 50th percentile at this age
  p90: number; // 90th percentile at this age
  p97: number; // 97th percentile at this age
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
  pointRadius: number;
  pointHoverRadius: number;
  fill?: boolean;
}

export interface ChartData {
  labels: number[];
  percentileData: {
    p3: number[];
    p10: number[];
    p50: number[];
    p90: number[];
    p97: number[];
  };
  babyData: {
    birth: number;
    current: number;
    expected?: number;
  };
}