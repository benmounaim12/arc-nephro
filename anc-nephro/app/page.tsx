'use client';
import { useState } from 'react';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import LoginScreen    from '@/components/LoginScreen';
import RegisterScreen from '@/components/RegisterScreen';
import PendingScreen  from '@/components/PendingScreen';
import AdminPanel     from '@/components/AdminPanel';
import HomeView       from '@/components/HomeView';
import ToolsView      from '@/components/ToolsView';
import AgendaView     from '@/components/AgendaView';
import NewsView       from '@/components/NewsView';
import KiliaView      from '@/components/KiliaView';
import AnnuaireView   from '@/components/AnnuaireView';
import AboutView      from '@/components/AboutView';
import ProfileView    from '@/components/ProfileView';

type Tab = 'home'|'tools'|'agenda'|'news'|'kilia'|'annuaire'|'about'|'profile';

// Navigation principale — 5 onglets visibles, reste via "Plus"
const NAV_MAIN: {id:Tab;icon:string;label:string}[] = [
  {id:'home',    icon:'🏠', label:'Accueil'},
  {id:'tools',   icon:'🧮', label:'Outils'},
  {id:'kilia',   icon:'🤖', label:'KiliA'},
  {id:'agenda',  icon:'📅', label:'Agenda'},
  {id:'more',    icon:'⋯',  label:'Plus'} as any,
];

const NAV_MORE: {id:Tab;icon:string;label:string;desc:string}[] = [
  {id:'news',     icon:'📰', label:'Actualités',   desc:'Veille scientifique'},
  {id:'annuaire', icon:'👥', label:'Annuaire',      desc:'Membres ARC'},
  {id:'about',    icon:'🏛️', label:'À propos',      desc:'L\'association ARC'},
  {id:'profile',  icon:'👤', label:'Mon profil',    desc:'Mon compte'},
];

function AppShell() {
  const { user, profile, loading, signOut } = useAuth();
  const [screen,setScreen]=useState<'login'|'register'>('login');
  const [tab,setTab]=useState<Tab>('home');
  const [toolsSub,setToolsSub]=useState<string|undefined>();
  const [showMore,setShowMore]=useState(false);

  if(loading) return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">A</div>
        <p className="text-white text-sm font-medium">ARC Néphro</p>
        <p className="text-blue-400 text-xs mt-1">Chargement...</p>
      </div>
    </div>
  );

  if(!user) return screen==='login'
    ? <LoginScreen onSwitch={()=>setScreen('register')}/>
    : <RegisterScreen onSwitch={()=>setScreen('login')}/>;

  if(profile?.role==='admin') return <AdminPanel/>;
  if(!profile||profile.status==='pending') return <PendingScreen/>;
  if(profile.status==='suspended') return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-8 text-center">
      <div className="text-5xl mb-4">🚫</div>
      <p className="text-white text-xl font-bold mb-2">Compte suspendu</p>
      <p className="text-blue-300 text-sm mb-6">Veuillez contacter le bureau de l'ARC.</p>
      <button onClick={signOut} className="text-xs text-blue-400 underline">Se déconnecter</button>
    </div>
  );

  const handleNav=(t:string,sub?:string)=>{
    setTab(t as Tab);
    if(t==='tools') setToolsSub(sub);
    setShowMore(false);
  };

  const activeMain = ['home','tools','kilia','agenda'].includes(tab) ? tab : 'more';

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="w-full max-w-sm bg-gray-50 relative flex flex-col" style={{minHeight:'100svh'}}>

        {/* More drawer */}
        {showMore && (
          <div className="absolute inset-0 z-40 bg-black/50" onClick={()=>setShowMore(false)}>
            <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-2xl p-4"
              onClick={e=>e.stopPropagation()}>
              <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <p className="text-xs font-semibold text-gray-400 mb-3 px-1">NAVIGATION</p>
              <div className="grid grid-cols-2 gap-2">
                {NAV_MORE.map(n=>(
                  <button key={n.id} onClick={()=>handleNav(n.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-colors text-left
                      ${tab===n.id?'bg-blue-50 border-blue-200':'bg-gray-50 border-gray-100'}`}>
                    <span className="text-2xl">{n.icon}</span>
                    <div>
                      <p className={`text-sm font-semibold ${tab===n.id?'text-blue-700':'text-gray-900'}`}>{n.label}</p>
                      <p className="text-xs text-gray-400">{n.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Views */}
        {tab==='home'     && <HomeView     onNav={handleNav}/>}
        {tab==='tools'    && <ToolsView    initialTab={toolsSub} key={toolsSub}/>}
        {tab==='agenda'   && <AgendaView   />}
        {tab==='news'     && <NewsView     />}
        {tab==='kilia'    && <KiliaView    />}
        {tab==='annuaire' && <AnnuaireView />}
        {tab==='about'    && <AboutView    />}
        {tab==='profile'  && <ProfileView  />}

        {/* Bottom nav — 5 onglets */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 flex pb-safe z-50">
          {NAV_MAIN.map(n=>{
            const isMore = n.id === ('more' as any);
            const isActive = isMore ? showMore || !['home','tools','kilia','agenda'].includes(tab) : tab===n.id && !showMore;
            return (
              <button key={n.id} onClick={()=>{
                if(isMore){ setShowMore(v=>!v); }
                else { setTab(n.id as Tab); setShowMore(false); if(n.id!=='tools') setToolsSub(undefined); }
              }}
                className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${isActive?'text-blue-700':'text-gray-400'}`}>
                <span className="text-lg leading-none">{n.icon}</span>
                <span className="text-xs font-medium">{n.label}</span>
                {isActive&&<span className="w-1 h-1 bg-blue-700 rounded-full"></span>}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default function App() {
  return <AuthProvider><AppShell/></AuthProvider>;
}
