'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, TrendingUp, Bell, Activity, FileX, Loader2, Eye, EyeOff } from 'lucide-react';
import Header from '../../components/Header';
import ProtectedRoute from '../../components/ProtectedRoute';

const API_BASE_URL = 'https://corewaveapi.onrender.com';
