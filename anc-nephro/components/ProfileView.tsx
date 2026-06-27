'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

export default function ProfileView() {
  const { profile, signOut, refreshProfile } = useAuth();
  const [annuaire, setAnnuaire] = useState<boolean>(profile?.annuaire || false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const initials = profile?.full_name?.split(' ').filter(Boolean).slice(0,2).map(n=>n[0]).join('').toUpperCase() || '?';

  const toggleAnnuaire = async () => {
    setSaving(true);
    const newVal = !annuaire;
    setAnnuaire(newVal);
    await supabase.from('profiles').update({ annuaire: newVal }).eq('id', profile?.id);
    await refreshProfile();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 flex flex-col">
      <div className="bg-navy px-5 py-6 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">{initials}</div>
        <p className="text-white font-bold text-base">{profile?.full_name || 'Membre ARC'}</p>
        <p className="text-blue-300 text-xs mt-1">{profile?.specialty} — {profile?.hospital}</p>
        <span className="mt-2 bg-blue-900/50 text-blue-300 border border-blue-700/40 rounded-full px-3 py-1 text-xs font-semibold">
          ⭐ Membre actif ARC
        </span>
      </div>

      {/* Infos profil */}
      <div className="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {[
          { icon:'🔬', label:'Sous-spécialité', val: profile?.specialty || '—' },
          { icon:'🏥', label:'Établissement',   val: profile?.hospital  || '—' },
          { icon:'📍', label:'Ville',           val: (profile as any)?.ville   || '—' },
          { icon:'🗺️', label:'Région',          val: (profile as any)?.region  || '—' },
          { icon:'📞', label:'Téléphone',       val: profile?.phone     || '—' },
          { icon:'🗓️', label:'Membre depuis',   val: profile?.member_since ? new Date(profile.member_since).toLocaleDateString('fr-FR') : '—' },
        ].map((row, i, arr) => (
          <div key={row.label} className={`flex items-center gap-3 px-4 py-3 ${i < arr.length-1 ? 'border-b border-gray-50' : ''}`}>
            <span className="text-lg">{row.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">{row.label}</p>
              <p className="text-xs font-semibold text-gray-900 truncate">{row.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Annuaire */}
      <div className="mx-4 mt-3 bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p className="text-sm font-semibold text-gray-900">Apparaître dans l'annuaire</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
              Votre nom, spécialité et contact seront visibles par les membres ARC.
            </p>
          </div>
          <button
            onClick={toggleAnnuaire}
            disabled={saving}
            className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${annuaire ? 'bg-blue-600' : 'bg-gray-200'}`}
            aria-label="Toggle annuaire"
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${annuaire ? 'translate-x-6' : 'translate-x-0.5'}`}></span>
          </button>
        </div>
        {saved && <p className="text-xs text-green-600 mt-2 font-medium">✅ Préférence sauvegardée !</p>}
        {saving && <p className="text-xs text-gray-400 mt-2">Enregistrement...</p>}
      </div>

      {/* Événement */}
      <div className="mx-4 mt-3 bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
        <p className="text-xs font-bold text-amber-800">🎉 24ème Réunion Scientifique ARC</p>
        <p className="text-xs text-amber-700 mt-1">27 Juin 2026 · Al Akhawayn, Ifrane</p>
      </div>

      <div className="px-4 mt-3 pb-4">
        <button onClick={signOut} className="w-full py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors">
          Déconnexion
        </button>
      </div>
    </div>
  );
}
