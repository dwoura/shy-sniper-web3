import React from 'react';
import { Menu, UserCircle, ChevronDown, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (isOpen: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen, isUserMenuOpen, setIsUserMenuOpen }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
  };

  return (
    <header className="bg-white dark:bg-gray-900 fixed w-full z-10 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Shy-Sniper
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {!isConnected ? (
            <button 
              onClick={() => open()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            >
              连接钱包
            </button>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                <UserCircle className="w-6 h-6" />
                <span>{formatAddress(address)}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      disconnect();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4" />
                    断开连接
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}