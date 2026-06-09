'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';

interface Member {
  id: string;
  full_name: string;
  specialty: string;
  hospital: string;
  phone: string;
  status: string;
  role: string;
  member_since: string;
  email?: string;
}

export default function AdminPanel() {
  const { signOut } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState<'pending' | 'active' | 'all'>('pending');

  const load = async () => {
    setLoading(true);
    const q = supabase.from('profiles').select('*').order('member_since', { ascending: false });
    if (filter !== 'all') q.eq('status', filter);
    const { data } = await q;
    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filter]);

  const update = async (id: string, status: 'active' | 'suspended') => {
    await supabase.from('profiles').update({ status }).eq('id', id);
    load();
  };

  const badge = (status: string) => {
    const map: Record<string, string> = {
      pending:   'bg-amber-100 text-amber-800',
      active:    'bg-green-100 text-green-700',
      suspended: 'bg-red-100 text-red-700',
    };
    const labels: Record<string, string> = { pending: 'En attente', active: 'Actif', suspended: 'Suspendu' };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] || ''}`}>{labels[status] || status}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-navy px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-base">Panel Admin ANC</p>
          <p className="text-blue-300 text-xs mt-0.5">Gestion des membres</p>
        </div>
        <button onClick={signOut} className="text-xs text-blue-300 border border-blue-700/40 rounded-lg px-3 py-1.5">
          Déconnexion
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-4 py-4">
        {[
          { label: 'En attente', val: members.filter(m => m.status === 'pending').length, color: 'text-amber-600' },
          { label: 'Actifs',     val: members.filter(m => m.status === 'active').length,  color: 'text-green-600' },
          { label: 'Total',      val: members.length, color: 'text-brand-dark' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-3 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 px-4 pb-3">
        {(['pending', 'active', 'all'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors
              ${filter === f ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-600 border-gray-200'}`}>
            {f === 'pending' ? 'En attente' : f === 'active' ? 'Actifs' : 'Tous'}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-4 pb-8 space-y-3 flex-1">
        {loading && <p className="text-center text-gray-400 text-sm py-8">Chargement...</p>}
        {!loading && members.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">Aucun membre dans cette catégorie.</p>
        )}
        {members.map(m => (
          <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold text-gray-900">{m.full_name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{m.specialty} · {m.hospital}</p>
                <p className="text-xs text-gray-400 mt-0.5">📞 {m.phone}</p>
              </div>
              {badge(m.status)}
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Inscrit le {new Date(m.member_since).toLocaleDateString('fr-FR')}
            </p>
            {m.status === 'pending' && (
              <div className="flex gap-2">
                <button onClick={() => update(m.id, 'active')}
                  className="flex-1 py-2 bg-green-50 border border-green-200 rounded-xl text-xs font-semibold text-green-700 hover:bg-green-100 transition-colors">
                  ✅ Approuver
                </button>
                <button onClick={() => update(m.id, 'suspended')}
                  className="flex-1 py-2 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors">
                  ❌ Refuser
                </button>
              </div>
            )}
            {m.status === 'active' && (
              <button onClick={() => update(m.id, 'suspended')}
                className="w-full py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors">
                Suspendre le compte
              </button>
            )}
            {m.status === 'suspended' && (
              <button onClick={() => update(m.id, 'active')}
                className="w-full py-2 bg-green-50 border border-green-200 rounded-xl text-xs font-semibold text-green-700 hover:bg-green-100 transition-colors">
                Réactiver le compte
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
