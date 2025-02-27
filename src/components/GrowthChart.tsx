import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartDataset } from '../types';

// Fix for potential missing Chart.js components
if (typeof window !== 'undefined') {
  window.ResizeObserver = window.ResizeObserver || (() => ({ observe: () => {}, unobserve: () => {}, disconnect: () => {} }));
}

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GrowthChartProps {
  data: ChartData;
  title: string;
  yAxisLabel: string;
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data, title, yAxisLabel }) => {
  const theme = useTheme();

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: '3rd Percentile',
        data: data.percentileData.p3,
        borderColor: 'rgba(220, 53, 69, 0.5)', // Red
        backgroundColor: 'rgba(220, 53, 69, 0.05)',
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 3,
        fill: '+1',
      },
      {
        label: '10th Percentile',
        data: data.percentileData.p10,
        borderColor: 'rgba(255, 193, 7, 0.5)', // Yellow
        backgroundColor: 'rgba(255, 193, 7, 0.05)',
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 3,
        fill: '+1',
      },
      {
        label: '50th Percentile',
        data: data.percentileData.p50,
        borderColor: 'rgba(25, 135, 84, 0.9)', // Green
        backgroundColor: 'rgba(25, 135, 84, 0.05)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        fill: '+1',
      },
      {
        label: '90th Percentile',
        data: data.percentileData.p90,
        borderColor: 'rgba(255, 193, 7, 0.5)', // Yellow
        backgroundColor: 'rgba(255, 193, 7, 0.05)',
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 3,
        fill: '+1',
      },
      {
        label: '97th Percentile',
        data: data.percentileData.p97,
        borderColor: 'rgba(220, 53, 69, 0.5)', // Red
        backgroundColor: 'rgba(220, 53, 69, 0.05)',
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 3,
        fill: false,
      },
      {
        label: 'Baby Growth',
        data: [null, ...Array(data.labels.findIndex(week => week === data.labels[1]) - 1).fill(null), data.babyData.birth, ...Array(data.labels.length - data.labels.findIndex(week => week === data.labels[1]) - 1).fill(null)],
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: false,
      },
      {
        label: 'Current',
        data: [...Array(data.labels.findIndex(week => week === data.labels[data.labels.length - 1])).fill(null), data.babyData.current],
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: false,
      },
      ...(data.babyData.expected ? [{
        label: 'Expected',
        data: [...Array(data.labels.findIndex(week => week === data.labels[data.labels.length - 1])).fill(null), data.babyData.expected],
        borderColor: 'rgba(108, 117, 125, 0.8)',
        backgroundColor: 'rgba(108, 117, 125, 0.8)',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: false,
      }] : []),
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Gestational Age (weeks)',
          padding: 10,
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel,
          padding: 10,
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Smooth curves
      },
    },
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        padding: 3, 
        marginBottom: 3,
        height: 400,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
      }}
    >
      <Typography 
        variant="h6" 
        component="h3" 
        gutterBottom 
        align="center"
        color="primary"
      >
        {title}
      </Typography>
      <Line data={chartData} options={options} />
    </Paper>
  );
};

export default GrowthChart;