import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  FolderGit2,
  Terminal,
  Layers
} from 'lucide-react';
import { CourseManifest } from '../../types/course';
import { useProgress } from '../../context/ProgressContext';

interface CourseCardProps {
  manifest: CourseManifest;
}

export const CourseCard: React.FC<CourseCardProps> = ({ manifest }) => {
  const { completedCount, completionPercentage, progress } = useProgress();

  const isStarted = completedCount > 0 || !!progress.lastVisitedLesson;

  return (
    <div className="relative group rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-600/20 transition-all duration-500" />

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              {manifest.technology}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60 flex items-center space-x-1">
              <FolderGit2 className="w-3 h-3 text-indigo-400" />
              <span>{manifest.sourceRepositoryName}</span>
            </span>
          </div>

          {isStarted && (
            <span className="flex items-center space-x-1 text-xs font-medium text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{completionPercentage}% Complete</span>
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-200 transition">
          {manifest.title}
        </h3>
        <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
          {manifest.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 py-4 border-y border-slate-800/80">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white">{manifest.stats.totalPhases}</span>
            <span className="text-xs text-slate-500">Mastery Phases</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white">{manifest.stats.totalDays}</span>
            <span className="text-xs text-slate-500">Day Modules</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white">{manifest.stats.totalLessons}</span>
            <span className="text-xs text-slate-500">Total Lessons</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-emerald-400">{manifest.stats.totalExercises}</span>
            <span className="text-xs text-slate-500">Practice Problems</span>
          </div>
        </div>

        {/* Progress Bar (if in progress) */}
        {isStarted && (
          <div className="mb-6 space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Your Course Progress</span>
              <span>{completedCount} of {manifest.stats.totalLessons} completed</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${Math.max(3, completionPercentage)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <Link
          to={
            progress.lastVisitedLesson
              ? `/courses/javascript-mastery/learn?file=${encodeURIComponent(progress.lastVisitedLesson.lessonPath)}`
              : `/courses/javascript-mastery/learn`
          }
          className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/25"
        >
          <span>{isStarted ? 'Continue Learning' : 'Start Curriculum'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/courses/javascript-mastery"
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition border border-slate-700/60 flex items-center justify-center space-x-2"
        >
          <Layers className="w-4 h-4 text-slate-400" />
          <span>View All 22 Phases</span>
        </Link>
      </div>
    </div>
  );
};
