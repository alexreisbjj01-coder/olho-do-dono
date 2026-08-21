import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://enhouyxocieotynybmcl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaG91eXhvY2llb3R5bnlibWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMjY0NTYsImV4cCI6MjEwMjYwMjQ1Nn0.ypoEii9bdHmqpXdBoh87Xu2WAp8rSEpMtTWZyJk6bdM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const cores = {
  fundo: '#050b14',
  card: '#0a1220',
  borda: '#00d8ff44',
  destaque: '#00d8ff',
  texto: '#e5e7eb',
  subtexto: '#9ca3af',
  inputBg: '#080f1e',
};

export default function App() {
  const [session, setSession] = useState(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCarregandoSessao(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, novaSessao) => {
      setSession(novaSessao);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (carregandoSessao) {
    return (
      <div style={estiloTelaCentralizada}>
        <p style={{ color: cores.destaque, fontFamily: 'monospace' }}>[ CARREGANDO SISTEMA... ]</p>
      </div>
    );
  }

  return session ? <ConselhoIA session={session} /> : <TelaLogin />;
}

const estiloTelaCentralizada = {
  padding: '20px',
  background: cores.fundo,
  color: cores.texto,
  minHeight: '100vh',
  fontFamily: 'sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const estiloInput = {
  width: '100%',
  padding: '12px',
  background: cores.inputBg,
  color: '#fff',
  border: `1px solid ${cores.borda}`,
  borderRadius: '6px',
  marginBottom: '12px',
  boxSizing: 'border-box',
  outline: 'none',
};

const estiloBotao = {
  width: '100%',
  padding: '12px',
  background: cores.destaque,
  color: '#050b14',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  boxShadow: '0 0 10px rgba(0, 216, 255, 0.3)',
};

function TelaLogin() {
  const [modo, setModo] = useState('entrar');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const enviar = async () => {
    if (!email.trim() || !senha.trim()) {
      setMensagem('Preencha email e senha.');
      return;
    }
    setCarregando(true);
    setMensagem('');
    try {
      if (modo === 'entrar') {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) setMensagem(`Erro: ${error.message}`);
      } else {
        const { error } = await supabase.auth.signUp({ email, password: senha });
        if (error) {
          setMensagem(`Erro: ${error.message}`);
        } else {
          setMensagem('Conta criada! Verifique seu e-mail para confirmação se necessário.');
        }
      }
    } catch (e) {
      setMensagem('Erro de conexão ao autenticar.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={estiloTelaCentralizada}>
      <div style={{ maxWidth: '400px', width: '100%', background: cores.card, padding: '28px', borderRadius: '10px', border: `1px solid ${cores.borda}`, boxShadow: '0 0 20px rgba(0,216,255,0.1)' }}>
        <h2 style={{ color: cores.destaque, marginBottom: '4px', letterSpacing: '1px' }}>O OLHO DO DONO</h2>
        <p style={{ fontSize: '13px', color: cores.subtexto, marginBottom: '20px' }}>
          {modo === 'entrar' ? 'Acesso restrito ao painel executivo.' : 'Cadastro de novo operador.'}
        </p>

        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" style={estiloInput} />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" style={estiloInput} />

        <button onClick={enviar} disabled={carregando} style={estiloBotao}>
          {carregando ? 'PROCESSANDO...' : modo === 'entrar' ? 'ENTRAR' : 'CRIAR CONTA'}
        </button>

        {mensagem && (
          <p style={{ fontSize: '13px', color: cores.texto, marginTop: '12px', whiteSpace: 'pre-wrap' }}>{mensagem}</p>
        )}

        <button
          onClick={() => { setModo(modo === 'entrar' ? 'criar' : 'entrar'); setMensagem(''); }}
          style={{ background: 'none', border: 'none', color: cores.destaque, fontSize: '13px', marginTop: '16px', cursor: 'pointer', textDecoration: 'underline', width: '100%' }}
        >
          {modo === 'entrar' ? 'Não tem conta? Criar uma' : 'Já tem conta? Entrar'}
        </button>
      </div>
    </div>
  );
}

function ConselhoIA({ session }) {
  const [empresas, setEmpresas] = useState([]);
  const [empresaId, setEmpresaId] = useState('');
  const [pauta, setPauta] = useState('');
  const [parecer, setParecer] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    supabase.from('companies').select('id, name').then(({ data, error }) => {
      if (!error && data) {
        setEmpresas(data);
        if (data.length > 0) setEmpresaId(data[0].id);
      }
    });
  }, []);

  const sair = async () => {
    await supabase.auth.signOut();
  };

  const consultarConselho = async () => {
    if (!pauta.trim()) return;
    if (!empresaId) {
      setParecer('Selecione uma empresa antes de consultar.');
      return;
    }

    setCarregando(true);
    setParecer('Consultando conselheiros executivos...');

    try {
      const response = await fetch('https://enhouyxocieotynybmcl.supabase.co/functions/v1/cohi-conselho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ pauta, company_id: empresaId }),
      });

      const data = await response.json();

      if (response.ok) {
        setParecer(data.decisao_recomendada || data.status || JSON.stringify(data, null, 2));
      } else {
        setParecer(`[Erro do Servidor]: ${data.mensagem || data.error || 'Erro ao processar pauta.'}`);
      }
    } catch (error) {
      setParecer('[Erro de Conexão]: Não foi possível conectar à Edge Function.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: cores.fundo, color: cores.texto, minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '650px', margin: '0 auto', background: cores.card, padding: '24px', borderRadius: '10px', border: `1px solid ${cores.borda}`, boxShadow: '0 0 20px rgba(0,216,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ color: cores.destaque, margin: 0, fontSize: '20px', letterSpacing: '0.5px' }}>
            CONSELHO DE DELIBERAÇÃO (6 IA)
          </h2>
          <button onClick={sair} style={{ background: 'none', border: '1px solid ' + cores.borda, color: cores.subtexto, padding: '4px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>
            SAIR
          </button>
        </div>

        <p style={{ fontSize: '13px', color: cores.subtexto, marginBottom: '15px' }}>
          Selecione a empresa e envie sua pauta para análise executiva automatizada.
        </p>

        <label style={{ fontSize: '12px', color: cores.destaque, display: 'block', marginBottom: '4px' }}>EMPRESA:</label>
        <select value={empresaId} onChange={(e) => setEmpresaId(e.target.value)} style={{ ...estiloInput, marginBottom: '15px' }}>
          {empresas.length === 0 && <option value="">Nenhuma empresa cadastrada</option>}
          {empresas.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <label style={{ fontSize: '12px', color: cores.destaque, display: 'block', marginBottom: '4px' }}>PAUTA ESTRATÉGICA:</label>
        <textarea
          value={pauta}
          onChange={(e) => setPauta(e.target.value)}
          placeholder="Descreva a situação ou decisão a ser tomada..."
          rows={5}
          style={{ ...estiloInput, resize: 'vertical' }}
        />

        <button onClick={consultarConselho} disabled={carregando} style={{ ...estiloBotao, marginBottom: '20px' }}>
          {carregando ? 'ANALISANDO PAUTA...' : 'CONSULTAR CONSELHO'}
        </button>

        <div style={{ background: cores.inputBg, padding: '16px', borderRadius: '8px', border: `1px solid ${cores.borda}` }}>
          <strong style={{ color: cores.destaque, display: 'block', marginBottom: '8px', fontSize: '13px', letterSpacing: '0.5px' }}>
            PARECER EXECUTIVO
          </strong>
          <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', color: cores.texto, lineHeight: '1.5' }}>
            {parecer || 'Aguardando envio de pauta para deliberação...'}
          </div>
        </div>
      </div>
    </div>
  );
}
