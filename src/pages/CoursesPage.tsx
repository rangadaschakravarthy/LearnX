import React, { useState } from 'react';
import { Search, FolderGit2, BookOpen, PlusCircle, CheckCircle2 } from 'lucide-react';
import { ContentService } from '../services/contentService';
import { CourseCard } from '../components/course/CourseCard';

export const CoursesPage: React.FC = () => {
  const manifest = ContentService.getManifest();
  const [filter, setFilter] = useState('');

  const courses = [manifest];

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(filter.toLowerCase()) ||
    c.technology.toLowerCase().includes(filter.toLowerCase()) ||
    c.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Course Catalog</h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse interactive courses derived directly from your cloned Git repositories.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter courses..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        {filteredCourses.map((c) => (
          <CourseCard key={c.id} manifest={c} />
        ))}
      </div>

      {/* Multi-Course Extensibility Card */}
      <div className="mt-12 p-6 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-slate-200 font-semibold text-sm">
            <PlusCircle className="w-4 h-4 text-indigo-400" />
            <span>Adding More Courses (TypeScript, Python, React, Go)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            LearnX is built with a pluggable multi-course registry. Simply clone another repository into your workspace parent directory and configure its path in <code className="text-indigo-300 font-mono">scripts/sync-course-content.ts</code> to automatically index new courses.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-slate-800 text-[11px] text-slate-300 font-mono border border-slate-700/60 self-center whitespace-nowrap">
          Pluggable Architecture Ready
        </div>
      </div>
    </div>
  );
};
