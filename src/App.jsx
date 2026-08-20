import React, { useState } from 'react';

const OlhoDeDeus = ({ supabaseAccessToken }) => {
  const [demanda, setDemanda] = useState('');
  const [resposta, setResposta] = useState(null);
  const [loading, setLoading] = useState(false);

  const executarConselho = async () => {
    if (!demanda) return alert("Digite uma demanda para o Conselho.");
    setLoading(true);
    setResposta("O Conselho está deliberando...");

    try {
      const response = await fetch('https://enhouyxocieotynybmcl.supabase.co/functions/v1/olho-de-deus-conselho', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ demanda }),
      });

      const data = await response.json();
      setResposta(data.decisao || "Parecer gerado com sucesso.");
    } catch (error) {
      setResposta("Erro na comunicação com o Conselho: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#0F0F12', color: '#D4AF37' }}>
      <h2>Olho de Deus — Conselho de IA</h2>
      <textarea 
        value={demanda} 
        onChange={(e) => setDemanda(e.target.value)}
        placeholder="Digite sua pauta executiva..."
        style={{ width: '100%', height: '100px', background: '#18181C', color: '#FFF' }}
      />
      <button 
        onClick={executarConselho} 
        disabled={loading}
        style={{ marginTop: '10px', padding: '10px 20px', background: '#0D5C3A', color: '#FFF', border: 'none' }}
      >
        {loading ? "Processando..." : "Consultar Conselho"}
      </button>

      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #2E2E38' }}>
        <h3>Parecer:</h3>
        <p>{resposta}</p>
      </div>
    </div>
  );
};

export default OlhoDeDeus;
