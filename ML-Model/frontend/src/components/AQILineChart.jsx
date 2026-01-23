import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getAQICategory, formatDate } from '../utils/aqi-utils';
import './AQILineChart.css';

/**
 * AQI Line Chart Component
 * Displays 7-day AQI predictions with bright green line
 */
const AQILineChart = ({ data, selectedDay, onDaySelect }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const category = getAQICategory(data.aqi);
      return (
        <div className="aqi-tooltip">
          <p className="tooltip-date">{formatDate(data.date)}</p>
          <p className="tooltip-aqi">AQI: {data.aqi}</p>
          <p className="tooltip-category" style={{ color: category.bgColor }}>
            {category.name}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="aqi-chart-container">
      <h2 className="chart-title">7-Day AQI Forecast</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          onClick={(e) => {
            if (e && e.activeLabel !== undefined) {
              const dayIndex = data.findIndex((d) => d.day === e.activeLabel);
              if (dayIndex !== -1) {
                onDaySelect(dayIndex);
              }
            }
          }}
        >
          <XAxis
            dataKey="day"
            label={{ value: 'Day', position: 'bottom', offset: 10 }}
            stroke="#999999"
          />
          <YAxis
            label={{ value: 'AQI (0-500)', angle: -90, position: 'insideLeft' }}
            domain={[0, 350]}
            stroke="#999999"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="aqi"
            stroke="#2CFF05"
            strokeWidth={3}
            dot={{
              fill: '#2CFF05',
              r: 5,
            }}
            activeDot={{
              r: 8,
              fill: '#BF00FF',
            }}
            name="AQI"
            cursor="pointer"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AQILineChart;
