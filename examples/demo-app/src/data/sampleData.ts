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

export const cityData = [
  { city: 'New York', lat: 40.7128, long: -74.006, gdp: 1700, population: 8336 },
  { city: 'London', lat: 51.5074, long: -0.1278, gdp: 950, population: 8982 },
  { city: 'Tokyo', lat: 35.6762, long: 139.6503, gdp: 1920, population: 13960 },
  { city: 'Paris', lat: 48.8566, long: 2.3522, gdp: 850, population: 2161 },
  { city: 'Shanghai', lat: 31.2304, long: 121.4737, gdp: 680, population: 24870 },
  { city: 'Singapore', lat: 1.3521, long: 103.8198, gdp: 397, population: 5686 },
  { city: 'Dubai', lat: 25.2048, long: 55.2708, gdp: 312, population: 3490 },
  { city: 'Sydney', lat: -33.8688, long: 151.2093, gdp: 440, population: 5312 },
  { city: 'Mumbai', lat: 19.076, long: 72.8777, gdp: 310, population: 20411 },
  { city: 'Sao Paulo', lat: -23.5505, long: -46.6333, gdp: 450, population: 12325 },
  { city: 'Toronto', lat: 43.6532, long: -79.3832, gdp: 380, population: 2794 },
  { city: 'Seoul', lat: 37.5665, long: 126.978, gdp: 420, population: 9776 },
  { city: 'Berlin', lat: 52.52, long: 13.405, gdp: 250, population: 3645 },
  { city: 'Mexico City', lat: 19.4326, long: -99.1332, gdp: 290, population: 21782 },
  { city: 'Cairo', lat: 30.0444, long: 31.2357, gdp: 140, population: 20901 },
  { city: 'Lagos', lat: 6.5244, long: 3.3792, gdp: 90, population: 15388 },
  { city: 'Moscow', lat: 55.7558, long: 37.6173, gdp: 320, population: 12506 },
  { city: 'Bangkok', lat: 13.7563, long: 100.5018, gdp: 210, population: 10539 },
  { city: 'Jakarta', lat: -6.2088, long: 106.8456, gdp: 180, population: 10562 },
  { city: 'Istanbul', lat: 41.0082, long: 28.9784, gdp: 230, population: 15462 }
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
  pointMap: cityData,
  bubbleMap: cityData,
};
