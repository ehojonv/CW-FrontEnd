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


