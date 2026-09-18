import React, { useEffect, useState } from "react";

const initialFeeds = [
  {
    id: 1,
    setor: "PERÍMETRO",
    status: "AGUARDANDO INTEGRAÇÃO",
    cor: "#38bdf8",
  },
  {
    id: 2,
    setor: "HOLDING / PATRIMÔNIO",
    status: "AGUARDANDO INTEGRAÇÃO",
    cor: "#38bdf8",
  },
  {
    id: 3,
    setor: "FUNDAÇÃO",
    status: "AGUARDANDO INTEGRAÇÃO",
    cor: "#38bdf8",
  },
  {
    id: 4,
    setor: "AUTOCORREÇÃO",
    status: "NÃO CONECTADA",
    cor: "#f59e0b",
  },
];

const horaAtual = () =>
  new Date().toLocaleTimeString("pt-BR", { hour12: false });

export default function App() {
  const [comando, setComando] = useState("");
  const [feeds, setFeeds] = useState(initialFeeds);
  const [mensagem, setMensagem] = useState("");
  const [aba, setAba] = useState("diretrizes");

  useEffect(() => {
    setFeeds((lista) =>
      lista.map((item) => ({ ...item, hora: horaAtual() }))
    );
  }, []);

  function registrarDiretriz(event) {
    event.preventDefault();

    const texto = comando.trim();

    if (!texto) {
      setMensagem("Digite uma diretriz antes de registrar.");
      return;
    }

    setFeeds((lista) => [
      {
        id: Date.now(),
        setor: "REGISTRO LOCAL",
        status: texto,
        hora: horaAtual(),
        cor: "#f59e0b",
      },
      ...lista,
    ]);

    setComando("");
    setMensagem(
      "Diretriz registrada localmente. Nenhum módulo externo foi executado."
    );
  }

  function restaurarHistorico() {
    setFeeds(
      initialFeeds.map((item) => ({
        ...item,
        hora: horaAtual(),
      }))
    );
    setMensagem("Histórico inicial restaurado.");
  }

  return (
    <div style={s.app}>
      <header style={s.header}>
        <div style={s.brand}>
          <span style={s.pulse} />
          <div>
            <h1 style={s.logo}>OLHO DO DONO</h1>
            <small style={s.subtitle}>
              TORRE DE COMANDO // PROJETO_RAIZ
            </small>
          </div>
        </div>

        <span style={s.badge}>● PAINEL DEMONSTRATIVO</span>
      </header>

      <main>
        <section style={s.hero}>
          <div>
            <small style={s.eyebrow}>
              CENTRAL DE CONTROLE DO FUNDADOR
            </small>
            <h2 style={s.heroTitle}>Visão geral do sistema</h2>
            <p style={s.muted}>
              Interface de acompanhamento e registro de diretrizes
              do PROJETO_RAIZ.
            </p>
          </div>

          <span style={s.backend}>
            ● BACKEND NÃO CONECTADO
          </span>
        </section>

        <section style={s.metrics}>
          {feeds.slice(0, 4).map((item) => (
            <article key={item.id} style={s.card}>
              <div style={s.cardTop}>
                <small>{item.setor}</small>
                <span
                  style={{
                    ...s.dot,
                    background: item.cor,
                  }}
                />
              </div>

              <strong style={{ color: item.cor }}>
                {item.status}
              </strong>

              <small style={s.time}>
                Última atualização: {item.hora || "--:--:--"}
              </small>
            </article>
          ))}
        </section>

        <nav style={s.tabs}>
          <button
            style={aba === "diretrizes" ? s.activeTab : s.tab}
            onClick={() => {
              setAba("diretrizes");
              setMensagem("");
            }}
          >
            ⚡ Diretrizes
          </button>

          <button
            style={aba === "eventos" ? s.activeTab : s.tab}
            onClick={() => {
              setAba("eventos");
              setMensagem("");
            }}
          >
            ▤ Eventos
          </button>
        </nav>

        {aba === "diretrizes" && (
          <section style={s.panel}>
            <h3 style={s.sectionTitle}>DIRETRIZ EXECUTIVA</h3>
            <p style={s.muted}>
              Registre uma instrução no histórico local.
            </p>

            <form onSubmit={registrarDiretriz}>
              <label htmlFor="diretriz" style={s.label}>
                COMANDO
              </label>

              <textarea
                id="diretriz"
                value={comando}
                onChange={(e) => setComando(e.target.value)}
                placeholder="Digite sua diretriz..."
                rows={5}
                style={s.textarea}
              />

              <button type="submit" style={s.primaryButton}>
                REGISTRAR DIRETRIZ →
              </button>
            </form>

            {mensagem && (
              <p role="status" style={s.message}>
                {mensagem}
              </p>
            )}

            <div style={s.notice}>
              <strong>Modo demonstrativo:</strong>
              <br />
              Os registros ficam somente no estado desta interface.
              Não há conexão com Supabase, GitHub ou outros módulos.
            </div>
          </section>
        )}

        {aba === "eventos" && (
          <section style={s.panel}>
            <h3 style={s.sectionTitle}>HISTÓRICO DE EVENTOS</h3>
            <p style={s.muted}>
              Registros disponíveis nesta sessão.
            </p>

            <div style={s.logs}>
              {feeds.map((item) => (
                <div key={item.id} style={s.logRow}>
                  <span style={s.time}>
                    [{item.hora || "--:--:--"}]
                  </span>

                  <strong style={{ color: item.cor }}>
                    {item.setor}:
                  </strong>

                  <span>{item.status}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={restaurarHistorico}
              style={s.secondaryButton}
            >
              RESTAURAR HISTÓRICO INICIAL
            </button>

            {mensagem && (
              <p role="status" style={s.message}>
                {mensagem}
              </p>
            )}
          </section>
        )}
      </main>

      <footer style={s.footer}>
        <span>PROJETO_RAIZ</span>
        <span>OLHO DO DONO // INTERFACE</span>
        <span>V0.1 — DEMONSTRATIVO</span>
      </footer>
    </div>
  );
}

const s = {
  app: {
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: "clamp(14px, 3vw, 32px)",
    background:
      "radial-gradient(ellipse at top, #101c30 0%, #02040a 55%)",
    color: "#f8fafc",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  header: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    padding: 20,
    marginBottom: 24,
    background: "#070b14",
    border: "1px solid #1e293b",
    borderRadius: 12,
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },

  pulse: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    background: "#00ffcc",
    boxShadow: "0 0 16px #00ffcc",
  },

  logo: {
    margin: 0,
    fontSize: "clamp(17px, 3vw, 23px)",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#64748b",
    fontSize: 10,
    letterSpacing: 1,
  },

  badge: {
    color: "#cbd5e1",
    background: "#0b132b",
    border: "1px solid #334155",
    padding: 10,
    borderRadius: 6,
    fontSize: 10,
  },

  hero: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    padding: "18px 4px 26px",
  },

  eyebrow: {
    color: "#00ffcc",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 2,
  },

  heroTitle: {
    fontSize: "clamp(24px, 5vw, 38px)",
    margin: "10px 0",
  },

  muted: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 1.6,
  },

  backend: {
    color: "#fbbf24",
    background: "#111827",
    border: "1px solid #334155",
    padding: 12,
    borderRadius: 6,
    fontSize: 10,
  },

  metrics: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
    gap: 14,
    marginBottom: 24,
  },

  card: {
    background: "#070b14",
    border: "1px solid #1e293b",
    borderRadius: 10,
    padding: 18,
    minHeight: 120,
    overflowWrap: "anywhere",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 18,
    color: "#94a3b8",
    fontSize: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  },

  time: {
    display: "block",
    marginTop: 12,
    color: "#64748b",
    fontSize: 10,
  },

  tabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  tab: {
    background: "#070b14",
    border: "1px solid #1e293b",
    color: "#94a3b8",
    borderRadius: 7,
    padding: "12px 18px",
    cursor: "pointer",
  },

  activeTab: {
    background: "#10243b",
    border: "1px solid #38bdf8",
    color: "#7dd3fc",
    borderRadius: 7,
    padding: "12px 18px",
    cursor: "pointer",
  },

  panel: {
    background: "#070b14",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: "clamp(18px, 4vw, 28px)",
    minWidth: 0,
  },

  sectionTitle: {
    fontSize: 14,
    letterSpacing: 1,
    margin: "0 0 8px",
  },

  label: {
    display: "block",
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: 800,
    margin: "22px 0 10px",
  },

  textarea: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    background: "#02040a",
    border: "1px solid #334155",
    borderRadius: 7,
    color: "#f8fafc",
    padding: 15,
    fontSize: 14,
    lineHeight: 1.6,
    resize: "vertical",
    marginBottom: 14,
    fontFamily: "inherit",
  },

  primaryButton: {
    width: "100%",
    background: "#00ffcc",
    color: "#02040a",
    border: 0,
    borderRadius: 7,
    padding: 16,
    fontWeight: 900,
    cursor: "pointer",
  },

  secondaryButton: {
    width: "100%",
    marginTop: 16,
    background: "#111827",
    color: "#cbd5e1",
    border: "1px solid #334155",
    borderRadius: 7,
    padding: 13,
    cursor: "pointer",
  },

  message: {
    color: "#7dd3fc",
    fontSize: 12,
    lineHeight: 1.6,
  },

  notice: {
    marginTop: 22,
    padding: 14,
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: 7,
    color: "#94a3b8",
    fontSize: 11,
    lineHeight: 1.7,
  },

  logs: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    background: "#02040a",
    border: "1px solid #1e293b",
    borderRadius: 7,
    padding: 14,
    maxHeight: 420,
    overflowY: "auto",
    marginTop: 18,
  },

  logRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    borderBottom: "1px dashed #1e293b",
    paddingBottom: 10,
    fontSize: 11,
    lineHeight: 1.6,
    overflowWrap: "anywhere",
  },

  footer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    borderTop: "1px solid #1e293b",
    marginTop: 28,
    padding: "18px 2px",
    color: "#475569",
    fontSize: 9,
    letterSpacing: 1,
  },
};