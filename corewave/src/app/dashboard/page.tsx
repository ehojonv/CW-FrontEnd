'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, TrendingUp, Bell, Activity, FileX, Loader2, Eye, EyeOff } from 'lucide-react';
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

const fixEncoding = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  const encodingMap = {
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

  const processEventos = (eventosRaw) => {
    return eventosRaw.map(evento => ({
      ...evento,
      name: fixEncoding(evento.name),
      place: fixEncoding(evento.place),
      description: fixEncoding(evento.description),
      eventType: fixEncoding(evento.eventType)
    }));
  };

  // Toggle descrição expandida
  const toggleDescription = (eventId) => {
    setExpandedDescriptions(prev => {
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
        const eventosAtivos = processEventos(data.data.filter(evento => !evento.deleted));
        
        setEventos(eventosAtivos);
        
        // Calcular estatísticas
        const eventosAltaRisco = eventosAtivos.filter(evento => evento.eventRisk === 'alta').length;
        
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

const createEvento = async (eventData) => {
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
  const deleteEvento = async (eventId) => {
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
