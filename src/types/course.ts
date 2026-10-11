export type LessonType =
  | 'overview'
  | 'theory'
  | 'example'
  | 'exercise'
  | 'solution'
  | 'interview'
  | 'project'
  | 'reference'
  | 'guide';

export type DifficultyLevel = 'easy' | 'medium' | 'challenge';

export interface LessonFile {
  id: string;
  title: string;
  fileName: string;
  relativePath: string;
  extension: 'md' | 'js' | 'html' | 'css' | 'json';
  type: LessonType;
  difficulty?: DifficultyLevel;
  sizeBytes: number;
  preview?: string;
  headings?: string[];
}

export interface DayTopic {
  id: string;
  title: string;
  slug: string;
  folderName: string;
  relativePath: string;
  dayNumber?: number;
  summary?: string;
  estimatedTime?: string;
  topicsCovered?: string[];
  readmePath?: string;
  tabs: {
    theory: LessonFile[];
    examples: LessonFile[];
    exercises: LessonFile[];
    solutions: LessonFile[];
    interview: LessonFile[];
    miniProject: LessonFile[];
    reference: LessonFile[];
  };
  allLessons: LessonFile[];
}

export interface Phase {
  id: string;
  title: string;
  slug: string;
  folderName: string;
  phaseNumber: number;
  relativePath: string;
  description?: string;
  readmePath?: string;
  days: DayTopic[];
  totalLessons: number;
}

export interface RootResource {
  id: string;
  title: string;
  fileName: string;
  relativePath: string;
  description: string;
  sizeBytes: number;
}

export interface CourseStats {
  totalPhases: number;
  totalDays: number;
  totalLessons: number;
  totalMarkdownFiles: number;
  totalJavaScriptFiles: number;
  totalExercises: number;
  totalExamples: number;
}

export interface CourseManifest {
  id: string;
  title: string;
  technology: string;
  description: string;
  sourceRepositoryName: string;
  sourceRepositoryPath: string;
  gitRemote?: string;
  generatedAt: string;
  stats: CourseStats;
  rootResources: RootResource[];
  phases: Phase[];
}

export interface SearchItem {
  id: string;
  title: string;
  type: string;
  phaseTitle?: string;
  dayTitle?: string;
  relativePath: string;
  extension: string;
  preview: string;
  keywords: string[];
}

export interface ConsoleLogEntry {
  id: string;
  type: 'log' | 'info' | 'warn' | 'error' | 'table';
  content: string;
  args?: any[];
  timestamp: number;
}

export interface ExecutionResult {
  logs: ConsoleLogEntry[];
  error?: string;
  durationMs: number;
  timedOut?: boolean;
}

export interface UserProgressData {
  completedLessons: string[]; // lesson relative paths or IDs
  bookmarks: string[];
  lastVisitedLesson?: {
    courseId: string;
    phaseId: string;
    dayId?: string;
    lessonPath: string;
    lessonTitle: string;
    updatedAt: number;
  };
  recentLessons: Array<{
    courseId: string;
    phaseId: string;
    dayId?: string;
    lessonPath: string;
    lessonTitle: string;
    visitedAt: number;
  }>;
  playgroundDrafts: Record<string, string>; // path/key -> code
}

export interface CourseRegistryItem {
  id: string;
  title: string;
  technology: string;
  description: string;
  repositoryPath: string;
  icon: string;
  badge: string;
  manifest: CourseManifest;
}
