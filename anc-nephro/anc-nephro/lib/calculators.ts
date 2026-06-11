export type Severity = 'ok' | 'warn' | 'danger';
export interface CalcResult { value: number; unit: string; stage: string; severity: Severity; note: string; }

export function calcCKDEPI(cr: number, age: number, sex: 'M'|'F'): CalcResult {
  const k=sex==='F'?0.7:0.9, a=sex==='F'?-0.241:-0.302, sf=sex==='F'?1.012:1;
  const r=cr/k;
  const v=Math.round(142*Math.pow(Math.min(r,1),a)*Math.pow(Math.max(r,1),-1.2)*Math.pow(0.9938,age)*sf);
  let stage:string, severity:Severity, note:string;
  if(v>=90){stage='MRC G1 (≥ 90)';severity='ok';note='Fonction rénale normale ou légèrement diminuée.'}
  else if(v>=60){stage='MRC G2 (60–89)';severity='ok';note='Diminution légère — surveiller les facteurs de risque.'}
  else if(v>=45){stage='MRC G3a (45–59)';severity='warn';note='Diminution légère à modérée — consultation spécialisée recommandée.'}
  else if(v>=30){stage='MRC G3b (30–44)';severity='warn';note='Diminution modérée — suivi néphrologue régulier.'}
  else if(v>=15){stage='MRC G4 (15–29)';severity='danger';note='Diminution sévère — préparer la suppléance rénale.'}
  else{stage='MRC G5 (< 15)';severity='danger';note='IRT — dialyse ou transplantation indiquée.'}
  return {value:v, unit:'mL/min/1,73 m²', stage, severity, note};
}

export function calcCockcroftGault(age:number, weight:number, cr:number, sex:'M'|'F'): CalcResult {
  let v=((140-age)*weight)/(72*cr); if(sex==='F') v*=0.85; v=Math.round(v);
  let stage:string, severity:Severity, note:string;
  if(v>=60){stage='Normale / légèrement réduite';severity='ok';note='Ajustement médicamenteux non requis en général.'}
  else if(v>=30){stage='Modérément réduite';severity='warn';note='Ajustement de dose requis pour les médicaments à élimination rénale.'}
  else{stage='Sévèrement réduite';severity='danger';note='Contre-indication pour de nombreux médicaments.'}
  return {value:v, unit:'mL/min', stage, severity, note};
}

export function calcKTV(pre:number, post:number, t:number, uf:number, w:number): CalcResult {
  const R=post/pre, v=-Math.log(R-0.008*t)+(4-3.5*R)*(uf/w);
  const val=Math.round(v*100)/100;
  let stage:string, severity:Severity, note:string;
  if(val>=1.2){stage='Adéquat ≥ 1.2 ✓';severity='ok';note='Dose de dialyse conforme aux recommandations KDOQI.'}
  else if(val>=1.0){stage='Limite (1.0–1.19)';severity='warn';note='Dose sous-optimale — allonger la durée ou augmenter le débit.'}
  else{stage='Insuffisant < 1.0 ✗';severity='danger';note='Révision urgente du schéma de dialyse recommandée.'}
  return {value:val, unit:'Daugirdas II', stage, severity, note};
}

export function calcACR(alb:number, cr:number): CalcResult {
  const v=Math.round(alb/(cr/10));
  let stage:string, severity:Severity, note:string;
  if(v<30){stage='A1 — Normale (< 30 mg/g)';severity='ok';note='Pas d\'albuminurie significative selon KDIGO.'}
  else if(v<300){stage='A2 — Modérée (30–299 mg/g)';severity='warn';note='Microalbuminurie — facteur de risque de progression MRC.'}
  else{stage='A3 — Très élevée (≥ 300 mg/g)';severity='danger';note='Macroalbuminurie — traitement néphroprotecteur recommandé.'}
  return {value:v, unit:'mg/g', stage, severity, note};
}

export function calcOsmolality(na:number, glu:number, urea:number): CalcResult {
  const v=Math.round(2*na+glu/0.18+urea/0.28);
  let stage:string, severity:Severity, note:string;
  if(v<275){stage='Hypo-osmolalité (< 275)';severity='warn';note='Bilan étiologique recommandé.'}
  else if(v<=295){stage='Normale (275–295)';severity='ok';note='Osmolalité plasmatique dans les limites normales.'}
  else{stage='Hyperosmolalité (> 295)';severity='warn';note='Évaluer l\'état d\'hydratation.'}
  return {value:v, unit:'mOsm/kg', stage, severity, note};
}
