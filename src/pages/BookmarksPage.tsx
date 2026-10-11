import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Clock, ArrowRight, Trash2, BookOpen, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { ContentService } from '../services/contentService';

export const BookmarksPage: React.FC = () => {
  const { progress, toggleBookmark, isCompleted } = useProgress();

  const bookmarkedItems = progress.bookmarks.map((path) => {
    const lesson = ContentService.getLessonByPath(path);
    return {
      path,
      lesson,
      isDone: isCompleted(path),
    };
  });

  return (
    <div className="min-h-screen py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Bookmarks Section */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Saved Bookmarks</h1>
            <p className="text-xs text-slate-400">
              Your saved curriculum topics and reference guides ({bookmarkedItems.length})
            </p>
          </div>
        </div>

        {bookmarkedItems.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-500 space-y-2">
            <Bookmark className="w-8 h-8 mx-auto opacity-30 text-amber-400" />
            <p className="text-slate-400 font-medium text-sm">No bookmarks saved yet</p>
            <p className="text-xs text-slate-500">
              Click the bookmark icon on any lesson to save it here for quick reference.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarkedItems.map(({ path, lesson, isDone }) => (
              <div
                key={path}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between gap-4 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white text-sm group-hover:text-indigo-300 transition truncate">
                      {lesson?.title || path.split('/').pop()}
                    </span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-1 truncate">
                    {path}
                  </p>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Link
                    to={`/courses/javascript-mastery/learn?file=${encodeURIComponent(path)}`}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center space-x-1"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => toggleBookmark(path)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recently Visited Lessons Section */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Recently Visited</h2>
            <p className="text-xs text-slate-400">
              Your recent lesson study history ({progress.recentLessons.length})
            </p>
          </div>
        </div>

        {progress.recentLessons.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-500">
            No recently visited lessons recorded yet.
          </div>
        ) : (
          <div className="space-y-2">
            {progress.recentLessons.map((item, idx) => (
              <Link
                key={idx}
                to={`/courses/${item.courseId}/learn?file=${encodeURIComponent(item.lessonPath)}`}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40 transition flex items-center justify-between group"
              >
                <div className="min-w-0 pr-4">
                  <span className="font-medium text-slate-200 text-sm group-hover:text-indigo-300 transition truncate block">
                    {item.lessonTitle}
                  </span>
                  <span className="text-xs text-slate-500 font-mono truncate block mt-0.5">
                    {item.lessonPath}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-400 flex-shrink-0">
                  <span>{new Date(item.visitedAt).toLocaleDateString()}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
