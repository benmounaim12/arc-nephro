export type MRCStage = 'G1' | 'G2' | 'G3a' | 'G3b' | 'G4' | 'G5';
export type Severity = 'ok' | 'warn' | 'danger';

export interface CalcResult {
  value: number;
  unit: string;
  stage: string;
  severity: Severity;
  note: string;
}

export function calcCKDEPI(creatinine: number, age: number, sex: 'M' | 'F'): CalcResult {
  const k = sex === 'F' ? 0.7 : 0.9;
  const a = sex === 'F' ? -0.241 : -0.302;
  const sexFactor = sex === 'F' ? 1.012 : 1.0;
  const ratio = creatinine / k;
  const dfge = Math.round(
    142 * Math.pow(Math.min(ratio, 1), a) * Math.pow(Math.max(ratio, 1), -1.2) * Math.pow(0.9938, age) * sexFactor
  );

  let stage: string, severity: Severity, note: string;
  if (dfge >= 90)      { stage = 'MRC G1 (≥ 90)';    severity = 'ok';     note = 'Fonction rénale normale ou légèrement diminuée.' }
  else if (dfge >= 60) { stage = 'MRC G2 (60–89)';   severity = 'ok';     note = 'Diminution légère — surveiller les facteurs de risque.' }
  else if (dfge >= 45) { stage = 'MRC G3a (45–59)';  severity = 'warn';   note = 'Diminution légère à modérée — consultation spécialisée recommandée.' }
  else if (dfge >= 30) { stage = 'MRC G3b (30–44)';  severity = 'warn';   note = 'Diminution modérée — suivi néphrologue régulier.' }
  else if (dfge >= 15) { stage = 'MRC G4 (15–29)';   severity = 'danger'; note = 'Diminution sévère — préparer la suppléance rénale.' }
  else                  { stage = 'MRC G5 (< 15)';    severity = 'danger'; note = 'IRT — dialyse ou transplantation indiquée.' }

  return { value: dfge, unit: 'mL/min/1,73 m²', stage, severity, note };
}

export function calcCockcroftGault(age: number, weight: number, creatinine: number, sex: 'M' | 'F'): CalcResult {
  let val = ((140 - age) * weight) / (72 * creatinine);
  if (sex === 'F') val *= 0.85;
  const cl = Math.round(val);

  let stage: string, severity: Severity, note: string;
  if (cl >= 60)      { stage = 'Normale / légèrement réduite'; severity = 'ok';     note = 'Pas d\'ajustement médicamenteux requis en général.' }
  else if (cl >= 30) { stage = 'Modérément réduite';           severity = 'warn';   note = 'Ajustement de dose requis pour les médicaments à élimination rénale.' }
  else               { stage = 'Sévèrement réduite';           severity = 'danger'; note = 'Contre-indication pour de nombreux médicaments — prudence maximale.' }

  return { value: cl, unit: 'mL/min', stage, severity, note };
}

export function calcKTV(preDial: number, postDial: number, duration: number, uf: number, weight: number): CalcResult {
  const R = postDial / preDial;
  const val = -Math.log(R - 0.008 * duration) + (4 - 3.5 * R) * (uf / weight);
  const ktv = Math.round(val * 100) / 100;

  let stage: string, severity: Severity, note: string;
  if (ktv >= 1.2)     { stage = 'Adéquat ≥ 1.2 ✓';    severity = 'ok';     note = 'Dose de dialyse conforme aux recommandations KDOQI.' }
  else if (ktv >= 1.0){ stage = 'Limite (1.0–1.19)';   severity = 'warn';   note = 'Dose sous-optimale — allonger la durée ou augmenter le débit sanguin.' }
  else                 { stage = 'Insuffisant < 1.0 ✗'; severity = 'danger'; note = 'Révision urgente du schéma de dialyse recommandée.' }

  return { value: ktv, unit: '(Daugirdas II)', stage, severity, note };
}

export function calcACR(albumin: number, creatinine: number): CalcResult {
  const acr = Math.round(albumin / (creatinine / 10));

  let stage: string, severity: Severity, note: string;
  if (acr < 30)       { stage = 'A1 — Normale (< 30 mg/g)';         severity = 'ok';     note = 'Pas d\'albuminurie significative selon KDIGO.' }
  else if (acr < 300) { stage = 'A2 — Modérée (30–299 mg/g)';       severity = 'warn';   note = 'Microalbuminurie — facteur de risque de progression MRC.' }
  else                 { stage = 'A3 — Très élevée (≥ 300 mg/g)';   severity = 'danger'; note = 'Macroalbuminurie — traitement néphroprotecteur recommandé.' }

  return { value: acr, unit: 'mg/g', stage, severity, note };
}

export function calcOsmolality(sodium: number, glucose: number, urea: number): CalcResult {
  const val = Math.round(2 * sodium + glucose / 0.18 + urea / 0.28);
  let stage: string, severity: Severity, note: string;
  if (val < 275)      { stage = 'Hypo-osmolalité (< 275)'; severity = 'warn';   note = 'Hypo-osmolalité — bilan étiologique recommandé.' }
  else if (val <= 295){ stage = 'Normale (275–295)';        severity = 'ok';     note = 'Osmolalité plasmatique dans les limites normales.' }
  else                 { stage = 'Hyperosmolalité (> 295)'; severity = 'warn';   note = 'Hyperosmolalité — évaluer l\'état d\'hydratation.' }
  return { value: val, unit: 'mOsm/kg', stage, severity, note };
}
