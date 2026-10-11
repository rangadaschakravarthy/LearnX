import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Terminal,
  BookOpen,
  CheckCircle2,
  FolderGit2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Search,
  FileCode2,
  Cpu,
  Clock
} from 'lucide-react';
import { ContentService } from '../services/contentService';
import { useProgress } from '../context/ProgressContext';
import { CourseCard } from '../components/course/CourseCard';

export const HomePage: React.FC = () => {
  const manifest = ContentService.getManifest();
  const { progress, completionPercentage } = useProgress();

  const lastVisited = progress.lastVisitedLesson;

  const defaultTheoryPath = manifest.phases[0]?.days[0]?.tabs.theory[0]?.relativePath ||
    manifest.phases[0]?.days[0]?.allLessons[0]?.relativePath ||
    'README.md';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Sibling Repository Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Connected to repository:</span>
            <code className="text-indigo-300 font-mono font-semibold">{manifest.sourceRepositoryName}</code>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            Learn by Reading.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Master by Building.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed">
            Transform complete Git programming repositories into interactive, structured online courses with rich Markdown curriculum, guided theory, practice exercises, and an in-browser JavaScript execution playground.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              to={`/courses/javascript-mastery/learn?file=${encodeURIComponent(defaultTheoryPath)}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/playground"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm transition border border-slate-700/80 flex items-center justify-center space-x-2"
            >
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Open JavaScript Playground</span>
            </Link>
          </div>

          {/* Continue Learning Prompt (if has visited) */}
          {lastVisited && (
            <div className="mt-8 inline-flex items-center space-x-3 px-4 py-2.5 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-xs text-slate-300 text-left shadow-lg">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <div>
                <span className="text-slate-400">Continue where you left off:</span>{' '}
                <strong className="text-white font-medium">{lastVisited.lessonTitle}</strong>
              </div>
              <Link
                to={`/courses/javascript-mastery/learn?file=${encodeURIComponent(lastVisited.lessonPath)}`}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
              >
                Resume
              </Link>
            </div>
          )}

          {/* Real Repository Statistics (No Fake Numbers) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14 pt-10 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-3xl font-extrabold text-white">{manifest.stats.totalPhases}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Curriculum Phases</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-3xl font-extrabold text-white">{manifest.stats.totalDays}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Days & Modules</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-3xl font-extrabold text-indigo-400">{manifest.stats.totalLessons}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Lessons & Files Indexed</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-3xl font-extrabold text-emerald-400">{manifest.stats.totalExercises}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Practice Exercises</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Course Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Available Courses
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Repository-Powered Course Catalog
            </h2>
          </div>
          <Link
            to="/courses"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 mt-2 md:mt-0 flex items-center space-x-1"
          >
            <span>View Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <CourseCard manifest={manifest} />
      </section>

      {/* Platform Architecture & Features */}
      <section className="py-16 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why LearnX is Built Differently
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Designed around your actual Git repository with zero duplication, seamless offline sync, and a safe in-browser JavaScript sandbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/30">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Direct Repository Engine</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Reads the sibling Git repository directly during synchronization. All 22 phases, markdown files, and code scripts are indexed without modifying your original files.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Isolated Web Worker Playground</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Untrusted user code runs inside a dedicated Web Worker sandbox. Infinite loop safeguards kill blocking computations after 3.5 seconds to protect your browser.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-500/30">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Multi-Tab Learning Workspace</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Effortlessly toggle between Theory, runnable Examples, practice Exercises, official Solutions, and mini projects for every Day module in the curriculum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Playground Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Interactive Code Runner
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
              Practice any repository script in the browser
            </h2>
            <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
              Every code example and exercise from the repository can be loaded into our full-featured Monaco / CodeMirror editor with syntax highlighting, live console formatting, and execution timers.
            </p>
            <div className="flex items-center space-x-3 mt-6">
              <Link
                to="/playground"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-md shadow-indigo-600/30 flex items-center space-x-2"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch Playground</span>
              </Link>
            </div>
          </div>

          {/* Interactive Mini Terminal Preview */}
          <div className="w-full md:w-96 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs shadow-2xl">
            <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2">learnx-worker-runtime</span>
            </div>
            <div className="text-slate-400">
              <span className="text-indigo-400">const</span> languages = [<span className="text-emerald-400">"JavaScript"</span>, <span className="text-emerald-400">"Node.js"</span>];
            </div>
            <div className="text-slate-400 mt-1">
              console.<span className="text-amber-400">log</span>(<span className="text-emerald-400">"Ready to master:"</span>, ...languages);
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-emerald-400 flex items-center justify-between">
              <span>› Ready to master: JavaScript Node.js</span>
              <span className="text-[10px] text-slate-500">2ms</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
