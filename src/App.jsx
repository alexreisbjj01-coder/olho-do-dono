import React, { useState } from 'react';

export default function App() {
  const [demanda, setDemanda] = useState('');
  const [resposta, setResposta] = useState(null);
  const [loading, setLoading] = useState(false);

  const executarConselho = async () => {
    if (!demanda) return alert("Digite uma demanda.");
    setLoading(true);
    setResposta("Conectando ao Conselho...");

    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaG91eXhvY2llb3R5bnlibWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMjY0NTYsImV4cCI6MjEwMjYwMjQ1Nn0.ypoEii9bdHmqpXdBoh87Xu2WAp8rSEpMtTWZyJk6bdM";

    try {
      const response = await fetch('https://enhouyxocieotynybmcl.supabase.co/functions/v1/cohi-conselho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ demanda }),
      });

      const textData = await response.text();
      let data;
      try {
        data = JSON.parse(textData);
      } catch {
        data = { error: textData || "Erro desconhecido no servidor" };
      }

      if (!response.ok) {
        setResposta(`Erro (${response.status}): ${data.error || data.message || textData}`);
      } else {
        setResposta(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      setResposta("Falha de rede: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '15px', background: '#0F0F12', color: '#D4AF37', minHeight: '100vh', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Olho de Deus — Conselho de IA</h2>
      <textarea 
        value={demanda} 
        onChange={(e) => setDemanda(e.target.value)}
        placeholder="Digite sua pauta executiva..."
        style={{ width: '100%', height: '100px', background: '#18181C', color: '#FFF', padding: '10px', borderRadius: '5px', border: '1px solid #2E2E38', boxSizing: 'border-box' }}
      />
      <button 
        onClick={executarConselho} 
        disabled={loading}
        style={{ marginTop: '10px', width: '100%', padding: '12px', background: '#0D5C3A', color: '#FFF', border: 'none', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' }}
      >
        {loading ? "Processando..." : "Consultar Conselho"}
      </button>

      <div style={{ marginTop: '20px', padding: '12px', background: '#18181C', border: '1px solid #2E2E38', borderRadius: '5px', wordBreak: 'break-all' }}>
        <h3 style={{ fontSize: '14px', color: '#D4AF37', marginTop: 0 }}>Retorno:</h3>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px', color: '#FFF', margin: 0 }}>{resposta || "Aguardando envio..."}</pre>
      </div>
    </div>
  );
}
