'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

const REGIONS: Record<string, string[]> = {
  'Tanger-Tétouan-Al Hoceïma': ['Tanger','Tétouan','Al Hoceïma','Chefchaouen','Larache','Ouazzane','Fahs-Anjra','Mdiq-Fnideq'],
  'Oriental': ['Oujda','Nador','Berkane','Taourirt','Jerada','Guercif','Driouch','Figuig'],
  'Fès-Meknès': ['Fès','Meknès','Taza','Ifrane','Sefrou','Boulemane','El Hajeb','Moulay Yacoub'],
  'Rabat-Salé-Kénitra': ['Rabat','Salé','Kénitra','Témara','Skhirate','Khémisset','Sidi Kacem','Sidi Slimane'],
  'Béni Mellal-Khénifra': ['Béni Mellal','Khénifra','Khouribga','Azilal','Fquih Ben Salah'],
  'Casablanca-Settat': ['Casablanca','Settat','Mohammedia','El Jadida','Berrechid','Benslimane','Médiouna','Nouaceur'],
  'Marrakech-Safi': ['Marrakech','Safi','El Kelaâ des Sraghna','Essaouira','Chichaoua','Al Haouz','Youssoufia','Rehamna'],
  'Drâa-Tafilalet': ['Errachidia','Ouarzazate','Zagora','Tinghir','Midelt'],
  'Souss-Massa': ['Agadir','Tiznit','Taroudant','Chtouka Aït Baha','Inezgane-Aït Melloul','Tata'],
  'Guelmim-Oued Noun': ['Guelmim','Sidi Ifni','Tan-Tan','Assa-Zag'],
  'Laâyoune-Sakia El Hamra': ['Laâyoune','Boujdour','Es-Semara','Tarfaya'],
  'Dakhla-Oued Ed-Dahab': ['Dakhla','Aousserd'],
};

const TITRES = ['Docteur', 'Professeur', 'Autre'];
const SECTEURS = ['Public', 'Privé'];
const ETABLISSEMENTS = ['CHU', 'CHR', 'Centre d\'hémodialyse', 'Clinique privée', 'Cabinet médical', 'Autre'];

export default function RegisterScreen({ onSwitch }: { onSwitch: () => void }) {
  const { signUp } = useAuth();
  const [step,setStep]=useState(1);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [done,setDone]=useState(false);

  // Étape 1
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');

  // Étape 2
  const [titre,setTitre]=useState('');
  const [autretitre,setAutreTitre]=useState('');
  const [prenom,setPrenom]=useState('');
  const [nom,setNom]=useState('');
  const [secteur,setSecteur]=useState('');
  const [typeEtab,setTypeEtab]=useState('');
  const [nomEtab,setNomEtab]=useState('');
  const [region,setRegion]=useState('');
  const [ville,setVille]=useState('');
  const [phone,setPhone]=useState('');
  const [annuaire,setAnnuaire]=useState(false);

  const inp="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-400";
  const sel="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-400";
  const Lbl=({t}:{t:string})=><label className="block text-xs font-medium text-gray-600 mb-1">{t}</label>;

  const fullName = titre === 'Autre' ? `${autretitre} ${prenom} ${nom}`.trim() : `${titre} ${prenom} ${nom}`.trim();
  const specialty = `${typeEtab}${nomEtab ? ' — '+nomEtab : ''}`;
  const hospital = `${nomEtab} · ${ville}${region ? ', '+region : ''}`;

  const next=async(e:React.FormEvent)=>{
    e.preventDefault(); setError('');
    if(step===1){
      if(!email||!password||!confirm){setError('Tous les champs sont requis.');return;}
      if(password.length<8){setError('Mot de passe : 8 caractères minimum.');return;}
      if(password!==confirm){setError('Les mots de passe ne correspondent pas.');return;}
      setStep(2);
    } else {
      if(!titre||!prenom||!nom||!secteur||!typeEtab||!nomEtab||!region||!ville||!phone){
        setError('Veuillez remplir tous les champs obligatoires.');return;
      }
      if(titre==='Autre'&&!autretitre){setError('Veuillez préciser votre titre.');return;}
      setLoading(true);
      const err=await signUp({
        email, password,
        full_name: fullName,
        specialty: `${secteur} · ${typeEtab}`,
        hospital: `${nomEtab}, ${ville}`,
        phone,
      });
      if(err){setError(err);setLoading(false);return;}
      setDone(true); setLoading(false);
    }
  };

  if(done) return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-8 text-center">
      <div className="text-5xl mb-4">✅</div>
      <p className="text-white text-xl font-bold mb-2">Demande envoyée !</p>
      <p className="text-blue-300 text-sm mb-6 leading-relaxed">
        Bienvenue <strong className="text-white">{fullName}</strong> !<br/>
        Votre demande sera examinée par le bureau de l'ARC.
      </p>
      {annuaire && (
        <div className="bg-green-900/30 border border-green-700/40 rounded-2xl p-4 w-full max-w-sm mb-4">
          <p className="text-green-300 text-xs">✅ Vous serez ajouté à l'annuaire de l'ARC après validation.</p>
        </div>
      )}
      <div className="bg-amber-900/30 border border-amber-700/40 rounded-2xl p-4 w-full max-w-sm mb-6">
        <p className="text-amber-300 text-xs font-bold mb-1">🎉 Rejoignez-nous le 27 juin</p>
        <p className="text-amber-200 text-xs">24ème Réunion Scientifique · Al Akhawayn, Ifrane</p>
      </div>
      <button onClick={onSwitch} className="w-full max-w-sm py-3.5 bg-blue-700 text-white rounded-xl text-sm font-semibold">
        Retour à la connexion
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center pt-8 pb-5 px-8">
        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white mb-3 flex items-center justify-center">
          <Image src="/logo-arc.png" alt="Logo ARC" width={56} height={56} className="object-contain w-full h-full"/>
        </div>
        <p className="text-white text-base font-bold">Rejoindre ARC Néphro</p>
        <div className="flex items-center gap-2 mt-3">
          <div className={`w-10 h-1.5 rounded-full transition-colors ${step>=1?'bg-blue-500':'bg-white/20'}`}></div>
          <div className={`w-10 h-1.5 rounded-full transition-colors ${step>=2?'bg-blue-500':'bg-white/20'}`}></div>
        </div>
        <p className="text-blue-300 text-xs mt-2">{step===1?'Étape 1/2 — Identifiants':'Étape 2/2 — Profil professionnel'}</p>
      </div>

      {/* Form */}
      <div className="flex-1 bg-gray-50 rounded-t-3xl px-5 pt-6 pb-6 overflow-y-auto">
        <form onSubmit={next} className="space-y-3">

          {step===1 && <>
            <div>
              <Lbl t="Email professionnel"/>
              <input className={inp} type="email" placeholder="dr.nom@etablissement.ma" value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div>
              <Lbl t="Mot de passe (min. 8 caractères)"/>
              <input className={inp} type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>
            <div>
              <Lbl t="Confirmer le mot de passe"/>
              <input className={inp} type="password" placeholder="••••••••" value={confirm} onChange={e=>setConfirm(e.target.value)}/>
            </div>
          </>}

          {step===2 && <>
            {/* Titre */}
            <div>
              <Lbl t="Titre *"/>
              <select className={sel} value={titre} onChange={e=>{setTitre(e.target.value);setAutreTitre('');}}>
                <option value="">Choisir...</option>
                {TITRES.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {titre==='Autre' && (
              <div>
                <Lbl t="Précisez votre titre *"/>
                <input className={inp} type="text" placeholder="Ex: Pharmacien, Interne..." value={autretitre} onChange={e=>setAutreTitre(e.target.value)}/>
              </div>
            )}

            {/* Prénom Nom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Lbl t="Prénom *"/>
                <input className={inp} type="text" placeholder="Prénom" value={prenom} onChange={e=>setPrenom(e.target.value)}/>
              </div>
              <div>
                <Lbl t="Nom *"/>
                <input className={inp} type="text" placeholder="Nom" value={nom} onChange={e=>setNom(e.target.value)}/>
              </div>
            </div>

            {/* Secteur */}
            <div>
              <Lbl t="Secteur *"/>
              <div className="grid grid-cols-2 gap-2">
                {SECTEURS.map(s=>(
                  <button key={s} type="button" onClick={()=>setSecteur(s)}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-colors
                      ${secteur===s?'bg-blue-700 text-white border-blue-700':'bg-white text-gray-600 border-gray-200'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Type établissement */}
            <div>
              <Lbl t="Type d'établissement *"/>
              <select className={sel} value={typeEtab} onChange={e=>setTypeEtab(e.target.value)}>
                <option value="">Choisir...</option>
                {ETABLISSEMENTS.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Nom établissement */}
            <div>
              <Lbl t="Nom de l'établissement *"/>
              <input className={inp} type="text" placeholder="Ex: CHU Ibn Rochd, Clinique Al Farabi..." value={nomEtab} onChange={e=>setNomEtab(e.target.value)}/>
            </div>

            {/* Région */}
            <div>
              <Lbl t="Région *"/>
              <select className={sel} value={region} onChange={e=>{setRegion(e.target.value);setVille('');}}>
                <option value="">Choisir une région...</option>
                {Object.keys(REGIONS).map(r=><option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Ville */}
            {region && (
              <div>
                <Lbl t="Ville *"/>
                <select className={sel} value={ville} onChange={e=>setVille(e.target.value)}>
                  <option value="">Choisir une ville...</option>
                  {REGIONS[region]?.map(v=><option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            )}

            {/* Téléphone */}
            <div>
              <Lbl t="Téléphone professionnel *"/>
              <input className={inp} type="tel" placeholder="+212 6 XX XX XX XX" value={phone} onChange={e=>setPhone(e.target.value)}/>
            </div>

            {/* Annuaire */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3 mt-1">
              <input
                type="checkbox"
                id="annuaire"
                checked={annuaire}
                onChange={e=>setAnnuaire(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0"
              />
              <label htmlFor="annuaire" className="text-xs text-gray-700 leading-relaxed cursor-pointer">
                <span className="font-semibold text-blue-700">Rejoindre l'annuaire de l'ARC</span><br/>
                Acceptez d'apparaître dans l'annuaire des membres de l'Association Rénale du Centre (nom, spécialité, établissement, région).
              </label>
            </div>
          </>}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-700">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60">
            {loading?'Envoi en cours...' : step===1?'Continuer →':'Soumettre ma demande'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Déjà membre ?{' '}
            <button onClick={onSwitch} className="text-blue-600 font-semibold">Se connecter</button>
          </p>
        </div>
      </div>
    </div>
  );
}
