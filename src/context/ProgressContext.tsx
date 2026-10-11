import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StorageService } from '../services/storageService';
import { ContentService } from '../services/contentService';
import { UserProgressData } from '../types/course';

interface ProgressContextType {
  progress: UserProgressData;
  isCompleted: (lessonPath: string) => boolean;
  toggleComplete: (lessonPath: string) => boolean;
  isBookmarked: (lessonPath: string) => boolean;
  toggleBookmark: (lessonPath: string) => boolean;
  recordVisit: (lesson: {
    courseId: string;
    phaseId: string;
    dayId?: string;
    lessonPath: string;
    lessonTitle: string;
  }) => void;
  completedCount: number;
  totalLessons: number;
  completionPercentage: number;
  triggerConfetti: () => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgressData>(() => StorageService.getProgress());
  const manifest = ContentService.getManifest();
  const totalLessons = manifest.stats.totalLessons || 1;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }
  };

  const isCompleted = (lessonPath: string) => {
    return progress.completedLessons.includes(lessonPath);
  };

  const toggleComplete = (lessonPath: string) => {
    const isNowComplete = StorageService.toggleLessonCompleted(lessonPath);
    setProgress(StorageService.getProgress());
    if (isNowComplete) {
      triggerConfetti();
    }
    return isNowComplete;
  };

  const isBookmarked = (lessonPath: string) => {
    return progress.bookmarks.includes(lessonPath);
  };

  const toggleBookmark = (lessonPath: string) => {
    const isNowBookmarked = StorageService.toggleBookmark(lessonPath);
    setProgress(StorageService.getProgress());
    return isNowBookmarked;
  };

  const recordVisit = (lesson: {
    courseId: string;
    phaseId: string;
    dayId?: string;
    lessonPath: string;
    lessonTitle: string;
  }) => {
    StorageService.recordVisit(lesson);
    setProgress(StorageService.getProgress());
  };

  const resetProgress = () => {
    StorageService.resetProgress();
    setProgress(StorageService.getProgress());
  };

  const completedCount = progress.completedLessons.length;
  const completionPercentage = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isCompleted,
        toggleComplete,
        isBookmarked,
        toggleBookmark,
        recordVisit,
        completedCount,
        totalLessons,
        completionPercentage,
        triggerConfetti,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
};
