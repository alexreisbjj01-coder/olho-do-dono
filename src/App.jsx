import React, { useState } from 'react';
import { 
  Building2, 
  Globe, 
  Bot, 
  Eye, 
  Briefcase, 
  Users, 
  Megaphone, 
  DollarSign, 
  Scale, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  Crown,
  Play
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('conselho');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('loja_conveniencia');
  const [setorSelecionado, setSetorSelecionado] = useState('juridico');
  const [geminiKey, setGeminiKey] = useState('');
  
  // Base de Operações e Prazos Sanitários / Legais
  const [alertasCompliance, setAlertasCompliance] = useState([
    {
      id: 1,
      empresa: "loja_conveniencia",
      tipo: "ALERTA_SANITARIO",
      nivel: "ALTO",
      titulo: "Dedetização Vencida",
      descricao: "Último certificado emitido há mais de 180 dias. Risco de autuação pela Vigilância Sanitária.",
      multaEstimada: "R$ 2.000,00 a R$ 15.000,00 + Risco de Interdição",
      status: "PENDENTE"
    },
    {
      id: 2,
      empresa: "loja_conveniencia",
      tipo: "INFRACAO_OPERACIONAL",
      nivel: "CRITICO",
      titulo: "Tentativa/Registro de Venda Restrita (Cigarro / Bebida)",
      descricao: "Identificado registro de item restrito sem validação de documento de idade no caixa.",
      multaEstimada: "R$ 5.000,00 a R$ 10.000,00 (Art. 243 ECA)",
      status: "ATIVO"
    },
    {
      id: 3,
      empresa: "dedetizadora",
      tipo: "ALERTA_SANITARIO",
      nivel: "ALTO",
      titulo: "Licença Ambiental a Vencer",
      descricao: "Renovação de licença operacional necessária nos próximos 30 dias.",
      multaEstimada: "R$ 10.000,00 + Suspensão do Alvará",
      status: "PENDENTE"
    }
  ]);

  // Lançamentos Financeiros
  const [lancamentos, setLancamentos] = useState([
    { id: 1, descricao: "Venda Loja de Conveniência", empresa: "loja_conveniencia", bruto: 15000.00, cpv: 8000.00, taxas: 900.00 },
    { id: 2, descricao: "Serviço Dedetização Comercial", empresa: "dedetizadora", bruto: 28000.00, cpv: 6000.00, taxas: 1680.00 },
    { id: 3, descricao: "Campanha Mídia Digital", empresa: "midia", bruto: 12000.00, cpv: 2000.00, taxas: 720.00 }
  ]);

  // Estados para Simulação Jurídica
  const [simulacaoInfracao, setSimulacaoInfracao] = useState('');
  const [parecerJuridico, setParecerJuridico] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);

  // Estados para Conselho de Administração de IA
  const [pautaConselho, setPautaConselho] = useState('');
  const [respostasConselho, setRespostasConselho] = useState({});
  const [loadingConselho, setLoadingConselho] = useState(false);

  const theme = {
    bg: '#0A1220',
    card: '#0F1B2D',
    border: '#232B36',
    copper: '#B08159',
    text: '#FFFFFF',
    muted: '#5B6675',
    danger: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981'
  };

  // Conselheiros do Conselho de IA
  const conselheiros = [
    { id: 'ceo', nome: 'CEO Executivo (IA)', papel: 'Visão Estratégica, Escala e Alocação de Capital', icon: Crown },
    { id: 'cfo', nome: 'CFO / Diretor Financeiro (IA)', papel: 'Margens, Lucratividade, Fluxo de Caixa e DRE', icon: DollarSign },
    { id: 'clo', nome: 'CLO / Diretor Jurídico (IA)', papel: 'Compliance Legal, Risco Sanitário, ECA e CLT', icon: Scale },
    { id: 'offshore', nome: 'Especialista Holding & Offshore (IA)', papel: 'Proteção Patrimonial, Royalties e Eficiência Fiscal', icon: Globe }
  ];

  // Chamada de API do Gemini
  const chamarGemini = async (prompt, systemPrompt) => {
    if (!geminiKey) {
      alert("Insira sua chave da API do Gemini no topo.");
      return null;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\nDemanda/Pauta: ${prompt}` }] }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
      }
      return "Erro no retorno da resposta.";
    } catch (err) {
      return "Erro de conexão com API.";
    }
  };

  // Análise de Ocorrência pelo Jurídico
  const analisarOcorrenciaJuridica = async () => {
    if (!simulacaoInfracao) return;
    setLoadingIA(true);
    const sysPrompt = `Você é o Diretor Jurídico e de Compliance do Grupo. Analise a seguinte ocorrência na empresa ${empresaSelecionada.toUpperCase()}. Apresente: 1. Qual legislação brasileira foi violada. 2. Qual o valor estimado da multa ou sanção. 3. Qual a orientação e plano de ação imediato para mitigar o risco legal.`;
    const parecer = await chamarGemini(simulacaoInfracao, sysPrompt);
    setParecerJuridico(parecer);
    setLoadingIA(false);
  };

  // Deliberação do Conselho de IA
  const convocarConselho = async () => {
    if (!pautaConselho) return;
    setLoadingConselho(true);
    setRespostasConselho({});

    const novasRespostas = {};
    for (const member of conselheiros) {
      const sysPrompt = `Você é o ${member.nome} no Conselho de Administração do Grupo. Seu papel é: ${member.papel}. Responda à pauta apresentada de forma executiva, objetiva e direta, apontando riscos, oportunidades e sua recomendação final.`;
      const resposta = await chamarGemini(pautaConselho, sysPrompt);
      novasRespostas[member.id] = resposta;
      setRespostasConselho({ ...novasRespostas });
    }
    setLoadingConselho(false);
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', fontFamily: 'sans-serif', padding: '1rem' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.border}`, paddingBottom: '1rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Eye size={32} color={theme.copper} />
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>O Olho do Dono</h1>
            <p style={{ fontSize: '0.75rem', color: theme.muted, margin: 0 }}>Plataforma Executiva Integrada com Conselho de IA Ativo</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: theme.card, padding: '0.4rem 0.8rem', borderRadius: '0.375rem', border: `1px solid ${theme.border}` }}>
          <Bot size={18} color={theme.copper} />
          <input 
            type="password" 
            placeholder="Chave API Gemini (Grátis)"
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            style={{ backgroundColor: 'transparent', border: 'none', color: theme.text, fontSize: '0.75rem', outline: 'none', width: '180px' }}
          />
        </div>
      </header>

      {/* Navegação Principal */}
      <nav style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        {[
          { id: 'conselho', label: '1. Conselho de IA (Reunião)', icon: Crown },
          { id: 'operacao', label: '2. Unidades Operacionais', icon: Briefcase },
          { id: 'macro', label: '3. Dashboard Macro', icon: Layers },
          { id: 'holding', label: '4. Holding (Uruguai)', icon: Building2 },
          { id: 'fundacao', label: '5. Fundação (Offshore)', icon: Globe },
          { id: 'olho', label: '6. Olho de Deus (Auditoria & Câmeras)', icon: Eye }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: active ? theme.copper : theme.card,
                color: theme.text,
                border: `1px solid ${theme.border}`,
                padding: '0.6rem 1rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: active ? 'bold' : 'normal'
              }}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* 1. REUNIÃO DO CONSELHO DE IA */}
      {activeTab === 'conselho' && (
        <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', padding: '1.25rem' }}>
          <h2 style={{ color: theme.copper, marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Crown color={theme.copper} size={28} />
            Conselho de Administração Multidisciplinar (Agentes IA)
          </h2>
          <p style={{ fontSize: '0.85rem', color: theme.muted, marginBottom: '1.5rem' }}>
            Apresente uma pauta estratégica, investimento ou crise. Os 4 diretores de IA analisarão o caso sob suas perspectivas.
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <textarea 
              rows={3}
              value={pautaConselho}
              onChange={(e) => setPautaConselho(e.target.value)}
              placeholder="Ex: Devemos expandir para a 2ª unidade de loja de conveniência este mês financiada via empréstimo bancário?"
              style={{ width: '100%', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, color: theme.text, padding: '0.75rem', borderRadius: '0.375rem', boxSizing: 'border-box', marginBottom: '1rem' }}
            />
            <button 
              onClick={convocarConselho}
              disabled={loadingConselho}
              style={{ backgroundColor: theme.copper, color: theme.text, border: 'none', padding: '0.8rem 1.5rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Play size={18} />
              {loadingConselho ? 'Conselho em Deliberação...' : 'Convocar Reunião do Conselho'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {conselheiros.map(member => {
              const Icon = member.icon;
              return (
                <div key={member.id} style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}`, padding: '1rem', borderRadius: '0.375rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Icon color={theme.copper} size={20} />
                    <strong style={{ fontSize: '0.9rem', color: theme.copper }}>{member.nome}</strong>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: theme.muted, margin: '0 0 1rem 0' }}>{member.papel}</p>
                  
                  {respostasConselho[member.id] ? (
                    <div style={{ fontSize: '0.8rem', color: theme.text, whiteSpace: 'pre-line', borderTop: `1px solid ${theme.border}`, paddingTop: '0.5rem' }}>
                      {respostasConselho[member.id]}
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: theme.muted, fontStyle: 'italic' }}>
                      {loadingConselho ? 'Aguardando parecer...' : 'Aguardando pauta para deliberação.'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. VISÃO OPERACIONAL */}
      {activeTab === 'operacao' && (
        <div>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {[
              { id: 'loja_conveniencia', label: '🏪 Loja de Conveniência / Comércio' },
              { id: 'dedetizadora', label: '🏢 Dedetizadora & Limpeza' },
              { id: 'midia', label: '🎬 Unidade Mídia Digital' }
            ].map(unidade => (
              <button 
                key={unidade.id}
                onClick={() => setEmpresaSelecionada(unidade.id)}
                style={{ 
                  backgroundColor: empresaSelecionada === unidade.id ? theme.copper : theme.card, 
                  color: theme.text, 
                  border: `1px solid ${theme.border}`, 
                  padding: '0.6rem 1.2rem', 
                  borderRadius: '0.375rem', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
              >
                {unidade.label}
              </button>
            ))}
          </div>

          <h2 style={{ color: theme.copper, marginTop: 0 }}>
            Organograma Ativo: {empresaSelecionada.replace('_', ' ').toUpperCase()}
          </h2>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
            {[
              { id: 'juridico', label: 'Jurídico & Compliance', icon: Scale },
              { id: 'marketing', label: 'Marketing & Tráfego', icon: Megaphone },
              { id: 'vendas', label: 'Comercial & Vendas', icon: TrendingUp },
              { id: 'financeiro', label: 'Financeiro & DRE', icon: DollarSign },
              { id: 'operacoes', label: 'RH & Operações', icon: Users }
            ].map(setor => {
              const Icon = setor.icon;
              const active = setorSelecionado === setor.id;
              return (
                <button
                  key={setor.id}
                  onClick={() => setSetorSelecionado(setor.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    backgroundColor: active ? theme.copper : theme.card,
                    color: theme.text,
                    border: `1px solid ${theme.border}`,
                    padding: '0.5rem 0.8rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Icon size={16} />
                  {setor.label}
                </button>
              );
            })}
          </div>

          {/* JURÍDICO & COMPLIANCE */}
          {setorSelecionado === 'juridico' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', padding: '1.25rem' }}>
                <h3 style={{ color: theme.copper, marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle color={theme.danger} size={20} />
                  Alertas da Unidade Selecionada
                </h3>
                <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                  {alertasCompliance
                    .filter(a => a.empresa === empresaSelecionada)
                    .map(alerta => (
                      <div key={alerta.id} style={{ backgroundColor: theme.bg, border: `1px solid ${alerta.nivel === 'CRITICO' ? theme.danger : theme.warning}`, padding: '1rem', borderRadius: '0.375rem' }}>
                        <strong style={{ color: alerta.nivel === 'CRITICO' ? theme.danger : theme.warning, fontSize: '0.9rem' }}>
                          {alerta.titulo}
                        </strong>
                        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0', color: theme.text }}>{alerta.descricao}</p>
                        <div style={{ fontSize: '0.75rem', color: theme.muted }}>
                          <strong>Multa Estimada:</strong> {alerta.multaEstimada}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', padding: '1.25rem' }}>
                <h3 style={{ color: theme.copper, marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Scale size={20} />
                  Análise de Ocorrência Jurídica
                </h3>
                <textarea 
                  rows={4}
                  value={simulacaoInfracao}
                  onChange={(e) => setSimulacaoInfracao(e.target.value)}
                  placeholder="Relate um fato para emissão de parecer legal imediato..."
                  style={{ width: '100%', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, color: theme.text, padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', boxSizing: 'border-box' }}
                />
                <button 
                  onClick={analisarOcorrenciaJuridica}
                  style={{ backgroundColor: theme.copper, color: theme.text, border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
                >
                  {loadingIA ? 'Analisando...' : 'Emitir Parecer Jurídico'}
                </button>
                {parecerJuridico && (
                  <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, borderRadius: '0.375rem' }}>
                    <p style={{ fontSize: '0.85rem', whiteSpace: 'pre-line' }}>{parecerJuridico}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DEMAIS SETORES */}
          {setorSelecionado === 'marketing' && (
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '1.25rem', borderRadius: '0.5rem' }}>
              <h3 style={{ color: theme.copper, marginTop: 0 }}>Gestão de Marketing & Tráfego Pago</h3>
              <p style={{ color: theme.muted, fontSize: '0.85rem' }}>Métricas de campanhas ativas para a unidade selecionada.</p>
            </div>
          )}

          {setorSelecionado === 'vendas' && (
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '1.25rem', borderRadius: '0.5rem' }}>
              <h3 style={{ color: theme.copper, marginTop: 0 }}>Comercial & Metas de Vendas</h3>
              <p style={{ color: theme.muted, fontSize: '0.85rem' }}>Acompanhamento de faturamento diário vs. meta.</p>
            </div>
          )}

          {setorSelecionado === 'financeiro' && (
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '1.25rem', borderRadius: '0.5rem' }}>
              <h3 style={{ color: theme.copper, marginTop: 0 }}>DRE Operacional da Unidade</h3>
              {lancamentos
                .filter(l => l.empresa === empresaSelecionada)
                .map(l => (
                  <div key={l.id} style={{ backgroundColor: theme.bg, padding: '1rem', borderRadius: '0.375rem', marginTop: '1rem' }}>
                    <div><strong>Receita Bruta:</strong> R$ {l.bruto.toFixed(2)}</div>
                    <div><strong>CPV / Custos:</strong> - R$ {l.cpv.toFixed(2)}</div>
                    <div><strong>Impostos (6%):</strong> - R$ {l.taxas.toFixed(2)}</div>
                    <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '0.5rem', marginTop: '0.5rem', color: theme.success }}>
                      <strong>Margem Líquida:</strong> R$ {(l.bruto - l.cpv - l.taxas).toFixed(2)}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {setorSelecionado === 'operacoes' && (
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '1.25rem', borderRadius: '0.5rem' }}>
              <h3 style={{ color: theme.copper, marginTop: 0 }}>RH & Operações de Campo</h3>
              <p style={{ color: theme.muted, fontSize: '0.85rem' }}>Gestão de turnos, escala e rotinas de compliance operacional.</p>
            </div>
          )}
        </div>
      )}

      {/* 3. DASHBOARD MACRO */}
      {activeTab === 'macro' && (
        <div style={{ backgroundColor: theme.card, padding: '1.25rem', borderRadius: '0.5rem', border: `1px solid ${theme.border}` }}>
          <h2 style={{ color: theme.copper, marginTop: 0 }}>Dashboard Macro Consolidado</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ backgroundColor: theme.bg, padding: '1rem', borderRadius: '0.375rem' }}>
              <span style={{ color: theme.muted, fontSize: '0.8rem' }}>Faturamento Total</span>
              <h3 style={{ margin: '0.2rem 0 0 0', color: theme.copper }}>R$ 55.000,00</h3>
            </div>
            <div style={{ backgroundColor: theme.bg, padding: '1rem', borderRadius: '0.375rem' }}>
              <span style={{ color: theme.muted, fontSize: '0.8rem' }}>Lucro Operacional</span>
              <h3 style={{ margin: '0.2rem 0 0 0', color: theme.success }}>R$ 21.400,00</h3>
            </div>
          </div>
        </div>
      )}

      {/* 4. HOLDING URUGUAI */}
      {activeTab === 'holding' && (
        <div style={{ backgroundColor: theme.card, padding: '1.25rem', borderRadius: '0.5rem', border: `1px solid ${theme.border}` }}>
          <h2 style={{ color: theme.copper, marginTop: 0 }}>Holding Internacional (Uruguai)</h2>
          <p style={{ fontSize: '0.85rem', color: theme.muted }}>Gestão de licenciamento de marcas e remessa de royalties.</p>
        </div>
      )}

      {/* 5. FUNDAÇÃO OFFSHORE */}
      {activeTab === 'fundacao' && (
        <div style={{ backgroundColor: theme.card, padding: '1.25rem', borderRadius: '0.5rem', border: `1px solid ${theme.border}` }}>
          <h2 style={{ color: theme.copper, marginTop: 0 }}>Fundação Patrimonial Offshore</h2>
          <p style={{ fontSize: '0.85rem', color: theme.muted }}>Camada de proteção de ativos e governança sucessória imutável.</p>
        </div>
      )}

      {/* 6. OLHO DE DEUS */}
      {activeTab === 'olho' && (
        <div style={{ backgroundColor: theme.card, padding: '1.25rem', borderRadius: '0.5rem', border: `1px solid ${theme.border}` }}>
          <h2 style={{ color: theme.copper, marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Eye color={theme.copper} size={24} />
            Olho de Deus (Auditoria & Câmeras)
          </h2>
          <p style={{ fontSize: '0.85rem', color: theme.muted }}>Monitoramento em tempo real dos caixas e vídeo inteligência.</p>
        </div>
      )}

    </div>
  );
}
