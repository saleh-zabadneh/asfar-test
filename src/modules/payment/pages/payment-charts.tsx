'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Legend,
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const lineChartData = [
  { month: 'Jan', income: 2400, expenses: 1398, savings: 1002 },
  { month: 'Feb', income: 1398, expenses: 2800, savings: -1402 },
  { month: 'Mar', income: 9800, expenses: 2800, savings: 7000 },
  { month: 'Apr', income: 3908, expenses: 2000, savings: 1908 },
  { month: 'May', income: 4800, expenses: 2181, savings: 2619 },
  { month: 'Jun', income: 3800, expenses: 2500, savings: 1300 },
  { month: 'Jul', income: 4300, expenses: 2100, savings: 2200 },
];

const barChartData = [
  { method: 'Credit Card', amount: 4000, transactions: 240 },
  { method: 'Debit Card', amount: 3000, transactions: 180 },
  { method: 'PayPal', amount: 2000, transactions: 120 },
  { method: 'Bank Transfer', amount: 2780, transactions: 90 },
  { method: 'Cash', amount: 1890, transactions: 60 },
  { method: 'Cryptocurrency', amount: 2390, transactions: 30 },
  { method: 'Mobile Wallet', amount: 3490, transactions: 150 },
];

const pieChartData = [
  { name: 'Housing', value: 35 },
  { name: 'Transportation', value: 15 },
  { name: 'Food', value: 20 },
  { name: 'Utilities', value: 10 },
  { name: 'Insurance', value: 5 },
  { name: 'Healthcare', value: 10 },
  { name: 'Savings', value: 5 },
];

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#FFC0CB',
];

export default function PaymentCharts() {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Payment Analytics Dashboard</CardTitle>
        <CardDescription>
          Comprehensive overview of financial trends, payment methods, and
          expense distribution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trends">Payment Trends</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="expenses">Expense Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="trends" className="space-y-4">
            <ChartContainer
              config={{
                income: {
                  label: 'Income',
                  color: 'hsl(var(--chart-1))',
                },
                expenses: {
                  label: 'Expenses',
                  color: 'hsl(var(--chart-2))',
                },
                savings: {
                  label: 'Savings',
                  color: 'hsl(var(--chart-3))',
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="var(--color-income)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="var(--color-expenses)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="var(--color-savings)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="methods" className="space-y-4">
            <ChartContainer
              config={{
                amount: {
                  label: 'Amount',
                  color: 'hsl(var(--chart-1))',
                },
                transactions: {
                  label: 'Transactions',
                  color: 'hsl(var(--chart-2))',
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="method" />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="var(--color-amount)"
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="var(--color-transactions)"
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="amount"
                    fill="var(--color-amount)"
                    radius={[4, 4, 0, 0]}
                  >
                    {barChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                  <Bar
                    yAxisId="right"
                    dataKey="transactions"
                    fill="var(--color-transactions)"
                    radius={[4, 4, 0, 0]}
                  >
                    {barChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[(index + 2) % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="expenses" className="space-y-4">
            <ChartContainer
              config={{
                value: {
                  label: 'Expense Percentage',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
