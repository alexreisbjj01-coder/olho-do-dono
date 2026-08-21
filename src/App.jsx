import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// ============================================================================
// CONFIG — projeto Supabase "Olho do dono!"
// ============================================================================
const SUPABASE_URL = 'https://enhouyxocieotynybmcl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaG91eXhvY2llb3R5bnlibWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMjY0NTYsImV4cCI6MjEwMjYwMjQ1Nn0.ypoEii9bdHmqpXdBoh87Xu2WAp8rSEpMtTWZyJk6bdM';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const EMPRESAS = [
  { id: '54057b17-4979-464d-91cf-070720cbca41', nome: 'Dedetizadora' },
  { id: '0e95b0a2-b141-49f9-ba33-bb4a212cfbed', nome: 'Fundação' },
  { id: '4c7bc5ba-6020-4a7f-978a-3e64d19d6283', nome: 'Holding' },
  { id: '065b348f-1d8a-4896-9f38-5b1a0255b250', nome: 'Mídia' },
];

// ============================================================================
// TELA DE LOGIN — a função cohi-conselho exige um usuário autenticado de
// verdade (ela chama auth.getUser() com o token enviado). Sem login, toda
// chamada cai em 401, que era exatamente o bug anterior.
// ============================================================================
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setCarregando(false);
    if (error) {
      setErro(error.message);
      return;
    }
    onLogin(data.session);
  };

  return (
    <div style={{ padding: '20px', background: '#0b0f19', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={entrar} style={{ maxWidth: '360px', width: '100%', background: '#121824', padding: '24px', borderRadius: '8px', border: '1px solid #2a3447' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '16px' }}>Entrar</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          style={{ width: '100%', padding: '12px', background: '#0b0f19', color: '#fff', border: '1px solid #2a3447', borderRadius: '6px', marginBottom: '12px' }}
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
          style={{ width: '100%', padding: '12px', background: '#0b0f19', color: '#fff', border: '1px solid #2a3447', borderRadius: '6px', marginBottom: '12px' }}
        />
        {erro && <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '12px' }}>{erro}</p>}
        <button
          type="submit"
          disabled={carregando}
          style={{ width: '100%', padding: '12px', background: '#c29b61', color: '#0b0f19', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

// ============================================================================
// WIDGET DO CONSELHO DE IA
// ============================================================================
function ConselhoIA({ session }) {
  const [pauta, setPauta] = useState('');
  const [empresaId, setEmpresaId] = useState(EMPRESAS[0].id);
  const [parecer, setParecer] = useState('');
  const [carregando, setCarregando] = useState(false);

  const consultarConselho = async () => {
    if (!pauta.trim()) return;
    setCarregando(true);
    setParecer('Consultando os 6 conselheiros executivos...');

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/cohi-conselho`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Correção do bug: manda o token de sessão REAL do usuário logado,
          // não a string literal "anon". A função valida isso com
          // auth.getUser() e rejeitava (401) qualquer coisa que não fosse
          // um JWT de sessão válido.
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ pauta, company_id: empresaId }),
      });

      const data = await response.json();

      if (response.ok) {
        setParecer(
          data?.resposta_bruta?.sintese?.decisao_recomendada
            ? `${data.status}\n\nDecisão recomendada: ${data.resposta_bruta?.sintese?.decisao_recomendada}`
            : JSON.stringify(data, null, 2)
        );
      } else {
        setParecer(`[Erro do Servidor]: ${data.error || data.mensagem || 'Erro ao processar pauta.'}`);
      }
    } catch (error) {
      setParecer(`[Erro de Conexão]: Não foi possível conectar à Edge Function.`);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#0b0f19', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#121824', padding: '20px', borderRadius: '8px', border: '1px solid #2a3447' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ color: '#d4af37', margin: 0 }}>Deliberação do Conselho (6 Conselheiros)</h2>
          <button
            onClick={() => supabase.auth.signOut()}
            style={{ background: 'transparent', color: '#9ca3af', border: '1px solid #2a3447', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '12px' }}
          >
            Sair
          </button>
        </div>

        <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '15px' }}>
          Envie sua pauta estratégica para análise executiva.
        </p>

        <select
          value={empresaId}
          onChange={(e) => setEmpresaId(e.target.value)}
          style={{ width: '100%', padding: '12px', background: '#0b0f19', color: '#fff', border: '1px solid #2a3447', borderRadius: '6px', marginBottom: '12px' }}
        >
          {EMPRESAS.map((emp) => (
            <option key={emp.id} value={emp.id}>{emp.nome}</option>
          ))}
        </select>

        <textarea
          value={pauta}
          onChange={(e) => setPauta(e.target.value)}
          placeholder="Digite sua pauta estratégica aqui..."
          rows={4}
          style={{ width: '100%', padding: '12px', background: '#0b0f19', color: '#fff', border: '1px solid #2a3447', borderRadius: '6px', marginBottom: '15px', resize: 'vertical' }}
        />

        <button
          onClick={consultarConselho}
          disabled={carregando}
          style={{ width: '100%', padding: '12px', background: '#c29b61', color: '#0b0f19', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '20px' }}
        >
          {carregando ? 'Analisando...' : 'Consultar Conselho de IA'}
        </button>

        <div style={{ background: '#0b0f19', padding: '15px', borderRadius: '6px', border: '1px solid #2a3447' }}>
          <strong style={{ color: '#d4af37', display: 'block', marginBottom: '8px' }}>PARECER EXECUTIVO:</strong>
          <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', color: '#e5e7eb' }}>
            {parecer || 'Aguardando envio de pauta para deliberação...'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// APP — decide entre tela de login e o widget, conforme sessão ativa
// ============================================================================
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
    return <div style={{ background: '#0b0f19', minHeight: '100vh' }} />;
  }

  if (!session) {
    return <Login onLogin={setSession} />;
  }

  return <ConselhoIA session={session} />;
}
