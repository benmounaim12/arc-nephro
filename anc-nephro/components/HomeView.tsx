'use client';
import Image from 'next/image';
import { events, news, tagColors } from '@/lib/data';

const tools = [
  { id:'ckdepi', label:'DFGe CKD-EPI', desc:'Filtration glomérulaire', icon:'🧮', bg:'bg-blue-50' },
  { id:'cg',     label:'Cockcroft-Gault', desc:'Clairance créatinine', icon:'⚗️', bg:'bg-green-50' },
  { id:'ktv',    label:'Kt/V Dialyse',  desc:'Dose de dialyse',      icon:'💧', bg:'bg-purple-50' },
  { id:'acr',    label:'ACR Urinaire',  desc:'Albumine/créatinine',  icon:'📊', bg:'bg-amber-50' },
];

export default function HomeView({ onNav }: { onNav:(tab:string,sub?:string)=>void }) {
  const featuredEvent = events.find(e=>e.featured);
  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-navy px-5 pt-4 pb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
              <Image src="/logo-arc.jpg" alt="Logo ARC" width={36} height={36} className="object-cover w-full h-full" />
            </div>
            <div>
              <p className="text-blue-300 text-xs font-semibold">ARC Néphro</p>
              <p className="text-white/40 text-xs">Association Rénale du Centre</p>
            </div>
          </div>
          <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-lg relative">
            🔔<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-navy"></span>
          </button>
        </div>
        <p className="text-white text-lg font-bold">Bonjour, Docteur 👋</p>
        <p className="text-white/40 text-xs mt-0.5">Bienvenue sur ARC Néphro</p>
      </div>

      <div className="p-4 space-y-5">
        {/* KiliA banner */}
        <button onClick={()=>onNav('kilia')} className="w-full bg-navy rounded-2xl p-3 flex items-center gap-3 border border-blue-800">
          <div className="relative w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0">
            K<span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-navy"></span>
          </div>
          <div className="flex-1 text-left">
            <p className="text-white text-sm font-bold">KiliA — Assistant IA</p>
            <p className="text-blue-300 text-xs mt-0.5">Posez votre question clinique...</p>
          </div>
          <span className="text-blue-400 text-lg">›</span>
        </button>

        {/* Événement vedette */}
        {featuredEvent && (
          <section>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold text-gray-700">Événement à venir</h2>
              <button onClick={()=>onNav('agenda')} className="text-xs text-blue-600 font-medium">Agenda →</button>
            </div>
            <div className="bg-navy rounded-2xl overflow-hidden border border-blue-800">
              <div className="relative h-32 overflow-hidden">
                <Image src="/event-27juin.jpg" alt="24ème Réunion Scientifique ARC" fill className="object-cover object-top opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent"></div>
                <div className="absolute bottom-2 left-3 right-3">
                  <span className="bg-amber-500 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">27 Juin 2026 · Ifrane</span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-bold leading-snug">{featuredEvent.name}</p>
                <p className="text-blue-300 text-xs mt-1 italic">"{featuredEvent.theme}"</p>
                <p className="text-white/50 text-xs mt-1">📍 {featuredEvent.location}</p>
              </div>
            </div>
          </section>
        )}

        {/* Tools */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-gray-700">Outils cliniques</h2>
            <button onClick={()=>onNav('tools')} className="text-xs text-blue-600 font-medium">Voir tout →</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {tools.map(t=>(
              <button key={t.id} onClick={()=>onNav('tools',t.id)}
                className="bg-white rounded-2xl p-3 border border-gray-100 text-left hover:border-blue-300 transition-colors">
                <div className={`w-9 h-9 ${t.bg} rounded-xl flex items-center justify-center text-lg mb-2`}>{t.icon}</div>
                <p className="text-xs font-semibold text-gray-900">{t.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* News */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-gray-700">Actualités</h2>
            <button onClick={()=>onNav('news')} className="text-xs text-blue-600 font-medium">Voir tout →</button>
          </div>
          <div className="space-y-2">
            {news.slice(0,2).map(n=>(
              <div key={n.id} className="bg-white rounded-xl p-3 border border-gray-100 flex gap-3">
                <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center text-lg" style={{background:n.bg}}>{n.icon}</div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">{n.category}</p>
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
