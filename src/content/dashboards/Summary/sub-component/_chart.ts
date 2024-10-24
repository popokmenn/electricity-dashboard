import {
  useTheme,
} from '@mui/material'
import type { ApexOptions } from 'apexcharts';

const theme = useTheme();
export const chartOptions: ApexOptions = {
  chart: {
    background: 'transparent',
    stacked: false,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '60%'
      }
    }
  },
  colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + '%';
    },
    style: {
      colors: [theme.colors.alpha.trueWhite[100]]
    },
    background: {
      enabled: true,
      foreColor: theme.colors.alpha.trueWhite[100],
      padding: 8,
      borderRadius: 4,
      borderWidth: 0,
      opacity: 0.3,
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[70],
        opacity: 0.5
      }
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 1,
      color: theme.colors.alpha.black[50],
      opacity: 0.5
    }
  },
  fill: {
    opacity: 1
  },
  labels: ['Bitcoin', 'Ripple', 'Cardano', 'Ethereum'],
  legend: {
    labels: {
      colors: theme.colors.alpha.trueWhite[100]
    },
    show: false
  },
  stroke: {
    width: 0
  },
  theme: {
    mode: theme.palette.mode
  }
};

export const chartSeries = [10, 20, 25, 45];
