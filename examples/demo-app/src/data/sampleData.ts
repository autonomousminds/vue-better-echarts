export const salesData = [
  { month: 'Jan', sales: 12500, orders: 145, region: 'North' },
  { month: 'Feb', sales: 15200, orders: 178, region: 'North' },
  { month: 'Mar', sales: 18900, orders: 210, region: 'North' },
  { month: 'Apr', sales: 16400, orders: 189, region: 'North' },
  { month: 'May', sales: 21000, orders: 245, region: 'North' },
  { month: 'Jun', sales: 24500, orders: 289, region: 'North' },
  { month: 'Jan', sales: 9800, orders: 112, region: 'South' },
  { month: 'Feb', sales: 11200, orders: 134, region: 'South' },
  { month: 'Mar', sales: 14500, orders: 167, region: 'South' },
  { month: 'Apr', sales: 13200, orders: 152, region: 'South' },
  { month: 'May', sales: 17800, orders: 198, region: 'South' },
  { month: 'Jun', sales: 19200, orders: 221, region: 'South' }
];

export const timeSeriesData = Array.from({ length: 100 }, (_, i) => ({
  day: `Day ${i + 1}`,
  value: Math.round(1000 + Math.random() * 500 + Math.sin(i / 10) * 200),
  trend: Math.round(1000 + i * 5 + Math.random() * 100)
}));

export const scatterData = [
  { age: 25, income: 45000, spending: 1200 },
  { age: 32, income: 65000, spending: 2100 },
  { age: 28, income: 52000, spending: 1500 },
  { age: 45, income: 95000, spending: 3200 },
  { age: 38, income: 78000, spending: 2800 },
  { age: 52, income: 120000, spending: 4500 },
  { age: 29, income: 48000, spending: 1400 },
  { age: 35, income: 72000, spending: 2400 },
  { age: 41, income: 88000, spending: 3100 },
  { age: 48, income: 105000, spending: 3800 },
  { age: 22, income: 38000, spending: 900 },
  { age: 55, income: 135000, spending: 5200 },
  { age: 33, income: 68000, spending: 2300 },
  { age: 27, income: 50000, spending: 1350 },
  { age: 44, income: 92000, spending: 3400 },
  { age: 36, income: 75000, spending: 2600 },
  { age: 50, income: 115000, spending: 4100 },
  { age: 31, income: 62000, spending: 1900 },
  { age: 39, income: 82000, spending: 2900 },
  { age: 46, income: 98000, spending: 3600 }
];

export const heatmapData = [
  { day: 'Mon', hour: '9am', value: 45 },
  { day: 'Mon', hour: '12pm', value: 78 },
  { day: 'Mon', hour: '3pm', value: 62 },
  { day: 'Mon', hour: '6pm', value: 35 },
  { day: 'Tue', hour: '9am', value: 52 },
  { day: 'Tue', hour: '12pm', value: 89 },
  { day: 'Tue', hour: '3pm', value: 71 },
  { day: 'Tue', hour: '6pm', value: 42 },
  { day: 'Wed', hour: '9am', value: 48 },
  { day: 'Wed', hour: '12pm', value: 95 },
  { day: 'Wed', hour: '3pm', value: 68 },
  { day: 'Wed', hour: '6pm', value: 38 },
  { day: 'Thu', hour: '9am', value: 55 },
  { day: 'Thu', hour: '12pm', value: 82 },
  { day: 'Thu', hour: '3pm', value: 74 },
  { day: 'Thu', hour: '6pm', value: 45 },
  { day: 'Fri', hour: '9am', value: 42 },
  { day: 'Fri', hour: '12pm', value: 76 },
  { day: 'Fri', hour: '3pm', value: 58 },
  { day: 'Fri', hour: '6pm', value: 28 }
];

export const funnelData = [
  { stage: 'Visitors', count: 10000 },
  { stage: 'Leads', count: 5200 },
  { stage: 'Qualified', count: 2800 },
  { stage: 'Proposals', count: 1400 },
  { stage: 'Closed', count: 680 }
];

export const pieData = [
  { category: 'Electronics', revenue: 42000 },
  { category: 'Clothing', revenue: 28000 },
  { category: 'Food & Beverage', revenue: 19500 },
  { category: 'Home & Garden', revenue: 15200 },
  { category: 'Sports', revenue: 11800 },
  { category: 'Books', revenue: 8400 },
  { category: 'Other', revenue: 5100 }
];

export const sankeyData = [
  { source: 'Website', target: 'Signup', value: 500 },
  { source: 'Email', target: 'Signup', value: 300 },
  { source: 'Social', target: 'Signup', value: 200 },
  { source: 'Signup', target: 'Trial', value: 700 },
  { source: 'Signup', target: 'Purchase', value: 100 },
  { source: 'Trial', target: 'Purchase', value: 350 }
];

export const waterfallData = [
  { category: 'Q1 Revenue', amount: 500000, isTotal: true },
  { category: 'New Customers', amount: 120000, isTotal: false },
  { category: 'Churn', amount: -45000, isTotal: false },
  { category: 'Upsells', amount: 30000, isTotal: false },
  { category: 'Price Changes', amount: -12000, isTotal: false },
  { category: 'Q2 Revenue', amount: 593000, isTotal: true },
];

export const boxPlotData = [
  { group: 'Team A', min: 12, q1: 25, median: 35, q3: 48, max: 62 },
  { group: 'Team B', min: 18, q1: 30, median: 42, q3: 55, max: 70 },
  { group: 'Team C', min: 8, q1: 20, median: 28, q3: 38, max: 52 },
  { group: 'Team D', min: 22, q1: 35, median: 45, q3: 58, max: 75 },
  { group: 'Team E', min: 15, q1: 28, median: 38, q3: 50, max: 65 }
];

export const histogramData = Array.from({ length: 200 }, () => ({
  income: Math.round(30000 + Math.random() * 90000 + (Math.random() > 0.7 ? 30000 : 0))
}));

export const calendarData = (() => {
  const data = [];
  const start = new Date(2024, 0, 1);
  for (let i = 0; i < 365; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toISOString().split('T')[0],
      contributions: Math.floor(Math.random() * 12)
    });
  }
  return data;
})();

export const usMapData = [
  { state: 'California', population: 39538 },
  { state: 'Texas', population: 29146 },
  { state: 'Florida', population: 21538 },
  { state: 'New York', population: 20201 },
  { state: 'Pennsylvania', population: 13003 },
  { state: 'Illinois', population: 12812 },
  { state: 'Ohio', population: 11800 },
  { state: 'Georgia', population: 10712 },
  { state: 'North Carolina', population: 10439 },
  { state: 'Michigan', population: 10078 },
  { state: 'New Jersey', population: 9289 },
  { state: 'Virginia', population: 8632 },
  { state: 'Washington', population: 7615 },
  { state: 'Arizona', population: 7279 },
  { state: 'Massachusetts', population: 7030 },
  { state: 'Tennessee', population: 6911 },
  { state: 'Indiana', population: 6786 },
  { state: 'Maryland', population: 6177 },
  { state: 'Missouri', population: 6155 },
  { state: 'Wisconsin', population: 5894 },
  { state: 'Colorado', population: 5774 },
  { state: 'Minnesota', population: 5707 },
  { state: 'South Carolina', population: 5119 },
  { state: 'Alabama', population: 5024 },
  { state: 'Louisiana', population: 4658 },
  { state: 'Kentucky', population: 4506 },
  { state: 'Oregon', population: 4238 },
  { state: 'Oklahoma', population: 3960 },
  { state: 'Connecticut', population: 3606 },
  { state: 'Utah', population: 3272 },
  { state: 'Iowa', population: 3191 },
  { state: 'Nevada', population: 3105 },
  { state: 'Arkansas', population: 3012 },
  { state: 'Mississippi', population: 2961 },
  { state: 'Kansas', population: 2937 },
  { state: 'New Mexico', population: 2118 },
  { state: 'Nebraska', population: 1962 },
  { state: 'Idaho', population: 1901 },
  { state: 'West Virginia', population: 1794 },
  { state: 'Hawaii', population: 1456 },
  { state: 'New Hampshire', population: 1377 },
  { state: 'Maine', population: 1362 },
  { state: 'Montana', population: 1085 },
  { state: 'Rhode Island', population: 1098 },
  { state: 'Delaware', population: 990 },
  { state: 'South Dakota', population: 887 },
  { state: 'North Dakota', population: 779 },
  { state: 'Alaska', population: 733 },
  { state: 'Vermont', population: 643 },
  { state: 'Wyoming', population: 577 }
];

export const countryData = [
  { country: 'United States', lat: 39.83, long: -98.58, gdp: 25460, population: 331900 },
  { country: 'China', lat: 35.86, long: 104.20, gdp: 17960, population: 1425900 },
  { country: 'Japan', lat: 36.20, long: 138.25, gdp: 4230, population: 125700 },
  { country: 'Germany', lat: 51.17, long: 10.45, gdp: 4070, population: 83200 },
  { country: 'United Kingdom', lat: 55.38, long: -3.44, gdp: 3070, population: 67800 },
  { country: 'India', lat: 20.59, long: 78.96, gdp: 3390, population: 1428600 },
  { country: 'France', lat: 46.23, long: 2.21, gdp: 2780, population: 67750 },
  { country: 'Brazil', lat: -14.24, long: -51.93, gdp: 1920, population: 215300 },
  { country: 'Canada', lat: 56.13, long: -106.35, gdp: 2140, population: 38930 },
  { country: 'Italy', lat: 41.87, long: 12.57, gdp: 2010, population: 59110 },
  { country: 'Australia', lat: -25.27, long: 133.78, gdp: 1680, population: 26440 },
  { country: 'South Korea', lat: 35.91, long: 127.77, gdp: 1670, population: 51740 },
  { country: 'Mexico', lat: 23.63, long: -102.55, gdp: 1320, population: 128900 },
  { country: 'Indonesia', lat: -0.79, long: 113.92, gdp: 1320, population: 275500 },
  { country: 'Turkey', lat: 38.96, long: 35.24, gdp: 910, population: 85280 },
  { country: 'Saudi Arabia', lat: 23.89, long: 45.08, gdp: 1110, population: 36410 },
  { country: 'Nigeria', lat: 9.08, long: 8.68, gdp: 477, population: 223800 },
  { country: 'South Africa', lat: -30.56, long: 22.94, gdp: 405, population: 60410 },
  { country: 'Egypt', lat: 26.82, long: 30.80, gdp: 477, population: 112720 },
  { country: 'Argentina', lat: -38.42, long: -63.62, gdp: 632, population: 45810 },
];

export const tableData = [
  { name: 'Alice Johnson', department: 'Engineering', region: 'West', salary: 125000, growth_pct: 0.12, tenure: 5, rating: 4.5 },
  { name: 'Bob Smith', department: 'Engineering', region: 'West', salary: 118000, growth_pct: 0.08, tenure: 3, rating: 4.2 },
  { name: 'Carol Davis', department: 'Engineering', region: 'East', salary: 132000, growth_pct: 0.15, tenure: 7, rating: 4.8 },
  { name: 'Dan Brown', department: 'Marketing', region: 'West', salary: 95000, growth_pct: -0.03, tenure: 2, rating: 3.9 },
  { name: 'Eve Wilson', department: 'Marketing', region: 'East', salary: 102000, growth_pct: 0.10, tenure: 4, rating: 4.1 },
  { name: 'Frank Lee', department: 'Marketing', region: 'East', salary: 89000, growth_pct: -0.05, tenure: 1, rating: 3.7 },
  { name: 'Grace Kim', department: 'Sales', region: 'West', salary: 108000, growth_pct: 0.22, tenure: 6, rating: 4.6 },
  { name: 'Hank Jones', department: 'Sales', region: 'East', salary: 97000, growth_pct: 0.18, tenure: 4, rating: 4.3 },
  { name: 'Ivy Chen', department: 'Sales', region: 'West', salary: 115000, growth_pct: 0.25, tenure: 8, rating: 4.9 },
  { name: 'Jack Miller', department: 'Engineering', region: 'East', salary: 140000, growth_pct: 0.05, tenure: 10, rating: 4.7 },
  { name: 'Kate Taylor', department: 'Sales', region: 'East', salary: 91000, growth_pct: -0.02, tenure: 1, rating: 3.8 },
  { name: 'Leo Martinez', department: 'Marketing', region: 'West', salary: 98000, growth_pct: 0.07, tenure: 3, rating: 4.0 },
  { name: 'Mia Anderson', department: 'Engineering', region: 'West', salary: 128000, growth_pct: 0.11, tenure: 6, rating: 4.4 },
  { name: 'Noah Thomas', department: 'Sales', region: 'West', salary: 105000, growth_pct: 0.14, tenure: 5, rating: 4.2 },
  { name: 'Olivia Jackson', department: 'Marketing', region: 'East', salary: 87000, growth_pct: 0.09, tenure: 2, rating: 4.1 },
  { name: 'Pete White', department: 'Engineering', region: 'East', salary: 135000, growth_pct: 0.06, tenure: 9, rating: 4.6 },
  { name: 'Quinn Harris', department: 'Sales', region: 'East', salary: 99000, growth_pct: 0.20, tenure: 3, rating: 4.4 },
  { name: 'Rose Clark', department: 'Marketing', region: 'West', salary: 93000, growth_pct: -0.01, tenure: 2, rating: 3.6 },
  { name: 'Sam Lewis', department: 'Engineering', region: 'West', salary: 122000, growth_pct: 0.13, tenure: 4, rating: 4.3 },
  { name: 'Tina Walker', department: 'Sales', region: 'East', salary: 110000, growth_pct: 0.16, tenure: 7, rating: 4.5 },
];

export const sampleDatasets: Record<string, Record<string, unknown>[]> = {
  sales: salesData,
  timeSeries: timeSeriesData,
  scatter: scatterData,
  bubble: scatterData,
  heatmap: heatmapData,
  funnel: funnelData,
  pie: pieData,
  sankey: sankeyData,
  waterfall: waterfallData,
  boxPlot: boxPlotData,
  histogram: histogramData,
  calendar: calendarData,
  usMap: usMapData,
  areaMap: usMapData,
  pointMap: countryData,
  bubbleMap: countryData,
  table: tableData,
};
