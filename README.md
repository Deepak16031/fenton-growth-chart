# Fenton Preterm Growth Chart Application

A web application for visualizing and monitoring the growth of premature infants using the Fenton 2013 Preterm Growth Charts.

## Overview

This application helps parents of premature babies track and understand their child's growth patterns compared to established growth standards. The app provides:

- Easy input of birth and current measurements
- Visual representation of growth using percentile charts
- Growth assessment based on gestational age
- Comparison with term babies at 40 weeks
- Calm, parent-friendly user interface

## Features

- **Growth Tracking**: Monitor weight, length, and head circumference
- **Percentile Visualization**: See where your baby falls on standard growth curves
- **Corrected Age Calculation**: Automatically calculates your baby's corrected age
- **Growth Projection**: Shows expected growth based on birth percentiles
- **Term Comparison**: Compares with full-term babies at the same percentile

## Built With

- React (TypeScript)
- Material UI for component styling
- Chart.js for growth charts visualization

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/fenton-growth-chart.git
cd fenton-growth-chart
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Build for production
```bash
npm run build
```

## Data Source

The growth charts are based on the Fenton 2013 Preterm Growth Charts, which were developed using data from large population-based studies of preterm infant growth.

## Important Note

This tool is designed for informational purposes only and should not replace professional medical advice. Always consult with your healthcare provider regarding your baby's growth and development.

## License

MIT License