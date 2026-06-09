'use client';
import type { CalcResult } from '@/lib/calculators';
const sev: Record<string,string> = { ok:'bg-green-50 border-green-200', warn:'bg-amber-50 border-amber-200', danger:'bg-red-50 border-red-200' };
const stg: Record<string,string> = { ok:'bg-green-100 text-green-800', warn:'bg-amber-100 text-amber-800', danger:'bg-red-100 text-red-800' };
export default function ResultBox({ result }: { result: CalcResult }) {
  return (
    <div className={`rounded-xl p-4 border mt-3 ${sev[result.severity]}`}>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-blue-700">
          {Number.isInteger(result.value) ? result.value : result.value.toFixed(2)}
        </span>
        <span className="text-sm text-blue-500">{result.unit}</span>
      </div>
      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${stg[result.severity]}`}>{result.stage}</span>
      <p className="mt-2 text-xs text-gray-500 leading-relaxed">{result.note}</p>
      <p className="mt-1 text-xs text-gray-400 italic">⚠️ Résultat indicatif — jugement clinique requis</p>
    </div>
  );
}
