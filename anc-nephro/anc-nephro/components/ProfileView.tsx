'use client';
import { useAuth } from '@/lib/auth-context';
export default function ProfileView() {
  const { profile, signOut } = useAuth();
  const initials = profile?.full_name?.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() || '?';
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
      <div className="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {[
          {icon:'🏥', label:'Établissement', val:profile?.hospital||'—'},
          {icon:'🔬', label:'Sous-spécialité', val:profile?.specialty||'—'},
          {icon:'📞', label:'Téléphone', val:profile?.phone||'—'},
          {icon:'🗓️', label:'Membre depuis', val:profile?.member_since ? new Date(profile.member_since).toLocaleDateString('fr-FR') : '—'},
        ].map((row,i)=>(
          <div key={row.label} className={`flex items-center gap-3 px-4 py-3 ${i<3?'border-b border-gray-50':''}`}>
            <span className="text-lg">{row.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">{row.label}</p>
              <p className="text-xs font-semibold text-gray-900 truncate">{row.val}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 mt-4 space-y-2 pb-4">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
          <p className="text-xs font-bold text-amber-800">🎉 24ème Réunion Scientifique ARC</p>
          <p className="text-xs text-amber-700 mt-1">27 Juin 2026 · Al Akhawayn, Ifrane</p>
        </div>
        <button onClick={signOut} className="w-full py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors">
          Déconnexion
        </button>
      </div>
    </div>
  );
}
