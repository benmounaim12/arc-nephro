'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

const SPECIALTIES = [
  'Hémodialyse', 'Dialyse péritonéale', 'Transplantation rénale',
  'Néphropathies glomérulaires', 'Néphropathies vasculaires',
  'Néphropédiatrie', 'Néphro générale',
];

export default function RegisterScreen({ onSwitch }: { onSwitch: () => void }) {
  const { signUp } = useAuth();
  const [step, setStep]         = useState(1);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [done, setDone]         = useState(false);

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [fullName, setFullName] = useState('');
  const [specialty, setSpec]    = useState('');
  const [hospital, setHospital] = useState('');
  const [phone, setPhone]       = useState('');

  const inp = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20";
  const sel = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-brand";

  const next = (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (step === 1) {
      if (!email || !password || !confirm) { setError('Tous les champs sont requis.'); return; }
      if (password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return; }
      if (password !== confirm) { setError('Les mots de passe ne correspondent pas.'); return; }
      setStep(2);
    } else {
      submit();
    }
  };

  const submit = async () => {
    if (!fullName || !specialty || !hospital || !phone) { setError('Tous les champs sont requis.'); return; }
    setLoading(true);
    const err = await signUp({ email, password, full_name: fullName, specialty, hospital, phone });
    if (err) { setError(err); setLoading(false); return; }
    setDone(true);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <p className="text-white text-xl font-bold mb-2">Demande envoyée !</p>
        <p className="text-blue-300 text-sm mb-6">
          Votre compte a été créé avec succès. Le bureau de l'ANC va examiner votre demande et vous envoyer un email de confirmation.
        </p>
        <div className="bg-blue-900/40 border border-blue-700/40 rounded-2xl p-4 w-full max-w-sm mb-6">
          <p className="text-blue-200 text-xs">📧 Un email de vérification a été envoyé à</p>
          <p className="text-white text-sm font-semibold mt-1">{email}</p>
        </div>
        <button onClick={onSwitch} className="w-full max-w-sm py-3.5 bg-brand-dark text-white rounded-xl text-sm font-semibold">
          Retour à la connexion
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <div className="flex flex-col items-center pt-10 pb-6 px-8">
        <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-3">N</div>
        <p className="text-white text-base font-bold">Créer un compte ANC</p>
        {/* Progress */}
        <div className="flex items-center gap-2 mt-4">
          <div className={`w-8 h-1.5 rounded-full transition-colors ${step >= 1 ? 'bg-brand' : 'bg-white/20'}`}></div>
          <div className={`w-8 h-1.5 rounded-full transition-colors ${step >= 2 ? 'bg-brand' : 'bg-white/20'}`}></div>
        </div>
        <p className="text-blue-300 text-xs mt-2">{step === 1 ? 'Étape 1/2 — Identifiants' : 'Étape 2/2 — Profil professionnel'}</p>
      </div>

      <div className="flex-1 bg-gray-50 rounded-t-3xl px-6 pt-8 pb-6">
        <form onSubmit={next} className="space-y-4">
          {step === 1 && <>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email professionnel</label>
              <input className={inp} type="email" placeholder="dr.nom@etablissement.ma" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Mot de passe (min. 8 caractères)</label>
              <input className={inp} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Confirmer le mot de passe</label>
              <input className={inp} type="password" placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} />
            </div>
          </>}

          {step === 2 && <>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nom complet</label>
              <input className={inp} type="text" placeholder="Dr. Prénom Nom" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Sous-spécialité</label>
              <select className={sel} value={specialty} onChange={e => setSpec(e.target.value)}>
                <option value="">Choisir...</option>
                {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Établissement</label>
              <input className={inp} type="text" placeholder="CHU Ibn Rochd, Casablanca" value={hospital} onChange={e => setHospital(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Téléphone professionnel</label>
              <input className={inp} type="tel" placeholder="+212 6 XX XX XX XX" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </>}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-brand-dark text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60">
            {loading ? 'Envoi en cours...' : step === 1 ? 'Continuer →' : 'Soumettre ma demande'}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-xs text-gray-500">
            Déjà membre ?{' '}
            <button onClick={onSwitch} className="text-brand font-semibold">Se connecter</button>
          </p>
        </div>
      </div>
    </div>
  );
}
