import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Terminal, RefreshCw, FolderGit2, CheckCircle2 } from 'lucide-react';
import { ContentService } from '../../services/contentService';

export const Footer: React.FC = () => {
  const manifest = ContentService.getManifest();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">LearnX</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Modern developer-first interactive learning platform that compiles real Git repositories into structured, runnable courses.
            </p>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Source: {manifest.sourceRepositoryName}</span>
            </div>
          </div>

          {/* Col 2: Course Curriculum */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Curriculum Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/courses/javascript-mastery" className="hover:text-indigo-400 transition">
                  JavaScript Fundamentals (Phase 01)
                </Link>
              </li>
              <li>
                <Link to="/courses/javascript-mastery" className="hover:text-indigo-400 transition">
                  DOM & Browser Engine (Phase 08)
                </Link>
              </li>
              <li>
                <Link to="/courses/javascript-mastery" className="hover:text-indigo-400 transition">
                  Asynchronous & Promises (Phase 10)
                </Link>
              </li>
              <li>
                <Link to="/courses/javascript-mastery" className="hover:text-indigo-400 transition">
                  Deep JS Internals & V8 (Phase 16)
                </Link>
              </li>
              <li>
                <Link to="/courses/javascript-mastery" className="hover:text-indigo-400 transition">
                  React & Node Foundation (Phase 21-22)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Developer Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/playground" className="hover:text-indigo-400 transition flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Interactive Playground</span>
                </Link>
              </li>
              <li>
                <Link to="/courses/javascript-mastery/learn?file=CHEATSHEET.md" className="hover:text-indigo-400 transition">
                  JavaScript Cheatsheet
                </Link>
              </li>
              <li>
                <Link to="/courses/javascript-mastery/learn?file=ROADMAP.md" className="hover:text-indigo-400 transition">
                  Mastery Roadmap
                </Link>
              </li>
              <li>
                <Link to="/courses/javascript-mastery/learn?file=COMMON-MISTAKES.md" className="hover:text-indigo-400 transition">
                  Common Pitfalls & Gotchas
                </Link>
              </li>
              <li>
                <Link to="/courses/javascript-mastery/learn?file=INTERVIEW.md" className="hover:text-indigo-400 transition">
                  Interview Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Synchronization & Remote */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Repository Engine
            </h4>
            <p className="text-xs text-slate-400">
              LearnX derives its lessons directly from your cloned repository.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center space-x-1 text-slate-300">
                <RefreshCw className="w-3 h-3 text-indigo-400" />
                <span>Sync Pipeline</span>
              </div>
              <div className="text-emerald-400 font-semibold">npm run content:sync</div>
            </div>

            {manifest.gitRemote && (
              <a
                href={manifest.gitRemote}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition pt-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Remote Repository</span>
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} LearnX Platform. Built for developers by developers.
          </div>
          <div className="flex items-center space-x-4">
            <span>22 Phases</span>
            <span>•</span>
            <span>271 Modules</span>
            <span>•</span>
            <span>2,283 Lessons</span>
            <span>•</span>
            <span>494 Exercises</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
