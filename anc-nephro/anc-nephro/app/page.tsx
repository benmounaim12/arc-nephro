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
import ProfileView    from '@/components/ProfileView';

type Tab = 'home'|'tools'|'agenda'|'news'|'kilia'|'profile';
const NAV: {id:Tab;icon:string;label:string}[] = [
  {id:'home',icon:'🏠',label:'Accueil'},
  {id:'tools',icon:'🧮',label:'Outils'},
  {id:'agenda',icon:'📅',label:'Agenda'},
  {id:'news',icon:'📰',label:'News'},
  {id:'kilia',icon:'🤖',label:'KiliA'},
  {id:'profile',icon:'👤',label:'Profil'},
];

function AppShell() {
  const { user, profile, loading, signOut } = useAuth();
  const [screen,setScreen]=useState<'login'|'register'>('login');
  const [tab,setTab]=useState<Tab>('home');
  const [toolsSub,setToolsSub]=useState<string|undefined>();

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

  const handleNav=(t:string,sub?:string)=>{setTab(t as Tab);if(t==='tools') setToolsSub(sub);};

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="w-full max-w-sm bg-gray-50 relative flex flex-col" style={{minHeight:'100svh'}}>
        {tab==='home'    && <HomeView    onNav={handleNav}/>}
        {tab==='tools'   && <ToolsView   initialTab={toolsSub} key={toolsSub}/>}
        {tab==='agenda'  && <AgendaView />}
        {tab==='news'    && <NewsView    />}
        {tab==='kilia'   && <KiliaView   />}
        {tab==='profile' && <ProfileView />}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 flex pb-safe z-50">
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>{setTab(n.id);if(n.id!=='tools')setToolsSub(undefined);}}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${tab===n.id?'text-blue-700':'text-gray-400'}`}>
              <span className="text-lg leading-none">{n.icon}</span>
              <span className="text-xs font-medium">{n.label}</span>
              {tab===n.id&&<span className="w-1 h-1 bg-blue-700 rounded-full"></span>}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function App() {
  return <AuthProvider><AppShell/></AuthProvider>;
}
