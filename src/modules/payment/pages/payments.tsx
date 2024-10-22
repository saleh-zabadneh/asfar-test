import { Payment, columns, DataTable } from '@/components/data-table';
import ModernForm from './payment-form';

function generateRandomData(count: number): Payment[] {
  const statuses: Payment['status'][] = [
    'pending',
    'processing',
    'success',
    'failed',
  ];
  const names = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Henry',
    'Ivy',
    'Jack',
  ];
  const domains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'example.com',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `payment_${i + 1}`,
    amount: Math.floor(Math.random() * 10000) / 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    email: `${names[Math.floor(Math.random() * names.length)].toLowerCase()}${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`,
    name: `${names[Math.floor(Math.random() * names.length)]} ${names[Math.floor(Math.random() * names.length)]}`,
    date: new Date(
      Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)
    )
      .toISOString()
      .split('T')[0],
  }));
}

const data: Payment[] = generateRandomData(1000);

export default function PaymentsPage() {
  return (
    <div className="container py-10 mx-auto">
      <DataTable columns={columns} data={data} />
      <ModernForm />
    </div>
  );
}
