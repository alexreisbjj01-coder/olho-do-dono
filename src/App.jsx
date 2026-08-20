import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { demanda } = await req.json()
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY não configurada nos segredos do Supabase.")
    }

    // Chamada direta para o Gemini (versão 2.5 flash) para testar o conselho
    const prompt = `Atue como o Conselho de IA do grupo "O Olho do Dono". Responda de forma executiva à seguinte pauta: "${demanda}"`;

    const geminiResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    })

    const geminiData = await geminiResp.json()
    const respostaTexto = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta da IA."

    return new Response(
      JSON.stringify({ 
        sucesso: true, 
        decisao: respostaTexto,
        status_conselho: "Deliberado com sucesso" 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
