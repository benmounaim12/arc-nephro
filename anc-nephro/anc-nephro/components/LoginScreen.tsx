'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
export default function LoginScreen({ onSwitch }: { onSwitch: () => void }) {
  const { signIn } = useAuth();
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [error,setError]=useState(''); const [loading,setLoading]=useState(false);
  const inp="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-400";
  const handle=async(e:React.FormEvent)=>{
    e.preventDefault(); if(!email||!password){setError('Veuillez remplir tous les champs.');return;}
    setLoading(true); setError('');
    const err=await signIn(email,password);
    if(err) setError('Email ou mot de passe incorrect.');
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <div className="flex flex-col items-center pt-12 pb-8 px-8">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-white mb-4 flex items-center justify-center">
          <Image src="/logo-arc.jpg" alt="Logo ARC" width={80} height={80} className="object-cover w-full h-full"/>
        </div>
        <p className="text-white text-xl font-bold">ARC Néphro</p>
        <p className="text-blue-300 text-xs mt-1 text-center">Association Rénale du Centre</p>
        <p className="text-white/30 text-xs mt-0.5 text-center">Sous l'égide de la SMN</p>
      </div>
      <div className="flex-1 bg-gray-50 rounded-t-3xl px-6 pt-8 pb-6">
        <h1 className="text-lg font-bold text-gray-900 mb-1">Connexion</h1>
        <p className="text-xs text-gray-400 mb-6">Accès réservé aux membres ARC</p>
        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email professionnel</label>
            <input className={inp} type="email" placeholder="dr.nom@etablissement.ma" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Mot de passe</label>
            <input className={inp} type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password"/>
          </div>
          {error&&<div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700">⚠️ {error}</div>}
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60">
            {loading?'Connexion...':'Se connecter'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">Pas encore membre ? <button onClick={onSwitch} className="text-blue-600 font-semibold">Créer un compte</button></p>
        </div>
        <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
          <p className="text-xs font-bold text-amber-800">🎉 24ème Réunion Scientifique</p>
          <p className="text-xs text-amber-700 mt-1">27 Juin 2026 · Al Akhawayn, Ifrane</p>
        </div>
      </div>
    </div>
  );
}
