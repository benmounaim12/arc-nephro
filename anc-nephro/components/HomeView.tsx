'use client';
import Image from 'next/image';
import { events, news, tagColors } from '@/lib/data';
import type { Profile } from '@/lib/auth-context';

const tools = [
  { id:'ckdepi', label:'DFGe CKD-EPI',     desc:'Filtration glomérulaire', icon:'🧮', bg:'bg-blue-50' },
  { id:'cg',     label:'Cockcroft-Gault',   desc:'Clairance créatinine',   icon:'⚗️', bg:'bg-green-50' },
  { id:'ktv',    label:'Kt/V Dialyse',      desc:'Dose de dialyse',        icon:'💧', bg:'bg-purple-50' },
  { id:'acr',    label:'ACR Urinaire',      desc:'Albumine/créatinine',    icon:'📊', bg:'bg-amber-50' },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return 'Bonjour';
  if (h >= 12 && h < 18) return 'Bon après-midi';
  return 'Bonsoir';
}

function getTitle(profile: Profile | null): string {
  if (!profile) return '';
  if (profile.titre === 'Docteur') return 'Dr.';
  if (profile.titre === 'Professeur') return 'Pr.';
  return profile.titre || '';
}

function getLastName(profile: Profile | null): string {
  if (!profile) return '';
  // Use nom field if available, otherwise extract from full_name
  if ((profile as any).nom) return (profile as any).nom;
  const parts = profile.full_name?.split(' ') || [];
  return parts[parts.length - 1] || '';
}

function getSubMessage(): string {
  const day = new Date().getDay();
  const msgs = [
    'Bonne semaine, restez informé des dernières actualités !',
    'Nouvelle semaine, nouvelles opportunités scientifiques.',
    'À la pointe de la néphrologie marocaine.',
    'L\'excellence au service de vos patients.',
    'Cap sur le 27 juin — 24ème Réunion Scientifique ARC !',
    'Bon weekend ! Profitez des ressources de l\'app.',
    'Bon dimanche ! La 24ème réunion approche.',
  ];
  return msgs[day];
}

export default function HomeView({ onNav, profile }: { onNav:(tab:string,sub?:string)=>void; profile: Profile | null }) {
  const featuredEvent = events.find(e=>e.featured);
  const greeting = getGreeting();
  const title = getTitle(profile);
  const lastName = getLastName(profile);

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-navy px-5 pt-4 pb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
              <Image src="/logo-arc.png" alt="Logo ARC" width={36} height={36} className="object-contain w-full h-full"/>
            </div>
            <div>
              <p className="text-white text-xs font-semibold">ARC Néphro</p>
              <p className="text-white/40 text-xs">Association Rénale du Centre</p>
            </div>
          </div>
          <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-lg relative" aria-label="Notifications">
            🔔<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-navy"></span>
          </button>
        </div>

        {/* Salutation dynamique */}
        <p className="text-white text-xl font-bold">
          {greeting}{title || lastName ? ',' : ''} {title} {lastName} 👋
        </p>
        <p className="text-blue-300 text-xs mt-1 leading-relaxed">{getSubMessage()}</p>
      </div>

      <div className="p-4 space-y-4">

        {/* Événement vedette — bandeau horizontal */}
        {featuredEvent && (
          <section>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold text-gray-700">Événement à venir</h2>
              <button onClick={()=>onNav('agenda')} className="text-xs text-blue-600 font-medium">Agenda →</button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-100 cursor-pointer" onClick={()=>onNav('agenda')}>
              {/* Bandeau horizontal */}
              <div className="relative w-full overflow-hidden" style={{height:'120px'}}>
                <Image
                  src="/event-banner.jpg"
                  alt="24ème Réunion Scientifique ARC"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    27 Juin 2026
                  </span>
                  <span className="text-white/70 text-xs">Al Akhawayn · Ifrane</span>
                </div>
              </div>
              {/* Infos événement */}
              <div className="bg-navy px-3 py-2.5">
                <p className="text-white text-sm font-bold">{featuredEvent.name}</p>
                <p className="text-amber-400 text-xs italic mt-0.5">"{featuredEvent.theme}"</p>
              </div>
            </div>
          </section>
        )}

        {/* Outils cliniques */}
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
