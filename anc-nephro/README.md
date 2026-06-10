# ANC Néphro Centre — Application Mobile

Application officielle de l'Association des Néphrologues du Centre (Maroc).

## Fonctionnalités

- 🧮 **Calculateurs cliniques** : DFGe CKD-EPI 2021, Cockcroft-Gault, Kt/V Daugirdas II, ACR, Osmolalité
- 📅 **Agenda** : Événements, réunions, congrès, webinaires
- 📰 **News** : Actualités scientifiques et institutionnelles
- 🤖 **KiliA** : Assistant IA spécialisé en néphrologie (propulsé par Claude)
- 👤 **Profil** : Fiche membre ANC
- 📱 **PWA** : Installable sur iOS et Android

---

## Déploiement rapide sur Vercel (recommandé)

### Étape 1 — Prérequis
- Compte [GitHub](https://github.com) (gratuit)
- Compte [Vercel](https://vercel.com) (gratuit)
- Clé API Anthropic : [console.anthropic.com](https://console.anthropic.com)

### Étape 2 — Mettre le code sur GitHub

```bash
# Dans le dossier du projet
git init
git add .
git commit -m "Initial commit — ANC Néphro Centre v1.0"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/anc-nephro.git
git push -u origin main
```

### Étape 3 — Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com) → "New Project"
2. Importez votre repo GitHub `anc-nephro`
3. Dans **Environment Variables**, ajoutez :
   - `ANTHROPIC_API_KEY` = `sk-ant-VOTRE_CLE`
4. Cliquez **Deploy**

✅ Votre app est en ligne en ~2 minutes sur `anc-nephro.vercel.app`

### Étape 4 — Domaine personnalisé (optionnel)
Dans Vercel → Settings → Domains → ajoutez `anc-nephro.ma`

---

## Développement local

```bash
# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env.local
# Éditez .env.local et ajoutez votre clé ANTHROPIC_API_KEY

# Lancer en développement
npm run dev
# → http://localhost:3000
```

---

## Installer l'app sur mobile (PWA)

### Sur iPhone (Safari)
1. Ouvrez l'URL dans Safari
2. Appuyez sur le bouton **Partager** (carré avec flèche)
3. **"Sur l'écran d'accueil"**
4. L'app apparaît comme une vraie app native

### Sur Android (Chrome)
1. Ouvrez l'URL dans Chrome
2. Menu (⋮) → **"Ajouter à l'écran d'accueil"**
3. L'app s'installe automatiquement

---

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| IA (KiliA) | API Anthropic Claude Sonnet |
| Hébergement | Vercel |
| PWA | Web App Manifest + meta tags |

---

## Roadmap

- [ ] Phase 2 : Authentification membres (Supabase)
- [ ] Phase 2 : Agenda collaboratif temps réel
- [ ] Phase 2 : Panel admin bureau ANC
- [ ] Phase 3 : Publication Google Play Store
- [ ] Phase 3 : Publication Apple App Store
- [ ] Phase 4 : Messagerie entre membres
- [ ] Phase 4 : Bibliothèque de ressources

---

## Contact

Association des Néphrologues du Centre  
contact@anc-nephro.ma
"# ARC Nephro v1.1" 
