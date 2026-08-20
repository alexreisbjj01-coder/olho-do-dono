import React, { useState } from 'react';
import { 
  Building2, 
  Globe, 
  Bot, 
  Video, 
  Eye, 
  Briefcase, 
  Users, 
  Megaphone, 
  DollarSign, 
  Scale, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  MessageSquare,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('operacao');
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
    }
  ]);

  // Lançamentos Financeiros Operacionais
  const [lancamentos, setLancamentos] = useState([
    { id: 1, descricao: "Venda Loja de Conveniência", empresa: "loja_conveniencia", bruto: 150.00, cpv: 80.00, taxas: 9.00 }
  ]);

  const [simulacaoInfracao, setSimulacaoInfracao] = useState('');
  const [parecerJuridico, setParecerJuridico] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);

  const theme = {
    bg: '#0A1220',
    card: '#0F1B2D',
    border: '#232B36',
    copper: '#B08159',
    text: '#FFFFFF',
    muted: '#5B6675',
    danger: '#EF4444',
    warning: '#F59E0B'
  };

  // Chamada Gemini API
  const chamarGemini = async (prompt, systemPrompt) => {
    if (!geminiKey) {
      alert("Insira sua chave gratuita da API do Gemini no topo.");
      return null;
    }

    setLoadingIA(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\nOcorrência/Demanda: ${prompt}` }] }]
        })
      });

      const data = await response.json();
      setLoadingIA(false);
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
      }
      return "Erro no retorno da resposta.";
    } catch (err) {
      setLoadingIA(false);
      return "Erro de conexão com API.";
    }
  };

  // Analisar Infração pelo Jurídico
  const analisarOcorrenciaJuridica = async () => {
    if (!simulacaoInfracao) return;
    const sysPrompt = `Você é o Diretor Jurídico e de Compliance do Grupo. Analise a seguinte ocorrência na empresa ${empresaSelecionada.toUpperCase()}. Apresente: 1. Qual legislação brasileira foi violada. 2. Qual o valor estimado da multa ou sanção. 3. Qual a orientação e plano de ação imediato para mitigar o risco legal.`;
    const parecer = await chamarGemini(simulacaoInfracao, sysPrompt);
    setParecerJuridico(parecer);
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', fontFamily: 'sans-serif', padding: '1rem' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.border}`, paddingBottom: '1rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Eye size={32} color={theme.copper} />
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>O Olho do Dono</h1>
            <p style={{ fontSize: '0.75rem', color: theme.muted, margin: 0 }}>Plataforma Executiva Integrada com Compliance Jurídico Ativo</p>
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

      {/* Menu Principal */}
      <nav style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        {[
          { id: 'operacao', label: '1. Unidades Operacionais & Diretorias', icon: Briefcase },
          { id: 'macro', label: '2. Dashboard Macro', icon: Layers },
          { id: 'holding', label: '3. Holding (Uruguai)', icon: Building2 },
          { id: 'fundacao', label: '4. Fundação (Offshore)', icon: Globe },
          { id: 'olho', label: '5. Olho de Deus (Auditoria & Câmeras)', icon: Eye }
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

      {/* VISÃO OPERACIONAL */}
      {activeTab === 'operacao' && (
        <div>
          {/* Seletor de Unidades Operacionais */}
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

          {/* Sub-Navegação dos Setores da Empresa */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
            {[
              { id: 'juridico', label: 'Jurídico & Compliance (Alertas)', icon: Scale },
              { id: 'marketing', label: 'Marketing & Tráfego', icon: Megaphone },
              { id: 'vendas', label: 'Comercial & Vendas', icon: TrendingUp },
              { id: 'financeiro', label: 'Financeiro & DRE', icon: DollarSign },
              { id: 'operacoes', label: 'RH & Operações de Campo', icon: Users }
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

          {/* CONTEÚDO DO SETOR JURÍDICO & COMPLIANCE */}
          {setorSelecionado === 'juridico' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              
              {/* Painel de Alertas em Tempo Real */}
              <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', padding: '1.25rem' }}>
                <h3 style={{ color: theme.copper, marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle color={theme.danger} size={20} />
                  Alertas em Tempo Real da Unidade
                </h3>
                <p style={{ fontSize: '0.85rem', color: theme.muted }}>Monitoramento autônomo de riscos sanitários, fiscais e infrações operacionais.</p>

                <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                  {alertasCompliance
                    .filter(a => a.empresa === empresaSelecionada || empresaSelecionada === 'loja_conveniencia')
                    .map(alerta => (
                      <div key={alerta.id} style={{ backgroundColor: theme.bg, border: `1px solid ${alerta.nivel === 'CRITICO' ? theme.danger : theme.warning}`, padding: '1rem', borderRadius: '0.375rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ color: alerta.nivel === 'CRITICO' ? theme.danger : theme.warning, fontSize: '0.9rem' }}>
                            {alerta.titulo}
                          </strong>
                          <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '0.2rem', backgroundColor: alerta.nivel === 'CRITICO' ? theme.danger : theme.warning, color: '#000', fontWeight: 'bold' }}>
                            {alerta.nivel}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', margin: '0.5rem 0', color: theme.text }}>{alerta.descricao}</p>
                        <div style={{ fontSize: '0.75rem', color: theme.muted, borderTop: `1px solid ${theme.border}`, paddingTop: '0.4rem', marginTop: '0.4rem' }}>
                          <strong>Risco / Multa Estimada:</strong> {alerta.multaEstimada}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Análise de Incidente / Consulta Jurídica Imprópria */}
              <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', padding: '1.25rem' }}>
                <h3 style={{ color: theme.copper, marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Scale size={20} />
                  Simulação & Análise de Ocorrência
                </h3>
                <p style={{ fontSize: '0.85rem', color: theme.muted }}>Relate um fato captado pelas câmeras ou caixas para análise de risco legal imediata.</p>

                <textarea 
                  rows={4}
                  value={simulacaoInfracao}
                  onChange={(e) => setSimulacaoInfracao(e.target.value)}
                  placeholder="Ex: Um funcionário vendeu um maço de cigarro para um menor de idade no caixa às 14h. Qual o risco e o procedimento?"
                  style={{ width: '100%', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, color: theme.text, padding: '0.75rem', borderRadius: '0.375rem', boxSizing: 'border-box', marginBottom: '1rem' }}
                />

                <button 
                  onClick={analisarOcorrenciaJuridica}
                  style={{ backgroundColor: theme.copper, color: theme.text, border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
                >
                  {loadingIA ? 'Jurídico Analisando...' : 'Emitir Parecer Jurídico Imediato'}
                </button>

                {parecerJuridico && (
                  <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: theme.bg, border: `1px solid ${theme.border}`, borderRadius: '0.375rem' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: theme.copper }}>Parecer do Jurídico & Compliance:</h4>
                    <p style={{ fontSize: '0.85rem', whiteSpace: 'pre-line' }}>{parecerJuridico}</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* DEMAIS SETORES */}
          {setorSelecionado !== 'juridico' && (
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '1.25rem', borderRadius: '0.5rem' }}>
              <h3 style={{ color: theme.copper, marginTop: 0, textTransform: 'capitalize' }}>Diretoria de {setorSelecionado}</h3>
              <p style={{ fontSize: '0.85rem', color: theme.muted }}>Estrutura completa e operacional ativa para a unidade selecionada.</p>
            </div>
          )}

        </div>
      )}

      {/* DEMAIS ABAS MACRO */}
      {activeTab !== 'operacao' && (
        <div style={{ backgroundColor: theme.card, padding: '1.25rem', borderRadius: '0.5rem', border: `1px solid ${theme.border}` }}>
          <h2 style={{ color: theme.copper, marginTop: 0 }}>Módulo Consolidado ({activeTab.toUpperCase()})</h2>
          <p style={{ fontSize: '0.85rem', color: theme.muted }}>Todos os dados operacionais e de compliance estão conectados e atualizando este painel em tempo real.</p>
        </div>
      )}

    </div>
  );
}
