'use client';
import Image from 'next/image';
import { useState } from 'react';
import { events, tagColors } from '@/lib/data';

export default function AgendaView() {
  const [reg, setReg] = useState<number|null>(null);
  return (
    <div className="flex-1 overflow-y-auto pb-20 flex flex-col">
      <div className="bg-navy px-5 py-4">
        <p className="text-white font-bold text-base">Agenda des événements</p>
        <p className="text-blue-300 text-xs mt-0.5">Association Rénale du Centre</p>
      </div>
      <div className="px-4 pt-4 pb-4 space-y-4">
        {events.map(e=>(
          <div key={e.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {e.featured && (
              <div className="relative h-36 overflow-hidden">
                <Image src="/event-27juin.jpg" alt={e.name} fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    {e.day} {e.month} {e.year} · {e.location.split(',')[1]?.trim()}
                  </span>
                </div>
              </div>
            )}
            <div className={`${e.featured ? '' : 'bg-blue-50'} px-4 py-3 flex items-start gap-3`}>
              {!e.featured && (
                <div className="text-center min-w-[40px]">
                  <p className="text-2xl font-bold text-blue-700 leading-none">{e.day}</p>
                  <p className="text-xs text-blue-500 font-semibold uppercase">{e.month}</p>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{e.name}</p>
                {e.theme && <p className="text-xs text-blue-600 italic mt-0.5">"{e.theme}"</p>}
                <p className="text-xs text-gray-500 mt-1">📍 {e.location}</p>
                <p className="text-xs text-gray-500">🕐 {e.time}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap self-start ${tagColors[e.type]||'bg-gray-100 text-gray-700'}`}>{e.tag}</span>
            </div>
            <button onClick={()=>setReg(reg===e.id?null:e.id)}
              className={`w-full py-2.5 text-xs font-semibold transition-colors
                ${reg===e.id?'bg-green-50 text-green-700':'bg-white hover:bg-blue-50 text-blue-700'}`}>
              {reg===e.id ? '✅ Inscription enregistrée !' : '📅 S\'inscrire à cet événement'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
