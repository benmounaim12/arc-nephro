'use client';
import Image from 'next/image';
import { useState } from 'react';

const BUREAU = [
  { titre:'Présidente', nom:'Pr. Nadia Kabbali', etablissement:'Association Rénale du Centre', initiales:'NK', color:'bg-red-600' },
  { titre:'Vice-Présidente', nom:'Pr. Basmat Amal Chouhani', etablissement:'Association Rénale du Centre', initiales:'BC', color:'bg-blue-600' },
  { titre:'Secrétaire Générale', nom:'Dr. Ghita El Yousfi', etablissement:'Association Rénale du Centre', initiales:'GY', color:'bg-green-600' },
  { titre:'Vice-Secrétaire Générale', nom:'Dr. Mouna El Mansouri', etablissement:'Association Rénale du Centre', initiales:'MM', color:'bg-purple-600' },
  { titre:'Trésorière', nom:'Dr. Souad Mikou', etablissement:'Association Rénale du Centre', initiales:'SM', color:'bg-amber-600' },
  { titre:'Vice-Trésorière', nom:'Dr. Wiam Rami', etablissement:'Association Rénale du Centre', initiales:'WR', color:'bg-teal-600' },
  { titre:'Assesseur', nom:'Dr. Fatimazahra Harrat', etablissement:'Association Rénale du Centre', initiales:'FH', color:'bg-pink-600' },
];

const TABS = ['Objectifs','Organigramme','Historique'];

export default function AboutView() {
  const [tab, setTab] = useState('Objectifs');

  return (
    <div className="flex-1 overflow-y-auto pb-20 flex flex-col">
      {/* Header avec logo */}
      <div className="bg-navy px-5 pt-5 pb-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white mb-3 flex items-center justify-center">
          <Image src="/logo-arc.png" alt="Logo ARC" width={64} height={64} className="object-contain w-full h-full"/>
        </div>
        <p className="text-white font-bold text-base">Association Rénale du Centre</p>
        <p className="text-blue-300 text-xs mt-0.5 text-center">Sous l'égide de la Société Marocaine de Néphrologie</p>
      </div>

      {/* Bandeau événement */}
      <div className="relative w-full overflow-hidden" style={{height:'80px'}}>
        <Image src="/event-banner.jpg" alt="24ème Réunion Scientifique" fill className="object-cover object-center"/>
        <div className="absolute inset-0 bg-navy/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-xs font-bold text-center">24ème Réunion Scientifique · 27 Juin 2026 · Ifrane</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {TABS.map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors
              ${tab===t?'bg-blue-700 text-white border-blue-700':'bg-white text-gray-600 border-gray-200'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4">

        {/* OBJECTIFS */}
        {tab==='Objectifs' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-sm font-bold text-gray-900 mb-3">Mission de l'ARC</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                L'Association Rénale du Centre (ARC) est une société savante regroupant les néphrologues 
                de la région du Centre du Maroc. Elle œuvre pour l'amélioration de la prise en charge 
                des maladies rénales et la promotion de la néphrologie au Maroc.
              </p>
            </div>
            {[
              { icon:'🎓', title:'Formation continue', desc:'Organiser des réunions scientifiques, congrès et webinaires pour la formation continue des néphrologues.' },
              { icon:'🔬', title:'Recherche clinique', desc:'Promouvoir la recherche néphrologuique au niveau régional et national en partenariat avec la SMN.' },
              { icon:'🤝', title:'Coordination des soins', desc:'Améliorer la coordination entre les centres de dialyse et les services de néphrologie de la région.' },
              { icon:'📢', title:'Sensibilisation', desc:'Sensibiliser le public et les professionnels de santé aux maladies rénales chroniques.' },
              { icon:'🌍', title:'Coopération internationale', desc:'Développer des partenariats avec les associations néphrologiques maghrébines et internationales.' },
              { icon:'📱', title:'Innovation numérique', desc:'Développer des outils numériques (ARC Néphro App, KiliA IA) pour moderniser la pratique néphrologuique.' },
            ].map(obj=>(
              <div key={obj.title} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-3">
                <span className="text-2xl flex-shrink-0">{obj.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{obj.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{obj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ORGANIGRAMME */}
        {tab==='Organigramme' && (
          <div className="space-y-3">
            <div className="bg-navy rounded-2xl p-4 border border-blue-800 mb-4">
              <p className="text-white text-xs text-center font-semibold">Bureau de l'Association Rénale du Centre</p>
              <p className="text-blue-300 text-xs text-center mt-0.5">Mandat 2026 – 2029</p>
            </div>
            {/* Président en évidence */}
            <div className="bg-white rounded-2xl border-2 border-blue-200 p-4 flex items-center gap-3">
              <div className={`w-14 h-14 rounded-full ${BUREAU[0].color} flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>
                {BUREAU[0].initiales}
              </div>
              <div className="flex-1">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{BUREAU[0].titre}</span>
                <p className="text-sm font-bold text-gray-900 mt-1">{BUREAU[0].nom}</p>
                <p className="text-xs text-gray-500 mt-0.5">{BUREAU[0].etablissement}</p>
              </div>
            </div>
            {/* Autres membres */}
            {BUREAU.slice(1).map(m=>(
              <div key={m.nom} className="bg-white rounded-2xl border border-gray-100 p-3 flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full ${m.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {m.initiales}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">{m.titre}</span>
                  <p className="text-sm font-semibold text-gray-900 mt-1 truncate">{m.nom}</p>
                  <p className="text-xs text-gray-400 truncate">{m.etablissement}</p>
                </div>
              </div>
            ))}
           
        )}

        {/* HISTORIQUE */}
        {tab==='Historique' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-2">
              <p className="text-sm font-bold text-gray-900 mb-2">L'ARC en chiffres</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {num:'24', label:'Réunions scientifiques'},
                  {num:'+150', label:'Membres actifs'},
                  {num:'2001', label:'Année de création'},
                ].map(s=>(
                  <div key={s.label} className="bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-blue-700">{s.num}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {[
              { year:'2001', title:'Fondation de l\'ARC', desc:'Création de l\'Association Rénale du Centre par un groupe de néphrologues pionniers de la région.' },
              { year:'2005', title:'Première réunion scientifique', desc:'Organisation de la première réunion scientifique annuelle, devenue un événement incontournable.' },
              { year:'2010', title:'Adhésion à la SMN', desc:'L\'ARC rejoint officiellement la Société Marocaine de Néphrologie et renforce ses liens institutionnels.' },
              { year:'2015', title:'Expansion régionale', desc:'Extension du réseau de membres à l\'ensemble des provinces de la région du Centre.' },
              { year:'2020', title:'Transition numérique', desc:'Lancement des webinaires et des formations en ligne suite à la pandémie COVID-19.' },
              { year:'2024', title:'Lancement ARC Néphro App', desc:'Développement de l\'application mobile ARC Néphro avec KiliA, l\'assistant IA spécialisé en néphrologie.' },
              { year:'2026', title:'24ème Réunion Scientifique', desc:'27 juin 2026 · Al Akhawayn, Ifrane · "Réinventer la néphrologie : de l\'innovation à la pratique"', highlight:true },
            ].map(e=>(
              <div key={e.year} className={`flex gap-3 ${e.highlight?'':''}` }>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${e.highlight?'bg-amber-400 text-amber-900':'bg-blue-100 text-blue-700'}`}>
                    {e.year}
                  </div>
                  <div className="w-0.5 bg-gray-100 flex-1 my-1"></div>
                </div>
                <div className={`flex-1 pb-3 ${e.highlight?'bg-amber-50 border border-amber-200 rounded-xl p-3 -mt-1':'bg-white rounded-xl border border-gray-100 p-3'}`}>
                  <p className={`text-sm font-semibold ${e.highlight?'text-amber-800':'text-gray-900'}`}>{e.title}</p>
                  <p className={`text-xs mt-1 leading-relaxed ${e.highlight?'text-amber-700':'text-gray-500'}`}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
