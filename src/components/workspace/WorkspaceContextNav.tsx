import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  Bookmark,
  BookmarkCheck,
  Code2,
  Clock,
  Play,
  PanelRightClose,
  PanelRightOpen,
  ExternalLink,
  Github,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { DayTopic, LessonFile } from '../../types/course';
import { useProgress } from '../../context/ProgressContext';
import { ContentService } from '../../services/contentService';

interface WorkspaceContextNavProps {
  day?: DayTopic;
  currentLesson: LessonFile;
  headings?: string[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSelectLesson: (lesson: LessonFile) => void;
}

export const WorkspaceContextNav: React.FC<WorkspaceContextNavProps> = ({
  day,
  currentLesson,
  headings = [],
  isCollapsed,
  onToggleCollapse,
  onSelectLesson,
}) => {
  const { isBookmarked, toggleBookmark, isCompleted, toggleComplete } = useProgress();
  const navigate = useNavigate();

  const bookmarked = isBookmarked(currentLesson.relativePath);
  const completed = isCompleted(currentLesson.relativePath);
  const githubUrl = ContentService.getGitHubUrl(currentLesson.relativePath);

  if (isCollapsed) {
    return (
      <aside className="hidden xl:flex w-12 border-l border-slate-800 bg-slate-950 flex-col items-center py-4 space-y-4 flex-shrink-0 z-30">
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
          title="Expand right navigation"
        >
          <PanelRightOpen className="w-4 h-4 text-indigo-400" />
        </button>
        <button
          onClick={() => toggleBookmark(currentLesson.relativePath)}
          className={`p-2 rounded-xl border transition ${
            bookmarked
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
          }`}
          title={bookmarked ? 'Remove Bookmark' : 'Bookmark Lesson'}
        >
          {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </aside>
    );
  }

  const handleOpenInPlayground = async (file: LessonFile) => {
    try {
      const code = await ContentService.fetchFileContent(file.relativePath);
      sessionStorage.setItem(
        'learnx_playground_transfer',
        JSON.stringify({
          code,
          sourcePath: file.relativePath,
          timestamp: Date.now(),
        })
      );
      navigate('/playground');
    } catch {
      // fallback
    }
  };

  // Filter JS examples or exercises in this Day module
  const jsFiles = day?.allLessons.filter(l => l.extension === 'js') || [];

  return (
    <>
      {/* Mobile/Tablet Backdrop for Context Drawer */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 xl:hidden"
        onClick={onToggleCollapse}
      />

      <aside className="fixed inset-y-0 right-0 z-50 w-72 bg-slate-950 border-l border-slate-800 shadow-2xl xl:static xl:w-60 lg:w-64 xl:shadow-none flex flex-col h-full overflow-hidden flex-shrink-0">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <List className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
            Context Navigation
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => toggleBookmark(currentLesson.relativePath)}
            className={`p-1.5 rounded-lg border transition ${
              bookmarked
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
            }`}
            title={bookmarked ? 'Bookmarked' : 'Add to bookmarks'}
          >
            {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition"
            title="Collapse panel"
          >
            <PanelRightClose className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Lesson Actions */}
        <div className="space-y-2">
          <button
            onClick={() => toggleComplete(currentLesson.relativePath)}
            className={`w-full py-2 px-3 rounded-xl text-xs font-medium transition flex items-center justify-center space-x-2 border shadow-sm ${
              completed
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500/30'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{completed ? 'Completed ✓' : 'Mark as Complete'}</span>
          </button>

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition flex items-center justify-center space-x-2"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View Source on GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          )}
        </div>

        {/* Day Estimated Study Time & Topics (if available) */}
        {day && (day.estimatedTime || (day.topicsCovered && day.topicsCovered.length > 0)) && (
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            {day.estimatedTime && (
              <div className="flex items-center space-x-2 text-xs text-amber-300 font-medium">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Est. Time: {day.estimatedTime}</span>
              </div>
            )}
            {day.topicsCovered && day.topicsCovered.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-semibold text-slate-500">
                  Topics Covered
                </span>
                <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                  {day.topicsCovered.slice(0, 4).map((t, idx) => (
                    <li key={idx} className="line-clamp-1">{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Long Lesson Table of Contents (Anchors) */}
        {headings && headings.length > 1 && (
          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
              On This Page
            </h5>
            <div className="space-y-1 text-xs">
              {headings.slice(0, 10).map((h, i) => {
                const id = h.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                return (
                  <a
                    key={i}
                    href={`#${id}`}
                    className="block text-slate-400 hover:text-indigo-300 py-0.5 truncate transition"
                  >
                    # {h}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Runnable JavaScript Files in This Module */}
        {jsFiles.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Interactive Scripts ({jsFiles.length})
              </h5>
            </div>
            <div className="space-y-1.5">
              {jsFiles.slice(0, 6).map((file) => (
                <div
                  key={file.id}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition flex items-center justify-between group"
                >
                  <button
                    onClick={() => onSelectLesson(file)}
                    className="text-left min-w-0 pr-2 flex-1"
                  >
                    <div className="text-xs font-mono text-slate-200 group-hover:text-indigo-300 truncate">
                      {file.fileName}
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase font-medium">
                      {file.type} {file.difficulty ? `• ${file.difficulty}` : ''}
                    </span>
                  </button>

                  <button
                    onClick={() => handleOpenInPlayground(file)}
                    className="p-1 rounded bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white transition flex-shrink-0"
                    title="Run in Playground"
                  >
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
    </>
  );
};
