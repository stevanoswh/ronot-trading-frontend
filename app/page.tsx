import ConfigForm from '@/components/ConfigForm';
import ConfigCard from '@/components/ConfigCard';
import { getConfig } from '@/lib/api';
import OrdersTable from '@/components/OrdersTable';
import { Suspense } from 'react';

export default async function Home() {
  const cfg = await getConfig();
  return (
    <main className="space-y-8">
      <h2>Link to for webhook at tradingview: https://tsim-api-136030881839.us-central1.run.app/webhook
</h2>
      <h2>Note: copy the link above to the alert webhook tradingview.com</h2>
      <h1 className="text-2xl font-bold">Strategy Parameters</h1>
      <ConfigForm initial={cfg} />
      <ConfigCard initial={cfg}/>
      <h2 className="text-xl font-semibold">Simulated Orders</h2>
      <Suspense fallback={<p>Loading orders…</p>}>
        <OrdersTable />
      </Suspense>
    </main>
  );
}