import { UserProgressData } from '../types/course';

const PROGRESS_STORAGE_KEY = 'learnx_user_progress_v1';
const THEME_STORAGE_KEY = 'learnx_theme_v1';
const EDITOR_SETTINGS_KEY = 'learnx_editor_settings_v1';

export interface EditorSettings {
  fontSize: number;
  tabSize: number;
  lineNumbers: boolean;
  wordWrap: boolean;
}

const defaultProgress: UserProgressData = {
  completedLessons: [],
  bookmarks: [],
  recentLessons: [],
  playgroundDrafts: {},
};

const defaultEditorSettings: EditorSettings = {
  fontSize: 14,
  tabSize: 2,
  lineNumbers: true,
  wordWrap: true,
};

export class StorageService {
  static getProgress(): UserProgressData {
    try {
      const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (!data) return defaultProgress;
      return { ...defaultProgress, ...JSON.parse(data) };
    } catch (e) {
      console.warn('Failed to read progress from localStorage:', e);
      return defaultProgress;
    }
  }

  static saveProgress(progress: UserProgressData): void {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress to localStorage:', e);
    }
  }

  static isLessonCompleted(lessonPath: string): boolean {
    const p = this.getProgress();
    return p.completedLessons.includes(lessonPath);
  }

  static toggleLessonCompleted(lessonPath: string): boolean {
    const p = this.getProgress();
    const exists = p.completedLessons.includes(lessonPath);
    let updated: string[];
    if (exists) {
      updated = p.completedLessons.filter(path => path !== lessonPath);
    } else {
      updated = [...p.completedLessons, lessonPath];
    }
    this.saveProgress({ ...p, completedLessons: updated });
    return !exists;
  }

  static isBookmarked(lessonPath: string): boolean {
    const p = this.getProgress();
    return p.bookmarks.includes(lessonPath);
  }

  static toggleBookmark(lessonPath: string): boolean {
    const p = this.getProgress();
    const exists = p.bookmarks.includes(lessonPath);
    let updated: string[];
    if (exists) {
      updated = p.bookmarks.filter(path => path !== lessonPath);
    } else {
      updated = [...p.bookmarks, lessonPath];
    }
    this.saveProgress({ ...p, bookmarks: updated });
    return !exists;
  }

  static recordVisit(lesson: {
    courseId: string;
    phaseId: string;
    dayId?: string;
    lessonPath: string;
    lessonTitle: string;
  }): void {
    const p = this.getProgress();
    const now = Date.now();

    const filteredRecent = p.recentLessons.filter(r => r.lessonPath !== lesson.lessonPath);
    const updatedRecent = [
      { ...lesson, visitedAt: now },
      ...filteredRecent,
    ].slice(0, 10); // keep last 10

    this.saveProgress({
      ...p,
      lastVisitedLesson: { ...lesson, updatedAt: now },
      recentLessons: updatedRecent,
    });
  }

  static getPlaygroundDraft(key: string): string | undefined {
    const p = this.getProgress();
    return p.playgroundDrafts[key];
  }

  static savePlaygroundDraft(key: string, code: string): void {
    const p = this.getProgress();
    this.saveProgress({
      ...p,
      playgroundDrafts: {
        ...p.playgroundDrafts,
        [key]: code,
      },
    });
  }

  static getEditorSettings(): EditorSettings {
    try {
      const data = localStorage.getItem(EDITOR_SETTINGS_KEY);
      if (!data) return defaultEditorSettings;
      return { ...defaultEditorSettings, ...JSON.parse(data) };
    } catch {
      return defaultEditorSettings;
    }
  }

  static saveEditorSettings(settings: EditorSettings): void {
    try {
      localStorage.setItem(EDITOR_SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }

  static getTheme(): 'dark' | 'light' {
    try {
      const theme = localStorage.getItem(THEME_STORAGE_KEY);
      if (theme === 'light' || theme === 'dark') return theme;
      return 'dark'; // default dark for developer aesthetic
    } catch {
      return 'dark';
    }
  }

  static setTheme(theme: 'dark' | 'light'): void {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }

  static resetProgress(): void {
    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}
