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

type Tab = 'home'|'tools'|'agenda'|'news'|'annuaire'|'about'|'profile';

const NAV_MAIN: {id:Tab;icon:string;label:string}[] = [
  {id:'home',   icon:'🏠', label:'Accueil'},
  {id:'tools',  icon:'🧮', label:'Outils'},
  {id:'agenda', icon:'📅', label:'Agenda'},
  {id:'news',   icon:'📰', label:'News'},
  {id:'more' as any, icon:'⋯', label:'Plus'},
];

const NAV_MORE: {id:Tab;icon:string;label:string;desc:string}[] = [
  {id:'annuaire', icon:'👥', label:'Annuaire',   desc:'Membres ARC'},
  {id:'about',    icon:'🏛️', label:'À propos',   desc:'L\'association'},
  {id:'profile',  icon:'👤', label:'Mon profil', desc:'Mon compte'},
];

function KiliaFAB({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-3 z-50 w-16 h-16 rounded-full shadow-xl flex items-center justify-center overflow-hidden bg-white border-2 border-white"
      style={{boxShadow:'0 6px 24px rgba(29,78,216,0.45)'}}
      aria-label="Ouvrir KiliA"
    >
      <img src="/kilia-icon.png" alt="KiliA" className="w-full h-full object-cover"/>
      <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white"></span>
    </button>
  );
}

function KiliaModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{background:'rgba(0,0,0,0.5)'}}>
      <div className="flex-shrink-0 h-16" onClick={onClose}></div>
      <div className="flex-1 flex flex-col bg-gray-50 rounded-t-3xl overflow-hidden">
        <div className="bg-navy px-5 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="relative">
            <div className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">K</div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-navy"></div>
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm">KiliA</p>
            <p className="text-blue-300 text-xs">Assistant IA · Spécialiste Néphrologie</p>
          </div>
          <button onClick={onClose} className="text-blue-300 text-2xl leading-none">×</button>
        </div>
        <div className="flex-1 overflow-hidden">
          <KiliaView />
        </div>
      </div>
    </div>
  );
}

function AppShell() {
  const { user, profile, loading, signOut } = useAuth();
  const [screen,setScreen]=useState<'login'|'register'>('login');
  const [tab,setTab]=useState<Tab>('home');
  const [toolsSub,setToolsSub]=useState<string|undefined>();
  const [showMore,setShowMore]=useState(false);
  const [showKilia,setShowKilia]=useState(false);

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
    setTab(t as Tab); setShowMore(false);
    if(t==='tools') setToolsSub(sub);
  };

  const activeMain = ['home','tools','agenda','news'].includes(tab) ? tab : 'more';

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="w-full max-w-sm bg-gray-50 relative flex flex-col" style={{minHeight:'100svh'}}>

        {/* KiliA FAB */}
        {!showKilia && <KiliaFAB onClick={()=>setShowKilia(true)}/>}
        {showKilia && <KiliaModal onClose={()=>setShowKilia(false)}/>}

        {/* More drawer — grille compacte sans scroll */}
        {showMore && (
          <div className="absolute inset-0 z-40" onClick={()=>setShowMore(false)}>
            <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-2xl px-4 pt-4 pb-5 shadow-xl"
              onClick={e=>e.stopPropagation()}>
              <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="grid grid-cols-3 gap-3">
                {NAV_MORE.map(n=>(
                  <button key={n.id} onClick={()=>handleNav(n.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-colors
                      ${tab===n.id?'bg-blue-50 border-blue-200':'bg-gray-50 border-gray-100'}`}>
                    <span className="text-3xl">{n.icon}</span>
                    <p className={`text-xs font-semibold ${tab===n.id?'text-blue-700':'text-gray-700'}`}>{n.label}</p>
                    <p className="text-xs text-gray-400">{n.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Views */}
        {tab==='home'     && <HomeView     onNav={handleNav} profile={profile}/>}
        {tab==='tools'    && <ToolsView    initialTab={toolsSub} key={toolsSub}/>}
        {tab==='agenda'   && <AgendaView   />}
        {tab==='news'     && <NewsView     />}
        {tab==='annuaire' && <AnnuaireView />}
        {tab==='about'    && <AboutView    />}
        {tab==='profile'  && <ProfileView  />}

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 flex pb-safe z-30">
          {NAV_MAIN.map(n=>{
            const isMore = n.id === ('more' as any);
            const isActive = isMore ? showMore || !['home','tools','agenda','news'].includes(tab) : tab===n.id&&!showMore;
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
