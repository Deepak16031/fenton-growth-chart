// Fenton 2013 growth chart data
// Source: https://peditools.org/fenton2013

export interface GrowthChartDataPoint {
  week: number; // Gestational age in weeks
  p3: number;   // 3rd percentile
  p10: number;  // 10th percentile
  p50: number;  // 50th percentile (median)
  p90: number;  // 90th percentile
  p97: number;  // 97th percentile
}

// Weight data in grams
export const weightDataBoys: GrowthChartDataPoint[] = [
  { week: 22, p3: 409, p10: 452, p50: 530, p90: 617, p97: 665 },
  { week: 23, p3: 457, p10: 506, p50: 596, p90: 696, p97: 750 },
  { week: 24, p3: 513, p10: 569, p50: 672, p90: 786, p97: 848 },
  { week: 25, p3: 576, p10: 642, p50: 759, p90: 892, p97: 962 },
  { week: 26, p3: 647, p10: 723, p50: 859, p90: 1014, p97: 1094 },
  { week: 27, p3: 728, p10: 816, p50: 973, p90: 1154, p97: 1246 },
  { week: 28, p3: 819, p10: 919, p50: 1103, p90: 1314, p97: 1421 },
  { week: 29, p3: 921, p10: 1036, p50: 1248, p90: 1495, p97: 1619 },
  { week: 30, p3: 1034, p10: 1165, p50: 1410, p90: 1699, p97: 1842 },
  { week: 31, p3: 1161, p10: 1310, p50: 1590, p90: 1928, p97: 2093 },
  { week: 32, p3: 1302, p10: 1472, p50: 1789, p90: 2182, p97: 2372 },
  { week: 33, p3: 1458, p10: 1651, p50: 2008, p90: 2461, p97: 2679 },
  { week: 34, p3: 1629, p10: 1848, p50: 2247, p90: 2765, p97: 3012 },
  { week: 35, p3: 1816, p10: 2062, p50: 2504, p90: 3090, p97: 3366 },
  { week: 36, p3: 2017, p10: 2292, p50: 2777, p90: 3431, p97: 3736 },
  { week: 37, p3: 2229, p10: 2536, p50: 3061, p90: 3781, p97: 4113 },
  { week: 38, p3: 2449, p10: 2789, p50: 3352, p90: 4129, p97: 4487 },
  { week: 39, p3: 2673, p10: 3045, p50: 3642, p90: 4467, p97: 4848 },
  { week: 40, p3: 2896, p10: 3298, p50: 3925, p90: 4786, p97: 5189 },
  { week: 41, p3: 3113, p10: 3541, p50: 4193, p90: 5078, p97: 5500 },
  { week: 42, p3: 3319, p10: 3767, p50: 4439, p90: 5337, p97: 5774 },
  { week: 43, p3: 3509, p10: 3973, p50: 4658, p90: 5560, p97: 6008 },
  { week: 44, p3: 3680, p10: 4154, p50: 4849, p90: 5742, p97: 6199 },
  { week: 45, p3: 3829, p10: 4306, p50: 5007, p90: 5883, p97: 6347 },
  { week: 46, p3: 3953, p10: 4432, p50: 5135, p90: 5982, p97: 6452 },
  { week: 47, p3: 4053, p10: 4531, p50: 5232, p90: 6042, p97: 6516 },
  { week: 48, p3: 4130, p10: 4607, p50: 5301, p90: 6073, p97: 6549 },
  { week: 49, p3: 4187, p10: 4662, p50: 5347, p90: 6084, p97: 6563 },
  { week: 50, p3: 4226, p10: 4698, p50: 5375, p90: 6082, p97: 6562 }
];

export const weightDataGirls: GrowthChartDataPoint[] = [
  { week: 22, p3: 390, p10: 429, p50: 500, p90: 580, p97: 624 },
  { week: 23, p3: 435, p10: 479, p50: 561, p90: 654, p97: 704 },
  { week: 24, p3: 486, p10: 535, p50: 631, p90: 739, p97: 796 },
  { week: 25, p3: 542, p10: 599, p50: 709, p90: 836, p97: 901 },
  { week: 26, p3: 605, p10: 671, p50: 796, p90: 945, p97: 1020 },
  { week: 27, p3: 676, p10: 752, p50: 896, p90: 1068, p97: 1154 },
  { week: 28, p3: 755, p10: 843, p50: 1008, p90: 1209, p97: 1307 },
  { week: 29, p3: 843, p10: 945, p50: 1135, p90: 1368, p97: 1480 },
  { week: 30, p3: 941, p10: 1059, p50: 1278, p90: 1548, p97: 1675 },
  { week: 31, p3: 1050, p10: 1186, p50: 1438, p90: 1750, p97: 1894 },
  { week: 32, p3: 1172, p10: 1328, p50: 1616, p90: 1975, p97: 2139 },
  { week: 33, p3: 1307, p10: 1485, p50: 1814, p90: 2226, p97: 2412 },
  { week: 34, p3: 1457, p10: 1660, p50: 2034, p90: 2502, p97: 2712 },
  { week: 35, p3: 1621, p10: 1851, p50: 2273, p90: 2801, p97: 3037 },
  { week: 36, p3: 1799, p10: 2057, p50: 2530, p90: 3120, p97: 3384 },
  { week: 37, p3: 1990, p10: 2276, p50: 2800, p90: 3452, p97: 3743 },
  { week: 38, p3: 2190, p10: 2504, p50: 3078, p90: 3791, p97: 4108 },
  { week: 39, p3: 2396, p10: 2737, p50: 3358, p90: 4127, p97: 4470 },
  { week: 40, p3: 2601, p10: 2967, p50: 3634, p90: 4451, p97: 4819 },
  { week: 41, p3: 2799, p10: 3189, p50: 3896, p90: 4751, p97: 5141 },
  { week: 42, p3: 2986, p10: 3395, p50: 4135, p90: 5018, p97: 5429 },
  { week: 43, p3: 3155, p10: 3581, p50: 4347, p90: 5244, p97: 5673 },
  { week: 44, p3: 3302, p10: 3744, p50: 4527, p90: 5424, p97: 5869 },
  { week: 45, p3: 3426, p10: 3880, p50: 4673, p90: 5558, p97: 6014 },
  { week: 46, p3: 3527, p10: 3989, p50: 4786, p90: 5649, p97: 6112 },
  { week: 47, p3: 3606, p10: 4072, p50: 4868, p90: 5705, p97: 6173 },
  { week: 48, p3: 3664, p10: 4133, p50: 4924, p90: 5735, p97: 6205 },
  { week: 49, p3: 3703, p10: 4175, p50: 4959, p90: 5748, p97: 6218 },
  { week: 50, p3: 3729, p10: 4201, p50: 4979, p90: 5750, p97: 6220 }
];

// Length data in centimeters
export const lengthDataBoys: GrowthChartDataPoint[] = [
  { week: 22, p3: 27.0, p10: 28.0, p50: 29.8, p90: 31.6, p97: 32.5 },
  { week: 23, p3: 28.3, p10: 29.3, p50: 31.1, p90: 33.0, p97: 34.0 },
  { week: 24, p3: 29.5, p10: 30.6, p50: 32.5, p90: 34.5, p97: 35.5 },
  { week: 25, p3: 30.8, p10: 31.9, p50: 33.8, p90: 35.9, p97: 37.0 },
  { week: 26, p3: 32.0, p10: 33.2, p50: 35.2, p90: 37.3, p97: 38.4 },
  { week: 27, p3: 33.3, p10: 34.5, p50: 36.6, p90: 38.7, p97: 39.9 },
  { week: 28, p3: 34.5, p10: 35.8, p50: 37.9, p90: 40.1, p97: 41.3 },
  { week: 29, p3: 35.8, p10: 37.1, p50: 39.3, p90: 41.5, p97: 42.8 },
  { week: 30, p3: 37.0, p10: 38.4, p50: 40.6, p90: 42.9, p97: 44.2 },
  { week: 31, p3: 38.3, p10: 39.7, p50: 42.0, p90: 44.3, p97: 45.6 },
  { week: 32, p3: 39.5, p10: 41.0, p50: 43.3, p90: 45.7, p97: 47.1 },
  { week: 33, p3: 40.8, p10: 42.3, p50: 44.7, p90: 47.1, p97: 48.5 },
  { week: 34, p3: 42.0, p10: 43.6, p50: 46.0, p90: 48.5, p97: 49.9 },
  { week: 35, p3: 43.3, p10: 44.8, p50: 47.4, p90: 49.9, p97: 51.4 },
  { week: 36, p3: 44.5, p10: 46.1, p50: 48.7, p90: 51.3, p97: 52.8 },
  { week: 37, p3: 45.8, p10: 47.4, p50: 50.0, p90: 52.7, p97: 54.2 },
  { week: 38, p3: 47.0, p10: 48.7, p50: 51.4, p90: 54.1, p97: 55.7 },
  { week: 39, p3: 48.3, p10: 50.0, p50: 52.7, p90: 55.5, p97: 57.1 },
  { week: 40, p3: 49.5, p10: 51.3, p50: 54.1, p90: 56.9, p97: 58.5 },
  { week: 41, p3: 50.8, p10: 52.6, p50: 55.4, p90: 58.3, p97: 60.0 },
  { week: 42, p3: 52.0, p10: 53.8, p50: 56.8, p90: 59.7, p97: 61.4 },
  { week: 43, p3: 53.3, p10: 55.1, p50: 58.1, p90: 61.1, p97: 62.8 },
  { week: 44, p3: 54.5, p10: 56.4, p50: 59.5, p90: 62.5, p97: 64.3 },
  { week: 45, p3: 55.8, p10: 57.7, p50: 60.8, p90: 63.9, p97: 65.7 },
  { week: 46, p3: 57.0, p10: 59.0, p50: 62.2, p90: 65.3, p97: 67.2 },
  { week: 47, p3: 58.3, p10: 60.3, p50: 63.5, p90: 66.7, p97: 68.6 },
  { week: 48, p3: 59.5, p10: 61.6, p50: 64.9, p90: 68.1, p97: 70.0 },
  { week: 49, p3: 60.8, p10: 62.9, p50: 66.2, p90: 69.5, p97: 71.5 },
  { week: 50, p3: 62.0, p10: 64.1, p50: 67.6, p90: 70.9, p97: 72.9 }
];

export const lengthDataGirls: GrowthChartDataPoint[] = [
  { week: 22, p3: 26.5, p10: 27.5, p50: 29.3, p90: 31.1, p97: 32.0 },
  { week: 23, p3: 27.7, p10: 28.7, p50: 30.6, p90: 32.4, p97: 33.4 },
  { week: 24, p3: 28.9, p10: 30.0, p50: 31.9, p90: 33.8, p97: 34.8 },
  { week: 25, p3: 30.1, p10: 31.2, p50: 33.2, p90: 35.1, p97: 36.2 },
  { week: 26, p3: 31.3, p10: 32.4, p50: 34.5, p90: 36.5, p97: 37.6 },
  { week: 27, p3: 32.5, p10: 33.7, p50: 35.8, p90: 37.9, p97: 39.0 },
  { week: 28, p3: 33.7, p10: 34.9, p50: 37.1, p90: 39.2, p97: 40.4 },
  { week: 29, p3: 34.9, p10: 36.2, p50: 38.4, p90: 40.6, p97: 41.8 },
  { week: 30, p3: 36.1, p10: 37.4, p50: 39.7, p90: 41.9, p97: 43.2 },
  { week: 31, p3: 37.3, p10: 38.6, p50: 41.0, p90: 43.3, p97: 44.6 },
  { week: 32, p3: 38.5, p10: 39.9, p50: 42.3, p90: 44.6, p97: 46.0 },
  { week: 33, p3: 39.7, p10: 41.1, p50: 43.6, p90: 46.0, p97: 47.4 },
  { week: 34, p3: 40.9, p10: 42.3, p50: 44.9, p90: 47.4, p97: 48.8 },
  { week: 35, p3: 42.1, p10: 43.6, p50: 46.2, p90: 48.7, p97: 50.2 },
  { week: 36, p3: 43.3, p10: 44.8, p50: 47.5, p90: 50.1, p97: 51.6 },
  { week: 37, p3: 44.5, p10: 46.1, p50: 48.8, p90: 51.4, p97: 53.0 },
  { week: 38, p3: 45.7, p10: 47.3, p50: 50.1, p90: 52.8, p97: 54.4 },
  { week: 39, p3: 46.9, p10: 48.5, p50: 51.4, p90: 54.1, p97: 55.8 },
  { week: 40, p3: 48.1, p10: 49.8, p50: 52.7, p90: 55.5, p97: 57.2 },
  { week: 41, p3: 49.3, p10: 51.0, p50: 54.0, p90: 56.8, p97: 58.6 },
  { week: 42, p3: 50.5, p10: 52.3, p50: 55.3, p90: 58.2, p97: 60.0 },
  { week: 43, p3: 51.7, p10: 53.5, p50: 56.6, p90: 59.5, p97: 61.4 },
  { week: 44, p3: 52.9, p10: 54.7, p50: 57.9, p90: 60.9, p97: 62.8 },
  { week: 45, p3: 54.1, p10: 56.0, p50: 59.2, p90: 62.2, p97: 64.2 },
  { week: 46, p3: 55.3, p10: 57.2, p50: 60.5, p90: 63.6, p97: 65.6 },
  { week: 47, p3: 56.5, p10: 58.4, p50: 61.8, p90: 65.0, p97: 67.0 },
  { week: 48, p3: 57.7, p10: 59.7, p50: 63.1, p90: 66.3, p97: 68.4 },
  { week: 49, p3: 58.9, p10: 60.9, p50: 64.4, p90: 67.7, p97: 69.8 },
  { week: 50, p3: 60.1, p10: 62.2, p50: 65.7, p90: 69.0, p97: 71.2 }
];

// Head circumference data in centimeters
export const headCircumferenceDataBoys: GrowthChartDataPoint[] = [
  { week: 22, p3: 19.5, p10: 20.1, p50: 21.2, p90: 22.2, p97: 22.8 },
  { week: 23, p3: 20.3, p10: 20.9, p50: 22.0, p90: 23.1, p97: 23.7 },
  { week: 24, p3: 21.1, p10: 21.7, p50: 22.8, p90: 24.0, p97: 24.6 },
  { week: 25, p3: 21.9, p10: 22.5, p50: 23.7, p90: 24.9, p97: 25.5 },
  { week: 26, p3: 22.7, p10: 23.3, p50: 24.5, p90: 25.8, p97: 26.4 },
  { week: 27, p3: 23.5, p10: 24.1, p50: 25.3, p90: 26.6, p97: 27.3 },
  { week: 28, p3: 24.2, p10: 24.9, p50: 26.1, p90: 27.5, p97: 28.2 },
  { week: 29, p3: 25.0, p10: 25.7, p50: 26.9, p90: 28.3, p97: 29.1 },
  { week: 30, p3: 25.7, p10: 26.4, p50: 27.7, p90: 29.2, p97: 30.0 },
  { week: 31, p3: 26.4, p10: 27.2, p50: 28.5, p90: 30.0, p97: 30.8 },
  { week: 32, p3: 27.1, p10: 27.9, p50: 29.3, p90: 30.8, p97: 31.7 },
  { week: 33, p3: 27.8, p10: 28.6, p50: 30.0, p90: 31.6, p97: 32.5 },
  { week: 34, p3: 28.5, p10: 29.3, p50: 30.8, p90: 32.4, p97: 33.3 },
  { week: 35, p3: 29.2, p10: 30.0, p50: 31.5, p90: 33.2, p97: 34.1 },
  { week: 36, p3: 29.9, p10: 30.7, p50: 32.2, p90: 33.9, p97: 34.9 },
  { week: 37, p3: 30.6, p10: 31.4, p50: 32.9, p90: 34.6, p97: 35.6 },
  { week: 38, p3: 31.2, p10: 32.0, p50: 33.6, p90: 35.3, p97: 36.3 },
  { week: 39, p3: 31.8, p10: 32.6, p50: 34.2, p90: 36.0, p97: 37.0 },
  { week: 40, p3: 32.3, p10: 33.2, p50: 34.8, p90: 36.6, p97: 37.6 },
  { week: 41, p3: 32.8, p10: 33.7, p50: 35.4, p90: 37.2, p97: 38.2 },
  { week: 42, p3: 33.3, p10: 34.2, p50: 35.9, p90: 37.7, p97: 38.8 },
  { week: 43, p3: 33.8, p10: 34.7, p50: 36.4, p90: 38.2, p97: 39.3 },
  { week: 44, p3: 34.2, p10: 35.1, p50: 36.8, p90: 38.7, p97: 39.7 },
  { week: 45, p3: 34.6, p10: 35.5, p50: 37.2, p90: 39.1, p97: 40.2 },
  { week: 46, p3: 35.0, p10: 35.9, p50: 37.6, p90: 39.4, p97: 40.5 },
  { week: 47, p3: 35.3, p10: 36.2, p50: 37.9, p90: 39.8, p97: 40.9 },
  { week: 48, p3: 35.6, p10: 36.5, p50: 38.2, p90: 40.1, p97: 41.2 },
  { week: 49, p3: 35.9, p10: 36.8, p50: 38.5, p90: 40.4, p97: 41.5 },
  { week: 50, p3: 36.1, p10: 37.0, p50: 38.7, p90: 40.6, p97: 41.7 }
];

export const headCircumferenceDataGirls: GrowthChartDataPoint[] = [
  { week: 22, p3: 19.0, p10: 19.7, p50: 20.7, p90: 21.8, p97: 22.4 },
  { week: 23, p3: 19.8, p10: 20.5, p50: 21.5, p90: 22.7, p97: 23.3 },
  { week: 24, p3: 20.6, p10: 21.3, p50: 22.3, p90: 23.5, p97: 24.2 },
  { week: 25, p3: 21.4, p10: 22.0, p50: 23.1, p90: 24.3, p97: 25.0 },
  { week: 26, p3: 22.1, p10: 22.8, p50: 23.9, p90: 25.1, p97: 25.8 },
  { week: 27, p3: 22.8, p10: 23.5, p50: 24.6, p90: 25.9, p97: 26.6 },
  { week: 28, p3: 23.5, p10: 24.2, p50: 25.4, p90: 26.6, p97: 27.4 },
  { week: 29, p3: 24.2, p10: 24.9, p50: 26.1, p90: 27.4, p97: 28.1 },
  { week: 30, p3: 24.9, p10: 25.6, p50: 26.8, p90: 28.1, p97: 28.9 },
  { week: 31, p3: 25.6, p10: 26.3, p50: 27.5, p90: 28.8, p97: 29.6 },
  { week: 32, p3: 26.2, p10: 26.9, p50: 28.2, p90: 29.5, p97: 30.3 },
  { week: 33, p3: 26.9, p10: 27.6, p50: 28.8, p90: 30.2, p97: 31.0 },
  { week: 34, p3: 27.5, p10: 28.2, p50: 29.4, p90: 30.8, p97: 31.6 },
  { week: 35, p3: 28.0, p10: 28.7, p50: 30.0, p90: 31.4, p97: 32.2 },
  { week: 36, p3: 28.6, p10: 29.3, p50: 30.5, p90: 32.0, p97: 32.8 },
  { week: 37, p3: 29.1, p10: 29.8, p50: 31.1, p90: 32.5, p97: 33.3 },
  { week: 38, p3: 29.7, p10: 30.4, p50: 31.6, p90: 33.0, p97: 33.8 },
  { week: 39, p3: 30.2, p10: 30.9, p50: 32.1, p90: 33.5, p97: 34.3 },
  { week: 40, p3: 30.7, p10: 31.3, p50: 32.5, p90: 33.9, p97: 34.7 },
  { week: 41, p3: 31.1, p10: 31.8, p50: 33.0, p90: 34.3, p97: 35.1 },
  { week: 42, p3: 31.5, p10: 32.2, p50: 33.3, p90: 34.7, p97: 35.5 },
  { week: 43, p3: 31.9, p10: 32.5, p50: 33.7, p90: 35.0, p97: 35.8 },
  { week: 44, p3: 32.2, p10: 32.9, p50: 34.0, p90: 35.3, p97: 36.1 },
  { week: 45, p3: 32.5, p10: 33.2, p50: 34.3, p90: 35.5, p97: 36.3 },
  { week: 46, p3: 32.8, p10: 33.4, p50: 34.5, p90: 35.8, p97: 36.5 },
  { week: 47, p3: 33.0, p10: 33.7, p50: 34.7, p90: 36.0, p97: 36.7 },
  { week: 48, p3: 33.2, p10: 33.9, p50: 34.9, p90: 36.1, p97: 36.9 },
  { week: 49, p3: 33.3, p10: 34.0, p50: 35.1, p90: 36.2, p97: 37.0 },
  { week: 50, p3: 33.5, p10: 34.1, p50: 35.2, p90: 36.3, p97: 37.1 }
];

// Calculate z-score for a given measurement
export function calculateZScore(
  measurement: number,
  dataPoint: GrowthChartDataPoint
): number {
  // Using LMS method (simplified)
  const median = dataPoint.p50;
  const lowerSD = (median - dataPoint.p10) / 1.28; // Approximate SD using percentiles
  const upperSD = (dataPoint.p90 - median) / 1.28;
  
  const sd = measurement < median ? lowerSD : upperSD;
  
  return (measurement - median) / sd;
}

// Get percentile from z-score
export function zScoreToPercentile(zScore: number): number {
  // Simplified conversion based on normal distribution
  if (zScore < -3) return 0.1;
  if (zScore > 3) return 99.9;
  
  // Approximation of cumulative normal distribution using polynomial approximation
  // instead of Math.erf which isn't available in all environments
  const sign = zScore < 0 ? -1 : 1;
  const z = Math.abs(zScore);
  
  // Polynomial approximation for CDF of standard normal
  let p;
  if (z <= 1.28) {
    p = 0.5 + 0.5 * sign * (1 - Math.exp(-z * z * 0.5) * (0.76 * z + 0.76));
  } else if (z <= 3.0) {
    p = 0.5 + 0.5 * sign * (1 - Math.exp(-z * z * 0.5) * (0.64 * z + 0.78));
  } else {
    p = zScore < 0 ? 0.0001 : 0.9999;
  }
  
  const percentile = 100 * p;
  return Math.round(percentile * 10) / 10; // Round to 1 decimal place
}

// Get appropriate dataset based on gender and measurement type
export function getDataset(
  gender: 'male' | 'female',
  measurementType: 'weight' | 'length' | 'headCircumference'
): GrowthChartDataPoint[] {
  if (gender === 'male') {
    if (measurementType === 'weight') return weightDataBoys;
    if (measurementType === 'length') return lengthDataBoys;
    return headCircumferenceDataBoys;
  } else {
    if (measurementType === 'weight') return weightDataGirls;
    if (measurementType === 'length') return lengthDataGirls;
    return headCircumferenceDataGirls;
  }
}

// Get data point for specific gestational age
export function getDataPointForGA(
  ga: number,
  dataset: GrowthChartDataPoint[]
): GrowthChartDataPoint | null {
  return dataset.find(point => point.week === ga) || null;
}

// Interpolate between two data points
export function interpolateDataPoint(
  ga: number,
  dataset: GrowthChartDataPoint[]
): GrowthChartDataPoint | null {
  // Find the two nearest data points
  const lowerPoint = dataset.find(point => point.week <= ga);
  const upperPoint = dataset.find(point => point.week >= ga);
  
  if (!lowerPoint || !upperPoint) return null;
  if (lowerPoint.week === upperPoint.week) return lowerPoint;
  
  // Calculate the weight for interpolation
  const weight = (ga - lowerPoint.week) / (upperPoint.week - lowerPoint.week);
  
  // Interpolate between the two data points
  return {
    week: ga,
    p3: lowerPoint.p3 + weight * (upperPoint.p3 - lowerPoint.p3),
    p10: lowerPoint.p10 + weight * (upperPoint.p10 - lowerPoint.p10),
    p50: lowerPoint.p50 + weight * (upperPoint.p50 - lowerPoint.p50),
    p90: lowerPoint.p90 + weight * (upperPoint.p90 - lowerPoint.p90),
    p97: lowerPoint.p97 + weight * (upperPoint.p97 - lowerPoint.p97),
  };
}