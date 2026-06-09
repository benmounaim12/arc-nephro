'use client';
import { useState } from 'react';
import { news } from '@/lib/data';

const CATS = ['Tous', 'Recherche', 'Thérapeutique', 'KDIGO', 'ANC', 'Pharmacologie'];

export default function NewsView() {
  const [cat, setCat] = useState('Tous');
  const filtered = cat === 'Tous' ? news : news.filter(n => n.category === cat);

  return (
    <div className="flex-1 overflow-y-auto pb-20 flex flex-col">
      <div className="bg-navy px-5 py-4">
        <p className="text-white font-bold text-base">Actualités</p>
        <p className="text-blue-300 text-xs mt-0.5">Veille scientifique et institutionnelle</p>
      </div>

      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors
              ${cat === c ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-600 border-gray-200'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4 space-y-3">
        {filtered.map(n => (
          <div key={n.id} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs font-bold text-brand uppercase tracking-wide mb-1">{n.category}</p>
            <p className="text-sm font-semibold text-gray-900 leading-snug mb-2">{n.title}</p>
            <div className="flex gap-3 text-xs text-gray-400 mb-2">
              <span>🕐 {n.time}</span>
              <span>{n.source}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{n.excerpt}</p>
            <button className="mt-3 text-xs font-semibold text-brand-dark hover:underline">Lire la suite →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
