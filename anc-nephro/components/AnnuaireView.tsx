'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Member {
  id: string;
  full_name: string;
  titre?: string;
  prenom?: string;
  nom?: string;
  specialty: string;
  hospital: string;
  region?: string;
  ville?: string;
  phone: string;
  secteur?: string;
  type_etablissement?: string;
  annuaire?: boolean;
  avatar_url?: string;
}

const REGIONS = [
  'Tanger-Tétouan-Al Hoceïma','Oriental','Fès-Meknès',
  'Rabat-Salé-Kénitra','Béni Mellal-Khénifra','Casablanca-Settat',
  'Marrakech-Safi','Drâa-Tafilalet','Souss-Massa',
  'Guelmim-Oued Noun','Laâyoune-Sakia El Hamra','Dakhla-Oued Ed-Dahab',
];

function getInitials(name: string) {
  return name.split(' ').filter(Boolean).slice(0,2).map(n=>n[0]).join('').toUpperCase();
}

function Avatar({ member }: { member: Member }) {
  const initials = getInitials(member.full_name);
  const colors = ['bg-blue-600','bg-purple-600','bg-green-600','bg-red-600','bg-amber-600'];
  const color = colors[member.full_name.charCodeAt(0) % colors.length];
  if (member.avatar_url) {
    return <img src={member.avatar_url} alt={member.full_name} className="w-12 h-12 rounded-full object-cover flex-shrink-0"/>;
  }
  return (
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function AnnuaireView() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterEtab, setFilterEtab] = useState('');
  const [selected, setSelected] = useState<Member|null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('status', 'active')
        .eq('annuaire', true)
        .order('full_name', { ascending: true });
      setMembers(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = members.filter(m => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      m.full_name?.toLowerCase().includes(q) ||
      m.hospital?.toLowerCase().includes(q) ||
      m.specialty?.toLowerCase().includes(q) ||
      m.ville?.toLowerCase().includes(q);
    const matchRegion = !filterRegion || m.region === filterRegion;
    const matchEtab = !filterEtab || m.type_etablissement === filterEtab;
    return matchSearch && matchRegion && matchEtab;
  });

  if (selected) return (
    <div className="flex-1 overflow-y-auto pb-20 flex flex-col">
      <div className="bg-navy px-5 py-4 flex items-center gap-3">
        <button onClick={()=>setSelected(null)} className="text-blue-300 text-sm">← Retour</button>
        <p className="text-white font-bold text-base flex-1 text-center">Fiche membre</p>
        <div className="w-16"></div>
      </div>
      <div className="p-4">
        <div className="bg-navy rounded-2xl p-5 flex flex-col items-center mb-4 border border-blue-800">
          <Avatar member={selected}/>
          <p className="text-white font-bold text-lg mt-3">{selected.full_name}</p>
          <p className="text-blue-300 text-xs mt-1">{selected.specialty}</p>
          {selected.secteur && (
            <span className={`mt-2 px-3 py-0.5 rounded-full text-xs font-semibold ${selected.secteur==='Public'?'bg-blue-900 text-blue-300':'bg-green-900 text-green-300'}`}>
              Secteur {selected.secteur}
            </span>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
          {[
            {icon:'🏥', label:'Établissement', val:selected.hospital},
            {icon:'🔬', label:'Type établissement', val:selected.type_etablissement},
            {icon:'📍', label:'Ville', val:selected.ville},
            {icon:'🗺️', label:'Région', val:selected.region},
            {icon:'📞', label:'Téléphone', val:selected.phone, link:`tel:${selected.phone}`},
          ].filter(r=>r.val).map((row,i,arr)=>(
            <div key={row.label} className={`flex items-center gap-3 px-4 py-3 ${i<arr.length-1?'border-b border-gray-50':''}`}>
              <span className="text-xl">{row.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400">{row.label}</p>
                {row.link
                  ? <a href={row.link} className="text-sm font-semibold text-blue-600">{row.val}</a>
                  : <p className="text-sm font-semibold text-gray-900 truncate">{row.val}</p>
                }
              </div>
            </div>
          ))}
        </div>
        <a href={`tel:${selected.phone}`}
          className="w-full py-3.5 bg-blue-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
          📞 Appeler {selected.full_name.split(' ')[0]}
        </a>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto pb-20 flex flex-col">
      <div className="bg-navy px-5 py-4">
        <p className="text-white font-bold text-base">Annuaire ARC</p>
        <p className="text-blue-300 text-xs mt-0.5">{members.length} membres référencés</p>
      </div>

      {/* Recherche */}
      <div className="px-4 pt-3 pb-2 space-y-2">
        <input
          type="text"
          placeholder="🔍 Rechercher par nom, établissement, ville..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-400"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filterRegion}
            onChange={e=>setFilterRegion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-700 bg-white focus:outline-none focus:border-blue-400">
            <option value="">Toutes les régions</option>
            {REGIONS.map(r=><option key={r} value={r}>{r.split('-')[0]}</option>)}
          </select>
          <select
            value={filterEtab}
            onChange={e=>setFilterEtab(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-700 bg-white focus:outline-none focus:border-blue-400">
            <option value="">Tous les établissements</option>
            {['CHU','CHR','Centre d\'hémodialyse','Clinique privée','Cabinet médical'].map(t=><option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Liste */}
      <div className="px-4 pb-4 space-y-2">
        {loading && <p className="text-center text-gray-400 text-sm py-8">Chargement...</p>}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">Aucun membre trouvé</p>
            <p className="text-gray-300 text-xs mt-1">Modifiez vos critères de recherche</p>
          </div>
        )}
        {filtered.map(m=>(
          <button key={m.id} onClick={()=>setSelected(m)}
            className="w-full bg-white rounded-2xl border border-gray-100 p-3 flex items-center gap-3 text-left hover:border-blue-200 transition-colors">
            <Avatar member={m}/>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{m.full_name}</p>
              <p className="text-xs text-gray-500 truncate mt-0.5">{m.hospital}</p>
              <div className="flex items-center gap-2 mt-1">
                {m.ville && <span className="text-xs text-gray-400">📍 {m.ville}</span>}
                {m.secteur && <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${m.secteur==='Public'?'bg-blue-50 text-blue-600':'bg-green-50 text-green-600'}`}>{m.secteur}</span>}
              </div>
            </div>
            <span className="text-gray-300 text-lg flex-shrink-0">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
