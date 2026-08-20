{
  "name": "COHI - O Olho do Dono (Conselho de Operação e Inteligência)",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "cohi/olho-do-dono",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "cohi-webhook-01",
      "name": "Entrada Demanda - Olho do Dono",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [200, 300],
      "webhookId": "cohi-olho-do-dono"
    },
    {
      "parameters": {
        "jsCode": "const body = $json.body || $json;\nconst demanda = String(body.demanda || '').trim();\nconst empresa = String(body.empresa || '').trim(); // Dedetizadora, Holding ou Fundação\nconst area = String(body.area || '').trim();\nconst prioridade = String(body.prioridade || 'media').trim();\nconst chave = String(body.idempotency_key || '').trim();\n\nif (!demanda) throw new Error('demanda_obrigatoria');\nif (!empresa) throw new Error('empresa_obrigatoria');\nif (!chave) throw new Error('idempotency_key_obrigatoria');\n\nreturn [{ json: {\n  id_demanda: body.id_demanda || `cohi-${Date.now()}`,\n  idempotency_key: chave,\n  demanda,\n  empresa,\n  area,\n  prioridade,\n  valor_envolvido: Number(body.valor_envolvido || 0),\n  prazo: body.prazo || null,\n  usuario_id: body.usuario_id || null,\n  contexto: 'Grupo Econômico: Dedetizadora, Holding e Fundação. A 4ª camada é o Conselho (COHI / Olho do Dono).',\n  recebido_em: new Date().toISOString(),\n  status: 'analise_conselho'\n} }];"
      },
      "id": "cohi-code-01",
      "name": "Validar e Normalizar Contexto",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [420, 300]
    },
    {
      "parameters": {
        "jsCode": "const j = $json;\n// Os 6 Conselheiros do Olho do Dono (4ª Camada)\nconst conselheiros = [\n  { nome: 'logica', pergunta: 'Esta decisão é coerente com os dados disponíveis?' },\n  { nome: 'estrategia', pergunta: 'Esta decisão melhora receita, margem, posicionamento ou crescimento?' },\n  { nome: 'filosofia', pergunta: 'Estamos resolvendo o problema real ou apenas o sintoma?' },\n  { nome: 'primeiros_principios', pergunta: 'Qual é a solução mais simples a partir do objetivo e das restrições?' },\n  { nome: 'etica_governanca', pergunta: 'A decisão é legal, segura, transparente e defensável?' },\n  { nome: 'pensamento_sistemico', pergunta: 'Quais são os efeitos sobre caixa, equipe, clientes e empresas do grupo?' }\n];\n\nconst pareceres = conselheiros.map(c => ({\n  conselheiro: c.nome,\n  pergunta: c.pergunta,\n  instrucao: `Analise a demanda como especialista em ${c.nome} sob a ótica do Olho do Dono (COHI). Responda com análise, premissas, dados ausentes, riscos e conclusão.\nDemanda: ${j.demanda}\nEmpresa (Pilar): ${j.empresa}\nÁrea: ${j.area}\nPrioridade: ${j.prioridade}`\n}));\n\nreturn [{ json: { ...j, pareceres, status: 'pareceres_gerados' } }];"
      },
      "id": "cohi-code-02",
      "name": "Disparar Conselho (4ª Camada)",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [640, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ $json }}",
        "options": {}
      },
      "id": "cohi-respond-01",
      "name": "Retornar Deliberação ao Sistema",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [860, 300]
    }
  ],
  "connections": {
    "Entrada Demanda - Olho do Dono": {
      "main": [
        [
          {
            "node": "Validar e Normalizar Contexto",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Validar e Normalizar Contexto": {
      "main": [
        [
          {
            "node": "Disparar Conselho (4ª Camada)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Disparar Conselho (4ª Camada)": {
      "main": [
        [
          {
            "node": "Retornar Deliberação ao Sistema",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1"
  }
}
