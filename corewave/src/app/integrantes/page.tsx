'use client';

import React from 'react';
import { Users, Github, Linkedin, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function IntegrantesPage() {
  const router = useRouter();
  
  const handleVoltar = () => {
    router.push('/login');
  };

  const integrantes = [
    {
      nome: "João Alves",
      rm: "RM559369",
      turma: "1TDSPB - Agosto",
      github: "https://github.com/ehojonv",
      linkedin: "https://www.linkedin.com/in/joao-v-alves/",
      foto: "/joao.jpeg"
    },
    {
      nome: "Juan Coelho",
      rm: "RM560445",
      turma: "1TDSPB - Agosto",
      github: "https://github.com/juanxto",
      linkedin: "https://www.linkedin.com/in/juan-pablo-rebelo-7ba5b930a/",
      foto: "/juan.jpeg"
    },
    {
      nome: "Matheus Mariotto",
      rm: "RM560276", 
      turma: "1TDSPB - Agosto",
      github: "https://github.com/matheusmariotto1206",
      linkedin: "https://www.linkedin.com/in/matheus-mariotto-0a68a5204/",
      foto: "/matheus.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header similar ao das outras páginas */}
      <header className="bg-gray-900 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <img 
                src="/favicon.png" 
                alt="CoreWave Logo" 
                className="w-8 h-8 mr-3"
              />
              <h1 className="text-xl sm:text-2xl font-bold text-white">CoreWave</h1>
            </div>
            
            {/* Botão Voltar */}
            <button
              onClick={handleVoltar}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Voltar ao Login</span>
              <span className="sm:hidden">Voltar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Título da página */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Equipe de Desenvolvimento</h2>
          <p className="text-sm sm:text-base text-gray-600">Global Solution 2025 - Eventos Extremos</p>
        </div>

        {/* Grid de Integrantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {integrantes.map((integrante, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-red-600 shadow-lg">
                  <img 
                    src={integrante.foto}
                    alt={`Foto de ${integrante.nome}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{integrante.nome}</h3>
                <p className="text-red-600 font-medium mb-1">{integrante.rm}</p>
                <p className="text-gray-600 text-sm mb-6">{integrante.turma}</p>
                
                <div className="flex justify-center space-x-4">
                  <a 
                    href={integrante.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors group"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                  </a>
                  <a 
                    href={integrante.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors group"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-blue-600 group-hover:text-blue-800" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informações adicionais */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sobre o Projeto</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              O CoreWave é um sistema desenvolvido para monitoramento e análise de eventos extremos da natureza, 
              criado como parte da Global Solution 2025 da FIAP.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}