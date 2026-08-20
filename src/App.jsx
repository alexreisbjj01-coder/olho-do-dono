import React, { useState } from 'react';
import { Shield, Lock, Cpu, Building2, FileText, CheckCircle2, AlertTriangle, Send } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'macro' | 'layers' | 'planning' | 'ai'>('macro');
  const [pauta, setPauta] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseLog, setResponseLog] = useState<string | null>(null);

  const companies = [
    { id: 'dedetizadora', name: 'Dedetizadora', desc: 'Operação e Campo' },
    { id: 'holding', name: 'Holding Patrimonial', desc: 'Gestão de Ativos' },
    { id: 'fundacao', name: 'Fundação / Projetos', desc: 'Expansão e Estratégia' }
  ];

  const handleLogin = (companyId: string) => {
    setSelectedCompany(companyId);
    setIsAuthenticated(true);
  };

  const handleConsultAI = () => {
    if (!pauta.trim()) return;
    setLoading(true);
    setResponseLog(null);
    setTimeout(() => {
      setLoading(false);
      setResponseLog(`[Parecer do Conselho - 6 Conselheiros]: Pauta analisada com sucesso para a empresa ${selectedCompany?.toUpperCase()}. Rota validada nas 4 Camadas de Controle. Indicador estável.`);
    }, 1200);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#131b2e] border border-[#1f293d] rounded-xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-xl font-bold tracking-wide">O OLHO DO DONO</h1>
              <p className="text-xs text-slate-400">Gestão Executiva — 4 Camadas de Controle</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mb-4">Selecione a empresa para iniciar a sessão executiva:</p>
          <div className="space-y-3">
            {companies.map((comp) => (
              <button
                key={comp.id}
                onClick={() => handleLogin(comp.id)}
                className="w-full text-left p-3 rounded-lg bg-[#1a243b] hover:bg-amber-500/10 border border-slate-700 hover:border-amber-500/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-semibold text-white group-hover:text-amber-400">{comp.name}</div>
                  <div className="text-xs text-slate-400">{comp.desc}</div>
                </div>
                <Lock className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-slate-800 bg-[#131b2e] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-amber-500" />
          <div>
            <h1 className="text-lg font-bold tracking-wide">O OLHO DO DONO</h1>
            <p className="text-xs text-slate-400">Empresa Ativa: <span className="text-amber-400 uppercase">{selectedCompany}</span></p>
          </div>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors"
        >
          Trocar Empresa / Sair
        </button>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-[#101726] border-b border-slate-800 px-6 py-2 flex gap-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('macro')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'macro' ? 'bg-amber-500 text-black' : 'text-slate-300 hover:bg-slate-800'}`}
        >
          Painel Macro
        </button>
        <button
          onClick={() => setActiveTab('layers')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'layers' ? 'bg-amber-500 text-black' : 'text-slate-300 hover:bg-slate-800'}`}
        >
          As 4 Camadas
        </button>
        <button
          onClick={() => setActiveTab('planning')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'planning' ? 'bg-amber-500 text-black' : 'text-slate-300 hover:bg-slate-800'}`}
        >
          Planejamento
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'ai' ? 'bg-amber-500 text-black' : 'text-slate-300 hover:bg-slate-800'}`}
        >
          Conselho de IA
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {activeTab === 'macro' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm text-slate-400 mb-1">Status Operacional</h3>
              <p className="text-2xl font-bold text-emerald-400">100% Operante</p>
            </div>
            <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm text-slate-400 mb-1">Camadas Ativas</h3>
              <p className="text-2xl font-bold text-amber-400">4 / 4 Blindadas</p>
            </div>
            <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm text-slate-400 mb-1">Deliberações Pendentes</h3>
              <p className="text-2xl font-bold text-sky-400">0</p>
            </div>
          </div>
        )}

        {activeTab === 'layers' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-amber-400">As 4 Camadas de Controle Executivo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Camada 1: Governança e Compliance', 'Camada 2: Tesouraria e Fluxo de Caixa', 'Camada 3: Execução Operacional', 'Camada 4: Conselho Estratégico (COHI)'].map((layer, idx) => (
                <div key={idx} className="bg-[#131b2e] border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 font-semibold text-white mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    {layer}
                  </div>
                  <p className="text-xs text-slate-400">Monitoramento ativo em tempo real integrando as diretrizes de controle do dono.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'planning' && (
          <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-amber-400 mb-2">Planejamento Estratégico e Metas</h2>
            <p className="text-sm text-slate-300">Painel centralizado de projeções orçamentárias, investimentos e metas de faturamento alinhados.</p>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="bg-[#131b2e] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-amber-400 mb-1">Deliberação do Conselho (6 Conselheiros)</h2>
            <p className="text-xs text-slate-400 mb-4">Envie sua pauta estratégica para análise executiva multi-agente.</p>
            
            <textarea
              value={pauta}
              onChange={(e) => setPauta(e.target.value)}
              placeholder="Digite sua pauta estratégica aqui..."
              className="w-full bg-[#0b0f19] border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-amber-500 h-32 resize-none mb-4"
            />

            <button
              onClick={handleConsultAI}
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              {loading ? 'Analisando Pauta...' : 'Consultar Conselho de IA'}
            </button>

            {responseLog && (
              <div className="mt-6 bg-[#0b0f19] border border-amber-500/30 rounded-lg p-4">
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Parecer Executivo:</h4>
                <p className="text-sm text-slate-200">{responseLog}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
