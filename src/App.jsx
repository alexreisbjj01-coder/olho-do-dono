import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Bot, 
  ShieldCheck, 
  Plus, 
  TrendingUp, 
  LogOut,
  FileText
} from 'lucide-react';

// Substitua pelas suas credenciais do Supabase se necessário
const SUPABASE_URL = "https://SEU_PROJETO.supabase.co";
const ANON_KEY = "SUA_CHAVE_ANONIMA";

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dados de exemplo para exibição no painel
  const [demandas, setDemandas] = useState([
    { id: 1, titulo: 'Aprovação de Orçamento MKT', empresa: 'Empresa Alpha', status: 'pendente', prioridade: 'alta' },
    { id: 2, titulo: 'Revisão de Contrato de Aluguel', empresa: 'Empresa Beta', status: 'concluido', prioridade: 'media' },
    { id: 3, titulo: 'Auditoria de Folha de Pagamento', empresa: 'Empresa Alpha', status: 'em_analise', prioridade: 'alta' }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setUser({ email, role: 'Dono / Administrador' });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', padding: '1rem', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <Building2 size={48} color="#2563eb" style={{ margin: '0 auto' }} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem', color: '#1f2937' }}>O Olho do Dono</h1>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Governança Multiempresarial & IA</p>
          </div>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>E-mail</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
                placeholder="seu@email.com"
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Senha</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', padding: '0.75rem', borderRadius: '0.375rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Entrar no Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
      {/* Topbar */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building2 size={28} color="#2563eb" />
          <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#111827' }}>O Olho do Dono</span>
        </div>
        <button 
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '500' }}
        >
          <LogOut size={18} /> Sair
        </button>
      </header>

      {/* Main Content */}
      <main style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', backgroundColor: activeTab === 'dashboard' ? '#2563eb' : 'transparent', color: activeTab === 'dashboard' ? '#fff' : '#4b5563', cursor: 'pointer', fontWeight: '500' }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('demandas')}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', backgroundColor: activeTab === 'demandas' ? '#2563eb' : 'transparent', color: activeTab === 'demandas' ? '#fff' : '#4b5563', cursor: 'pointer', fontWeight: '500' }}
          >
            Demandas
          </button>
          <button 
            onClick={() => setActiveTab('conselho')}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', backgroundColor: activeTab === 'conselho' ? '#2563eb' : 'transparent', color: activeTab === 'conselho' ? '#fff' : '#4b5563', cursor: 'pointer', fontWeight: '500' }}
          >
            Conselho IA
          </button>
        </div>

        {/* Tab: Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Resumo Executivo</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Empresas</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>2</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Demandas Abertas</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>2</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Concluídas</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>1</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Demandas */}
        {activeTab === 'demandas' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>Gestão de Demandas</h2>
              <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                <Plus size={16} /> Nova
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {demandas.map((item) => (
                <div key={item.id} style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#111827' }}>{item.titulo}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.empresa}</p>
                  </div>
                  <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', backgroundColor: item.status === 'concluido' ? '#d1fae5' : '#fef3c7', color: item.status === 'concluido' ? '#065f46' : '#92400e' }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Conselho IA */}
        {activeTab === 'conselho' && (
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Bot size={24} color="#2563eb" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>Conselho Consultivo IA</h2>
            </div>
            <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '1rem' }}>
              O conselho de Inteligência Artificial analisa as demandas estratégicas registradas e gera pareceres recomendando aprovação ou ajustes.
            </p>
            <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', borderLeft: '4px solid #2563eb' }}>
              <p style={{ fontWeight: 'bold', fontSize: '0.875rem', color: '#1f2937' }}>Parecer da IA sobre "Aprovação de Orçamento MKT":</p>
              <p style={{ fontSize: '0.875rem', color: '#374151', marginTop: '0.5rem' }}>
                "Recomenda-se a aprovação mediante validação do ROI estimado do canal de aquisição proposto."
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
