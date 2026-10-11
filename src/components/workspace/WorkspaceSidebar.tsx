import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Search,
  BookOpen,
  Code2,
  Layers,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowLeft,
  X,
  CheckSquare
} from 'lucide-react';
import { CourseManifest, Phase, DayTopic, LessonFile } from '../../types/course';
import { useProgress } from '../../context/ProgressContext';

interface WorkspaceSidebarProps {
  manifest: CourseManifest;
  activePhaseId: string;
  activeLessonPath: string;
  onSelectLesson: (lesson: LessonFile) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  manifest,
  activePhaseId,
  activeLessonPath,
  onSelectLesson,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    [activePhaseId]: true,
  });
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});
  const { isCompleted } = useProgress();

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const toggleDay = (dayId: string) => {
    setExpandedDays(prev => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  const handleSelect = (lesson: LessonFile) => {
    onSelectLesson(lesson);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      onToggleCollapse();
    }
  };

  if (isCollapsed) {
    return (
      <aside className="hidden md:flex w-14 border-r border-slate-800 bg-slate-950 flex-col items-center py-4 space-y-4 flex-shrink-0 z-30">
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition shadow-sm"
          title="Expand course sidebar"
        >
          <PanelLeftOpen className="w-5 h-5 text-indigo-400" />
        </button>
        <div className="h-px w-6 bg-slate-800" />
        <Link
          to={`/courses/${manifest.id}`}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition"
          title="Course Overview"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </aside>
    );
  }

  // Filter lessons if searchFilter is set
  const filterLower = searchFilter.toLowerCase();

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
        onClick={onToggleCollapse}
      />

      <aside className="fixed inset-y-0 left-0 z-50 w-72 md:static md:w-64 lg:w-72 border-r border-slate-800 bg-slate-950 flex flex-col h-full overflow-hidden flex-shrink-0 shadow-2xl md:shadow-none">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
        <div className="flex items-center space-x-2.5 min-w-0">
          <Link
            to={`/courses/${manifest.id}`}
            className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition"
            title="Back to Course Overview"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-200 text-sm truncate">
              {manifest.title}
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              {manifest.stats.totalPhases} Phases • {manifest.stats.totalLessons} Lessons
            </span>
          </div>
        </div>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition"
          title="Collapse sidebar"
        >
          <PanelLeftClose className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Filter / Quick Search within Sidebar */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-900/40">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter syllabus..."
            className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Root Guides / Documentation */}
      {!searchFilter && manifest.rootResources.length > 0 && (
        <div className="px-3 py-2 border-b border-slate-800/60 bg-slate-900/20">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2 block mb-1">
            Reference Guides
          </span>
          <div className="space-y-0.5">
            {manifest.rootResources.map((doc) => {
              const isCurrent = doc.relativePath === activeLessonPath;
              return (
                <button
                  key={doc.id}
                  onClick={() =>
                    handleSelect({
                      id: doc.id,
                      title: doc.title,
                      fileName: doc.fileName,
                      relativePath: doc.relativePath,
                      extension: 'md',
                      type: 'guide',
                      sizeBytes: doc.sizeBytes,
                    })
                  }
                  className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition flex items-center space-x-2 ${
                    isCurrent
                      ? 'bg-indigo-600/20 text-indigo-300 font-medium border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  <span className="truncate">{doc.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Phases and Lessons List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {manifest.phases.map((phase) => {
          const isPhaseOpen = !!expandedPhases[phase.id] || !!filterLower;

          // Check if phase matches search filter
          const matchingDays = phase.days.filter(d => {
            if (!filterLower) return true;
            return (
              d.title.toLowerCase().includes(filterLower) ||
              d.allLessons.some(l => l.title.toLowerCase().includes(filterLower))
            );
          });

          if (filterLower && matchingDays.length === 0) return null;

          return (
            <div key={phase.id} className="rounded-xl border border-slate-800/80 bg-slate-900/30 overflow-hidden">
              {/* Phase Header */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-slate-800/40 transition"
              >
                <div className="flex items-center space-x-2 min-w-0 pr-2">
                  <span className="w-5 h-5 rounded bg-indigo-600/20 text-indigo-400 font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
                    {String(phase.phaseNumber).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {phase.title}
                  </span>
                </div>
                {isPhaseOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                )}
              </button>

              {/* Days inside phase */}
              {isPhaseOpen && (
                <div className="px-2 pb-2 pt-0.5 space-y-1 border-t border-slate-800/40">
                  {matchingDays.map((day) => {
                    const isDayOpen = expandedDays[day.id] !== undefined
                      ? expandedDays[day.id]
                      : day.allLessons.some(l => l.relativePath === activeLessonPath) || !!filterLower;

                    const dayLessons = day.allLessons.filter(l =>
                      !filterLower || l.title.toLowerCase().includes(filterLower)
                    );

                    return (
                      <div key={day.id} className="rounded-lg bg-slate-950/50 p-1">
                        {/* Day Title Toggle */}
                        <button
                          onClick={() => toggleDay(day.id)}
                          className="w-full px-2 py-1.5 flex items-center justify-between text-left rounded hover:bg-slate-900 transition"
                        >
                          <span className="text-[11.5px] font-medium text-slate-300 truncate pr-2">
                            {day.title}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {day.allLessons.length}
                          </span>
                        </button>

                        {/* Lessons inside Day */}
                        {isDayOpen && (
                          <div className="pl-2 pr-1 py-1 space-y-0.5">
                            {dayLessons.map((lesson) => {
                              const isCurrent = lesson.relativePath === activeLessonPath;
                              const completed = isCompleted(lesson.relativePath);

                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => handleSelect(lesson)}
                                  className={`w-full text-left px-2 py-1.5 rounded text-xs transition flex items-center justify-between group ${
                                    isCurrent
                                      ? 'bg-indigo-600 text-white font-medium shadow-sm'
                                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                                  }`}
                                  title={lesson.title}
                                >
                                  <div className="flex items-center space-x-2 min-w-0 pr-2">
                                    {completed ? (
                                      <CheckCircle2 className={`w-3 h-3 flex-shrink-0 ${isCurrent ? 'text-white' : 'text-emerald-400'}`} />
                                    ) : (
                                      <Circle className={`w-2.5 h-2.5 flex-shrink-0 ${isCurrent ? 'text-indigo-200' : 'text-slate-600'}`} />
                                    )}
                                    <span className="truncate text-[11px]">
                                      {lesson.title}
                                    </span>
                                  </div>

                                  <span className={`text-[9px] uppercase px-1 py-0.2 rounded font-mono ${
                                    isCurrent ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-500'
                                  }`}>
                                    {lesson.type === 'exercise' ? 'task' : lesson.extension}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
    </>
  );
};
