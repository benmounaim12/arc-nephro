'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function LoginScreen({ onSwitch }: { onSwitch: () => void }) {
  const { signIn } = useAuth();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

  const inp="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-400";

  const handle=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!email||!password){setError('Veuillez remplir tous les champs.');return;}
    setLoading(true); setError('');
    const err=await signIn(email,password);
    if(err) setError('Email ou mot de passe incorrect.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-navy flex flex-col">

      {/* Bandeau événement complet */}
      <div className="relative w-full overflow-hidden" style={{height:'160px'}}>
        <Image
          src="/event-banner.jpg"
          alt="24ème Réunion Scientifique ARC"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy"></div>
      </div>

      {/* Logo + Titre */}
      <div className="flex flex-col items-center px-6 py-4 -mt-6 relative z-10">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-lg flex items-center justify-center mb-3 border-2 border-white">
          <Image
            src="/logo-arc.png"
            alt="Logo ARC"
            width={80}
            height={80}
            className="object-contain w-full h-full"
          />
        </div>
        <p className="text-white text-lg font-bold">ARC Néphro</p>
        <p className="text-blue-300 text-xs mt-0.5">Association Rénale du Centre</p>
        <p className="text-white/30 text-xs mt-0.5">Sous l'égide de la SMN</p>
      </div>

      {/* Carte connexion */}
      <div className="flex-1 bg-gray-50 rounded-t-3xl px-6 pt-6 pb-6">
        <h1 className="text-lg font-bold text-gray-900 mb-1">Connexion</h1>
        <p className="text-xs text-gray-400 mb-5">Accès réservé aux membres ARC</p>

        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email professionnel</label>
            <input className={inp} type="email" placeholder="dr.nom@etablissement.ma"
              value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Mot de passe</label>
            <input className={inp} type="password" placeholder="••••••••"
              value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password"/>
          </div>

          {error&&(
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60">
            {loading?'Connexion...':'Se connecter'}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-xs text-gray-500">
            Pas encore membre ?{' '}
            <button onClick={onSwitch} className="text-blue-600 font-semibold">Créer un compte</button>
          </p>
        </div>

        {/* Badge événement */}
        <div className="mt-5 bg-navy rounded-2xl p-4 flex items-center gap-3 border border-blue-800">
          <div className="text-2xl">🎉</div>
          <div>
            <p className="text-white text-xs font-bold">24ème Réunion Scientifique ARC</p>
            <p className="text-amber-400 text-xs mt-0.5 font-medium">27 Juin 2026 · Al Akhawayn, Ifrane</p>
            <p className="text-blue-300 text-xs mt-0.5 italic">Réinventer la néphrologie : de l'innovation à la pratique</p>
          </div>
        </div>
      </div>
    </div>
  );
}
