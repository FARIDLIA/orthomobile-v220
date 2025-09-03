# Orthomobile v2.20

Orthomobile est une application web moderne développée avec Next.js, conçue pour fournir des services orthodontiques numériques. Cette plateforme offre une interface utilisateur intuitive pour la gestion des traitements orthodontiques et l'interaction avec les patients.

## Description

Orthomobile v2.20 est une solution complète qui intègre :
- Interface utilisateur moderne et responsive
- Intégration avec Supabase pour la gestion des données
- Service d'email avec Resend
- Génération de PDF pour les rapports
- Configuration optimisée pour le déploiement statique

## Installation

### Prérequis
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Installation des dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### Configuration de l'environnement

1. Copiez le fichier `.env` et configurez vos variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL` : URL de votre instance Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Clé publique Supabase
   - `RESEND_API_KEY` : Clé API pour le service d'email Resend
   - `DOCS_SECRET_CODE` : Code d'accès pour la documentation privée

## Démarrage

### Développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

### Production

```bash
npm run build
npm run start
```

## Déploiement sur Vercel

### Déploiement automatique

1. Connectez votre repository GitHub à [Vercel](https://vercel.com)
2. Importez le projet dans Vercel
3. Configurez les variables d'environnement dans les paramètres Vercel
4. Déployez automatiquement à chaque push sur la branche principale

### Déploiement manuel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Pour le déploiement en production
vercel --prod
```

### Variables d'environnement Vercel

Assurez-vous de configurer ces variables dans les paramètres de votre projet Vercel :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `RESEND_API_KEY`
- `DOCS_SECRET_CODE`

## Technologies utilisées

- **Next.js 14** - Framework React avec rendu côté serveur
- **TypeScript** - Langage typé pour JavaScript
- **Tailwind CSS** - Framework CSS utilitaire
- **Supabase** - Backend-as-a-Service pour la base de données
- **Resend** - Service d'envoi d'emails
- **jsPDF** - Génération de documents PDF

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run start` - Lance l'application en mode production
- `npm run lint` - Exécute ESLint pour vérifier le code

## Structure du projet

```
orthomobile-v220/
├── app/                 # Pages et composants Next.js App Router
├── components/          # Composants réutilisables
├── libs/               # Utilitaires et configurations
├── public/             # Fichiers statiques
├── .env                # Variables d'environnement (ignoré par git)
├── next.config.js      # Configuration Next.js
└── tailwind.config.js  # Configuration Tailwind CSS
```

## Contribuer

1. Forkez le repository
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## Licence

Ce projet est privé et propriétaire.
