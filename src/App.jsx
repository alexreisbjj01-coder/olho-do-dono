import React, { useState, useEffect } from 'react';

export default function AppSoberano() {
  const [alerta, setAlerta] = useState('SISTEMA BLINDADO & OPERACIONAL');
  const [comando, setComando] = useState('');
  const [feeds, setFeeds] = useState([
    { id: 1, setor: 'PERÍMETRO', status: 'ESTÁVEL', hora: '08:12', cor: '#10b981' },
    { id: 2, setor: 'HOLDING / PATRIMÔNIO', status: 'BLINDADO', hora: '08:12', cor: '#38bdf8' },
    { id: 3, setor: 'FUNDAÇÃO (FIIs / TESOURO)', status: 'AUTÔNOMO', hora: '08:11', cor: '#00ffcc' },
    { id: 4, setor: 'AUTOCORREÇÃO (SELF-HEALING)', status: 'ATIVO', hora: '08:10', cor: '#10b981' }
  ]);

  const dispararComando = (e) => {
    e.preventDefault();
    if (!comando.trim()) return;
    
    const novoFeed = {
      id: Date.now(),
      setor: 'COMANDO CENTRAL',
      status: `Executado: "${comando}"`,
      hora: new Date().toLocaleTimeString(),
      cor: '#f59e0b'
    };

    setFeeds([novoFeed, ...feeds]);
    setComando('');
  };

  return (
    <div style={estilos.wrapper}>
      {/* Barra de Status Superior / Nível Militar */}
      <header style={estilos.topBar}>
        <div style={estilos.brandArea}>
          <div style={estilos.pulseIcon}></div>
          <div>
            <h1 style={estilos.mainTitle}>OLHO DO DONO // TORRE DE COMANDO</h1>
            <span style={estilos.subTitle}>ARQUITETURA DE SOBERANIA TOTAL // CICLO FECHADO</span>
          </div>
        </div>
        <div style={estilos.statusBadge}>
          STATUS: <span style={{ color: '#10b981', marginLeft: '6px' }}>{alerta}</span>
        </div>
      </header>

      {/* Grid Principal de Status dos Setores */}
      <div style={estilos.metricsGrid}>
        {feeds.map((item) => (
          <div key={item.id} style={estilos.metricCard}>
            <div style={estilos.cardHeaderTop}>
              <span style={estilos.cardSetor}>{item.setor}</span>
              <span style={{ ...estilos.statusDot, backgroundColor: item.cor }}></span>
            </div>
            <div style={{ ...estilos.cardStatusVal, color: item.cor }}>{item.status}</div>
            <span style={estilos.cardTime}>Última varredura: {item.hora}</span>
          </div>
        ))}
      </div>

      {/* Seção Operacional Central: Painel de Controle + Feed Tático */}
      <div style={estilos.operationGrid}>
        
        {/* Painel de Injeção de Diretrizes */}
        <div style={estilos.commandBox}>
          <h3 style={estilos.sectionTitle}>⚡ DIRETRIZ EXECUTIVA AO NÚCLEO</h3>
          <p style={estilos.sectionDesc}>Insira o comando tático para reconfiguração imediata dos módulos operacionais.</p>
          
          <form onSubmit={dispararComando} style={estilos.formArea}>
            <textarea
              value={comando}
              onChange={(e) => setComando(e.target.value)}
              placeholder="Digite a diretriz soberana..."
              rows={4}
              style={estilos.inputArea}
            />
            <button type="submit" style={estilos.actionButton}>
              TRANSMITIR COMANDO AO SISTEMA
            </button>
          </form>
        </div>

        {/* Painel de Telemetria e Logs em Tempo Real */}
        <div style={estilos.telemetryBox}>
          <h3 style={estilos.sectionTitle}>📡 TELEMETRIA & FLUXO DE EVENTOS</h3>
          <div style={estilos.logContainer}>
            {feeds.map((f, i) => (
              <div key={i} style={estilos.logRow}>
                <span style={{ color: '#64748b' }}>[{f.hora}]</span>
                <span style={{ color: f.cor, fontWeight: 'bold' }}>{f.setor}:</span>
                <span style={{ color: '#e2e8f0' }}>{f.status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Estilos Visuais: Dark Mode Tático & Executivo de Alta Performance
const estilos = {
  wrapper: {
    backgroundColor: '#02040a',
    color: '#f8fafc',
    minHeight: '100vh',
    padding: '24px',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#070b14',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '16px 24px',
    marginBottom: '20px',
  },
  brandArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  pulseIcon: {
    width: '14px',
    height: '14px',
    backgroundColor: '#00ffcc',
    borderRadius: '50%',
    boxShadow: '0 0 12px #00ffcc',
  },
  mainTitle: {
    fontSize: '18px',
    fontWeight: '900',
    letterSpacing: '2px',
    margin: 0,
    color: '#ffffff',
  },
  subTitle: {
    fontSize: '10px',
    color: '#64748b',
    letterSpacing: '1px',
  },
  statusBadge: {
    backgroundColor: '#0b132b',
    border: '1px solid #334155',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '700',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  metricCard: {
    backgroundColor: '#070b14',
    border: '1px solid #1e293b',
    borderRadius: '6px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeaderTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  cardSetor: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: '1px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  cardStatusVal: {
    fontSize: '15px',
    fontWeight: '800',
    marginBottom: '8px',
  },
  cardTime: {
    fontSize: '10px',
    color: '#475569',
  },
  operationGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '24px',
  },
  commandBox: {
    backgroundColor: '#070b14',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '24px',
  },
  telemetryBox: {
    backgroundColor: '#070b14',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '24px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#f8fafc',
    margin: '0 0 6px 0',
    letterSpacing: '1px',
  },
  sectionDesc: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '16px',
  },
  formArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  inputArea: {
    backgroundColor: '#02040a',
    border: '1px solid #334155',
    borderRadius: '6px',
    color: '#f8fafc',
    padding: '14px',
    fontSize: '13px',
    outline: 'none',
    resize: 'vertical',
  },
  actionButton: {
    backgroundColor: '#00ffcc',
    color: '#02040a',
    border: 'none',
    borderRadius: '6px',
    padding: '14px',
    fontWeight: '900',
    fontSize: '12px',
    cursor: 'pointer',
    letterSpacing: '1px',
  },
  logContainer: {
    backgroundColor: '#02040a',
    border: '1px solid #1e293b',
    borderRadius: '6px',
    padding: '14px',
    height: '170px',
    overflowY: 'auto',
    fontFamily: 'monospace',
    fontSize: '11px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  logRow: {
    display: 'flex',
    gap: '8px',
    borderBottom: '1px dashed #0f172a',
    paddingBottom: '4px',
  },
};
