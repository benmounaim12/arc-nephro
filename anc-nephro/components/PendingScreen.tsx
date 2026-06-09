'use client';
import { useAuth } from '@/lib/auth-context';
export default function PendingScreen() {
  const { signOut, profile } = useAuth();
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-8 text-center">
      <div className="text-5xl mb-4">⏳</div>
      <p className="text-white text-xl font-bold mb-2">Compte en attente</p>
      <p className="text-blue-300 text-sm mb-6 leading-relaxed">
        Bonjour {profile?.full_name?.split(' ')[0] || 'Docteur'},<br/>
        votre demande est en cours d'examen par le bureau de l'ARC.
      </p>
      <div className="bg-blue-900/40 border border-blue-700/40 rounded-2xl p-5 w-full max-w-sm mb-6 text-left space-y-1">
        <p className="text-blue-200 text-xs font-semibold mb-2">Votre profil soumis</p>
        <p className="text-xs text-blue-100">👤 {profile?.full_name}</p>
        <p className="text-xs text-blue-100">🔬 {profile?.specialty}</p>
        <p className="text-xs text-blue-100">🏥 {profile?.hospital}</p>
      </div>
      <div className="bg-amber-900/30 border border-amber-700/40 rounded-2xl p-4 w-full max-w-sm mb-6">
        <p className="text-xs font-bold text-amber-200 mb-1">🎉 Rejoignez-nous le 27 juin</p>
        <p className="text-amber-300 text-xs">24ème Réunion Scientifique · Al Akhawayn, Ifrane</p>
      </div>
      <p className="text-xs text-amber-300 mb-6">⏱️ Délai de traitement : 24 à 48h ouvrées</p>
      <button onClick={signOut} className="text-xs text-blue-400 underline">Se déconnecter</button>
    </div>
  );
}
