# orthomobile-v220
"MVP Orthomobile – plateforme de télé-orthophonie"
# Ortomobile 🚀  

**Ortomobile** est une plateforme innovante de télé-orthophonie permettant , aux parents et aux orthophonistes de collaborer facilement.  

## 🎯 Objectifs  
- Offrir un accès simplifié aux séances d’orthophonie pour tous les enfants.  
- Garantir un suivi sécurisé et conforme (confidentialité, consentement).  
- Faciliter la coordination entre **parents**, **orthophonistes** .  

## ✨ Fonctionnalités principales  
- 🔐 Authentification sécurisée (parents, orthophonistes, écoles).  
- 📅 Agenda partagé avec prise de RDV et paiement en ligne.  
- 🎥 Visioconférence intégrée (Jitsi).  
- 📄 Génération et partage de rapports PDF et factures.  
- 📊 Tableau de bord orthophoniste (finances, export CSV).  
- 🏫 Dashboard école (agenda élèves, documents partagés).  

## 🛠️ Stack technique  
- **Next.js 14** (React, TypeScript, TailwindCSS).  
- **Supabase** (Base de données, Auth, Storage, RLS).  
- **Stripe** (paiements).  
- **Resend** (emails transactionnels).  

## ⚙️ Installation locale  
```bash
# Cloner le repo
git clone https://github.com/TON_USER/ortomobile.git
cd ortomobile

# Installer les dépendances
pnpm install

# Lancer le projet en local
pnpm dev

