import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://enhouyxocieotynybmcl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaG91eXhvY2llb3R5bnlibWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMjY0NTYsImV4cCI6MjEwMjYwMjQ1Nn0.ypoEii9bdHmqpXdBoh87Xu2WAp8rSEpMtTWZyJk6bdM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const t = {
  fundo: '#0A1220',
  card: '#0F1B2D',
  borda: '#232B36',
  destaque: '#B08159',
  texto: '#FFFFFF',
  secundario: '#9CA3AF',
  sucesso: '#10B981',
  alerta: '#EF4444'
};

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sessao) => {
      setSession(sessao);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div style={s.telaCheia}><p style={{ color: t.secundario, letterSpacing: '1px' }}>ACESSANDO O NÚCLEO TÁTICO...</p></div>;
  }

  return session ? <PainelMestre session={session} /> : <TelaAutenticacao />;
}

function TelaAutenticacao() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async () => {
    if (!email.trim() || !senha.trim()) { setMsg('Insira credenciais válidas.'); return; }
    setCarregando(true);
    setMsg('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) setMsg(`Falha de Acesso: ${error.message}`);
    } catch (e) {
      setMsg('Erro crítico de conexão com o banco.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={s.telaCheia}>
      <div style={{ maxWidth: '420px', width: '100%', background: t.card, padding: '30px', borderRadius: '10px', border: `1px solid ${t.borda}`, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <h2 style={{ color: t.destaque, margin: '0 0 5px 0', fontSize: '22px', fontWeight: '800' }}>O OLHO DO DONO</h2>
        <p style={{ fontSize: '13px', color: t.secundario, marginBottom: '25px' }}>Painel de Comando e Soberania Estratégica</p>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Identidade (E-mail)" style={s.input} />
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Chave de Acesso (Senha)" style={s.input} />
        <button onClick={entrar} disabled={carregando} style={s.botao}>
          {carregando ? 'Autenticando...' : 'Adentrar ao Sistema'}
        </button>
        {msg && <p style={{ fontSize: '13px', color: t.texto, marginTop: '15px', whiteSpace: 'pre-wrap', background: '#0b0f19', padding: '10px', borderRadius: '4px', border: `1px solid ${t.borda}` }}>{msg}</p>}
      </div>
    </div>
  );
}

function PainelMestre({ session }) {
  const [aba, setAba] = useState('conselho');
  const deslogar = async () => { await supabase.auth.signOut(); };

  return (
    <div style={{ minHeight: '100vh', background: t.fundo, color: t.texto, fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: t.card, padding: '20px', borderRadius: '8px', border: `1px solid ${t.borda}`, marginBottom: '25px' }}>
          <div>
            <h1 style={{ color: t.destaque, fontSize: '20px', margin: 0, fontWeight: '800' }}>O OLHO DO DONO</h1>
            <span style={{ fontSize: '12px', color: t.secundario }}>Arquitetura de Comando & Decisão</span>
          </div>
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button onClick={() => setAba('conselho')} style={s.navBtn(aba === 'conselho')}>Conselho (6 Conselheiros)</button>
            <button onClick={() => setAba('holding')} style={s.navBtn(aba === 'holding')}>Holding & Empresas</button>
            <button onClick={() => setAba('operacional')} style={s.navBtn(aba === 'operacional')}>Operacional & Ativos</button>
            <button onClick={deslogar} style={{ background: 'none', border: 'none', color: t.alerta, fontSize: '13px', cursor: 'pointer', fontWeight: 'bold' }}>Desconectar</button>
          </nav>
        </header>

        <main>
          {aba === 'conselho' && <ModuloConselho session={session} />}
          {aba === 'holding' && <ModuloHolding />}
          {aba === 'operacional' && <ModuloOperacional />}
        </main>
      </div>
    </div>
  );
}

function ModuloConselho({ session }) {
  const [empresas, setEmpresas] = useState([]);
  const [empresaId, setEmpresaId] = useState('');
  const [pauta, setPauta] = useState('');
  const [parecer, setParecer] = useState('');
  const [processando, setProcessando] = useState(false);

  useEffect(() => {
    supabase.from('companies').select('id, name').then(({ data, error }) => {
      if (!error && data) {
        setEmpresas(data);
        if (data.length > 0) setEmpresaId(data[0].id);
      }
    });
  }, []);

  const deliberar = async () => {
    if (!pauta.trim()) return;
    if (!empresaId) { setParecer('Alerta: Selecione uma empresa alvo.'); return; }
    setProcessando(true);
    setParecer('O Conselho está processando a pauta com base nos parâmetros estruturais...');
    try {
      const res = await fetch('https://enhouyxocieotynybmcl.supabase.co/functions/v1/cohi-conselho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
        body: JSON.stringify({ pauta, company_id: empresaId }),
      });
      const dados = await res.json();
      if (res.ok) setParecer(dados.decisao_recomendada || dados.status || JSON.stringify(dados, null, 2));
      else setParecer(`[Erro Executivo]: ${dados.mensagem || dados.error || 'Falha na deliberação.'}`);
    } catch (e) {
      setParecer('[Erro de Conexão]: Falha ao acionar a Edge Function.');
    } finally {
      setProcessando(false);
    }
  };

  return (
    <div style={s.cardModulo}>
      <h2 style={{ color: t.destaque, marginTop: 0, fontSize: '18px' }}>Conselho Executivo (6 Conselheiros)</h2>
      <p style={{ fontSize: '13px', color: t.secundario, marginBottom: '20px' }}>Instância de deliberação estratégica e validação cruzada para tomada de decisão.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: t.secundario, marginBottom: '8px' }}>EMPRESA / FRENTE</label>
          <select value={empresaId} onChange={e => setEmpresaId(e.target.value)} style={s.input}>
            {empresas.length === 0 && <option value="">Nenhuma empresa carregada</option>}
            {empresas.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: t.secundario, marginBottom: '8px' }}>PAUTA ESTRATÉGICA</label>
          <textarea value={pauta} onChange={e => setPauta(e.target.value)} placeholder="Descreva o cenário para análise do conselho..." rows={4} style={{ ...s.input, resize: 'vertical' }} />
        </div>
      </div>
      <button onClick={deliberar} disabled={processando} style={{ ...s.botao, marginBottom: '25px' }}>
        {processando ? 'Deliberando...' : 'Consultar Conselho'}
      </button>
      <div style={{ background: '#070b12', padding: '20px', borderRadius: '6px', border: `1px solid ${t.borda}` }}>
        <strong style={{ color: t.destaque, display: 'block', marginBottom: '10px', fontSize: '13px' }}>PARECER EXECUTIVO:</strong>
        <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', color: '#E5E7EB', lineHeight: '1.5' }}>{parecer || 'Aguardando pauta para iniciar a análise...'}</div>
      </div>
    </div>
  );
}

function ModuloHolding() {
  return (
    <div style={s.cardModulo}>
      <h2 style={{ color: t.destaque, marginTop: 0, fontSize: '18px' }}>Holding & Estrutura de Empresas</h2>
      <p style={{ fontSize: '13px', color: t.secundario, marginBottom: '25px' }}>Hierarquia de fundação, holdings e unidades operacionais integradas via Supabase.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={s.subCard}>
          <h4 style={{ color: t.destaque, margin: '0 0 10px 0', fontSize: '15px' }}>Fundação / Holding</h4>
          <p style={{ fontSize: '13px', color: t.secundario, margin: 0 }}>Governança central e controle de participações societárias.</p>
        </div>
        <div style={s.subCard}>
          <h4 style={{ color: t.destaque, margin: '0 0 10px 0', fontSize: '15px' }}>Empresas Operacionais & Mídia</h4>
          <p style={{ fontSize: '13px', color: t.secundario, margin: 0 }}>Frentes de execução e fluxo de caixa ramificado.</p>
        </div>
      </div>
    </div>
  );
}

function ModuloOperacional() {
  return (
    <div style={s.cardModulo}>
      <h2 style={{ color: t.destaque, marginTop: 0, fontSize: '18px' }}>Módulo Operacional & Ativos</h2>
      <p style={{ fontSize: '13px', color: t.secundario, marginBottom: '25px' }}>Painel de controle tático, monitoramento e rastreio de recursos.</p>
      <div style={s.subCard}>
        <h4 style={{ color: t.destaque, margin: '0 0 10px 0', fontSize: '15px' }}>Blindagem e Logs Operacionais</h4>
        <p style={{ fontSize: '13px', color: t.secundario, margin: 0 }}>Monitoramento passivo, isolamento de falhas e integridade de infraestrutura.</p>
      </div>
    </div>
  );
}

const s = {
  telaCheia: { padding: '20px', background: t.fundo, color: t.texto, minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardModulo: { background: t.card, padding: '25px', borderRadius: '8px', border: `1px solid ${t.borda}` },
  subCard: { background: '#0b0f19', padding: '20px', borderRadius: '6px', border: `1px solid ${t.borda}` },
  input: { width: '100%', padding: '12px', background: '#070b12', color: '#fff', border: `1px solid ${t.borda}`, borderRadius: '6px', marginBottom: '15px', boxSizing: 'border-box', fontSize: '14px' },
  botao: { width: '100%', padding: '12px', background: t.destaque, color: '#0b0f19', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  navBtn: (ativo) => ({ background: 'none', border: 'none', color: ativo ? t.destaque : t.secundario, cursor: 'pointer', fontWeight: ativo ? 'bold' : 'normal', fontSize: '14px', paddingBottom: '2px', borderBottom: ativo ? `2px solid ${t.destaque}` : 'none' })
};
