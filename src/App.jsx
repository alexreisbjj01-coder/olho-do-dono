
import React, { useState, useEffect } from "react";

const initialFeeds = [
  {
    id: 1,
    setor: "PERÍMETRO",
    status: "AGUARDANDO INTEGRAÇÃO",
    hora: "--:--:--",
    cor: "#38bdf8",
  },
  {
    id: 2,
    setor: "HOLDING / PATRIMÔNIO",
    status: "AGUARDANDO INTEGRAÇÃO",
    hora: "--:--:--",
    cor: "#38bdf8",
  },
  {
    id: 3,
    setor: "FUNDAÇÃO",
    status: "AGUARDANDO INTEGRAÇÃO",
    hora: "--:--:--",
    cor: "#38bdf8",
  },
  {
    id: 4,
    setor: "AUTOCORREÇÃO",
    status: "NÃO CONECTADA",
    hora: "--:--:--",
    cor: "#f59e0b",
  },
];

function horarioAtual() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour12: false,
  });
}

export default function AppSoberano() {
  const [comando, setComando] = useState("");
  const [feeds, setFeeds] = useState(initialFeeds);
  const [mensagem, setMensagem] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("comando");

  useEffect(() => {
    setFeeds((anteriores) =>
      anteriores.map((item) => ({
        ...item,
        hora: horarioAtual(),
      }))
    );
  }, []);

  function dispararComando(event) {
    event.preventDefault();

    const texto = comando.trim();
    if (!texto) {
      setMensagem("Digite uma diretriz antes de transmitir.");
      return;
    }

    const novoFeed = {
      id: Date.now(),
      setor: "REGISTRO LOCAL",
      status: texto,
      hora: horarioAtual(),
      cor: "#f59e0b",
    };

    setFeeds((anteriores) => [novoFeed, ...anteriores]);
    setComando("");
    setMensagem(
      "Diretriz registrada neste painel. Nenhum módulo externo foi executado."
    );
  }

  function limparHistorico() {
    setFeeds(initialFeeds);
    setMensagem("Histórico local restaurado.");
  }

  return (
    <div style={styles.wrapper}>
      <header style={styles.topBar}>
        <div style={styles.brandArea}>
          <div style={styles.pulseIcon} />
          <div>
            <h1 style={styles.mainTitle}>
              OLHO DO DONO
            </h1>
            <div style={styles.subTitle}>
              TORRE DE COMANDO // PROJETO_RAIZ
            </div>
          </div>
        </div>

        <div style={styles.statusBadge}>
          <span style={styles.statusIndicator} />
          PAINEL DEMONSTRATIVO
        </div>
      </header>

      <main>
        <section style={styles.hero}>
          <div>
            <div style={styles.eyebrow}>
              CENTRAL DE CONTROLE DO FUNDADOR
            </div>
            <h2 style={styles.heroTitle}>
              Visão geral do sistema
            </h2>
            <p style={styles.heroText}>
              Interface de acompanhamento e registro de
              diretrizes do PROJETO_RAIZ.
            </p>
          </div>

          <div style={styles.heroTag}>
            <span style={{ color: "#f59e0b" }}>●</span>
            {" "}BACKEND NÃO CONECTADO
          </div>
        </section>

        <section style={styles.metricsGrid}>
          {feeds.slice(0, 4).map((item) => (
            <article key={item.id} style={styles.metricCard}>
              <div style={styles.cardHeader}>
                <span style={styles.cardSetor}>
                  {item.setor}
                </span>
                <span
                  style={{
                    ...styles.statusDot,
                    backgroundColor: item.cor,
                  }}
                />
              </div>

              <div
                style={{
                  ...styles.cardStatus,
                  color: item.cor,
                }}
              >
                {item.status}
              </div>

              <div style={styles.cardTime}>
                Última atualização: {item.hora}
              </div>
            </article>
          ))}
        </section>

        <nav style={styles.tabBar}>
          <button
            onClick={() => setAbaAtiva("comando")}
            style={{
              ...styles.tab,
              ...(abaAtiva === "comando"
                ? styles.activeTab
                : {}),
            }}
          >
            ⚡ Diretrizes
          </button>

          <button
            onClick={() => setAbaAtiva("eventos")}
            style={{
              ...styles.tab,
              ...(abaAtiva === "eventos"
                ? styles.activeTab
                : {}),
            }}
          >
            ▤ Eventos
          </button>
        </nav>

        <section style={styles.operationGrid}>
          {abaAtiva === "comando" && (
            <article style={styles.panel}>
              <div style={styles.panelHeading}>
                <span style={styles.panelIcon}>⚡</span>
                <div>
                  <h3 style={styles.sectionTitle}>
                    DIRETRIZ EXECUTIVA
                  </h3>
                  <p style={styles.sectionDesc}>
                    Registre uma instrução no histórico local.
                  </p>
                </div>
              </div>

              <form onSubmit={dispararComando}>
                <label
                  htmlFor="diretriz"
                  style={styles.label}
                >
                  COMANDO
                </label>

                <textarea
                  id="diretriz"
                  value={comando}
                  onChange={(event) =>
                    setComando(event.target.value)
                  }
                  placeholder="Digite sua diretriz..."
                  rows={5}
                  style={styles.inputArea}
                />

                <button
                  type="submit"
                  style={styles.actionButton}
                >
                  REGISTRAR DIRETRIZ →
                </button>

                {mensagem && (
                  <div style={styles.message}>
                    {mensagem}
                  </div>
                )}
              </form>

              <div style={styles.notice}>
                <strong>Modo demonstrativo:</strong>
                <br />
                O botão registra texto somente nesta
                interface. Não executa operações no
                Supabase, GitHub ou outros módulos.
              </div>
            </article>
          )}

          {abaAtiva === "eventos" && (
            <article style={styles.panel}>
              <h3 style={styles.sectionTitle}>
                HISTÓRICO DE EVENTOS
              </h3>
              <p style={styles.sectionDesc}>
                Registros disponíveis nesta sessão.
              </p>

              <div style={styles.logContainer}>
                {feeds.map((item) => (
                  <div key={item.id} style={styles.logRow}>
                    <span style={styles.logTime}>
                      [{item.hora}]
                    </span>
                    <span
                      style={{
                        color: item.cor,
                        fontWeight: 700,
                      }}
                    >
                      {item.setor}:
                    </span>
                    <span style={styles.logText}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={limparHistorico}
                style={styles.secondaryButton}
              >
                RESTAURAR HISTÓRICO INICIAL
              </button>
            </article>
          )}
        </section>

        <footer style={styles.footer}>
          <span>PROJETO_RAIZ</span>
          <span>OLHO DO DONO // INTERFACE</span>
          <span>V0.1 — DEMONSTRATIVO</span>
        </footer>
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background:
      "radial-gradient(ellipse at top, #101c30 0%, #02040a 55%)",
    color: "#f8fafc",
    padding: "clamp(14px, 3vw, 32px)",
    fontFamily:
      "Inter, system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
  },

  topBar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    background: "rgba(7, 11, 20, 0.94)",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "24px",
  },

  brandArea: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  pulseIcon: {
    width: "14px",
    height: "14px",
    flexShrink: 0,
    background: "#00ffcc",
    borderRadius: "50%",
    boxShadow: "0 0 16px #00ffcc",
  },

  mainTitle: {
    fontSize: "clamp(17px, 3vw, 23px)",
    fontWeight: 900,
    letterSpacing: "2px",
    margin: 0,
  },

  subTitle: {
    fontSize: "10px",
    color: "#64748b",
    letterSpacing: "1px",
    marginTop: "5px",
  },

  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "1px",
    color: "#cbd5e1",
    background: "#0b132b",
    border: "1px solid #334155",
    padding: "10px 12px",
    borderRadius: "6px",
  },

  statusIndicator: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#f59e0b",
  },

  hero: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "18px 4px 26px",
  },

  eyebrow: {
    color: "#00ffcc",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "2px",
    marginBottom: "10px",
  },

  heroTitle: {
    fontSize: "clamp(24px, 5vw, 38px)",
    margin: "0 0 10px",
    fontWeight: 800,
  },

  heroText: {
    color: "#94a3b8",
    fontSize: "14px",
    lineHeight: 1.6,
    maxWidth: "560px",
    margin: 0,
  },

  heroTag: {
    color: "#cbd5e1",
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: "6px",
    padding: "12px",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "1px",
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
    gap: "14px",
    marginBottom: "24px",
  },

  metricCard: {
    background: "rgba(7, 11, 20, 0.94)",
    border: "1px solid #1e293b",
    borderRadius: "10px",
    padding: "18px",
    minHeight: "120px",
    boxSizing: "border-box",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
    marginBottom: "18px",
  },

  cardSetor: {
    fontSize: "10px",
    fontWeight: 800,
    color: "#94a3b8",
    letterSpacing: "1px",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    flexShrink: 0,
    borderRadius: "50%",
  },

  cardStatus: {
    fontSize: "13px",
    fontWeight: 800,
    lineHeight: 1.5,
    overflowWrap: "anywhere",
  },

  cardTime: {
    fontSize: "10px",
    color: "#64748b",
    marginTop: "12px",
  },

  tabBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "16px",
  },

  tab: {
    background: "#070b14",
    border: "1px solid #1e293b",
    color: "#94a3b8",
    borderRadius: "7px",
    padding: "12px 18px",
    fontSize: "12px",
    fontWeight: 800,
    cursor: "pointer",
  },

  activeTab: {
    background: "#10243b",
    borderColor: "#38bdf8",
    color: "#7dd3fc",
  },

  operationGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: "20px",
  },

  panel: {
    minWidth: 0,
    background: "rgba(7, 11, 20, 0.96)",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "clamp(18px, 4vw, 28px)",
    boxSizing: "border-box",
  },

  panelHeading: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "24px",
  },

  panelIcon: {
    fontSize: "22px",
  },

  sectionTitle: {
    fontSize: "14px",
    fontWeight: 900,
    color: "#f8fafc",
    letterSpacing: "1px",
    margin: "0 0 8px",
  },

  sectionDesc: {
    fontSize: "12px",
    color: "#64748b",
    lineHeight: 1.6,
    margin: 0,
  },

  label: {
    display: "block",
    color: "#94a3b8",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "1px",
    marginBottom: "10px",
  },

  inputArea: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    background: "#02040a",
    border: "1px solid #334155",
    borderRadius: "7px",
    color: "#f8fafc",
    padding: "15px",
    fontSize: "14px",
    lineHeight: 1.6,
    resize: "vertical",
    marginBottom: "14px",
    fontFamily: "inherit",
  },

  actionButton: {
    width: "100%",
    background: "#00ffcc",
    color: "#02040a",
    border: "none",
    borderRadius: "7px",
    padding: "16px",
    fontWeight: 900,
    fontSize: "12px",
    cursor: "pointer",
    letterSpacing: "1px",
  },

  secondaryButton: {
    width: "100%",
    marginTop: "16px",
    background: "#111827",
    color: "#cbd5e1",
    border: "1px solid #334155",
    borderRadius: "7px",
    padding: "13px",
    fontSize: "11px",
    fontWeight: 800,
    cursor: "pointer",
  },

  message: {
    marginTop: "14px",
    color: "#7dd3fc",
    fontSize: "12px",
    lineHeight: 1.6,
    overflowWrap: "anywhere",
  },

  notice: {
    marginTop: "22px",
    padding: "14px",
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: "7px",
    color: "#94a3b8",
    fontSize: "11px",
    lineHeight: 1.7,
  },

  logContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "#02040a",
    border: "1px solid #1e293b",
    borderRadius: "7px",
    padding: "14px",
    maxHeight: "420px",
    overflowY: "auto",
  },

  logRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    borderBottom: "1px dashed #1e293b",
    paddingBottom: "10px",
    fontSize: "11px",
    lineHeight: 1.6,
    overflowWrap: "anywhere",
  },

  logTime: {
    color: "#64748b",
    fontFamily: "monospace",
  },

  logText: {
    color: "#e2e8f0",
    overflowWrap: "anywhere",
  },

  footer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "12px",
    borderTop: "1px solid #1e293b",
    marginTop: "28px",
    padding: "18px 2px",
    color: "#475569",
    fontSize: "9px",
    letterSpacing: "1px",
  },
};
