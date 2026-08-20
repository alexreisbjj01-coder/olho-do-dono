import React, { useState } from 'react';
import { Crown, Eye, Bot, ShieldCheck, Database } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function OlhoDeDeus() {
  const [activeTab, setActiveTab] = useState('geral');
  const [geminiKey, setGeminiKey] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  const [pautaConselho, setPautaConselho] = useState('');
  const [respostasConselho, setRespostasConselho] = useState({});
  const [loadingConselho, setLoadingConselho] = useState(false);

  const theme = {
    bg: '#0F0F12',
    card: '#18181C',
    border: '#2E2E38',
    gold: '#D4AF37',
    red: '#8B0000',
    redAccent: '#A91B1B',
    emerald: '#0D5C3A',
    text: '#FFFFFF',
    textMuted: '#9CA3AF'
  };

  const dataDesempenho = [
    { unidade: 'Unidade A', realizado: 120000, meta: 100000 },
    { unidade: 'Unidade B', realizado: 85000, meta: 90000 },
    { unidade: 'Unidade C', realizado: 65000, meta: 50000 },
    { unidade: 'Unidade D', realizado: 45000, meta: 40000 }
  ];

  const dataReceita = [
    { name: 'Operação Principal', value: 50, color: '#D4AF37' },
    { name: 'Serviços & Contratos', value: 30, color: '#8B0000' },
    { name: 'Novos Negócios', value: 20, color: '#0D5C3A' }
  ];

  const conselheiros = [
    { id: 'ceo', nome: 'CEO Executivo', papel: 'Expansão & Visão Macro' },
    { id: 'cfo', nome: 'CFO Financeiro', papel: 'DRE, Caixa & Margens' },
    { id: 'clo', nome: 'CLO Jurídico', papel: 'Compliance & Riscos' },
    { id: 'holding', nome: 'Holding & Offshore', papel: 'Proteção Patrimonial' }
  ];

  const chamarGemini = async (prompt, systemPrompt) => {
    if (!geminiKey) {
      alert("Insira a chave da API do Gemini no topo.");
      return null;
    }
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: `${systemPrompt}\n\nPauta: ${prompt}` }] }] })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Erro no processamento.";
    } catch {
      return "Falha de conexão.";
    }
  };

  const convocarConselho = async () => {
    if (!pautaConselho) return;
    setLoadingConselho(true);
    const novasRespostas = {};
    for (const member of conselheiros) {
      const sys = `Você é o ${member.nome} do Olho de Deus (Grupo Família Reis). Responda em até 3 frases.`;
      novasRespostas[member.id] = await chamarGemini(pautaConselho, sys);
      setRespostasConselho({ ...novasRespostas });
    }
    setLoadingConselho(false);
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', fontFamily: 'sans-serif', padding: '0.5rem' }}>
      
      {/* HEADER IMPERIAL */}
      <header style={{ backgroundColor: theme.card, border: `1px solid ${theme.gold}`, borderRadius: '4px', padding: '0.5rem 1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: theme.red, padding: '0.4rem', borderRadius: '50%', border: `1px solid ${theme.gold}` }}>
            <Eye color={theme.gold} size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: '1rem', margin: 0, color: theme.gold, fontWeight: 'bold' }}>FAMÍLIA REIS — OLHO DE DEUS</h1>
            <span style={{ fontSize: '0.65rem', color: theme.textMuted }}>Central Única de Inteligência e Controle Unificado</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <input 
            type="password" 
            placeholder="Chave API Gemini"
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}`, color: theme.text, fontSize: '0.7rem', padding: '0.3rem 0.5rem', borderRadius: '4px', width: '130px' }}
          />
        </div>
      </header>

      {/* ABAS */}
      <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.5rem' }}>
        {[{ id: 'geral', label: 'Painel Integrado' }, { id: 'conselho', label: 'Conselho de IA' }].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              backgroundColor: activeTab === tab.id ? theme.gold : theme.card,
              color: activeTab === tab.id ? '#000' : theme.text,
              border: `1px solid ${theme.border}`,
              padding: '0.3rem 0.8rem',
              borderRadius: '4px 4px 0 0',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD INTEGRADO ESTILO EXCEL */}
      {activeTab === 'geral' && (
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '0.5rem' }}>
          
          {/* COLUNA ESQUERDA - CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.gold}`, padding: '0.5rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.6rem', color: theme.textMuted }}>FATURAMENTO CONSOLIDADO</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: theme.gold }}>R$ 315.000,00</div>
            </div>
            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.emerald}`, padding: '0.5rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.6rem', color: theme.textMuted }}>MARGEM LÍQUIDA</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10B981' }}>34.8%</div>
            </div>
            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.red}`, padding: '0.5rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.6rem', color: theme.textMuted }}>ALERTAS CRÍTICOS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: theme.redAccent }}>1 PENDÊNCIA</div>
            </div>
          </div>

          {/* COLUNA DIREITA - GRÁFICOS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '0.5rem', borderRadius: '4px', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: theme.gold, marginBottom: '0.3rem' }}>DESEMPENHO DAS UNIDADES (REALIZADO VS META)</div>
              <div style={{ height: '140px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataDesempenho}>
                    <XAxis dataKey="unidade" stroke={theme.textMuted} fontSize={10} />
                    <YAxis stroke={theme.textMuted} fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: theme.bg, borderColor: theme.border }} />
                    <Bar dataKey="realizado" fill={theme.gold} />
                    <Bar dataKey="meta" fill={theme.red} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '0.5rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: theme.gold }}>DISTRIBUIÇÃO DE RECEITA</div>
              <div style={{ height: '120px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dataReceita} innerRadius={25} outerRadius={45} paddingAngle={4} dataKey="value">
                      {dataReceita.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* PAINEL DO CONSELHO */}
      {activeTab === 'conselho' && (
        <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.gold}`, padding: '0.75rem', borderRadius: '4px' }}>
          <textarea 
            rows={2}
            value={pautaConselho}
            onChange={(e) => setPautaConselho(e.target.value)}
            placeholder="Digite a pauta para o conselho de IA..."
            style={{ width: '100%', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, color: theme.text, padding: '0.4rem', borderRadius: '4px', fontSize: '0.75rem', boxSizing: 'border-box' }}
          />
          <button onClick={convocarConselho} style={{ backgroundColor: theme.gold, color: '#000', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer', marginTop: '0.4rem' }}>
            {loadingConselho ? 'Deliberando...' : 'Consultar Conselho'}
          </button>
        </div>
      )}

    </div>
  );
}
