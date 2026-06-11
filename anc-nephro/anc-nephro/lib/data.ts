export const events = [
  {
    id: 1, day: 27, month: 'Juin', year: 2026,
    name: '24ème Réunion Scientifique ARC',
    location: 'Centre de Conférences Al Akhawayn, Ifrane',
    time: 'Journée complète',
    type: 'congres', tag: 'Réunion Scientifique',
    theme: 'Réinventer la néphrologie : de l\'innovation à la pratique',
    featured: true,
  },
  {
    id: 2, day: 27, month: 'Juin', year: 2026,
    name: 'Lancement officiel ARC Néphro App',
    location: 'Al Akhawayn, Ifrane',
    time: 'Durant la réunion',
    type: 'lancement', tag: 'Lancement App',
    featured: false,
  },
];

export const news = [
  {
    id: 1, category: 'ARC', icon: '🏆', bg: '#FEF3C7',
    title: '24ème Réunion Scientifique — Inscriptions ouvertes',
    time: 'Récent', source: 'ARC · 2026',
    excerpt: 'L\'Association Rénale du Centre organise sa 24ème réunion scientifique le 27 juin 2026 à Ifrane. Thème : "Réinventer la néphrologie : de l\'innovation à la pratique", sous l\'égide de la SMN.',
  },
  {
    id: 2, category: 'Recherche', icon: '🩺', bg: '#EFF6FF',
    title: 'Nouveaux critères KDIGO 2026 pour la classification de la MRC stades 3-4',
    time: 'Il y a 2h', source: 'JASN · Mai 2026',
    excerpt: 'Les nouvelles recommandations intègrent le marqueur FGF-23 comme critère diagnostique complémentaire pour les stades avancés de la maladie rénale chronique.',
  },
  {
    id: 3, category: 'Thérapeutique', icon: '💊', bg: '#F0FDF4',
    title: 'SGLT2 et protection rénale : mise à jour des recommandations ERA-EDTA 2026',
    time: 'Hier', source: 'NEJM · Mai 2026',
    excerpt: 'L\'étude EMPA-KIDNEY confirme la réduction de 37% de la progression vers l\'IRC terminale avec empagliflozine, indépendamment du statut diabétique.',
  },
  {
    id: 4, category: 'KDIGO', icon: '📚', bg: '#FFF7ED',
    title: 'Guide KDIGO 2026 sur la gestion de l\'anémie dans la MRC',
    time: 'Il y a 5j', source: 'KI · Avril 2026',
    excerpt: 'Nouvelles cibles d\'hémoglobine et recommandations sur l\'utilisation des ASE et du fer intraveineux en dialyse péritonéale et hémodialyse.',
  },
];

export const tagColors: Record<string, string> = {
  congres:  'bg-amber-100 text-amber-800',
  lancement: 'bg-green-100 text-green-800',
  reunion:  'bg-blue-100 text-blue-800',
  webinaire: 'bg-purple-100 text-purple-800',
  deadline: 'bg-red-100 text-red-800',
};
