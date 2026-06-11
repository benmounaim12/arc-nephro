'use client';
import { useState, useRef, useEffect } from 'react';
import ResultBox from './ResultBox';
import { calcCKDEPI, calcCockcroftGault, calcKTV, calcACR, type CalcResult } from '@/lib/calculators';

type Msg = { role:'user'|'assistant'; content:string; calcResult?:CalcResult; formType?:string; };
const SUGS = [
  {l:'🧮 DFGe CKD-EPI', m:'Calculer le DFGe CKD-EPI'},
  {l:'⚗️ Cockcroft-Gault', m:'Clairance Cockcroft-Gault'},
  {l:'💧 Kt/V dialyse', m:'Calculer le Kt/V'},
  {l:'📊 ACR urinaire', m:'Calculer ACR urinaire'},
  {l:'📋 Stades MRC', m:'Explique les stades MRC KDIGO'},
  {l:'💊 Ajust. dose', m:'Ajustement de dose selon DFGe'},
];

function detect(msg:string):string|null {
  const m=msg.toLowerCase();
  if(m.includes('dfge')||m.includes('ckd')||m.includes('filtration')) return 'ckdepi';
  if(m.includes('cockcroft')||m.includes('clairance')) return 'cg';
  if(m.includes('kt/v')||m.includes('ktv')||m.includes('dialyse')) return 'ktv';
  if(m.includes('acr')||m.includes('albumine')) return 'acr';
  return null;
}

function CalcForm({type,onResult}:{type:string;onResult:(r:CalcResult,s:string)=>void}) {
  const [cr,setCr]=useState(''); const [age,setAge]=useState(''); const [sex,setSex]=useState<'M'|'F'>('M');
  const [p,setP]=useState('');
  const [pre,setPre]=useState(''); const [post,setPost]=useState(''); const [t,setT]=useState(''); const [uf,setUf]=useState(''); const [kp,setKp]=useState('');
  const [alb,setAlb]=useState(''); const [ac,setAc]=useState('');
  const inp="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white focus:outline-none focus:border-blue-400";
  const sel="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white";
  const submit=()=>{
    if(type==='ckdepi'&&cr&&age) onResult(calcCKDEPI(+cr,+age,sex),`DFGe · Cr:${cr} Âge:${age} ${sex}`);
    else if(type==='cg'&&age&&p&&cr) onResult(calcCockcroftGault(+age,+p,+cr,sex),`Cockcroft · Âge:${age} P:${p}kg Cr:${cr}`);
    else if(type==='ktv'&&pre&&post&&t&&uf&&kp) onResult(calcKTV(+pre,+post,+t,+uf,+kp),`Kt/V · Pré:${pre} Post:${post} t:${t}h`);
    else if(type==='acr'&&alb&&ac) onResult(calcACR(+alb,+ac),`ACR · Alb:${alb} Créat:${ac}`);
  };
  return (
    <div className="bg-gray-50 rounded-xl p-3 mt-2 border border-gray-100 space-y-2">
      {type==='ckdepi'&&<><div className="grid grid-cols-2 gap-2">
        <div><p className="text-xs text-gray-500 mb-1">Créatinine (mg/dL)</p><input className={inp} type="number" placeholder="1.2" step="0.1" value={cr} onChange={e=>setCr(e.target.value)}/></div>
        <div><p className="text-xs text-gray-500 mb-1">Âge (ans)</p><input className={inp} type="number" placeholder="55" value={age} onChange={e=>setAge(e.target.value)}/></div>
      </div><div><p className="text-xs text-gray-500 mb-1">Sexe</p><select className={sel} value={sex} onChange={e=>setSex(e.target.value as 'M'|'F')}><option value="M">Homme</option><option value="F">Femme</option></select></div></>}
      {type==='cg'&&<><div className="grid grid-cols-2 gap-2">
        <div><p className="text-xs text-gray-500 mb-1">Âge</p><input className={inp} type="number" placeholder="55" value={age} onChange={e=>setAge(e.target.value)}/></div>
        <div><p className="text-xs text-gray-500 mb-1">Poids (kg)</p><input className={inp} type="number" placeholder="70" value={p} onChange={e=>setP(e.target.value)}/></div>
        <div><p className="text-xs text-gray-500 mb-1">Créatinine (mg/dL)</p><input className={inp} type="number" placeholder="1.2" step="0.1" value={cr} onChange={e=>setCr(e.target.value)}/></div>
        <div><p className="text-xs text-gray-500 mb-1">Sexe</p><select className={sel} value={sex} onChange={e=>setSex(e.target.value as 'M'|'F')}><option value="M">Homme</option><option value="F">Femme</option></select></div>
      </div></>}
      {type==='ktv'&&<><div className="grid grid-cols-2 gap-2">
        <div><p className="text-xs text-gray-500 mb-1">Créat pré (mg/dL)</p><input className={inp} type="number" placeholder="8.0" step="0.1" value={pre} onChange={e=>setPre(e.target.value)}/></div>
        <div><p className="text-xs text-gray-500 mb-1">Créat post (mg/dL)</p><input className={inp} type="number" placeholder="2.5" step="0.1" value={post} onChange={e=>setPost(e.target.value)}/></div>
        <div><p className="text-xs text-gray-500 mb-1">Durée (h)</p><input className={inp} type="number" placeholder="4" step="0.5" value={t} onChange={e=>setT(e.target.value)}/></div>
        <div><p className="text-xs text-gray-500 mb-1">UF (L)</p><input className={inp} type="number" placeholder="2.5" step="0.1" value={uf} onChange={e=>setUf(e.target.value)}/></div>
      </div><div><p className="text-xs text-gray-500 mb-1">Poids post-dialyse (kg)</p><input className={inp} type="number" placeholder="70" value={kp} onChange={e=>setKp(e.target.value)}/></div></>}
      {type==='acr'&&<div className="grid grid-cols-2 gap-2">
        <div><p className="text-xs text-gray-500 mb-1">Albumine (mg/L)</p><input className={inp} type="number" placeholder="30" value={alb} onChange={e=>setAlb(e.target.value)}/></div>
        <div><p className="text-xs text-gray-500 mb-1">Créatinine urinaire (g/L)</p><input className={inp} type="number" placeholder="1.0" step="0.1" value={ac} onChange={e=>setAc(e.target.value)}/></div>
      </div>}
      <button onClick={submit} className="w-full py-2 bg-blue-700 text-white rounded-lg text-xs font-semibold hover:bg-blue-800 transition-colors">Calculer →</button>
    </div>
  );
}

export default function KiliaView() {
  const [msgs,setMsgs]=useState<Msg[]>([]);
  const [input,setInput]=useState('');
  const [loading,setLoading]=useState(false);
  const [showSugs,setShowSugs]=useState(true);
  const [pendingForm,setPendingForm]=useState<string|null>(null);
  const bottomRef=useRef<HTMLDivElement>(null);
  const history=useRef<{role:string;content:string}[]>([]);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:'smooth'});},[msgs,loading]);

  const push=(msg:Msg)=>setMsgs(p=>[...p,msg]);

  const handleFormResult=(r:CalcResult,summary:string)=>{
    setPendingForm(null);
    push({role:'user',content:summary});
    push({role:'assistant',content:'',calcResult:r});
    history.current.push({role:'user',content:summary});
    history.current.push({role:'assistant',content:`${r.value} ${r.unit} — ${r.stage}`});
  };

  const send=async(text?:string)=>{
    const msg=(text??input).trim(); if(!msg||loading) return;
    setInput(''); setShowSugs(false);
    const calc=detect(msg);
    push({role:'user',content:msg});
    history.current.push({role:'user',content:msg});
    if(calc){setPendingForm(calc);return;}
    setLoading(true);
    try {
      const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history.current.slice(-14)})});
      const data=await res.json();
      push({role:'assistant',content:data.text});
      history.current.push({role:'assistant',content:data.text});
    } catch { push({role:'assistant',content:'Connexion temporairement indisponible.'}); }
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-navy px-5 py-3 flex items-center gap-3 flex-shrink-0">
        <div className="relative">
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-base">K</div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-navy"></div>
        </div>
        <div>
          <p className="text-white font-bold text-sm">KiliA</p>
          <p className="text-blue-300 text-xs">Assistant IA · Spécialiste Néphrologie · ARC</p>
        </div>
        <span className="ml-auto bg-green-900/40 text-green-300 border border-green-700/40 rounded-full px-2 py-0.5 text-xs font-semibold">● IA Active</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
        <div className="flex flex-col max-w-[90%]">
          <p className="text-xs text-blue-500 font-semibold mb-1">✦ KiliA</p>
          <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3 text-xs text-gray-800 leading-relaxed">
            Bonjour 👋 Je suis <strong>KiliA</strong>, votre assistant IA intégré dans <strong>ARC Néphro</strong>.<br/><br/>
            Je calcule le DFGe, Kt/V, ACR et réponds à vos questions cliniques selon les recommandations KDIGO.
          </div>
        </div>
        {showSugs&&<div className="flex flex-wrap gap-1.5">{SUGS.map(s=><button key={s.m} onClick={()=>send(s.m)} className="bg-white border border-blue-100 rounded-full px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 transition-colors">{s.l}</button>)}</div>}
        {msgs.map((m,i)=>(
          <div key={i} className={`flex flex-col ${m.role==='user'?'items-end':'items-start max-w-[92%]'}`}>
            {m.role==='assistant'&&<p className="text-xs text-blue-500 font-semibold mb-1">✦ KiliA</p>}
            {m.calcResult ? <div className="w-full"><ResultBox result={m.calcResult}/></div>
            : <div className={`rounded-2xl px-3 py-2 text-xs leading-relaxed ${m.role==='user'?'bg-blue-700 text-white rounded-tr-sm':'bg-white border border-gray-100 rounded-tl-sm text-gray-800'}`}>{m.content}</div>}
          </div>
        ))}
        {pendingForm&&(
          <div className="flex flex-col max-w-[92%]">
            <p className="text-xs text-blue-500 font-semibold mb-1">✦ KiliA</p>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3 text-xs text-gray-800">
              Voici le formulaire :
              <CalcForm type={pendingForm} onResult={handleFormResult}/>
            </div>
          </div>
        )}
        {loading&&(
          <div className="flex flex-col max-w-[88%]">
            <p className="text-xs text-blue-500 font-semibold mb-1">✦ KiliA</p>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-3 flex gap-1 items-center">
              {[0,1,2].map(i=><span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}}></span>)}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
        <input className="flex-1 border border-gray-200 rounded-2xl px-4 py-2 text-xs text-gray-900 bg-gray-50 focus:outline-none focus:border-blue-400"
          placeholder="Posez votre question clinique..." value={input}
          onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}/>
        <button onClick={()=>send()} className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors flex-shrink-0">➤</button>
      </div>
    </div>
  );
}
