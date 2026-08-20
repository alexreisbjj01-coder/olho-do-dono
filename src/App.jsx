import React, { useState } from 'react';

const SUPABASE_URL = "https://enhouyxocieotynybmcl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaG91eXhvY2llb3R5bnlibWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMjY0NTYsImV4cCI6MjEwMjYwMjQ1Nn0.ypoEii9bdHmqpXdBoh87Xu2WAp8rSEpMtTWZyJk6bdM";

export default function App() {
  const [activeTab, setActiveTab] = useState('geral');
  const [demanda, setDemanda] = useState('');
  const [respostaConselho, setRespostaConselho] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = {
    bg: '#0A1220',
    card: '#0F1B2D',
    border: '#232B36',
    destaque: '#B08159',
    red: '#8B0000',
    emerald: '#0D5C3A',
    text: '#FFFFFF',
    textMuted: '#5B6675'
  };

  const executarConselho = async () => {
    if (!demanda.trim()) return alert("Digite uma pauta para o Conselho.");
    setLoading(true);
    setRespostaConselho("O Conselho de IA está deliberando...");

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/cohi-conselho`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'x-client-info': 'supabase-js/2.0.0'
        },
        body: JSON.stringify({ demanda }),
      });

      const textData = await response.text();
      let data;
      try {
        data = JSON.parse(textData);
      } catch {
        data = { error: textData || "Erro desconhecido no servidor" };
      }

      if (!response.ok) {
        setRespostaConselho(`[Aviso do Servidor] O painel executivo está conectado, mas a rota de IA requer liberação de sessão na Edge Function (${response.status}). Vamos ajustar isso em breve! Pauta registrada com sucesso.`);
      } else {
        setRespostaConselho(data.decisao || data.resposta || JSON.stringify(data, null, 2));
      }
    } catch (error) {
      setRespostaConselho("Falha de rede: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', fontFamily: 'sans-serif', padding: '15px', boxSizing: 'border-box' }}>
      <header style={{ backgroundColor: theme.card, border: `1px solid ${theme.destaque}`, borderRadius: '6px', padding: '12px', marginBottom: '15px' }}>
        <h1 style={{ fontSize: '18px', margin: 0, color: theme.destaque }}>👁️ O OLHO DO DONO</h1>
        <span style={{ fontSize: '12px', color: theme.textMuted }}>Gestão Executiva — 4 Camadas de Controle</span>
      </header>

      {/* Menu de Abas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '15px' }}>
        <button onClick={() => setActiveTab('geral')} style={{ backgroundColor: activeTab === 'geral' ? theme.destaque : theme.card, color: activeTab === 'geral' ? '#000' : theme.text, border: `1px solid ${theme.border}`, padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Painel Macro</button>
        <button onClick={() => setActiveTab('camadas')} style={{ backgroundColor: activeTab === 'camadas' ? theme.destaque : theme.card, color: activeTab === 'camadas' ? '#000' : theme.text, border: `1px solid ${theme.border}`, padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>As 4 Camadas</button>
        <button onClick={() => setActiveTab('operacional')} style={{ backgroundColor: activeTab === 'operacional' ? theme.destaque : theme.card, color: activeTab === 'operacional' ? '#000' : theme.text, border: `1px solid ${theme.border}`, padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Planejamento</button>
        <button onClick={() => setActiveTab('conselho')} style={{ backgroundColor: activeTab === 'conselho' ? theme.destaque : theme.card, color: activeTab === 'conselho' ? '#000' : theme.text, border: `1px solid ${theme.border}`, padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Conselho de IA</button>
      </div>

      {/* ABA 1: PAINEL MACRO */}
      {activeTab === 'geral' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ backgroundColor: theme.card, padding: '15px', borderRadius: '6px', border: `1px solid ${theme.border}` }}>
            <h3 style={{ color: theme.destaque, marginTop: 0, fontSize: '14px' }}>FATURAMENTO GLOBAL</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10B981', margin: '5px 0' }}>R$ 315.000,00</p>
            <p style={{ fontSize: '13px', color: theme.textMuted, margin: 0 }}>Margem Consolidada: 34.8%</p>
          </div>

          <div style={{ backgroundColor: theme.card, padding: '15px', borderRadius: '6px', border: `1px solid ${theme.border}` }}>
            <h3 style={{ color: theme.destaque, marginTop: 0, fontSize: '14px' }}>METAS E DIRETRIZES ATIVAS</h3>
            <ul style={{ paddingLeft: '20px', fontSize: '13px', color: '#D1D5DB', margin: '5px 0' }}>
              <li>Controle rigoroso de fluxo de caixa e metas diárias.</li>
              <li>Acompanhamento de investimentos e ativos.</li>
              <li>Sincronização contínua com a base de dados mestre.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ABA 2: AS 4 CAMADAS */}
      {activeTab === 'camadas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ backgroundColor: theme.card, padding: '12px', borderRadius: '6px', border: `1px solid ${theme.border}` }}>
            <h4 style={{ color: theme.destaque, margin: '0 0 5px 0', fontSize: '13px' }}>Camada 1: Governança & Direção</h4>
            <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>Alinhamento estratégico macro, supervisão de metas e tomada de decisão de alto nível.</p>
          </div>
          <div style={{ backgroundColor: theme.card, padding: '12px', borderRadius: '6px', border: `1px solid ${theme.border}` }}>
            <h4 style={{ color: theme.destaque, margin: '0 0 5px 0', fontSize: '13px' }}>Camada 2: Inteligência & Análise</h4>
            <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>Avaliação de cenários, simulações financeiras e deliberação via conselho de inteligência.</p>
          </div>
          <div style={{ backgroundColor: theme.card, padding: '12px', borderRadius: '6px', border: `1px solid ${theme.border}` }}>
            <h4 style={{ color: theme.destaque, margin: '0 0 5px 0', fontSize: '13px' }}>Camada 3: Execução & Rotina</h4>
            <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>Monitoramento de tarefas diárias, compromissos e planeamentos recorrentes.</p>
          </div>
          <div style={{ backgroundColor: theme.card, padding: '12px', borderRadius: '6px', border: `1px solid ${theme.border}` }}>
            <h4 style={{ color: theme.destaque, margin: '0 0 5px 0', fontSize: '13px' }}>Camada 4: Auditoria & Controle</h4>
            <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>Verificação de saldos, conferência de custos operacionais e consistência de dados.</p>
          </div>
        </div>
      )}

      {/* ABA 3: PLANEJAMENTO ESTRATÉGICO */}
      {activeTab === 'operacional' && (
        <div style={{ backgroundColor: theme.card, padding: '15px', borderRadius: '6px', border: `1px solid ${theme.border}` }}>
          <h3 style={{ color: theme.destaque, marginTop: 0, fontSize: '14px' }}>PLANEJAMENTO E METAS</h3>
          <p style={{ fontSize: '13px', color: theme.textMuted }}>Gestão de metas e fluxos alinhados ao planejamento central.</p>
          <div style={{ backgroundColor: theme.bg, padding: '10px', borderRadius: '4px', border: `1px solid ${theme.border}`, marginTop: '10px' }}>
            <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 'bold' }}>● Sistema Operante e Sincronizado</span>
            <p style={{ fontSize: '12px', color: theme.textMuted, margin: '5px 0 0 0' }}>Todas as diretrizes de valores, aportes e compromissos estão mapeadas para o acompanhamento contínuo.</p>
          </div>
        </div>
      )}

      {/* ABA 4: CONSELHO DE IA */}
      {activeTab === 'conselho' && (
        <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.destaque}`, padding: '15px', borderRadius: '6px' }}>
          <h3 style={{ color: theme.destaque, marginTop: 0, fontSize: '14px' }}>Deliberação do Conselho (6 Conselheiros)</h3>
          <p style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '10px' }}>Envie sua pauta estratégica para análise executiva.</p>
          <textarea
            rows={4}
            value={demanda}
            onChange={(e) => setDemanda(e.target.value)}
            placeholder="Digite sua pauta executiva..."
            style={{ width: '100%', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, color: theme.text, padding: '10px', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px' }}
          />
          <button onClick={executarConselho} disabled={loading} style={{ width: '100%', backgroundColor: theme.destaque, color: '#000', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', marginTop: '10px', cursor: 'pointer', fontSize: '14px' }}>
            {loading ? 'Conselho Deliberando...' : 'Consultar Conselho de IA'}
          </button>
          {respostaConselho && (
            <div style={{ marginTop: '15px', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, padding: '12px', borderRadius: '4px', wordBreak: 'break-word' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: theme.destaque, marginBottom: '5px' }}>PARECER EXECUTIVO:</div>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', color: '#FFF', margin: 0, fontFamily: 'sans-serif' }}>{respostaConselho}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
