import React from 'react';
import { BookOpen, Code2, CheckSquare, Key, Briefcase, Wrench, FileText } from 'lucide-react';
import { DayTopic, LessonFile } from '../../types/course';

interface LessonTabsProps {
  day: DayTopic;
  currentLessonPath: string;
  onSelectLesson: (file: LessonFile) => void;
}

export const LessonTabs: React.FC<LessonTabsProps> = ({
  day,
  currentLessonPath,
  onSelectLesson,
}) => {
  // Determine which tab categories have files
  const tabsList = [
    { key: 'theory', label: 'Theory', icon: BookOpen, files: day.tabs.theory },
    { key: 'examples', label: 'Examples', icon: Code2, files: day.tabs.examples },
    { key: 'exercises', label: 'Exercises', icon: CheckSquare, files: day.tabs.exercises },
    { key: 'solutions', label: 'Solutions', icon: Key, files: day.tabs.solutions },
    { key: 'interview', label: 'Interview', icon: Briefcase, files: day.tabs.interview },
    { key: 'miniProject', label: 'Project', icon: Wrench, files: day.tabs.miniProject },
    { key: 'reference', label: 'Overview', icon: FileText, files: day.tabs.reference },
  ].filter(t => t.files.length > 0);

  // Find which tab is active based on currentLessonPath
  const activeTab = tabsList.find(t =>
    t.files.some(f => f.relativePath === currentLessonPath)
  ) || tabsList[0];

  if (tabsList.length <= 1 && (!activeTab || activeTab.files.length <= 1)) {
    return null;
  }

  return (
    <div className="border-b border-slate-800 bg-slate-900/40 px-4 sm:px-6 py-2.5">
      {/* Primary Category Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
        {tabsList.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.key === activeTab?.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                if (tab.files[0]) onSelectLesson(tab.files[0]);
              }}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-indigo-700/80 text-indigo-100' : 'bg-slate-700/60 text-slate-400'
              }`}>
                {tab.files.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-Files List if active tab has multiple files */}
      {activeTab && activeTab.files.length > 1 && (
        <div className="flex items-center space-x-2 overflow-x-auto mt-2 pt-2 border-t border-slate-800/60 scrollbar-none">
          <span className="text-[11px] text-slate-500 font-medium flex-shrink-0">
            Files in {activeTab.label}:
          </span>
          {activeTab.files.map((file) => {
            const isCurrent = file.relativePath === currentLessonPath;
            return (
              <button
                key={file.id}
                onClick={() => onSelectLesson(file)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition whitespace-nowrap flex items-center space-x-1.5 ${
                  isCurrent
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
                title={file.title}
              >
                <span className="truncate max-w-[200px]">{file.title}</span>
                {file.difficulty && (
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    file.difficulty === 'easy' ? 'bg-emerald-400' :
                    file.difficulty === 'medium' ? 'bg-amber-400' : 'bg-rose-400'
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
