/* eslint-disable */
'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, TrendingUp, Activity, FileX, Loader2, Eye, EyeOff } from 'lucide-react';
import Header from '../../components/Header';
import ProtectedRoute from '../../components/ProtectedRoute';

const API_BASE_URL = 'https://corewaveapi.onrender.com';

function DashboardContent() {
  const [stats, setStats] = useState({
    totalEventos: 0,
    eventosAtivos: 0,
    severidadeAlta: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState(new Set());

  // Função para corrigir acentos
const fixEncoding = (text: any) => {
  if (!text || typeof text !== 'string') return text;
  
  const encodingMap: { [key: string]: string } = {
    'Ã¡': 'á', 'Ã ': 'à', 'Ã¢': 'â', 'Ã£': 'ã', 'Ã¤': 'ä',
    'Ã©': 'é', 'Ã¨': 'è', 'Ãª': 'ê', 'Ã«': 'ë',
    'Ã­': 'í', 'Ã¬': 'ì', 'Ã®': 'î', 'Ã¯': 'ï',
    'Ã³': 'ó', 'Ã²': 'ò', 'Ã´': 'ô', 'Ãµ': 'õ', 'Ã¶': 'ö',
    'Ãº': 'ú', 'Ã¹': 'ù', 'Ã»': 'û', 'Ã¼': 'ü',
    'Ã§': 'ç', 'Ã±': 'ñ',
    'Ã': 'Á', 'Ã€': 'À', 'Ã‚': 'Â', 'Ãƒ': 'Ã', 'Ã„': 'Ä',
    'Ã‰': 'É', 'Ãˆ': 'È', 'ÃŠ': 'Ê', 'Ã‹': 'Ë',
    'Ã': 'Í', 'ÃŒ': 'Ì', 'ÃŽ': 'Î', 'Ã': 'Ï',
    'Ã“': 'Ó', 'Ã’': 'Ò', 'Ã”': 'Ô', 'Ã•': 'Õ', 'Ã–': 'Ö',
    'Ãš': 'Ú', 'Ã™': 'Ù', 'Ã›': 'Û', 'Ãœ': 'Ü',
    'Ã‡': 'Ç', 'Ã‘': 'Ñ'
  };

  let fixedText = text;
  Object.keys(encodingMap).forEach(key => {
    fixedText = fixedText.replace(new RegExp(key, 'g'), encodingMap[key]);
  });

  return fixedText;
};


  // Função para processar eventos e corrigir encoding
  const processEventos = (eventosRaw: any[]) => {
    return eventosRaw.map((evento: { name: any; place: any; description: any; eventType: any; }) => ({
      ...evento,
      name: fixEncoding(evento.name),
      place: fixEncoding(evento.place),
      description: fixEncoding(evento.description),
      eventType: fixEncoding(evento.eventType)
    }));
  };

  // Toggle descrição expandida
  const toggleDescription = (eventId: unknown) => {
    setExpandedDescriptions((prev: Iterable<unknown> | null | undefined) => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  // Carregar eventos da API
  const fetchEventos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Tentando conectar com:', `${API_BASE_URL}/events?page=1&size=50`);
      
      const response = await fetch(`${API_BASE_URL}/events?page=1&size=50`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
      
      console.log('Resposta da API:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      
      if (data && data.data) {
        // Filtrar apenas eventos não deletados e processar encoding
        const eventosAtivos = processEventos(data.data.filter((evento: { deleted: any; }) => !evento.deleted));
        
        setEventos(eventosAtivos);
        
        // Calcular estatísticas
        const eventosAltaRisco = eventosAtivos.filter((evento: { eventRisk: string; }) => evento.eventRisk === 'alta').length;
        
        setStats({
          totalEventos: data.totalItens || eventosAtivos.length,
          eventosAtivos: eventosAtivos.length,
          severidadeAlta: eventosAltaRisco,
        });
      } else {
        console.log('Estrutura de dados inesperada:', data);
        setEventos([]);
        setStats({ totalEventos: 0, eventosAtivos: 0, severidadeAlta: 0 });
      }
    } catch (err) {
      console.error('Erro detalhado ao carregar eventos:', err);
      
      // Verificar se é um erro de rede/CORS
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Erro de conexão com a API. Verifique se a API está online e as configurações de CORS.');
      } else {
        setError(`Erro ao carregar eventos: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Adicionar novo evento
  const createEvento = async (eventData: { nome: any; tipo: string; severidade: any; local: any; descricao: any; }) => {
    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        name: eventData.nome,
        eventType: eventData.tipo.toLowerCase(),
        eventRisk: eventData.severidade,
        place: eventData.local,
        description: eventData.descricao || `Evento de ${eventData.tipo} registrado em ${eventData.local}`,
      };

      console.log('Enviando evento:', payload);

      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(payload),
      });

      console.log('Resposta ao criar evento:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro detalhado:', errorText);
        throw new Error(`Erro ao criar evento: ${response.status} - ${response.statusText}`);
      }

      // Recarregar a lista de eventos
      await fetchEventos();
      setShowModal(false);
      
    } catch (err) {
      console.error('Erro ao criar evento:', err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Erro de conexão ao adicionar evento. Verifique sua conexão e tente novamente.');
      } else {
        setError(`Erro ao adicionar evento: ${err.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Deletar evento
  const deleteEvento = async (eventId: any) => {
    try {
      console.log('Deletando evento:', eventId);
      
      const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
      });

      console.log('Resposta ao deletar evento:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`Erro ao deletar evento: ${response.status} - ${response.statusText}`);
      }

      // Recarregar a lista de eventos
      await fetchEventos();
      
    } catch (err) {
      console.error('Erro ao deletar evento:', err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Erro de conexão ao deletar evento. Verifique sua conexão e tente novamente.');
      } else {
        setError(`Erro ao deletar evento: ${err.message}`);
      }
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    fetchEventos();
  }, []);

  const handleAddEvent = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(null);
  };

  const handleSubmitEvent = (eventData: any) => {
    createEvento(eventData);
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2`}>
          <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const EventModal = () => {
    const [formData, setFormData] = useState({
      nome: '',
      tipo: '',
      local: '',
      severidade: 'baixa',
      descricao: ''
    });

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
      if (formData.nome && formData.tipo && formData.local) {
        handleSubmitEvent(formData);
      }
    };

    if (!showModal) return null;

    return (
      <div className="fixed inset-0 backdrop-blur-xs bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Novo Evento</h3>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Evento</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Ex: Enchente Rio Tietê"
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border text-gray-700  border-gray-300 rounded-lg text-sm"
              >
                <option value="">Selecione o tipo</option>
                <option value="enchente">Enchente</option>
                <option value="incendio">Incêndio</option>
                <option value="terremoto">Terremoto</option>
                <option value="deslizamento">Deslizamento</option>
                <option value="vendaval">Vendaval</option>
                <option value="granizo">Granizo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
              <input
                type="text"
                name="local"
                value={formData.local}
                onChange={handleInputChange}
                placeholder="Ex: São Paulo, SP"
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severidade</label>
              <select
                name="severidade"
                value={formData.severidade}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-lg text-sm"
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                rows={3}
                placeholder="Descreva os detalhes do evento..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
                text-gray-700"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleCloseModal}
                disabled={submitting}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !formData.nome || !formData.tipo || !formData.local}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adicionando...
                  </>
                ) : (
                  'Adicionar Evento'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EmptyState = ({ title, description, icon: Icon }) => (
    <div className="flex flex-col items-center justify-center py-8 text-center px-4">
      <Icon className="w-12 h-12 text-gray-300 mb-3" />
      <h3 className="text-base font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );

  // Função para mapear tipos de eventos para ícones/cores
  const getEventTypeInfo = (eventType: string | number) => {
    const types = {
      enchente: { color: 'bg-blue-100 text-blue-800', icon: '🌊' },
      incendio: { color: 'bg-red-100 text-red-800', icon: '🔥' },
      deslizamento: { color: 'bg-yellow-100 text-yellow-800', icon: '⛰️' },
      terremoto: { color: 'bg-purple-100 text-purple-800', icon: '🌍' },
      vendaval: { color: 'bg-gray-100 text-gray-800', icon: '💨' },
      granizo: { color: 'bg-cyan-100 text-cyan-800', icon: '🧊' },
    };
    return types[eventType] || { color: 'bg-gray-100 text-gray-800', icon: '⚠️' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddEvent={handleAddEvent} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Dashboard de Monitoramento</h2>
          <p className="text-sm text-gray-600">Visão geral dos eventos extremos em tempo real</p>
        </div>

        {error && !loading && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex flex-col gap-2">
              <span className="font-medium">⚠️ Erro de Conexão</span>
              <span className="text-sm">{error}</span>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={fetchEventos}
                  className="text-red-800 hover:text-red-900 underline text-sm"
                >
                  Tentar novamente
                </button>
                <button
                  onClick={() => {
                    console.log('Testando conexão com API...');
                    fetch(`${API_BASE_URL}/events?page=1&size=1`)
                      .then(response => {
                        console.log('Teste de conexão:', response.status, response.statusText);
                        return response.json();
                      })
                      .then(data => console.log('Dados de teste:', data))
                      .catch(err => console.error('Erro no teste:', err));
                  }}
                  className="text-red-800 hover:text-red-900 underline text-sm"
                >
                  Testar conexão
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard 
            icon={Activity} 
            title="Total de Eventos" 
            value={loading ? '-' : stats.totalEventos} 
            color="bg-blue-500" 
          />
          <StatCard 
            icon={AlertTriangle} 
            title="Eventos Ativos" 
            value={loading ? '-' : stats.eventosAtivos} 
            color="bg-red-500" 
          />
          <StatCard 
            icon={TrendingUp} 
            title="Severidade Alta" 
            value={loading ? '-' : stats.severidadeAlta} 
            color="bg-orange-500" 
          />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h3 className="text-base font-semibold text-gray-800">Eventos Recentes</h3>
            <div className="flex gap-2">
              <button
                onClick={fetchEventos}
                disabled={loading}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'Carregando...' : 'Atualizar'}
              </button>
              {eventos.length > 0 && (
                <button
                  onClick={handleAddEvent}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Adicionar mais
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-600">Carregando eventos...</span>
            </div>
          ) : eventos.length === 0 ? (
            <EmptyState
              title="Nenhum evento encontrado"
              description="Clique em 'Adicionar Evento' para começar a monitorar eventos extremos"
              icon={FileX}
            />
          ) : (
            <div className="space-y-3">
              {eventos.map((event: { eventType: any; id: any; name: any; place: any; eventRisk: string; description: any; }) => {
                const typeInfo = getEventTypeInfo(event.eventType);
                const isDescriptionExpanded = expandedDescriptions.has(event.id);
                
                return (
                  <div key={event.id} className="border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-3">
                      <div className="flex items-center">
                        <div className="mr-3 text-lg">{typeInfo.icon}</div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{event.name}</p>
                          <p className="text-xs text-gray-600 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.place}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                          {event.eventType}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.eventRisk === 'alta'
                            ? 'bg-red-100 text-red-800'
                            : event.eventRisk === 'media'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {event.eventRisk}
                        </span>
                        {event.description && (
                          <button
                            onClick={() => toggleDescription(event.id)}
                            className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1"
                            title={isDescriptionExpanded ? "Ocultar descrição" : "Ver descrição"}
                          >
                            {isDescriptionExpanded ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            {isDescriptionExpanded ? 'Ocultar' : 'Ver mais'}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm('Tem certeza que deseja deletar este evento?')) {
                              deleteEvento(event.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded"
                        >
                          Deletar
                        </button>
                      </div>
                    </div>
                    
                    {/* Descrição expandida */}
                    {isDescriptionExpanded && event.description && (
                      <div className="px-3 pb-3 border-t border-gray-100 mt-2 pt-2">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700 font-medium mb-1">Descrição:</p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <EventModal />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}