'use client';
import useSWR from 'swr';
import { apiBase } from '@/lib/api';

async function getOrders() {
  const res = await fetch(`${apiBase}/orders`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export default function OrdersTable() {

    type Order = {
  symbol: string;
  action: string;
  price_entry: number;
  tp_price: number;
  sl_price: number;
  leverage: string;
  timeframe: string;
  timestamp: string;
};

    const { data, error, isLoading } = useSWR<Order[]>('orders', getOrders, { suspense: true });

  if (isLoading) return <p>Loading orders…</p>;
  if (error)     return <p className="text-red-500">Error loading orders</p>;
  if (!data?.length) return <p>No orders yet.</p>;

  return (
    <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
      <table className="w-full text-xs">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            {['Time', 'Sym', 'Side', 'Entry', 'TP', 'SL', 'Lev'].map((h) => (
              <th key={h} className="px-2 py-1 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            
          {data.map((o: any, i: number) => (
            <tr key={i} className="odd:bg-gray-50 dark:odd:bg-gray-900">
              <td className="px-2 py-1">{new Date(o.timestamp).toLocaleString()}</td>
              <td className="px-2 py-1">{o.symbol}</td>
              <td className="px-2 py-1">{o.action}</td>
              <td className="px-2 py-1 text-right">{o.price_entry}</td>
              <td className="px-2 py-1 text-right">{o.tp_price}</td>
              <td className="px-2 py-1 text-right">{o.sl_price}</td>
              <td className="px-2 py-1 text-right">{o.leverage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
