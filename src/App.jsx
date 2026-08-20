import React, { useState } from 'react';
import { 
  Crown, 
  Eye, 
  Bot, 
  Building2, 
  Scale, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  Play,
  ShieldCheck,
  ChevronRight
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

export default function App() {
  const [activeTab, setActiveTab] = useState('geral');
  const [geminiKey, setGeminiKey] = useState('');
  
  // Estados para Conselho de IA
  const [pautaConselho, setPautaConselho] = useState('');
  const [respostasConselho, setRespostasConselho] = useState({});
  const [loadingConselho, setLoadingConselho] = useState(false);

  // Paleta de Cores inspirada no Brasão Família Reis
  const theme = {
    bg: '#0F0F12',
    card: '#18181C',
    cardHeader: '#222228',
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

  // Dados para Gráficos Estilo Excel
  const dataVendasMes = [
    { mes: 'Jan', realizado: 45000, meta: 40000 },
    { mes: 'Fev', realizado: 52000, meta: 45000 },
    { mes: 'Mar', realizado: 48000, meta: 50000 },
    { mes: 'Abr', realizado: 61000, meta: 52000 },
    { mes: 'Mai', realizado: 55000, meta: 55000 }
  ];

  const dataTopVendedoras = [
    { name: 'Unidade Conveniência', value: 40, color: '#D4AF37' },
    { name: 'Unidade Dedetização', value: 35, color: '#8B0000' },
    { name: 'Unidade Mídia', value: 25, color: '#0D5C3A' }
  ];

  const dataTopRegiao = [
    { name: 'Loja 01 (Centro)', value: 50, color: '#D4AF37' },
    { name: 'Loja 02 (Bairro)', value: 30, color: '#1D3557' },
    { name: 'Serviços Online', value: 20, color: '#A91B1B' }
  ];

  const conselheiros = [
    { id: 'ceo', nome: 'CEO Executivo', papel: 'Estratégia & Capital' },
    { id: 'cfo', nome: 'CFO Financeiro', papel: 'DRE & Margens' },
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
        body: JSON.stringify({ contents: [{ parts: [{ text: `${systemPrompt}\n\nDemand: ${prompt}` }] }] })
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
      const sys = `Você é o ${member.nome} do Grupo Família Reis (${member.papel}). Dê um parecer direto em até 3 frases sobre a pauta do conselho.`;
      novasRespostas[member.id] = await chamarGemini(pautaConselho, sys);
      setRespostasConselho({ ...novasRespostas });
    }
    setLoadingConselho(false);
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif', padding: '0.75rem' }}>
      
      {/* BARRA SUPERIOR IMPERIAL */}
      <header style={{ 
        backgroundColor: theme.card, 
        border: `1px solid ${theme.gold}`, 
        borderRadius: '6px', 
        padding: '0.75rem 1.25rem', 
        marginBottom: '0.75rem', 
        display: 'flex', 
        justify: 'space-between', 
        alignItems: 'center',
        boxShadow: `0 0 10px ${theme.gold}22`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: theme.red, padding: '0.5rem', borderRadius: '50%', border: `1px solid ${theme.gold}` }}>
            <Crown color={theme.gold} size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', margin: 0, color: theme.gold, fontWeight: 'bold', tracking: '1px' }}>
              FAMÍLIA REIS — O OLHO DO DONO
            </h1>
            <span style={{ fontSize: '0.7rem', color: theme.textMuted }}>Painel Integrado de Governança e Inteligência Operacional</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: theme.bg, padding: '0.4rem 0.8rem', borderRadius: '4px', border: `1px solid ${theme.border}` }}>
            <Bot size={16} color={theme.gold} />
            <input 
              type="password" 
              placeholder="Chave API Gemini"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              style={{ backgroundColor: 'transparent', border: 'none', color: theme.text, fontSize: '0.75rem', outline: 'none', width: '150px' }}
            />
          </div>
        </div>
      </header>

      {/* MENU DE ABAS ESTILO SPREADSHEET */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem', overflowX: 'auto' }}>
        {[
          { id: 'geral', label: 'Dashboard Integrado' },
          { id: 'conselho', label: 'Conselho de IA' },
          { id: 'juridico', label: 'Compliance & Jurídico' },
          { id: 'holding', label: 'Holding & Offshore' }
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

      {/* PAINEL PRINCIPAL INTEGRADO (TUDO NA MESMA TELA) */}
      {activeTab === 'geral' && (
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '0.75rem' }}>
          
          {/* COLUNA ESQUERDA: CARTÕES DE KPI (INDICADORES) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.gold}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: theme.textMuted }}>VENDAS TOTAIS / META</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: theme.gold }}>R$ 261.000 / <span style={{ fontSize: '0.9rem', color: theme.textMuted }}>R$ 242.000</span></div>
              <div style={{ fontSize: '0.65rem', color: theme.emerald, marginTop: '0.2rem' }}>▲ 7.8% acima da meta prevista</div>
            </div>

            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.emerald}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: theme.textMuted }}>LUCRO LÍQUIDO OPERACIONAL</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10B981' }}>R$ 84.300</div>
              <div style={{ fontSize: '0.65rem', color: theme.textMuted, marginTop: '0.2rem' }}>Margem Média: 32.2%</div>
            </div>

            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.red}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: theme.textMuted }}>ALERTAS DE COMPLIANCE</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: theme.redAccent }}>2 PENDÊNCIAS</div>
              <div style={{ fontSize: '0.65rem', color: theme.redAccent, marginTop: '0.2rem' }}>Vigilância Sanitária / Licença</div>
            </div>

            <div style={{ backgroundColor: theme.card, borderLeft: `4px solid ${theme.sapphire}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: theme.textMuted }}>TICKET MÉDIO GRUPO</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: theme.text }}>R$ 1.850,00</div>
              <div style={{ fontSize: '0.65rem', color: theme.textMuted, marginTop: '0.2rem' }}>Base: 141 transações</div>
            </div>

            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.gold}`, padding: '0.75rem', borderRadius: '4px', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: theme.gold, fontSize: '0.8rem', fontWeight: 'bold' }}>
                <ShieldCheck size={16} /> Status Holding
              </div>
              <div style={{ fontSize: '0.7rem', color: theme.textMuted, marginTop: '0.3rem' }}>
                Ativos Protegidos: Uruguai / Offshore OK
              </div>
            </div>

          </div>

          {/* COLUNA DIREITA: GRÁFICOS INTEGRADOS (ESTILO DASHBOARD EXCEL) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            
            {/* GRÁFICO 1: EVOLUÇÃO DE VENDAS VS META */}
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '0.75rem', borderRadius: '4px', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: theme.gold, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>DESEMPENHO MENSUAL DAS UNIDADES (REALIZADO VS META)</span>
                <span style={{ fontSize: '0.65rem', color: theme.textMuted }}>Valores em BRL (R$)</span>
              </div>
              <div style={{ height: '180px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataVendasMes}>
                    <XAxis dataKey="mes" stroke={theme.textMuted} fontSize={12} />
                    <YAxis stroke={theme.textMuted} fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: theme.bg, borderColor: theme.border }} />
                    <Bar dataKey="realizado" fill={theme.gold} name="Realizado" />
                    <Bar dataKey="meta" fill={theme.red} name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* GRÁFICO 2: PARTICIPAÇÃO POR UNIDADE */}
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: theme.gold, marginBottom: '0.5rem' }}>
                RECEITA POR UNIDADE DE NEGÓCIO
              </div>
              <div style={{ height: '160px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dataTopVendedoras} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                      {dataTopVendedoras.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: theme.bg }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ fontSize: '0.65rem', display: 'flex', justifyContent: 'space-around', color: theme.textMuted }}>
                <span style={{ color: theme.gold }}>■ Conveniência</span>
                <span style={{ color: theme.red }}>■ Dedetização</span>
                <span style={{ color: theme.emerald }}>■ Mídia</span>
              </div>
            </div>

            {/* GRÁFICO 3: DISTRIBUIÇÃO REGIONAL / CANAL */}
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '0.75rem', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: theme.gold, marginBottom: '0.5rem' }}>
                DISTRIBUIÇÃO POR CANAL DE OPERAÇÃO
              </div>
              <div style={{ height: '160px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dataTopRegiao} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                      {dataTopRegiao.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: theme.bg }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ fontSize: '0.65rem', display: 'flex', justifyContent: 'space-around', color: theme.textMuted }}>
                <span style={{ color: theme.gold }}>■ Loja Centro</span>
                <span style={{ color: theme.sapphire }}>■ Loja Bairro</span>
                <span style={{ color: theme.redAccent }}>■ Online</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ABA CONSELHO DE IA */}
      {activeTab === 'conselho' && (
        <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.gold}`, padding: '1rem', borderRadius: '4px' }}>
          <h2 style={{ color: theme.gold, fontSize: '1rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Crown size={20} color={theme.gold} /> REUNIÃO DO CONSELHO DE IA — FAMÍLIA REIS
          </h2>
          <div style={{ marginBottom: '1rem' }}>
            <textarea 
              rows={2}
              value={pautaConselho}
              onChange={(e) => setPautaConselho(e.target.value)}
              placeholder="Digite a pauta ou decisão estratégica para consulta aos diretores de IA..."
              style={{ width: '100%', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, color: theme.text, padding: '0.5rem', borderRadius: '4px', fontSize: '0.8rem', boxSizing: 'border-box' }}
            />
            <button 
              onClick={convocarConselho}
              style={{ backgroundColor: theme.gold, color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', marginTop: '0.5rem' }}
            >
              {loadingConselho ? 'Deliberando...' : 'Consultar Conselho'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(200px, 1fr) )', gap: '0.5rem' }}>
            {conselheiros.map(m => (
              <div key={m.id} style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}`, padding: '0.75rem', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: theme.gold }}>{m.nome}</div>
                <div style={{ fontSize: '0.65rem', color: theme.textMuted, marginBottom: '0.5rem' }}>{m.papel}</div>
                <div style={{ fontSize: '0.75rem', color: theme.text }}>
                  {respostasConselho[m.id] || 'Aguardando pauta...'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DEMAIS ABAS (JURÍDICO E HOLDING) */}
      {(activeTab === 'juridico' || activeTab === 'holding') && (
        <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '1rem', borderRadius: '4px', fontSize: '0.85rem' }}>
          <h3 style={{ color: theme.gold, margin: '0 0 0.5rem 0' }}>Módulo de {activeTab.toUpperCase()}</h3>
          <p style={{ color: theme.textMuted }}>Estrutura ativa e monitorada sob as diretrizes do Grupo Família Reis.</p>
        </div>
      )}

    </div>
  );
}
