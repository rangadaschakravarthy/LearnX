import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ArrowRight,
  FolderGit2,
  CheckCircle2,
  Search,
  Github,
  Terminal,
  FileText,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { ContentService } from '../services/contentService';
import { useProgress } from '../context/ProgressContext';
import { PhaseAccordion } from '../components/course/PhaseAccordion';

export const CourseOverviewPage: React.FC = () => {
  const manifest = ContentService.getManifest();
  const { completedCount, completionPercentage, progress } = useProgress();
  const [activeTab, setActiveTab] = useState<'syllabus' | 'guides'>('syllabus');
  const [searchQuery, setSearchQuery] = useState('');

  const firstLessonPath = manifest.phases[0]?.days[0]?.tabs.theory[0]?.relativePath ||
    manifest.phases[0]?.days[0]?.allLessons[0]?.relativePath ||
    'README.md';
  const resumePath = progress.lastVisitedLesson?.lessonPath || firstLessonPath;

  const filteredPhases = manifest.phases.filter(phase => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      phase.title.toLowerCase().includes(q) ||
      phase.days.some(d =>
        d.title.toLowerCase().includes(q) ||
        d.allLessons.some(l => l.title.toLowerCase().includes(q))
      )
    );
  });

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Course Header Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {manifest.technology}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60 flex items-center space-x-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Source: {manifest.sourceRepositoryName}</span>
            </span>
            {manifest.gitRemote && (
              <a
                href={manifest.gitRemote}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 flex items-center space-x-1.5 transition"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {manifest.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {manifest.description}
          </p>

          {/* Progress Overview Bar */}
          <div className="pt-2 max-w-xl space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span className="font-medium">Curriculum Completion</span>
              <span className="text-emerald-400 font-semibold">
                {completedCount} of {manifest.stats.totalLessons} completed ({completionPercentage}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${Math.max(2, completionPercentage)}%` }}
              />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              to={`/courses/${manifest.id}/learn?file=${encodeURIComponent(resumePath)}`}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center space-x-2"
            >
              <span>{completedCount > 0 ? 'Resume Learning' : 'Start Course'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/playground"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm transition border border-slate-700 flex items-center space-x-2"
            >
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Launch Playground</span>
            </Link>
          </div>
        </div>

        {/* Ambient Gradient */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        {/* Tab Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 ${
              activeTab === 'syllabus'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Complete Syllabus ({manifest.stats.totalPhases} Phases)</span>
          </button>

          <button
            onClick={() => setActiveTab('guides')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 ${
              activeTab === 'guides'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Reference Guides ({manifest.rootResources.length})</span>
          </button>
        </div>

        {/* Search Input */}
        {activeTab === 'syllabus' && (
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phases or topics..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}
      </div>

      {/* Tab 1: Syllabus Accordions */}
      {activeTab === 'syllabus' && (
        <div className="space-y-4">
          {filteredPhases.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
              No phases or modules matched "{searchQuery}".
            </div>
          ) : (
            filteredPhases.map((phase, idx) => (
              <PhaseAccordion
                key={phase.id}
                phase={phase}
                defaultExpanded={idx === 0}
              />
            ))
          )}
        </div>
      )}

      {/* Tab 2: Reference Guides */}
      {activeTab === 'guides' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {manifest.rootResources.map((guide) => (
            <Link
              key={guide.id}
              to={`/courses/${manifest.id}/learn?file=${encodeURIComponent(guide.relativePath)}`}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono text-xs text-slate-400">{guide.fileName}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition" />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-indigo-200 transition">
                  {guide.title}
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between font-mono">
                <span>{(guide.sizeBytes / 1024).toFixed(1)} KB</span>
                <span className="text-indigo-400 font-sans font-medium">Read Guide →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
