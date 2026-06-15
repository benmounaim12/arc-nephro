'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export interface Profile {
  id: string; full_name: string; specialty: string; hospital: string;
  phone: string; status: 'pending'|'active'|'suspended'; role: 'member'|'admin'; member_since: string;
  titre?: string; prenom?: string; nom?: string; secteur?: string;
  type_etablissement?: string; region?: string; ville?: string; annuaire?: boolean;
}

interface SignUpData {
  email: string; password: string; full_name: string; specialty: string; hospital: string; phone: string;
  titre?: string; prenom?: string; nom?: string; secteur?: string;
  type_etablissement?: string; region?: string; ville?: string; annuaire?: boolean;
}

interface AuthCtx {
  user:User|null; profile:Profile|null; session:Session|null; loading:boolean;
  signIn:(e:string,p:string)=>Promise<string|null>;
  signUp:(d:SignUpData)=>Promise<string|null>;
  signOut:()=>Promise<void>;
  refreshProfile:()=>Promise<void>;
}

const Ctx = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,setUser]=useState<User|null>(null);
  const [profile,setProfile]=useState<Profile|null>(null);
  const [session,setSession]=useState<Session|null>(null);
  const [loading,setLoading]=useState(true);

  const fetchProfile = async (uid:string) => {
    const {data} = await supabase.from('profiles').select('*').eq('id',uid).single();
    setProfile(data??null);
  };

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      setSession(session); setUser(session?.user??null);
      if(session?.user) fetchProfile(session.user.id);
      setLoading(false);
    });
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_,session)=>{
      setSession(session); setUser(session?.user??null);
      if(session?.user) fetchProfile(session.user.id); else setProfile(null);
    });
    return ()=>subscription.unsubscribe();
  },[]);

  const signIn = async (email:string, password:string) => {
    const {error} = await supabase.auth.signInWithPassword({email,password});
    return error ? error.message : null;
  };

  const signUp = async (data:SignUpData) => {
    const {data:authData,error} = await supabase.auth.signUp({
      email:data.email, password:data.password, options:{data:{full_name:data.full_name}}
    });
    if(error) return error.message;
    if(authData.user) {
      await supabase.from('profiles').insert({
        id:           authData.user.id,
        full_name:    data.full_name,
        specialty:    data.specialty,
        hospital:     data.hospital,
        phone:        data.phone,
        titre:        data.titre        || null,
        prenom:       data.prenom       || null,
        nom:          data.nom          || null,
        secteur:      data.secteur      || null,
        type_etablissement: data.type_etablissement || null,
        region:       data.region       || null,
        ville:        data.ville        || null,
        annuaire:     data.annuaire     || false,
        status:       'pending',
        role:         'member',
        member_since: new Date().toISOString()
      });
    }
    return null;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null); setProfile(null); setSession(null);
  };

  const refreshProfile = async () => { if(user) await fetchProfile(user.id); };

  return <Ctx.Provider value={{user,profile,session,loading,signIn,signUp,signOut,refreshProfile}}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
