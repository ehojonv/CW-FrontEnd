'use client';

import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; 

interface HeaderProps {
  onAddEvent: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddEvent }) => {
  const { logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  return (
    <header className="bg-gray-900 shadow-lg border-b border-gray-700 relative">
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

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 relative">
            {/* Add Event Button */}
            <button
              onClick={onAddEvent}
              className="hidden sm:flex items-center px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Adicionar Evento</span>
              <span className="md:hidden">Adicionar</span>
            </button>
            <button
              onClick={onAddEvent}
              className="sm:hidden p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title="Adicionar Evento"
            >
              <Plus className="w-5 h-5" />
            </button>

            {/* User Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
              >
                <Users className="w-4 h-4 text-white" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;