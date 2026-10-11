import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-2xl mb-4 border border-indigo-500/30">
        404
      </div>
      <h1 className="text-3xl font-bold text-white">Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md mt-2">
        The requested lesson or view does not exist or may have been moved.
      </p>
      <div className="flex items-center space-x-3 mt-6">
        <Link
          to="/"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center space-x-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/courses"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition border border-slate-700 flex items-center space-x-1.5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Course Catalog</span>
        </Link>
      </div>
    </div>
  );
};
