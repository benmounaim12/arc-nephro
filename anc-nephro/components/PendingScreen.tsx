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
        votre demande d'adhésion est en cours d'examen par le bureau de l'ANC.
        Vous recevrez un email dès validation de votre compte.
      </p>
      <div className="bg-blue-900/40 border border-blue-700/40 rounded-2xl p-5 w-full max-w-sm mb-6 text-left space-y-2">
        <p className="text-blue-200 text-xs font-semibold">Votre profil soumis</p>
        <div className="text-xs text-blue-100 space-y-1">
          <p>👤 {profile?.full_name}</p>
          <p>🔬 {profile?.specialty}</p>
          <p>🏥 {profile?.hospital}</p>
        </div>
      </div>
      <div className="bg-amber-900/30 border border-amber-700/40 rounded-2xl p-4 w-full max-w-sm mb-8">
        <p className="text-amber-200 text-xs">
          ⏱️ Délai de traitement habituel : <strong>24 à 48h ouvrées</strong>
        </p>
      </div>
      <button onClick={signOut} className="text-xs text-blue-400 underline">Se déconnecter</button>
    </div>
  );
}
