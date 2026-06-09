'use client';
import { useState } from 'react';
import ResultBox from './ResultBox';
import { calcCKDEPI, calcCockcroftGault, calcKTV, calcACR, calcOsmolality, type CalcResult } from '@/lib/calculators';

const TABS = [
  { id: 'ckdepi', label: 'DFGe CKD-EPI' },
  { id: 'cg',     label: 'Cockcroft-Gault' },
  { id: 'ktv',    label: 'Kt/V' },
  { id: 'acr',    label: 'ACR' },
  { id: 'osmo',   label: 'Osmolalité' },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 font-medium mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-brand";
const selectCls = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-brand";

export default function ToolsView({ initialTab }: { initialTab?: string }) {
  const [tab, setTab] = useState(initialTab || 'ckdepi');
  const [result, setResult] = useState<CalcResult | null>(null);

  // CKD-EPI state
  const [ckdCr, setCkdCr] = useState('');
  const [ckdAge, setCkdAge] = useState('');
  const [ckdSex, setCkdSex] = useState<'M' | 'F'>('M');

  // CG state
  const [cgAge, setCgAge] = useState('');
  const [cgPoids, setCgPoids] = useState('');
  const [cgCr, setCgCr] = useState('');
  const [cgSex, setCgSex] = useState<'M' | 'F'>('M');

  // KTV state
  const [ktvPre, setKtvPre] = useState('');
  const [ktvPost, setKtvPost] = useState('');
  const [ktvT, setKtvT] = useState('');
  const [ktvUf, setKtvUf] = useState('');
  const [ktvPoids, setKtvPoids] = useState('');

  // ACR state
  const [acrAlb, setAcrAlb] = useState('');
  const [acrCr, setAcrCr] = useState('');

  // Osmo state
  const [osmoNa, setOsmoNa] = useState('');
  const [osmoGlu, setOsmoGlu] = useState('');
  const [osmoUrea, setOsmoUrea] = useState('');

  const switchTab = (t: string) => { setTab(t); setResult(null); };

  const btnCls = "w-full py-3 bg-brand-dark text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors mt-1";

  return (
    <div className="flex-1 overflow-y-auto pb-20 flex flex-col">
      <div className="bg-navy px-5 py-4">
        <p className="text-white font-bold text-base">Outils cliniques</p>
        <p className="text-blue-300 text-xs mt-0.5">Calculateurs néphrologiques validés KDIGO</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {TABS.map(t => (
          <button key={t.id} onClick={() => switchTab(t.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border
              ${tab === t.id ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-600 border-gray-200'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4 flex-1">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-3">

          {/* CKD-EPI */}
          {tab === 'ckdepi' && (
            <>
              <p className="text-xs text-gray-400">Formule CKD-EPI 2021 (sans variable race) — NKF/ASN</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Créatinine sérique (mg/dL)">
                  <input className={inputCls} type="number" placeholder="ex: 1.2" step="0.1" min="0.1" value={ckdCr} onChange={e => setCkdCr(e.target.value)} />
                </Field>
                <Field label="Âge (ans)">
                  <input className={inputCls} type="number" placeholder="ex: 55" min="18" max="100" value={ckdAge} onChange={e => setCkdAge(e.target.value)} />
                </Field>
              </div>
              <Field label="Sexe">
                <select className={selectCls} value={ckdSex} onChange={e => setCkdSex(e.target.value as 'M' | 'F')}>
                  <option value="M">Homme</option>
                  <option value="F">Femme</option>
                </select>
              </Field>
              <button className={btnCls} onClick={() => {
                if (!ckdCr || !ckdAge) return;
                setResult(calcCKDEPI(+ckdCr, +ckdAge, ckdSex));
              }}>Calculer le DFGe</button>
            </>
          )}

          {/* Cockcroft-Gault */}
          {tab === 'cg' && (
            <>
              <p className="text-xs text-gray-400">Clairance de la créatinine — dosage médicamenteux</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Âge (ans)"><input className={inputCls} type="number" placeholder="55" value={cgAge} onChange={e => setCgAge(e.target.value)} /></Field>
                <Field label="Poids (kg)"><input className={inputCls} type="number" placeholder="70" value={cgPoids} onChange={e => setCgPoids(e.target.value)} /></Field>
                <Field label="Créatinine (mg/dL)"><input className={inputCls} type="number" placeholder="1.2" step="0.1" value={cgCr} onChange={e => setCgCr(e.target.value)} /></Field>
                <Field label="Sexe">
                  <select className={selectCls} value={cgSex} onChange={e => setCgSex(e.target.value as 'M' | 'F')}>
                    <option value="M">Homme</option><option value="F">Femme</option>
                  </select>
                </Field>
              </div>
              <button className={btnCls} onClick={() => {
                if (!cgAge || !cgPoids || !cgCr) return;
                setResult(calcCockcroftGault(+cgAge, +cgPoids, +cgCr, cgSex));
              }}>Calculer la clairance</button>
            </>
          )}

          {/* Kt/V */}
          {tab === 'ktv' && (
            <>
              <p className="text-xs text-gray-400">Dose de dialyse — Formule de Daugirdas II</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Créat pré-dialyse (mg/dL)"><input className={inputCls} type="number" placeholder="8.0" step="0.1" value={ktvPre} onChange={e => setKtvPre(e.target.value)} /></Field>
                <Field label="Créat post-dialyse (mg/dL)"><input className={inputCls} type="number" placeholder="2.5" step="0.1" value={ktvPost} onChange={e => setKtvPost(e.target.value)} /></Field>
                <Field label="Durée séance (h)"><input className={inputCls} type="number" placeholder="4" step="0.5" value={ktvT} onChange={e => setKtvT(e.target.value)} /></Field>
                <Field label="UF (litres)"><input className={inputCls} type="number" placeholder="2.5" step="0.1" value={ktvUf} onChange={e => setKtvUf(e.target.value)} /></Field>
              </div>
              <Field label="Poids post-dialyse (kg)"><input className={inputCls} type="number" placeholder="70" value={ktvPoids} onChange={e => setKtvPoids(e.target.value)} /></Field>
              <button className={btnCls} onClick={() => {
                if (!ktvPre || !ktvPost || !ktvT || !ktvUf || !ktvPoids) return;
                setResult(calcKTV(+ktvPre, +ktvPost, +ktvT, +ktvUf, +ktvPoids));
              }}>Calculer le Kt/V</button>
            </>
          )}

          {/* ACR */}
          {tab === 'acr' && (
            <>
              <p className="text-xs text-gray-400">Rapport Albumine/Créatinine urinaire — KDIGO 2024</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Albumine urinaire (mg/L)"><input className={inputCls} type="number" placeholder="30" value={acrAlb} onChange={e => setAcrAlb(e.target.value)} /></Field>
                <Field label="Créatinine urinaire (g/L)"><input className={inputCls} type="number" placeholder="1.0" step="0.1" value={acrCr} onChange={e => setAcrCr(e.target.value)} /></Field>
              </div>
              <button className={btnCls} onClick={() => {
                if (!acrAlb || !acrCr) return;
                setResult(calcACR(+acrAlb, +acrCr));
              }}>Calculer l'ACR</button>
            </>
          )}

          {/* Osmolalité */}
          {tab === 'osmo' && (
            <>
              <p className="text-xs text-gray-400">Osmolalité plasmatique calculée</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Natrémie (mmol/L)"><input className={inputCls} type="number" placeholder="140" value={osmoNa} onChange={e => setOsmoNa(e.target.value)} /></Field>
                <Field label="Glycémie (mmol/L)"><input className={inputCls} type="number" placeholder="5.5" step="0.1" value={osmoGlu} onChange={e => setOsmoGlu(e.target.value)} /></Field>
              </div>
              <Field label="Urée (mmol/L)"><input className={inputCls} type="number" placeholder="7.0" step="0.1" value={osmoUrea} onChange={e => setOsmoUrea(e.target.value)} /></Field>
              <button className={btnCls} onClick={() => {
                if (!osmoNa || !osmoGlu || !osmoUrea) return;
                setResult(calcOsmolality(+osmoNa, +osmoGlu, +osmoUrea));
              }}>Calculer l'osmolalité</button>
            </>
          )}
        </div>

        {result && <ResultBox result={result} />}
      </div>
    </div>
  );
}
