'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function LoginScreen({ onSwitch }: { onSwitch: () => void }) {
  const { signIn } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPwd, setShowPwd]   = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Veuillez remplir tous les champs.'); return; }
    setLoading(true); setError('');
    const err = await signIn(email, password);
    if (err) setError('Email ou mot de passe incorrect.');
    setLoading(false);
  };

  const inp = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20";

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      {/* Top branding */}
      <div className="flex flex-col items-center pt-16 pb-8 px-8">
        <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-4">N</div>
        <p className="text-white text-xl font-bold">ANC Néphro Centre</p>
        <p className="text-blue-300 text-xs mt-1 text-center">Association des Néphrologues du Centre</p>
      </div>

      {/* Card */}
      <div className="flex-1 bg-gray-50 rounded-t-3xl px-6 pt-8 pb-6">
        <h1 className="text-lg font-bold text-gray-900 mb-1">Connexion</h1>
        <p className="text-xs text-gray-400 mb-6">Accès réservé aux membres ANC</p>

        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email professionnel</label>
            <input className={inp} type="email" placeholder="dr.nom@etablissement.ma"
              value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Mot de passe</label>
            <div className="relative">
              <input className={inp + ' pr-10'} type={showPwd ? 'text' : 'password'} placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
              <button type="button" onClick={() => setShowPwd(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-brand font-medium">Mot de passe oublié ?</button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700 flex items-center gap-2">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-brand-dark text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Pas encore membre ?{' '}
            <button onClick={onSwitch} className="text-brand font-semibold">Créer un compte</button>
          </p>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-xs text-blue-800 font-semibold mb-1">ℹ️ Accès membres ANC uniquement</p>
          <p className="text-xs text-blue-600">Votre compte sera validé par le bureau de l'ANC avant activation.</p>
        </div>
      </div>
    </div>
  );
}
