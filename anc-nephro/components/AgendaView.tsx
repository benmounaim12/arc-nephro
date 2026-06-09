'use client';
import { useState } from 'react';
import { events, tagColors } from '@/lib/data';

const FILTERS = ['Tous', 'Réunions', 'Congrès', 'Webinaires', 'Deadlines'];
const filterMap: Record<string, string> = { 'Réunions': 'reunion', 'Congrès': 'congres', 'Webinaires': 'webinaire', 'Deadlines': 'deadline' };

export default function AgendaView() {
  const [filter, setFilter] = useState('Tous');

  const filtered = filter === 'Tous' ? events : events.filter(e => e.type === filterMap[filter]);

  return (
    <div className="flex-1 overflow-y-auto pb-20 flex flex-col">
      <div className="bg-navy px-5 py-4">
        <p className="text-white font-bold text-base">Agenda des événements</p>
        <p className="text-blue-300 text-xs mt-0.5">Association des Néphrologues du Centre</p>
      </div>

      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors
              ${filter === f ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-600 border-gray-200'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4 space-y-3">
        {filtered.map(e => (
          <div key={e.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="bg-blue-50 px-4 py-3 flex items-center gap-3">
              <div className="text-center min-w-[40px]">
                <p className="text-2xl font-bold text-brand-dark leading-none">{e.day}</p>
                <p className="text-xs text-brand font-semibold uppercase">{e.month}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 leading-snug">{e.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">📍 {e.location}</p>
                <p className="text-xs text-gray-500">🕐 {e.time}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap self-start ${tagColors[e.type]}`}>{e.tag}</span>
            </div>
            {e.type !== 'deadline' && (
              <button className="w-full py-2.5 text-xs font-semibold text-brand-dark bg-white hover:bg-blue-50 transition-colors">
                📅 S'inscrire à cet événement
              </button>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-10">Aucun événement dans cette catégorie.</div>
        )}
      </div>
    </div>
  );
}
