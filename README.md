# Ortomobile — MVP Product & Tech Brief

## Vision & problème

Plateforme d’orthophonie inclusive qui met en relation Parents ↔ Écoles ↔ Orthophonistes pour réduire les trajets, fluidifier la coordination et permettre des séances en visio à l’école ou à la maison.

## Rôles & permissions

**Parent**  
- Créer son compte, gérer son profil, ses enfants (ajout/suppression).
- Lier chaque enfant à une école (adresse, classe, enseignant).
- Prendre/modifier/annuler un RDV (maison/école).
- Signer un consentement en ligne (et télécharger le PDF).
- Accéder à la visio du RDV, aux comptes rendus PDF, aux factures (mock pour l’instant).

**Orthophoniste**  
- Créer son compte (n° professionnel).
- Grille de disponibilité / gestion de l’agenda.
- Démarrer la visio (ou la rejoindre).
- Renseigner un compte-rendu (form) → génération PDF (stockage local pour MVP) + partage parents/écoles.
- Générer une facture automatiquement quand le RDV passe en “completed” (mock paiement).

**École**  
- Créer son compte, consulter agenda partagé des enfants de l’école.
- Lancer/rejoindre la visio à l’heure du RDV.
- Télécharger compte-rendu/fichiers partagés.
- Messagerie avec Parent/Ortho (MVP: simple thread par RDV).

**Admin**  
- Accès global (tous les comptes, RDV, documents, factures).
- Rechercher par nom/email/enfant/école/orthophoniste.
- Forcer statuts (RDV, paiements mock), éditer/supprimer entités.
- (MVP) Auth simple par mot de passe ENV: ADMIN_PASSWORD (valeur initiale: 171278).
⚠️ À remplacer ensuite par vraie auth (NextAuth/Clerk/Keycloak).

## Pages clés (App Router / Next.js)
- `/presentation` : Landing (tunnel de conversion) + social proof counters + CTA.
- `/comptes` : Espace Compte avec sous-onglets Parent / Orthophoniste / École.
- `/rdv` : Prise de rendez-vous.
- `/agenda` : FullCalendar vue semaine + polling (10s).
- `/visio` : liste des séances du jour, “Rejoindre” actif à T−10.
- `/documentation` : upload (mock) + liste docs (accès selon rôle).
- `/admin` : mot de passe (ENV) → dashboard global, recherche, CRUD rapide.

## Flux métier essentiels
1. **Création parent + enfants + consentement**
2. **Prise de RDV & visio**
3. **Fin de séance → CR PDF + facture**
4. **Messagerie**

## Stack technique (cible)
- Next.js 14 (App Router) + React + Tailwind CSS.
- FullCalendar (@fullcalendar/react, daygrid, timegrid, interaction)
- Zod pour valider payloads API.
- PDF : pdf-lib
- Visio : Jitsi public
- Auth (MVP) : ADMIN_PASSWORD + sessions locales (cookies signés)
- DB (MVP) : JSON fichier .data/db.json
- Phase 2 : Prisma + Postgres + RLS
- Emails (mock) : Resend

## Modèles de données (MVP file-DB)
type Role = "parent" | "orthophoniste" | "ecole" | "admin";
type Profile = { id: string; role: Role; displayName: string; email: string; phone?: string; proNumber?: string; schoolAddress?: string; };
type School = { id: string; name: string; address?: string; contact_email?: string; };
type Child = { id: string; parentId: string; schoolId?: string; firstname: string; lastname: string; className?: string; teacherName?: string; };
type AppointmentStatus = "pending" | "confirmed" | "completed" | "canceled";
type Appointment = { id: string; childId: string; schoolId?: string; orthoId: string; start_at: string; end_at: string; location: "home" | "school"; status: AppointmentStatus; visio_url?: string; paid?: "paid_mock" | "ameli_stub" | "none"; };
type Consent = { id: string; profileId: string; childId: string; acceptedAt: string; pdfPath?: string; };
type Report = { id: string; appointmentId: string; pdfPath: string; };
type Invoice = { id: string; appointmentId: string; pdfPath: string; amount: number; };
type Message = { id: string; appointmentId: string; senderProfileId: string; text: string; sentAt: string; };
type Stats = { students: number; minutes: number; appointments: number; };

## Endpoints API (MVP)
- POST /api/profiles : créer profil (role, infos).
- GET /api/profiles?role=... : lister.
- POST /api/children : créer enfant.
- GET /api/children?parentId=... : lister enfants d’un parent.
- POST /api/schools / GET /api/schools : écoles.
- POST /api/consents : signer consentement → génère PDF.
- GET /api/consents?profileId=... : lister.
- POST /api/appointments : créer RDV.
- POST /api/appointments/:id/confirm : confirmer (génère visio_url, ICS).
- POST /api/appointments/:id/complete : termine → génère Report + Invoice PDFs.
- PATCH /api/appointments/:id : modifier (drag&drop agenda).
- DELETE /api/appointments/:id : annuler.
- GET /api/appointments/today : séances du jour.
- GET /api/agenda/poll : source unique d’événements (remplace SSE).
- GET /api/stats + POST /api/stats : social proof counters.
- GET/POST /api/messages?appointmentId=... : messagerie simple.

## Sécurité / RGPD (MVP pragmatique)
- Pas d’enregistrement vidéo en MVP.
- COMPLIANCE.md : checklist RGPD + HDS (prochaine phase).
- Logs d’accès minimal (DB file “audit.log” pour MVP).
- ENV sensibles dans .env (jamais commit):  
  NODE_ENV=development
  NEXT_PUBLIC_APP_NAME=Ortomobile
  NEXT_PUBLIC_JITSI_DOMAIN=meet.jit.si
  ADMIN_PASSWORD=171278
  RESEND_API_KEY=
  EMAIL_FROM=no-reply@ortomobile.local

## Nettoyage demandé à Copilot (refactor)
- Supprimer tout code SSE (/api/agenda/stream), tous les scripts patchs temporaires et anciens fix d’encodage.
- Unifier l’encodage : UTF-8 sans BOM ; aucun caractère cassé.
- Centraliser les textes dans content/copy.ts
- Harmoniser UI (Tailwind) : spacing/paddings/typos, composants simples.
- /agenda : FullCalendar (polling 10s)
- /visio : bouton actif T−10 min
- /comptes : vrais sous-onglets
- /documentation : upload mock → .data/docs/
- /admin : écran de login (password ENV), dashboard, recherche, CRUD rapide.

## Ordre d’exécution (acceptance criteria inclus)
1. Nettoyage & structure (1 PR)
2. Agenda stable (1 PR)
3. RDV → Paiement mock → Confirm (1 PR)
4. Fin de séance → PDF (1 PR)
5. Comptes & consentement (1 PR)
6. Admin (1 PR)

## Convention & qualité
- TypeScript strict ; zod sur payloads
- Composants UI simples, réutilisables
- Tests unitaires fonctions critical (format ICS, PDF)
- Lint + format pass

---

Collé par Copilot — refactor MVP en cours.