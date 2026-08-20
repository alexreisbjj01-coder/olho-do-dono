import React, { useState } from 'react';
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  Bot, 
  Video, 
  Eye, 
  DollarSign, 
  Scale, 
  AlertTriangle, 
  Volume2, 
  CheckCircle,
  Play
} from 'lucide-react';

const SUPABASE_URL = "https://enhouyxocieotynybmcl.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

export default function App() {
  const [activeTab, setActiveTab] = useState('macro');
  const [juridicoInput, setJuridicoInput] = useState('');
  const [juridicoResultado, setJuridicoResultado] = useState(null);
  const [complianceAviso, setComplianceAviso] = useState('');

  // Estilos do Tema Executivo
  const theme = {
    bg: '#0A1220',
    card: '#0F1B2D',
    border: '#232B36',
    copper: '#B08159',
    text: '#FFFFFF',
    muted: '#5B6675'
  };

  // Módulo de Compliance / Triagem
  const checarCompliance = (texto) => {
    const termosRisco = ['sonegar', 'sem nota', 'pejotização', 'sem carteira', 'direitos autorais', 'e-ca'];
    const encontrou = termosRisco.find(termo => texto.toLowerCase().includes(termo));
    if (encontrou) {
      setComplianceAviso(`Atenção Compliance: O termo "${encontrou}" acionou um bloqueio heurístico. Mantenha as operações em conformidade legal.`);
      return false;
    }
    setComplianceAviso('');
    return true;
  };

  // Analisar Ocorrência Jurídica
  const analisarOcorrencia = () => {
    if (!checarCompliance(juridicoInput)) return;
    
    setJuridicoResultado({
      areas: ['Direito Tributário', 'Direito Societário'],
      riscos: 'Risco de reclassificação fiscal e sanções administrativas na operação.',
      acoes: [
        'Isolar a contingência na Holding (Uruguai).',
        'Submeter documentação para validação de advogado tributarista local.',
        'Ajustar emissão de notas fiscais no CNPJ Operacional Serviços (Brasil).'
      ]
    });
  };

  // Leitura de Voz do Olho de Deus
  const falarRelatorio = (texto) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Recurso de voz não suportado neste navegador.');
    }
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', fontFamily: 'sans-serif', padding: '1rem' }}>
      
      {/* Topbar / Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.border}`, paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Eye size={32} color={theme.copper} />
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>O Olho do Dono</h1>
            <p style={{ fontSize: '0.75rem', color: theme.muted, margin: 0 }}>Painel Executivo de Governança Multiempresarial</p>
          </div>
        </div>
      </header>

      {/* Navegação por Módulos */}
      <nav style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        {[
          { id: 'macro', label: 'Dashboard Macro', icon: DollarSign },
          { id: 'juridico', label: 'Biblioteca & Assistente Jurídico', icon: Scale },
          { id: 'conselho', label: 'Conselho IA', icon: Bot },
          { id: 'midia', label: 'Mídia Faceless', icon: Video },
          { id: 'olho', label: 'Olho de Deus', icon: Eye }
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

      {/* 1. DASHBOARD MACRO */}
      {activeTab === 'macro' && (
        <div>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: theme.copper }}>Estrutura do Grupo Econômico (4 Camadas)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            
            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: theme.copper, fontWeight: 'bold' }}>1. FUNDAÇÃO (Abu Dhabi / Cayman)</span>
              <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>$ 120.000,00 USD</h3>
              <p style={{ fontSize: '0.8rem', color: theme.muted, margin: 0 }}>Carteira de Ações e Ativos Internacionais</p>
            </div>

            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: theme.copper, fontWeight: 'bold' }}>2. HOLDING (Uruguai)</span>
              <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>$ 45.000,00 USD</h3>
              <p style={{ fontSize: '0.8rem', color: theme.muted, margin: 0 }}>Concentração de Lucros & Dividendos</p>
            </div>

            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: theme.copper, fontWeight: 'bold' }}>3. CNPJ SERVIÇOS (Brasil)</span>
              <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>R$ 85.000,00</h3>
              <p style={{ fontSize: '0.8rem', color: theme.muted, margin: 0 }}>Dedetização, Fachadas & Caixas d'Água</p>
            </div>

            <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', padding: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: theme.copper, fontWeight: 'bold' }}>4. CNPJ MÍDIA (Brasil)</span>
              <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>R$ 32.000,00</h3>
              <p style={{ fontSize: '0.8rem', color: theme.muted, margin: 0 }}>YouTube, Instagram Faceless & Afiliados</p>
            </div>

          </div>
        </div>
      )}

      {/* 2. JURÍDICO & COMPLIANCE */}
      {activeTab === 'juridico' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          
          <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: '0.5rem', padding: '1.25rem' }}>
            <h2 style={{ fontSize: '1.1rem', color: theme.copper, marginTop: 0 }}>Assistente Jurídico Universal</h2>
            <p style={{ fontSize: '0.85rem', color: theme.muted }}>Descreva qualquer fato ou ocorrência (trabalhista, fiscal, contratual) para triagem prévia:</p>
            
            <textarea
              rows={4}
              value={juridicoInput}
              onChange={(e) => setJuridicoInput(e.target.value)}
              placeholder="Ex: Prestador de serviço pedindo vínculo empregatício no Brasil..."
              style={{ width: '100%', backgroundColor: theme.bg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '0.375rem', padding: '0.75rem', boxSizing: 'border-box', marginBottom: '0.75rem' }}
            />

            {complianceAviso && (
              <div style={{ backgroundColor: '#3b1212', border: '1px solid #7f1d1d', color: '#fca5a5', padding: '0.75rem', borderRadius: '0.375rem', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                <AlertTriangle size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                {complianceAviso}
              </div>
            )}

            <button
              onClick={analisarOcorrencia}
              style={{ backgroundColor: theme.copper, color: theme.text, border: 'none', padding: '0.6rem 1.2rem', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Analisar Risco Jurídico
            </button>

            {juridicoResultado && (
              <div style={{ marginTop: '1.25rem', borderTop: `1px solid ${theme.border}`, paddingTop: '1rem' }}>
                <h3 style={{ fontSize: '0.95rem', margin: '0 0 0.5rem 0' }}>Áreas Envolvidas: {juridicoResultado.areas.join(', ')}</h3>
                <p style={{ fontSize: '0.85rem', color: '#fca5a5' }}><strong>Análise de Risco:</strong> {juridicoResultado.riscos}</p>
                <h4 style={{ fontSize: '0.85rem', margin: '0.5rem 0' }}>Ações Recomendadas:</h4>
                <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.85rem', color: theme.muted }}>
                  {juridicoResultado.acoes.map((acao, idx) => <li key={idx}>{acao}</li>)}
                </ul>
              </div>
            )}
          </div>

        </div>
      )}

      {/* 3. CONSELHO DE IA */}
      {activeTab === 'conselho' && (
        <div>
          <h2 style={{ fontSize: '1.1rem', color: theme.copper, marginBottom: '1rem' }}>Conselho Consultivo Multidisciplinar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { nome: 'Conselheiro da Lógica', foco: 'Análise Estrutural & Consistência' },
              { nome: 'Conselheiro de Estratégia', foco: 'Expansão & Posicionamento' },
              { nome: 'Conselheiro de Filosofia', foco: 'Visão de Longo Prazo' },
              { nome: 'Primeiros Princípios', foco: 'Decomposição de Problemas' },
              { nome: 'Conselheiro de Ética', foco: 'Reputação & Compliance' },
              { nome: 'Pensamento Sistêmico', foco: 'Efeitos de Segunda Ordem' }
            ].map((c, i) => (
              <div key={i} style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '1rem', borderRadius: '0.5rem' }}>
                <Bot size={24} color={theme.copper} />
                <h3 style={{ fontSize: '0.95rem', margin: '0.5rem 0 0.2rem 0' }}>{c.nome}</h3>
                <p style={{ fontSize: '0.75rem', color: theme.muted, margin: 0 }}>{c.foco}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. MÍDIA FACELESS */}
      {activeTab === 'midia' && (
        <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '1.25rem', borderRadius: '0.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: theme.copper, marginTop: 0 }}>Mega Brain — Painel de Mídia Faceless</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ backgroundColor: theme.bg, padding: '0.75rem', borderRadius: '0.375rem' }}>
              <span style={{ fontSize: '0.75rem', color: theme.muted }}>RPM Médio</span>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0.2rem 0 0 0' }}>$ 4,20 USD</p>
            </div>
            <div style={{ backgroundColor: theme.bg, padding: '0.75rem', borderRadius: '0.375rem' }}>
              <span style={{ fontSize: '0.75rem', color: theme.muted }}>AdSense Estimado</span>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0.2rem 0 0 0' }}>R$ 18.400,00</p>
            </div>
            <div style={{ backgroundColor: theme.bg, padding: '0.75rem', borderRadius: '0.375rem' }}>
              <span style={{ fontSize: '0.75rem', color: theme.muted }}>Receita Afiliados</span>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0.2rem 0 0 0' }}>R$ 13.600,00</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. OLHO DE DEUS */}
      {activeTab === 'olho' && (
        <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, padding: '1.25rem', borderRadius: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', color: theme.copper, margin: 0 }}>Olho de Deus — Painel de Segurança</h2>
            <button
              onClick={() => falarRelatorio("Relatório de segurança: Todas as câmeras operacionais sem alterações críticas nas últimas 24 horas.")}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: theme.bg, color: theme.text, border: `1px solid ${theme.border}`, padding: '0.5rem 0.8rem', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              <Volume2 size={16} color={theme.copper} /> Ouvir Relatório
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {['CAM 01 — Sede Brasil', 'CAM 02 — Galpão Serviços', 'CAM 03 — Estúdio Mídia'].map((cam, idx) => (
              <div key={idx} style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}`, height: '140px', borderRadius: '0.375rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: theme.copper, fontWeight: 'bold' }}>{cam}</span>
                <div style={{ textAlign: 'center', color: theme.muted }}>
                  <Play size={28} style={{ opacity: 0.5 }} />
                  <p style={{ fontSize: '0.75rem', margin: '0.2rem 0 0 0' }}>Sinal de Vídeo Ativo (Simulado)</p>
                </div>
                <span style={{ fontSize: '0.65rem', color: '#10b981' }}>● AO VIVO</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
