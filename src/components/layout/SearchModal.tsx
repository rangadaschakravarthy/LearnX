import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Code2, CheckCircle2, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { SearchService } from '../../services/searchService';
import { SearchItem } from '../../types/course';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'theory' | 'exercise' | 'example' | 'guide'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }
    const found = SearchService.search(query, 30);
    let filtered = found;
    if (activeFilter !== 'all') {
      filtered = found.filter(item => {
        if (activeFilter === 'theory') return item.type === 'theory' || item.type === 'overview';
        if (activeFilter === 'exercise') return item.type === 'exercise';
        if (activeFilter === 'example') return item.type === 'example';
        if (activeFilter === 'guide') return item.type === 'guide' || item.type === 'reference';
        return true;
      });
    }
    setResults(filtered);
    setSelectedIndex(0);
  }, [query, activeFilter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter') {
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (item: SearchItem) => {
    onClose();
    if (item.type === 'guide') {
      navigate(`/courses/javascript-mastery/learn?file=${encodeURIComponent(item.relativePath)}`);
    } else {
      navigate(`/courses/javascript-mastery/learn?file=${encodeURIComponent(item.relativePath)}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-indigo-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, topics, exercises, examples (e.g. 'Closures', 'Promises', 'Day 01')..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="ml-2 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
            ESC
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto text-xs">
          <span className="text-slate-500 font-medium">Filter:</span>
          {(['all', 'theory', 'exercise', 'example', 'guide'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 rounded-full capitalize font-medium transition ${
                activeFilter === filter
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {query.trim().length > 0 && query.length < 2 && (
            <div className="p-8 text-center text-slate-500 text-sm">
              Type at least 2 characters to search...
            </div>
          )}

          {query.trim().length >= 2 && results.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm">
              No matching lessons or code examples found for "{query}".
            </div>
          )}

          {results.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-start justify-between p-3 rounded-xl cursor-pointer transition ${
                  isSelected ? 'bg-indigo-600/15 border border-indigo-500/30' : 'hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-start space-x-3 min-w-0 flex-1">
                  <div className="mt-0.5 p-2 rounded-lg bg-slate-800 text-indigo-400 flex-shrink-0">
                    {item.type === 'exercise' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : item.type === 'example' ? (
                      <Code2 className="w-4 h-4 text-amber-400" />
                    ) : item.type === 'guide' ? (
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <FileText className="w-4 h-4 text-indigo-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-slate-100 text-sm truncate">
                        {item.title}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                        {item.type}
                      </span>
                    </div>
                    {(item.phaseTitle || item.dayTitle) && (
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        {item.phaseTitle} {item.dayTitle ? `› ${item.dayTitle}` : ''}
                      </p>
                    )}
                    {item.preview && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-sans">
                        {item.preview}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center text-slate-500 pl-2">
                  <CornerDownLeft className="w-3.5 h-3.5 opacity-60" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span><kbd className="px-1 bg-slate-800 rounded">↑</kbd> <kbd className="px-1 bg-slate-800 rounded">↓</kbd> Navigate</span>
            <span><kbd className="px-1 bg-slate-800 rounded">↵</kbd> Select</span>
          </div>
          <span>Indexed: {SearchService.getTotalIndexed()} files</span>
        </div>
      </div>
    </div>
  );
};
