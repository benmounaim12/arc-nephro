'use client';
import { events, news, tagColors } from '@/lib/data';

const tools = [
  { id: 'ckdepi', label: 'DFGe CKD-EPI', desc: 'Filtration glomérulaire', icon: '🧮', bg: 'bg-blue-50' },
  { id: 'cg',     label: 'Cockcroft-Gault', desc: 'Clairance créatinine',  icon: '⚗️', bg: 'bg-green-50' },
  { id: 'ktv',    label: 'Kt/V Dialyse',  desc: 'Dose de dialyse',        icon: '💧', bg: 'bg-purple-50' },
  { id: 'acr',    label: 'ACR Urinaire',  desc: 'Rapport albumine/créat',  icon: '📊', bg: 'bg-amber-50' },
];

export default function HomeView({ onNav }: { onNav: (tab: string, sub?: string) => void }) {
  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-navy px-5 pt-4 pb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white font-bold text-sm">N</div>
            <span className="text-blue-300 text-xs font-semibold">ANC · Néphro Centre</span>
          </div>
          <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-lg relative">
            🔔<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-navy"></span>
          </button>
        </div>
        <p className="text-white text-lg font-bold">Bonjour, <span className="text-blue-300">Dr. Benali</span> 👋</p>
        <p className="text-white/40 text-xs mt-0.5">Association des Néphrologues du Centre</p>
        <div className="mt-3 bg-white/10 rounded-xl px-3 py-2 flex items-center gap-2 text-white/40 text-xs">
          🔍 Rechercher un outil, news...
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Tools */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-gray-700">Outils cliniques</h2>
            <button onClick={() => onNav('tools')} className="text-xs text-brand font-medium">Voir tout →</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {tools.map(t => (
              <button key={t.id} onClick={() => onNav('tools', t.id)}
                className="bg-white rounded-2xl p-3 border border-gray-100 text-left hover:border-brand/40 transition-colors">
                <div className={`w-9 h-9 ${t.bg} rounded-xl flex items-center justify-center text-lg mb-2`}>{t.icon}</div>
                <p className="text-xs font-semibold text-gray-900 leading-snug">{t.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Next event */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-gray-700">Prochain événement</h2>
            <button onClick={() => onNav('agenda')} className="text-xs text-brand font-medium">Agenda →</button>
          </div>
          {events.slice(0, 1).map(e => (
            <div key={e.id} className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3">
              <div className="min-w-[42px] bg-blue-50 rounded-xl py-1.5 px-1 text-center">
                <p className="text-xl font-bold text-brand-dark leading-none">{e.day}</p>
                <p className="text-xs font-semibold text-brand uppercase tracking-wide">{e.month}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">{e.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">📍 {e.location}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${tagColors[e.type]}`}>{e.tag}</span>
            </div>
          ))}
        </section>

        {/* News */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-gray-700">Actualités</h2>
            <button onClick={() => onNav('news')} className="text-xs text-brand font-medium">Voir tout →</button>
          </div>
          <div className="space-y-2">
            {news.slice(0, 2).map(n => (
              <div key={n.id} className="bg-white rounded-xl p-3 border border-gray-100 flex gap-3">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-xl" style={{ background: n.bg }}>{n.icon}</div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-brand uppercase tracking-wide">{n.category}</p>
                  <p className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2 mt-0.5">{n.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time} · {n.source}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
