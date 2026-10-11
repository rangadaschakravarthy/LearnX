import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, CheckCircle2, BookOpen, Clock, Code2, CheckSquare, Layers } from 'lucide-react';
import { Phase, DayTopic } from '../../types/course';
import { useProgress } from '../../context/ProgressContext';

interface PhaseAccordionProps {
  phase: Phase;
  defaultExpanded?: boolean;
}

export const PhaseAccordion: React.FC<PhaseAccordionProps> = ({ phase, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { isCompleted } = useProgress();

  const phaseCompletedLessons = phase.days.reduce((acc, d) => {
    return acc + d.allLessons.filter(l => isCompleted(l.relativePath)).length;
  }, 0);

  const isPhaseFullyComplete = phase.totalLessons > 0 && phaseCompletedLessons === phase.totalLessons;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all duration-200 hover:border-slate-700/80">
      {/* Header Bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition"
      >
        <div className="flex items-center space-x-3.5 min-w-0 flex-1 pr-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-mono text-xs font-bold border border-indigo-500/30 flex-shrink-0">
            {String(phase.phaseNumber).padStart(2, '0')}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-slate-100 text-sm sm:text-base truncate">
                {phase.title}
              </h4>
              {isPhaseFullyComplete && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5 truncate">
              {phase.days.length} modules • {phase.totalLessons} lessons & files
              {phaseCompletedLessons > 0 && ` • ${phaseCompletedLessons}/${phase.totalLessons} completed`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-slate-400">
          <span className="text-xs hidden sm:inline-block px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-medium">
            {phase.days.length} Days
          </span>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-indigo-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-500" />
          )}
        </div>
      </button>

      {/* Expandable Days List */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
          {phase.days.map((day) => {
            const dayCompleted = day.allLessons.length > 0 && day.allLessons.every(l => isCompleted(l.relativePath));
            const firstLessonPath = day.tabs.theory[0]?.relativePath || day.readmePath || day.allLessons[0]?.relativePath;

            return (
              <div
                key={day.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-slate-100 text-sm group-hover:text-indigo-300 transition">
                      {day.title}
                    </span>
                    {dayCompleted && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    )}
                  </div>

                  {day.summary && (
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {day.summary}
                    </p>
                  )}

                  {/* Day Content Badges */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-slate-400">
                    {day.estimatedTime && (
                      <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800/80 text-amber-300/90">
                        <Clock className="w-3 h-3" />
                        <span>{day.estimatedTime}</span>
                      </span>
                    )}
                    {day.tabs.theory.length > 0 && (
                      <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        <BookOpen className="w-3 h-3 text-indigo-400" />
                        <span>{day.tabs.theory.length} Theory</span>
                      </span>
                    )}
                    {day.tabs.examples.length > 0 && (
                      <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        <Code2 className="w-3 h-3 text-amber-400" />
                        <span>{day.tabs.examples.length} Examples</span>
                      </span>
                    )}
                    {day.tabs.exercises.length > 0 && (
                      <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        <CheckSquare className="w-3 h-3 text-emerald-400" />
                        <span>{day.tabs.exercises.length} Exercises</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Jump to Day Link */}
                {firstLessonPath && (
                  <Link
                    to={`/courses/javascript-mastery/learn?file=${encodeURIComponent(firstLessonPath)}`}
                    className="self-start sm:self-center px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-medium transition flex items-center space-x-1 flex-shrink-0"
                  >
                    <span>Open Module</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
