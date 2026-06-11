'use client';
import { useState } from 'react';
import ResultBox from './ResultBox';
import { calcCKDEPI, calcCockcroftGault, calcKTV, calcACR, calcOsmolality, type CalcResult } from '@/lib/calculators';

const TABS = [
  {id:'ckdepi',label:'DFGe CKD-EPI'},{id:'cg',label:'Cockcroft-Gault'},
  {id:'ktv',label:'Kt/V'},{id:'acr',label:'ACR'},{id:'osmo',label:'Osmolalité'},
];
const inp = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-400";
const sel = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-400";
function Fld({label,children}:{label:string;children:React.ReactNode}) {
  return <div><label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>{children}</div>;
}

export default function ToolsView({ initialTab }: { initialTab?: string }) {
  const [tab,setTab]=useState(initialTab||'ckdepi');
  const [result,setResult]=useState<CalcResult|null>(null);
  const [ckdCr,setCkdCr]=useState(''); const [ckdAge,setCkdAge]=useState(''); const [ckdSex,setCkdSex]=useState<'M'|'F'>('M');
  const [cgAge,setCgAge]=useState(''); const [cgP,setCgP]=useState(''); const [cgCr,setCgCr]=useState(''); const [cgSex,setCgSex]=useState<'M'|'F'>('M');
  const [kPre,setKPre]=useState(''); const [kPost,setKPost]=useState(''); const [kT,setKT]=useState(''); const [kUf,setKUf]=useState(''); const [kPw,setKPw]=useState('');
  const [aAlb,setAAlb]=useState(''); const [aCr,setACr]=useState('');
  const [oNa,setONa]=useState(''); const [oGl,setOGl]=useState(''); const [oUr,setOUr]=useState('');
  const sw=(t:string)=>{setTab(t);setResult(null);};
  const btn="w-full py-3 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-colors mt-1";
  return (
    <div className="flex-1 overflow-y-auto pb-20 flex flex-col">
      <div className="bg-navy px-5 py-4">
        <p className="text-white font-bold text-base">Outils cliniques</p>
        <p className="text-blue-300 text-xs mt-0.5">Calculateurs néphrologiques validés KDIGO</p>
      </div>
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>sw(t.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors
              ${tab===t.id?'bg-blue-700 text-white border-blue-700':'bg-white text-gray-600 border-gray-200'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="px-4 pb-4 flex-1">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-3">
          {tab==='ckdepi'&&<>
            <p className="text-xs text-gray-400">Formule CKD-EPI 2021 (sans variable race) — NKF/ASN</p>
            <div className="grid grid-cols-2 gap-3">
              <Fld label="Créatinine (mg/dL)"><input className={inp} type="number" placeholder="1.2" step="0.1" value={ckdCr} onChange={e=>setCkdCr(e.target.value)}/></Fld>
              <Fld label="Âge (ans)"><input className={inp} type="number" placeholder="55" value={ckdAge} onChange={e=>setCkdAge(e.target.value)}/></Fld>
            </div>
            <Fld label="Sexe"><select className={sel} value={ckdSex} onChange={e=>setCkdSex(e.target.value as 'M'|'F')}><option value="M">Homme</option><option value="F">Femme</option></select></Fld>
            <button className={btn} onClick={()=>{if(ckdCr&&ckdAge)setResult(calcCKDEPI(+ckdCr,+ckdAge,ckdSex));}}>Calculer le DFGe</button>
          </>}
          {tab==='cg'&&<>
            <div className="grid grid-cols-2 gap-3">
              <Fld label="Âge (ans)"><input className={inp} type="number" placeholder="55" value={cgAge} onChange={e=>setCgAge(e.target.value)}/></Fld>
              <Fld label="Poids (kg)"><input className={inp} type="number" placeholder="70" value={cgP} onChange={e=>setCgP(e.target.value)}/></Fld>
              <Fld label="Créatinine (mg/dL)"><input className={inp} type="number" placeholder="1.2" step="0.1" value={cgCr} onChange={e=>setCgCr(e.target.value)}/></Fld>
              <Fld label="Sexe"><select className={sel} value={cgSex} onChange={e=>setCgSex(e.target.value as 'M'|'F')}><option value="M">Homme</option><option value="F">Femme</option></select></Fld>
            </div>
            <button className={btn} onClick={()=>{if(cgAge&&cgP&&cgCr)setResult(calcCockcroftGault(+cgAge,+cgP,+cgCr,cgSex));}}>Calculer la clairance</button>
          </>}
          {tab==='ktv'&&<>
            <div className="grid grid-cols-2 gap-3">
              <Fld label="Créat pré (mg/dL)"><input className={inp} type="number" placeholder="8.0" step="0.1" value={kPre} onChange={e=>setKPre(e.target.value)}/></Fld>
              <Fld label="Créat post (mg/dL)"><input className={inp} type="number" placeholder="2.5" step="0.1" value={kPost} onChange={e=>setKPost(e.target.value)}/></Fld>
              <Fld label="Durée séance (h)"><input className={inp} type="number" placeholder="4" step="0.5" value={kT} onChange={e=>setKT(e.target.value)}/></Fld>
              <Fld label="UF (litres)"><input className={inp} type="number" placeholder="2.5" step="0.1" value={kUf} onChange={e=>setKUf(e.target.value)}/></Fld>
            </div>
            <Fld label="Poids post-dialyse (kg)"><input className={inp} type="number" placeholder="70" value={kPw} onChange={e=>setKPw(e.target.value)}/></Fld>
            <button className={btn} onClick={()=>{if(kPre&&kPost&&kT&&kUf&&kPw)setResult(calcKTV(+kPre,+kPost,+kT,+kUf,+kPw));}}>Calculer le Kt/V</button>
          </>}
          {tab==='acr'&&<>
            <div className="grid grid-cols-2 gap-3">
              <Fld label="Albumine urinaire (mg/L)"><input className={inp} type="number" placeholder="30" value={aAlb} onChange={e=>setAAlb(e.target.value)}/></Fld>
              <Fld label="Créatinine urinaire (g/L)"><input className={inp} type="number" placeholder="1.0" step="0.1" value={aCr} onChange={e=>setACr(e.target.value)}/></Fld>
            </div>
            <button className={btn} onClick={()=>{if(aAlb&&aCr)setResult(calcACR(+aAlb,+aCr));}}>Calculer l'ACR</button>
          </>}
          {tab==='osmo'&&<>
            <div className="grid grid-cols-2 gap-3">
              <Fld label="Natrémie (mmol/L)"><input className={inp} type="number" placeholder="140" value={oNa} onChange={e=>setONa(e.target.value)}/></Fld>
              <Fld label="Glycémie (mmol/L)"><input className={inp} type="number" placeholder="5.5" step="0.1" value={oGl} onChange={e=>setOGl(e.target.value)}/></Fld>
            </div>
            <Fld label="Urée (mmol/L)"><input className={inp} type="number" placeholder="7.0" step="0.1" value={oUr} onChange={e=>setOUr(e.target.value)}/></Fld>
            <button className={btn} onClick={()=>{if(oNa&&oGl&&oUr)setResult(calcOsmolality(+oNa,+oGl,+oUr));}}>Calculer l'osmolalité</button>
          </>}
        </div>
        {result&&<ResultBox result={result}/>}
      </div>
    </div>
  );
}
