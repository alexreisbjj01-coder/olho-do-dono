import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// CONFIGURAÇÃO DO SUPABASE (PROJETO ATIVO EM PRODUÇÃO)
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
    gold: '#D4AF37',
    red: '#8B0000',
    emerald: '#0D5C3A',
    text: '#FFFFFF',
    textMuted: '#5B6675'
  };

  const dataDesempenho = [
    { unidade: 'Serviços BR', realizado: 120000, meta: 100000 },
    { unidade: 'Mídia BR', realizado: 85000, meta: 90000 },
    { unidade: 'Holding UY', realizado: 65000, meta: 50000 },
    { unidade: 'Fundação', realizado: 45000, meta: 40000 }
  ];

  const dataReceita = [
    { name: 'Operacional BR', value: 50, color: '#B08159' },
    { name: 'Holding UY', value: 30, color: '#8B0000' },
    { name: 'Fundação Cayman', value: 20, color: '#0D5C3A' }
  ];

  const executarConselho = async () => {
    if (!demanda.trim()) return alert("Digite uma pauta para o Conselho.");
    setLoading(true);
    setRespostaConselho("O Conselho de IA está deliberando em série...");

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/cohi-conselho`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
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
        setRespostaConselho(`Erro (${response.status}): ${data.error || data.message || textData}`);
      } else {
        setRespostaConselho(data.decisao || JSON.stringify(data, null, 2));
      }
    } catch (error) {
      setRespostaConselho("Falha de rede ao conectar com o Conselho: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', fontFamily: 'sans-serif', padding: '0.75rem', boxSizing: 'border-box' }}>

      {/* HEADER EXECUTIVO */}
      <header style={{ backgroundColor: theme.card, border: `1px solid ${theme.destaque}`, borderRadius: '6px', padding: '0.75rem 1rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: theme.red, padding: '0.4rem', borderRadius: '50%', border: `1px solid ${theme.destaque}` }}>
            <Eye color={theme.destaque} size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', margin: 0, color: theme.destaque, fontWeight: 'bold' }}>O OLHO DO DONO</h1>
            <span style={{ fontSize: '0.7rem', color: theme.textMuted }}>Gestão Executiva Consolidada — 4 Camadas</span>
          </div>
        </div>
      </header>

      {/* ABAS DE NAVEGAÇÃO */}
      <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.75rem' }}>
        {[
          { id: 'geral', label: 'Painel Macro' }, 
          { id: 'conselho', label: 'Conselho de IA' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              backgroundColor: activeTab === tab.id ? theme.destaque : theme.card,
              color: activeTab === tab.id ? '#000' : theme.text,
              border: `1px solid ${theme.border}`,
              padding: '0.4rem 1rem',
              borderRadius: '4px 4px 0 0',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PAINEL MACRO (GERAL) */}
      {activeTab === 'geral' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.destaque}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.65rem', color: theme.textMuted }}>FATURAMENTO GLOBAL</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: theme.destaque }}>R$ 315.000,00</div>
            </div>
            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.emerald}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.65rem', color: theme.textMuted }}>MARGEM CONSOLIDADA</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10B981' }}>34.8%</div>
            </div>
          </div>

          <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '0.75rem', borderRadius: '4px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: theme.destaque, marginBottom: '0.5rem' }}>DESEMPENHO DAS CAMADAS (REALIZADO VS META)</div>
            <div style={{ height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataDesempenho}>
                  <XAxis dataKey="unidade" stroke={theme.textMuted} fontSize={10} />
                  <YAxis stroke={theme.textMuted} fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: theme.bg, borderColor: theme.border }} />
                  <Bar dataKey="realizado" fill={theme.destaque} />
                  <Bar dataKey="meta" fill={theme.red} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO CONSELHO DE IA */}
      {activeTab === 'conselho' && (
        <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.destaque}`, padding: '1rem', borderRadius: '6px' }}>
          <h3 style={{ fontSize: '0.9rem', color: theme.destaque, marginTop: 0 }}>Deliberação do Conselho (6 Conselheiros)</h3>
          <p style={{ fontSize: '0.75rem', color: theme.textMuted, marginBottom: '0.75rem' }}>
            Envie sua pauta estratégica para análise em série via Gemini.
          </p>
          <textarea
            rows={3}
            value={demanda}
            onChange={(e) => setDemanda(e.target.value)}
            placeholder="Digite a pauta executiva..."
            style={{ width: '100%', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, color: theme.text, padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem', boxSizing: 'border-box' }}
          />
          <button 
            onClick={executarConselho} 
            disabled={loading}
            style={{ width: '100%', backgroundColor: theme.destaque, color: '#000', border: 'none', padding: '0.6rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem', cursor: loading ? 'default' : 'pointer', marginTop: '0.5rem', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Conselho Deliberando...' : 'Consultar Conselho de IA'}
          </button>

          {respostaConselho && (
            <div style={{ marginTop: '1rem', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, borderRadius: '4px', padding: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: theme.destaque, marginBottom: '0.4rem' }}>PARECER EXECUTIVO:</div>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.75rem', color: theme.text, margin: 0, fontFamily: 'sans-serif' }}>
                {respostaConselho}
              </pre>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
