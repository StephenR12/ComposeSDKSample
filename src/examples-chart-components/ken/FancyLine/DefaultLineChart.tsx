import * as React from 'react';
import { ChartContainer, AreaPlot, LineChart } from '@mui/x-charts';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function DefaultLineAreaChart() {
  return (
    <LineChart
      margin={{bottom: 0}}
      width={1500}
      height={400}
      series={[{ data: uData, area: true, showMark: false, color: 'white' }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        '.MuiLineElement-root': {
          display: 'none',
        },
        '& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel': {
            fill: 'white'
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-line': {
            fill: 'white'
        },
        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
            display: 'none'
         },
         "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
            display: 'none'
         },
         "& .MuiChartsAxis-bottom .MuiChartsAxis-tick":{
            display: 'none'
         }
      }}
    />
  );
}