export const events = [
  { id: 1, day: 18, month: 'Mai', year: 2026, name: 'Réunion mensuelle ANC', location: 'CHU Ibn Rochd, Casablanca', time: '14h00 – 17h00', type: 'reunion', tag: 'Réunion' },
  { id: 2, day: 2,  month: 'Juin', year: 2026, name: 'Congrès Maghrébin de Néphrologie', location: 'Hôtel Sofitel, Rabat', time: '2 jours · 8h00 – 18h00', type: 'congres', tag: 'Congrès' },
  { id: 3, day: 14, month: 'Juin', year: 2026, name: 'Webinaire : SGLT2 et néphroprotection', location: 'En ligne (Zoom)', time: '19h00 – 20h30', type: 'webinaire', tag: 'Webinaire' },
  { id: 4, day: 30, month: 'Juin', year: 2026, name: 'Date limite soumission abstracts — JMN 2026', location: 'Soumission en ligne', time: 'Deadline', type: 'deadline', tag: 'Deadline' },
  { id: 5, day: 15, month: 'Juil', year: 2026, name: 'Réunion mensuelle ANC', location: 'CHU Ibn Rochd, Casablanca', time: '14h00 – 17h00', type: 'reunion', tag: 'Réunion' },
];

export const news = [
  { id: 1, category: 'Recherche',      icon: '🩺', bg: '#EFF6FF', title: 'Nouveaux critères KDIGO 2026 pour la classification de la MRC stades 3 et 4', time: 'Il y a 2h', source: 'JASN · Mai 2026',   excerpt: 'Les nouvelles recommandations intègrent le marqueur FGF-23 comme critère diagnostique complémentaire pour les stades avancés, avec des implications directes sur la surveillance...' },
  { id: 2, category: 'Thérapeutique',  icon: '💊', bg: '#F0FDF4', title: 'SGLT2 et protection rénale : mise à jour des recommandations ERA-EDTA 2026', time: 'Hier',      source: 'NEJM · Mai 2026',   excerpt: 'L\'étude EMPA-KIDNEY confirme la réduction de 37% de la progression vers l\'IRC terminale avec empagliflozine, indépendamment du statut diabétique du patient.' },
  { id: 3, category: 'ANC',            icon: '📋', bg: '#F5F3FF', title: 'Compte-rendu de la réunion mensuelle d\'avril 2026 — disponible en ligne', time: 'Il y a 3j',  source: 'ANC · Interne',     excerpt: 'Le bureau de l\'ANC met à disposition le compte-rendu complet incluant les présentations de cas cliniques et les décisions concernant le congrès de juin.' },
  { id: 4, category: 'KDIGO',          icon: '📚', bg: '#FFF7ED', title: 'Guide KDIGO 2026 sur la gestion de l\'anémie dans la MRC — résumé exécutif', time: 'Il y a 5j',  source: 'KI · Avril 2026',   excerpt: 'Nouvelles cibles d\'hémoglobine et recommandations sur l\'utilisation des ASE et du fer intraveineux en dialyse péritonéale et hémodialyse.' },
  { id: 5, category: 'Pharmacologie',  icon: '⚗️', bg: '#FDF4FF', title: 'Alerte pharmacovigilance : ajustement de la darbépoétine en MRC G4-G5', time: 'Il y a 6j',  source: 'ANSM · Mai 2026',   excerpt: 'Nouvelles données de sécurité cardiovasculaire nécessitant une révision des schémas posologiques en MRC avancée — mise à jour des RCP.' },
];

export const tagColors: Record<string, string> = {
  reunion:   'bg-blue-100 text-blue-800',
  congres:   'bg-purple-100 text-purple-800',
  webinaire: 'bg-green-100 text-green-800',
  deadline:  'bg-amber-100 text-amber-800',
};
