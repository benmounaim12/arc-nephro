'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

interface Member {
  id:string; full_name:string; specialty:string; hospital:string;
  phone:string; status:string; role:string; member_since:string;
  region?:string; ville?:string; annuaire?:boolean;
}

export default function AdminPanel() {
  const { signOut } = useAuth();
  const [members,setMembers]=useState<Member[]>([]);
  const [loading,setLoading]=useState(true);
  const [filter,setFilter]=useState<'pending'|'active'|'all'>('pending');

  const load=async()=>{
    setLoading(true);
    const q=supabase.from('profiles').select('*').order('member_since',{ascending:false});
    if(filter!=='all') q.eq('status',filter);
    const {data}=await q; setMembers(data||[]); setLoading(false);
  };

  useEffect(()=>{load();},[filter]);

  const updateStatus=async(id:string,status:'active'|'suspended')=>{
    await supabase.from('profiles').update({status}).eq('id',id); load();
  };
  const toggleAdmin=async(id:string,currentRole:string)=>{
    await supabase.from('profiles').update({role:currentRole==='admin'?'member':'admin'}).eq('id',id); load();
  };
  const toggleAnnuaire=async(id:string,current:boolean)=>{
    await supabase.from('profiles').update({annuaire:!current}).eq('id',id); load();
  };

  const badge=(s:string,r:string)=>(
    <div className="flex flex-col items-end gap-1">
      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
        s==='pending'?'bg-amber-100 text-amber-800':
        s==='active'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>
        {s==='pending'?'En attente':s==='active'?'Actif':'Suspendu'}
      </span>
      {r==='admin'&&<span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Admin</span>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-navy px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-base">Panel Admin ARC</p>
          <p className="text-blue-300 text-xs mt-0.5">Gestion des membres</p>
        </div>
        <button onClick={signOut} className="text-xs text-blue-300 border border-blue-700/40 rounded-lg px-3 py-1.5">Déconnexion</button>
      </div>

      <div className="grid grid-cols-3 gap-3 px-4 py-4">
        {[
          {label:'En attente', val:members.filter(m=>m.status==='pending').length, color:'text-amber-600'},
          {label:'Actifs',     val:members.filter(m=>m.status==='active').length,  color:'text-green-600'},
          {label:'Total',      val:members.length, color:'text-blue-700'},
        ].map(s=>(
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-3 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 px-4 pb-3">
        {(['pending','active','all'] as const).map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors
              ${filter===f?'bg-blue-700 text-white border-blue-700':'bg-white text-gray-600 border-gray-200'}`}>
            {f==='pending'?'En attente':f==='active'?'Actifs':'Tous'}
          </button>
        ))}
      </div>

      <div className="px-4 pb-8 space-y-3 flex-1">
        {loading&&<p className="text-center text-gray-400 text-sm py-8">Chargement...</p>}
        {!loading&&members.length===0&&<p className="text-center text-gray-400 text-sm py-8">Aucun membre.</p>}
        {members.map(m=>(
          <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-gray-900">{m.full_name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{m.specialty}</p>
                <p className="text-xs text-gray-400 mt-0.5">📍 {m.ville}{m.region ? ` · ${m.region}` : ''}</p>
                <p className="text-xs text-gray-400">📞 {m.phone}</p>
              </div>
              {badge(m.status, m.role)}
            </div>
            <p className="text-xs text-gray-400 mb-3">Inscrit le {new Date(m.member_since).toLocaleDateString('fr-FR')}</p>

            {/* Annuaire toggle */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 mb-2">
              <p className="text-xs text-gray-600 font-medium">📋 Dans l'annuaire</p>
              <button onClick={()=>toggleAnnuaire(m.id, m.annuaire||false)}
                className={`relative w-10 h-5 rounded-full transition-colors ${m.annuaire?'bg-blue-600':'bg-gray-300'}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${m.annuaire?'translate-x-5':'translate-x-0.5'}`}></span>
              </button>
            </div>

            {m.status==='pending'&&(
              <div className="flex gap-2 mb-2">
                <button onClick={()=>updateStatus(m.id,'active')} className="flex-1 py-2 bg-green-50 border border-green-200 rounded-xl text-xs font-semibold text-green-700 hover:bg-green-100">✅ Approuver</button>
                <button onClick={()=>updateStatus(m.id,'suspended')} className="flex-1 py-2 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-100">❌ Refuser</button>
              </div>
            )}
            {m.status==='active'&&(
              <div className="flex gap-2">
                <button onClick={()=>updateStatus(m.id,'suspended')} className="flex-1 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100">Suspendre</button>
                <button onClick={()=>toggleAdmin(m.id,m.role)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors
                    ${m.role==='admin'?'bg-purple-50 border-purple-200 text-purple-700':'bg-blue-50 border-blue-200 text-blue-700'}`}>
                  {m.role==='admin'?'⬇️ Retirer admin':'⭐ Promouvoir admin'}
                </button>
              </div>
            )}
            {m.status==='suspended'&&(
              <button onClick={()=>updateStatus(m.id,'active')} className="w-full py-2 bg-green-50 border border-green-200 rounded-xl text-xs font-semibold text-green-700">Réactiver</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
