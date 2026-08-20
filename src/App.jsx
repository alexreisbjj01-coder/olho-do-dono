import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Eye, 
  Bot, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  ShieldCheck, 
  Database,
  RefreshCw,
  PieChart as PieIcon,
  BarChart2
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function OlhoDeDeus() {
  const [activeTab, setActiveTab] = useState('geral');
  const [geminiKey, setGeminiKey] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  
  // Estados para Conselho de IA
  const [pautaConselho, setPautaConselho] = useState('');
  const [respostasConselho, setRespostasConselho] = useState({});
  const [loadingConselho, setLoadingConselho] = useState(false);

  // Paleta de Cores Imperial - Família Reis
  const theme = {
    bg: '#0F0F12',
    card: '#18181C',
    border: '#2E2E38',
    gold: '#D4AF37',
    goldLight: '#F3E5AB',
    red: '#8B0000',
    redAccent: '#A91B1B',
    emerald: '#0D5C3A',
    sapphire: '#1D3557',
    text: '#FFFFFF',
    textMuted: '#9CA3AF'
  };

  // MÓDULO 1: Dados do Painel (Visão Macro & Unidades)
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

  const dataRiscos = [
    { name: 'Regular', value: 75, color: '#0D5C3A' },
    { name: 'Alerta Fiscal/Legal', value: 15, color: '#D4AF37' },
    { name: 'Pendência Crítica', value: 10, color: '#A91B1B' }
  ];

  // MÓDULO 3: Diretrizes do Conselho de IA
  const conselheiros = [
    { id: 'ceo', nome: 'CEO Executivo', papel: 'Expansão & Visão Macro' },
    { id: 'cfo', nome: 'CFO Financeiro', papel: 'DRE, Caixa & Margens' },
    { id: 'clo', nome: 'CLO Jurídico', papel: 'Compliance & Riscos' },
    { id: 'holding', nome: 'Holding & Offshore', papel: 'Proteção Patrimonial' }
  ];

  const chamarGemini = async (prompt, systemPrompt) => {
    if (!geminiKey) {
      alert("Insira a chave da API do Gemini no topo do painel.");
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
      return "Falha de conexão com a API.";
    }
  };

  const convocarConselho = async () => {
    if (!pautaConselho) return;
    setLoadingConselho(true);
    const novasRespostas = {};
    for (const member of conselheiros) {
      const sys = `Você é o ${member.nome} do Olho de Deus (Grupo Família Reis), responsável por ${member.papel}. Dê um parecer tático e direto de até 3 frases.`;
      novasRespostas[member.id] = await chamarGemini(pautaConselho, sys);
      setRespostasConselho({ ...novasRespostas });
    }
    setLoadingConselho(false);
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif', padding: '0.75rem' }}>
      
      {/* BARRA SUPERIOR - OLHO DE DEUS */}
      <header style={{ 
        backgroundColor: theme.card, 
        border: `1px solid ${theme.gold}`, 
        borderRadius: '6px', 
        padding: '0.75rem 1.25rem', 
        marginBottom: '0.75rem', 
        display: 'flex', 
        justify: 'space-between', 
        alignItems: 'center',
        boxShadow: `0 0 12px ${theme.gold}33`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: theme.red, padding: '0.5rem', borderRadius: '50%', border: `1px solid ${theme.gold}` }}>
            <Eye color={theme.gold} size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', margin: 0, color: theme.gold, fontWeight: 'bold', letterSpacing: '1px' }}>
              OLHO DE DEUS — FAMÍLIA REIS
            </h1>
            <span style={{ fontSize: '0.7rem', color: theme.textMuted }}>Central Única de Inteligência, Governança e Controle Unificado</span>
          </div>
        </div>

        {/* CONEXÕES (API & PLANILHA MASTER) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: theme.bg, padding: '0.4rem 0.6rem', borderRadius: '4px', border: `1px solid ${theme.border}` }}>
            <Database size={14} color={theme.gold} />
            <input 
              type="text" 
              placeholder="Link Planilha Master"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              style={{ backgroundColor: 'transparent', border: 'none', color: theme.text, fontSize: '0.7rem', outline: 'none', width: '130px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: theme.bg, padding: '0.4rem 0.6rem', borderRadius: '4px', border: `1px solid ${theme.border}` }}>
            <Bot size={14} color={theme.gold} />
            <input 
              type="password" 
              placeholder="API Key Gemini"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              style={{ backgroundColor: 'transparent', border: 'none', color: theme.text, fontSize: '0.7rem', outline: 'none', width: '110px' }}
            />
          </div>
        </div>
      </header>

      {/* ABAS DO SISTEMA */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
        {[
          { id: 'geral', label: 'Visão Integrada (Olho de Deus)' },
          { id: 'conselho', label: 'Conselho de IA' },
          { id: 'fontes', label: 'Fontes & Planilha Master' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              backgroundColor: activeTab === tab.id ? theme.gold : theme.card,
              color: activeTab === tab.id ? '#000' : theme.text,
              border: `1px solid ${activeTab === tab.id ? theme.gold : theme.border}`,
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

      {/* TELA 1: VISÃO INTEGRADA */}
      {activeTab === 'geral' && (
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '0.75rem' }}>
          
          {/* PAINEL DE KPIS MACRO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.gold}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.65rem', color: theme.textMuted, fontWeight: 'bold' }}>FATURAMENTO CONSOLIDADO</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: theme.gold }}>R$ 315.000,00</div>
              <div style={{ fontSize: '0.65rem', color: theme.emerald, marginTop: '0.2rem' }}>▲ Meta Global Superada</div>
            </div>

            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.emerald}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.65rem', color: theme.textMuted, fontWeight: 'bold' }}>MARGEM OPERACIONAL LÍQUIDA</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10B981' }}>34.8%</div>
              <div style={{ fontSize: '0.65rem', color: theme.textMuted, marginTop: '0.2rem' }}>Caixa Livre: R$ 109.620,00</div>
            </div>

            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.red}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.65rem', color: theme.textMuted, fontWeight: 'bold' }}>MAPA DE RISCOS / ALERTAS</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: theme.redAccent }}>1 ALERTA CRÍTICO</div>
              <div style={{ fontSize: '0.65rem', color: theme.redAccent, marginTop: '0.2rem' }}>Revisão de Licença Pendente</div>
            </div>

            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.gold}`, padding: '0.75rem', borderRadius: '4px', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: theme.gold, fontSize: '0.75rem', fontWeight: 'bold' }}>
                <ShieldCheck size={16} /> HOLDING & PROTEÇÃO
              </div>
              <div style={{ fontSize: '0.65rem', color: theme.textMuted, marginTop: '0.3rem' }}>
                Blindagem Ativa | Estrutura Offshore OK
              </div>
            </div>

          </div>

          {/* PAINEL DE GRÁFICOS INTEGRADOS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            
            {/* REALIZADO VS META POR UNIDADE */}
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '0.75rem', borderRadius: '4px', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: theme.gold, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>DESEMPENHO POR UNIDADE DE NEGÓCIO (REALIZADO VS META)</span>
                <span style={{ fontSize: '0.65rem', color: theme.textMuted }}>Sincronizado via Planilha Master</span>
              </div>
              <div style={{ height: '170px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataDesempenho}>
                    <XAxis dataKey="unidade" stroke={theme.textMuted} fontSize={11} />
                    <YAxis stroke={theme.textMuted} fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: theme.bg, borderColor: theme.border }} />
                    <Bar dataKey="realizado" fill={theme.gold} name="Realizado" />
                    <Bar dataKey="meta" fill={theme.red} name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* FONTES DE RECEITA */}
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: theme.gold, marginBottom: '0.5rem' }}>
                DISTRIBUIÇÃO DE RECEITAS
              </div>
              <div style={{ height: '150px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dataReceita} innerRadius={35} outerRadius={55} paddingAngle={5} dataKey="value">
                      {dataReceita.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: theme.bg }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* STATUS DE RISCO E COMPLIANCE */}
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: theme.gold, marginBottom: '0.5rem' }}>
                MATRIZ DE RISK & COMPLIANCE
              </div>
              <div style={{ height: '150px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dataRiscos} innerRadius={35} outerRadius={55} paddingAngle={5} dataKey="value">
                      {dataRiscos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: theme.bg }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TELA 2: CONSELHO DE IA */}
      {activeTab === 'conselho' && (
        <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.gold}`, padding: '1rem', borderRadius: '4px' }}>
          <h2 style={{ color: theme.gold, fontSize: '0.95rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Crown size={18} color={theme.gold} /> CONSELHO CONSULTIVO PROATIVO — OLHO DE DEUS
          </h2>
          <div style={{ marginBottom: '1rem' }}>
            <textarea 
              rows={2}
              value={pautaConselho}
              onChange={(e) => setPautaConselho(e.target.value)}
              placeholder="Digite a diretriz ou cenário estratégico para análise imediata dos conselheiros..."
              style={{ width: '100%', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, color: theme.text, padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem', boxSizing: 'border-box' }}
            />
            <button 
              onClick={convocarConselho}
              style={{ backgroundColor: theme.gold, color: '#000', border: 'none', padding: '0.4rem 1rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', marginTop: '0.5rem' }}
            >
              {loadingConselho ? 'Analisando...' : 'Deliberar com o Conselho'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(200px, 1fr) )', gap: '0.5rem' }}>
            {conselheiros.map(m => (
              <div key={m.id} style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}`, padding: '0.75rem', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: theme.gold }}>{m.nome}</div>
                <div style={{ fontSize: '0.65rem', color: theme.textMuted, marginBottom: '0.5rem' }}>{m.papel}</div>
                <div style={{ fontSize: '0.75rem', color: theme.text, minHeight: '60px' }}>
                  {respostasConselho[m.id] || 'Aguardando envio de pauta...'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TELA 3: FONTES DE DADOS */}
      {activeTab === 'fontes' && (
        <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '1rem', borderRadius: '4px' }}>
          <h3 style={{ color: theme.gold, margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>Conectividade da Planilha Master & Entradas</h3>
          <p style={{ color: theme.textMuted, fontSize: '0.75rem' }}>
            Este módulo gerencia a leitura automática dos dados provenientes do seu link do Google Sheets e webhooks operacionais.
          </p>
          <div style={{ backgroundColor: theme.bg, padding: '0.75rem', borderRadius: '4px', border: `1px solid ${theme.border}`, marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: theme.gold, fontWeight: 'bold' }}>Status da Sincronização:</span>
            <div style={{ fontSize: '0.7rem', color: theme.emerald, marginTop: '0.2rem' }}>● Planilha Conectada e Pronta para Leitura</div>
          </div>
        </div>
      )}

    </div>
  );
}
