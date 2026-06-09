'use client';

export default function ProfileView() {
  return (
    <div className="flex-1 overflow-y-auto pb-20 flex flex-col">
      <div className="bg-navy px-5 py-6 flex flex-col items-center">
        <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">AB</div>
        <p className="text-white font-bold text-base">Dr. Amine Benali</p>
        <p className="text-blue-300 text-xs mt-1">Néphrologue — CHU Casablanca</p>
        <span className="mt-2 bg-blue-900/50 text-blue-300 border border-blue-700/40 rounded-full px-3 py-1 text-xs font-semibold">
          ⭐ Membre actif ANC depuis 2018
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pt-4">
        {[
          { num: '47', label: 'Calculs effectués' },
          { num: '12', label: 'Événements suivis' },
          { num: '8',  label: 'Années de membre' },
          { num: '23', label: 'Articles sauvegardés' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-brand-dark">{s.num}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {[
          { icon: '🏥', label: 'Établissement', val: 'CHU Ibn Rochd, Casablanca' },
          { icon: '🔬', label: 'Sous-spécialité', val: 'Hémodialyse & Transplantation' },
          { icon: '📧', label: 'Email', val: 'a.benali@chu-casablanca.ma' },
          { icon: '📞', label: 'Téléphone', val: '+212 6 00 11 22 33' },
          { icon: '🗓️', label: 'Membre depuis', val: 'Janvier 2018' },
        ].map((row, i) => (
          <div key={row.label} className={`flex items-center gap-3 px-4 py-3 ${i < 4 ? 'border-b border-gray-50' : ''}`}>
            <span className="text-lg">{row.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">{row.label}</p>
              <p className="text-xs font-semibold text-gray-900 truncate">{row.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 mt-4 space-y-2 pb-4">
        <button className="w-full py-3 bg-blue-50 border border-blue-100 rounded-2xl text-xs font-semibold text-brand-dark hover:bg-blue-100 transition-colors">
          ✏️ Modifier mon profil
        </button>
        <button className="w-full py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
          🔔 Gérer les notifications
        </button>
        <button className="w-full py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors">
          Déconnexion
        </button>
      </div>
    </div>
  );
}
