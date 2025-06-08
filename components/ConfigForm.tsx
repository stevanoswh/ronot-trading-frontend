'use client';
import { useState } from 'react';
import { saveConfig } from '@/lib/api';
import { mutate } from 'swr';    

const defaults = {
  symbol: 'BTCUSDT',
  timeframe: '5m',
  plusDIThreshold: 25,
  minusDIThreshold: 20,
  adxMinimum: 20,
  takeProfitPercent: 2,
  stopLossPercent: 1,
  leverage: 10
};

type FormState = typeof defaults;

export default function ConfigForm({ initial }: { initial?: Partial<FormState> }) {
  const [form, setForm] = useState<FormState>({ ...defaults, ...initial });

  const handleChange = (key: keyof FormState, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await saveConfig(form);
    mutate('config', updated, false)
  };
  const handleReset = () => setForm(defaults);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {(
          [
            ['symbol', 'Symbol'],
            ['timeframe', 'Timeframe'],
            ['plusDIThreshold', '+DI Threshold'],
            ['minusDIThreshold', '–DI Threshold'],
            ['adxMinimum', 'ADX Minimum'],
            ['takeProfitPercent', 'Take Profit %'],
            ['stopLossPercent', 'Stop Loss %'],
            ['leverage', 'Leverage']
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex flex-col text-sm">
            {label}
            <input
              type={typeof form[key] === 'number' ? 'number' : 'text'}
              value={form[key] as string | number}
              onChange={(e) => handleChange(key, e.target.value)}
              className="mt-1 rounded-md border px-2 py-1 dark:bg-gray-800"
            />
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white transition-transform active:scale-95">
          Save Config
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded bg-gray-500 px-4 py-2 text-white"
        >
          Reset
        </button>
      </div>
    </form>
  );
}