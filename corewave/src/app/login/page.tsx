'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Eye, EyeOff, Users, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect se já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simular delay de login
    setTimeout(() => {
      const success = login(formData.email, formData.password);
      
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Credenciais inválidas. Use admin/password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleIntegrantesClick = () => {
    router.push('/integrantes');
  };

  const preencherCredenciais = () => {
    setFormData({
      email: 'admin',
      password: 'password'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-50"></div>
      
      <div className="relative max-w-md w-full space-y-6">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <img 
                src="/favicon.png" 
                alt="CoreWave Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">CoreWave</h1>
          <p className="text-white text-sm sm:text-base opacity-90 px-4">
            Sistema de Monitoramento de Eventos Extremos
          </p>
        </div>

        {/* Card de Boas-vindas */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Bem-vindo ao CoreWave
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Sistema avançado de detecção e análise de eventos extremos da natureza.
          </p>
        </div>

        {/* Informações de Login para Protótipo */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-lg border border-gray-100">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Acesso ao Protótipo
              </h3>
              <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                  <span className="text-gray-600 text-xs sm:text-sm">Usuário:</span>
                  <code className="bg-white px-2 py-1 rounded text-gray-800 font-mono text-xs sm:text-sm break-all">admin</code>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                  <span className="text-gray-600 text-xs sm:text-sm">Senha:</span>
                  <code className="bg-white px-2 py-1 rounded text-gray-800 font-mono text-xs sm:text-sm break-all">password</code>
                </div>
              </div>
              <button
                onClick={preencherCredenciais}
                className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Preencher automaticamente
              </button>
            </div>
          </div>
        </div>

        {/* Formulário de Login */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Usuário"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 transition-colors text-sm sm:text-base"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-12 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 transition-colors text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        {/* Botão Integrantes */}
        <div className="text-center pb-4">
          <button
            onClick={handleIntegrantesClick}
            className="inline-flex items-center gap-2 px-6 py-3 sm:py-4 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg border border-gray-100 text-sm sm:text-base"
          >
            <Users className="w-5 h-5" />
            Ver Integrantes
          </button>
        </div>
      </div>
    </div>
  );
};