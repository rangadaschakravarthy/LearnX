import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Code2,
  BookOpen,
  Terminal,
  Bookmark,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  FolderGit2
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProgress } from '../../context/ProgressContext';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { completedCount, totalLessons, completionPercentage } = useProgress();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Curriculum', path: '/courses/javascript-mastery', icon: FolderGit2 },
    { label: 'Playground', path: '/playground', icon: Terminal },
    { label: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
  ];

  // Hotkey for search (Ctrl+K or Cmd+K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                    LearnX
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 uppercase tracking-wider">
                    Repo-Engine
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                  Interactive Learning Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-slate-800 text-indigo-400 border border-slate-700/60 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 opacity-80" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            {/* Quick Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 text-xs font-medium transition shadow-sm"
              title="Search curriculum (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Search courses...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700 font-mono">
                Ctrl K
              </kbd>
            </button>

            {/* Overall Progress Pill */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.max(5, completionPercentage)}%` }}
                />
              </div>
              <span className="font-semibold text-slate-300">
                {completionPercentage}%
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-3 space-y-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
