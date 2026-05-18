// 30 days of revenue data
export const revenueData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2025, 3, 15 + i); // April 15 to May 14
  const day = date.getDate();
  const month = date.toLocaleString('en-IN', { month: 'short' });
  const baseRevenue = 350000 + Math.floor(Math.random() * 300000);
  const bhayliRevenue = 150000 + Math.floor(Math.random() * 150000);
  return {
    date: `${day} ${month}`,
    alkapuri: baseRevenue,
    bhayli: bhayliRevenue,
    total: baseRevenue + bhayliRevenue,
  };
});

export const categoryBreakdown = [
  { category: 'Necklaces', revenue: 1850000, count: 12 },
  { category: 'Bangles', revenue: 1420000, count: 18 },
  { category: 'Rings', revenue: 980000, count: 25 },
  { category: 'Earrings', revenue: 760000, count: 22 },
  { category: 'Bridal Sets', revenue: 2450000, count: 4 },
  { category: 'Chains', revenue: 540000, count: 15 },
];

export const topItems = [
  { sku: 'VJ-22K-BAN-0047', name: 'Antique Kundan Bangle', sold: 8, revenue: 1680000 },
  { sku: 'VJ-22K-NKL-0012', name: 'Temple Necklace Set', sold: 5, revenue: 2250000 },
  { sku: 'VJ-DIA-RNG-0031', name: 'Solitaire Engagement Ring', sold: 6, revenue: 1440000 },
  { sku: 'VJ-22K-EAR-0059', name: 'Chandbali Earrings', sold: 10, revenue: 980000 },
  { sku: 'VJ-22K-MAN-0008', name: 'Bridal Maang Tikka', sold: 3, revenue: 720000 },
];

export const topCustomers = [
  { name: 'Priti Desai', purchases: 8, totalSpent: 3250000, category: 'VIP' },
  { name: 'Meera Agarwal', purchases: 6, totalSpent: 2180000, category: 'Bridal' },
  { name: 'Rekha Shah', purchases: 5, totalSpent: 1450000, category: 'Regular' },
  { name: 'Anita Kulkarni', purchases: 4, totalSpent: 980000, category: 'Regular' },
  { name: 'Sunita Patel', purchases: 3, totalSpent: 870000, category: 'Regular' },
];

export const salespersonPerformance = [
  { name: 'Suresh Shah', bills: 42, revenue: 4850000, branch: 'Alkapuri' },
  { name: 'Komal Joshi', bills: 35, revenue: 3200000, branch: 'Alkapuri' },
  { name: 'Ramesh Patel', bills: 28, revenue: 2950000, branch: 'Alkapuri' },
  { name: 'Hiren Mehta', bills: 22, revenue: 1850000, branch: 'Bhayli' },
  { name: 'Bhavesh Trivedi', bills: 18, revenue: 1620000, branch: 'Bhayli' },
];

export const paymentModes = [
  { mode: 'Cash', amount: 4200000, percentage: 35 },
  { mode: 'UPI', amount: 3600000, percentage: 30 },
  { mode: 'Card', amount: 2400000, percentage: 20 },
  { mode: 'Bank Transfer', amount: 1200000, percentage: 10 },
  { mode: 'Old Gold', amount: 600000, percentage: 5 },
];

export const bills = [
  { id: 'VJ/24-25/0091', customer: 'Priti Desai', amount: 485000, date: '2025-05-14', time: '11:30 AM', items: 2, salesperson: 'Suresh Shah' },
  { id: 'VJ/24-25/0090', customer: 'Meera Agarwal', amount: 142500, date: '2025-05-14', time: '10:45 AM', items: 1, salesperson: 'Komal Joshi' },
  { id: 'VJ/24-25/0089', customer: 'Rekha Shah', amount: 78200, date: '2025-05-14', time: '10:15 AM', items: 1, salesperson: 'Suresh Shah' },
  { id: 'VJ/24-25/0088', customer: 'Anita Kulkarni', amount: 235000, date: '2025-05-14', time: '09:30 AM', items: 3, salesperson: 'Ramesh Patel' },
  { id: 'VJ/24-25/0087', customer: 'Sunita Patel', amount: 56800, date: '2025-05-14', time: '09:00 AM', items: 1, salesperson: 'Komal Joshi' },
];

export const staff = [
  { id: 'S01', name: 'Ramesh Patel', role: 'Store Manager', branch: 'Alkapuri', present: true },
  { id: 'S02', name: 'Suresh Shah', role: 'Sr. Salesman', branch: 'Alkapuri', present: true },
  { id: 'S03', name: 'Nilam Desai', role: 'Accountant', branch: 'Alkapuri', present: true },
  { id: 'S04', name: 'Komal Joshi', role: 'Salesperson', branch: 'Alkapuri', present: true },
  { id: 'S08', name: 'Arvind Solanki', role: 'Karigar', branch: 'Alkapuri', present: true },
];
