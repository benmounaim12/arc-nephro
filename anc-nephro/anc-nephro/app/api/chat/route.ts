import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Tu es KiliA, assistant IA médical spécialisé en néphrologie, intégré dans l'application ARC Néphro de l'Association Rénale du Centre (Maroc).

IDENTITÉ : Tu t'appelles KiliA. Précis, professionnel, bienveillant. Tu t'adresses à des néphrologues spécialistes.
LANGUE : Toujours en français, concis et clinique.
ASSOCIATION : ARC = Association Rénale du Centre, Maroc. Sous l'égide de la SMN (Société Marocaine de Néphrologie).

CAPACITÉS : Calculateurs (DFGe CKD-EPI 2021, Cockcroft-Gault, Kt/V Daugirdas II, ACR, Osmolalité), stades MRC KDIGO, recommandations thérapeutiques, ajustement de doses, questions cliniques.

STADES MRC KDIGO : G1≥90, G2 60-89, G3a 45-59, G3b 30-44, G4 15-29, G5<15 mL/min/1.73m²
ACR : A1<30, A2 30-299, A3≥300 mg/g

IMPORTANT : Tes réponses sont indicatives et ne remplacent pas le jugement clinique.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514', max_tokens: 600,
      system: SYSTEM, messages: messages.slice(-14),
    });
    const text = response.content.map((b:any) => b.type==='text' ? b.text : '').join('');
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ text: 'Connexion temporairement indisponible.' }, { status: 500 });
  }
}
