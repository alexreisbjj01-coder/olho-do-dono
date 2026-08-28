import React, { useState, useEffect } from 'react';

export default function AppSoberano() {
  // Estado do Sistema e Telemetria
  const [statusSistema, setStatusSistema] = useState('OPERACIONAL - BLINDADO');
  const [comandoAtivo, setComandoAtivo] = useState('');
  const [logs, setLogs] = useState([
    { timestamp: '08:00:00', tipo: 'SEGURANÇA', msg: 'Perímetro varrido. Zero ameaças.' },
    { timestamp: '08:00:02', tipo: 'FINANCEIRO', msg: 'Sincronização com Fundação e FIIs ativa.' },
    { timestamp: '08:00:05', tipo: 'CORE', msg: 'Segundo cérebro indexado com sucesso.' }
  ]);

  // Executa comando estratégico
  const enviarComando = (e) => {
    e.preventDefault();
    if (!comandoAtivo.trim()) return;

    const novoLog = {
      timestamp: new Date().toLocaleTimeString(),
      tipo: 'COMANDO_SOBERANO',
      msg: `Executando: "${comandoAtivo}"`
    };

    setLogs([novoLog, ...logs]);
    setComandoAtivo('');
  };

  return (
    <div style={estilos.container}>
      {/* Cabeçalho de Status Executivo */}
      <header style={estilos.header}>
        <div>
          <h1 style={estilos.titulo}>OLHO DO DONO</h1>
          <p style={estilos.subtitulo}>SISTEMA DE COMANDO SOBEREANO - CICLO FECHADO</p>
        </div>
        <div style={estilos.badgeStatus}>
          <span style={estilos.pontoVerde}></span>
          {statusSistema}
        </div>
      </header>

      {/* Grid Principal do Painel */}
      <div style={estilos.gridPrincipal}>
        
        {/* Coluna Esquerda: Painel de Controle e Comandos */}
        <section style={estilos.card}>
          <h3 style={estilos.cardTitulo}>Painel de Controle Central</h3>
          <form onSubmit={enviarComando} style={estilos.form}>
            <textarea
              value={comandoAtivo}
              onChange={(e) => setComandoAtivo(e.target.value)}
              placeholder="Digite a diretriz ou comando para o núcleo..."
              rows={3}
              style={estilos.textarea}
            />
            <button type="submit" style={estilos.botao}>
              EXECUTAR DIRETRIZ
            </button>
          </form>

          <div style={estilos.blocoFinanceiro}>
            <h4 style={{ color: '#00ffcc', margin: '0 0 10px 0', fontSize: '14px' }}>ESTADO PATRIMONIAL & CAIXA</h4>
            <p style={estilos.textoInfo}>Holding: <strong>Protegida & Estanque</strong></p>
            <p style={estilos.textoInfo}>Fundação (Tesouro/FIIs): <strong>Automação Ativa</strong></p>
            <p style={estilos.textoInfo}>Compliance / Auditoria: <strong>Porta Isolada Pronta</strong></p>
          </div>
        </section>

        {/* Coluna Direita: Logs de Missão e Telemetria em Tempo Real */}
        <section style={estilos.card}>
          <h3 style={estilos.cardTitulo}>Telemetria & Logs do Sistema (Self-Healing)</h3>
          <div style={estilos.containerLogs}>
            {logs.map((log, index) => (
              <div key={index} style={estilos.logItem}>
                <span style={estilos.logTimestamp}>[{log.timestamp}]</span>
                <span style={estilos.logTipo}>({log.tipo})</span>
                <span style={estilos.logMsg}>{log.msg}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// Design System de Alta Performance (Dark Mode Executivo Militar)
const estilos = {
  container: {
    backgroundColor: '#05070b',
    color: '#e2e8f0',
    minHeight: '100vh',
    padding: '24px',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '20px',
    marginBottom: '24px',
  },
  titulo: {
    fontSize: '22px',
    fontWeight: '800',
    letterSpacing: '2px',
    color: '#ffffff',
    margin: 0,
  },
  subtitulo: {
    fontSize: '11px',
    color: '#64748b',
    letterSpacing: '1px',
    margin: '4px 0 0 0',
  },
  badgeStatus: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    padding: '8px 14px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#10b981',
  },
  pontoVerde: {
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '8px',
    boxShadow: '0 0 8px #10b981',
  },
  gridPrincipal: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  card: {
    backgroundColor: '#0b0f19',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '20px',
  },
  cardTitulo: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#f8fafc',
    marginTop: 0,
    marginBottom: '16px',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  textarea: {
    backgroundColor: '#020617',
    border: '1px solid #334155',
    borderRadius: '4px',
    color: '#f8fafc',
    padding: '12px',
    fontSize: '14px',
    resize: 'vertical',
    outline: 'none',
  },
  botao: {
    backgroundColor: '#00ffcc',
    color: '#020617',
    border: 'none',
    borderRadius: '4px',
    padding: '12px',
    fontWeight: '800',
    fontSize: '13px',
    cursor: 'pointer',
    letterSpacing: '1px',
    transition: 'background 0.2s',
  },
  blocoFinanceiro: {
    backgroundColor: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '6px',
    padding: '14px',
  },
  textoInfo: {
    fontSize: '13px',
    color: '#94a3b8',
    margin: '6px 0',
  },
  containerLogs: {
    backgroundColor: '#020617',
    border: '1px solid #1e293b',
    borderRadius: '6px',
    padding: '12px',
    height: '220px',
    overflowY: 'auto',
    fontFamily: 'monospace',
    fontSize: '12px',
  },
  logItem: {
    marginBottom: '8px',
    borderBottom: '1px dashed #1e293b',
    paddingBottom: '4px',
  },
  logTimestamp: {
    color: '#64748b',
    marginRight: '6px',
  },
  logTipo: {
    color: '#38bdf8',
    marginRight: '6px',
  },
  logMsg: {
    color: '#e2e8f0',
  },
};
