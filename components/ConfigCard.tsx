'use client';                    // ① jadikan Client Component

import useSWR from 'swr';
import { getConfig } from '@/lib/api';

export default function ConfigCard({ initial }) {   // ② terima data awal
  const { data } = useSWR('config', getConfig, {
    suspense: true,
    fallbackData: initial            // ③ cegah suspend di SSR
  });

  return (
    <div className="rounded-lg border p-4 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-2">Active Configuration</h2>
      <pre className="text-xs whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}