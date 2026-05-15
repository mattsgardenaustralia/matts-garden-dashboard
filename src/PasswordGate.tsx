import React, { useState, useEffect } from 'react';
import App from './App';

async function hashPassword(pw: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
const HASH = '69b664635584ce006c6f6ce1f83a4a916df58a8a5d5b19fdf42bfab2e1f5d555';

export function PasswordGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('mgd_auth') === 'true') setUnlocked(true);
  }, []);

  const submit = async () => {
    const h = await hashPassword(pw);
    if (h === HASH) { sessionStorage.setItem('mgd_auth', 'true'); setUnlocked(true); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  };

  if (unlocked) return <App />;
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#0f172a,#1e293b)',fontFamily:'system-ui'}}>
      <div style={{background:'#1e293b',borderRadius:16,padding:40,textAlign:'center',border:'1px solid #334155',maxWidth:360,width:'90%'}}>
        <div style={{fontSize:48,marginBottom:8}}>🌱</div>
        <h1 style={{color:'#f1f5f9',fontSize:20,marginBottom:4}}>Matt's Garden Dashboard</h1>
        <p style={{color:'#94a3b8',fontSize:14,marginBottom:24}}>Enter password to continue</p>
        <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr(false)}}
          onKeyDown={e=>e.key==='Enter'&&submit()}
          placeholder="Password"
          style={{width:'100%',padding:'12px 16px',borderRadius:8,border:`1px solid ${err?'#ef4444':'#475569'}`,background:'#0f172a',color:'#f1f5f9',fontSize:16,marginBottom:16,boxSizing:'border-box',outline:'none'}} />
        <button onClick={submit} style={{width:'100%',padding:'12px',borderRadius:8,border:'none',background:'linear-gradient(135deg,#10b981,#059669)',color:'white',fontSize:16,fontWeight:600,cursor:'pointer'}}>
          Unlock Dashboard
        </button>
        {err && <p style={{color:'#ef4444',marginTop:12,fontSize:14}}>Incorrect password</p>}
      </div>
    </div>
  );
}
