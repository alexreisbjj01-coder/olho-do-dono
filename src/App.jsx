import React, { useState } from 'react';

export default function ConselhoIA() {
  const [pauta, setPauta] = useState('');
  const [parecer, setParecer] = useState('');
  const [carregando, setCarregando] = useState(false);

  const consultarConselho = async () => {
    if (!pauta.trim()) return;

    setCarregando(true);
    setParecer('Consultando os conselheiros executivos...');

    try {
      const response = await fetch('https://enhouyxocieotynybmcl.supabase.co/functions/v1/cohi-conselho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaG91eXhvY2llb3R5bnlibWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMjY0NTYsImV4cCI6MjEwMjYwMjQ1Nn0.ypoEii9bdHmqpXdBoh87Xu2WAp8rSEpMtTWZyJk6bdM'
        },
        body: JSON.stringify({ pauta })
      });

      const data = await response.json();

      if (response.ok) {
        setParecer(data.parecer || data.resposta || JSON.stringify(data));
      } else {
        setParecer(`[Erro do Servidor]: ${data.error || 'Erro ao processar pauta.'}`);
      }
    } catch (error) {
      setParecer(`[Erro de Conexão]: Não foi possível conectar à Edge Function.`);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#0b0f19', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#121824', padding: '20px', borderRadius: '8px', border: '1px solid #2a3447' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '10px' }}>Deliberação do Conselho (6 Conselheiros)</h2>
        <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '15px' }}>
          Envie sua pauta estratégica para análise executiva.
        </p>
        <textarea
          value={pauta}
          onChange={(e) => setPauta(e.target.value)}
          placeholder="Digite sua pauta estratégica aqui..."
          rows={4}
          style={{ width: '100%', padding: '12px', background: '#0b0f19', color: '#fff', border: '1px solid #2a3447', borderRadius: '6px', marginBottom: '15px', resize: 'vertical' }}
        />
        <button
          onClick={consultarConselho}
          disabled={carregando}
          style={{ width: '100%', padding: '12px', background: '#c29b61', color: '#0b0f19', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '20px' }}
        >
          {carregando ? 'Analisando...' : 'Consultar Conselho de IA'}
        </button>
        <div style={{ background: '#0b0f19', padding: '15px', borderRadius: '6px', border: '1px solid #2a3447' }}>
          <strong style={{ color: '#d4af37', display: 'block', marginBottom: '8px' }}>PARECER EXECUTIVO:</strong>
          <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', color: '#e5e7eb' }}>
            {parecer || 'Aguardando envio de pauta para deliberação...'}
          </div>
        </div>
      </div>
    </div>
  );
}