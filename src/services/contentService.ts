import { CourseManifest, Phase, DayTopic, LessonFile } from '../types/course';
import defaultManifest from '../generated/course-manifest.json';

const contentCache = new Map<string, string>();

export class ContentService {
  private static manifest: CourseManifest = defaultManifest as CourseManifest;

  static getManifest(): CourseManifest {
    return this.manifest;
  }

  static getPhases(): Phase[] {
    return this.manifest.phases;
  }

  static getPhase(phaseIdOrSlug: string): Phase | undefined {
    return this.manifest.phases.find(
      p => p.id === phaseIdOrSlug || p.slug === phaseIdOrSlug || p.folderName === phaseIdOrSlug
    );
  }

  static getDay(phaseId: string, dayIdOrSlug: string): DayTopic | undefined {
    const phase = this.getPhase(phaseId);
    if (!phase) return undefined;
    return phase.days.find(
      d => d.id === dayIdOrSlug || d.slug === dayIdOrSlug || d.folderName === dayIdOrSlug
    );
  }

  static getLessonByPath(relativePath: string): LessonFile | undefined {
    const norm = relativePath.replace(/\\/g, '/');

    // Check root resources
    const rootRes = this.manifest.rootResources.find(r => r.relativePath === norm);
    if (rootRes) {
      return {
        id: rootRes.id,
        title: rootRes.title,
        fileName: rootRes.fileName,
        relativePath: rootRes.relativePath,
        extension: 'md',
        type: 'guide',
        sizeBytes: rootRes.sizeBytes,
        preview: rootRes.description,
      };
    }

    // Search phases and days
    for (const phase of this.manifest.phases) {
      for (const day of phase.days) {
        const found = day.allLessons.find(l => l.relativePath === norm);
        if (found) return found;
      }
    }
    return undefined;
  }

  /**
   * Returns a flattened sequential list of all lessons in the course.
   * Enables seamless Previous and Next navigation.
   */
  static getAllLessonsFlattened(): Array<{
    lesson: LessonFile;
    phase: Phase;
    day?: DayTopic;
  }> {
    const list: Array<{ lesson: LessonFile; phase: Phase; day?: DayTopic }> = [];

    for (const phase of this.manifest.phases) {
      for (const day of phase.days) {
        for (const lesson of day.allLessons) {
          list.push({ lesson, phase, day });
        }
      }
    }
    return list;
  }

  static getAdjacentLessons(currentPath: string): {
    prev?: { lesson: LessonFile; phase: Phase; day?: DayTopic };
    next?: { lesson: LessonFile; phase: Phase; day?: DayTopic };
  } {
    const flat = this.getAllLessonsFlattened();
    const norm = currentPath.replace(/\\/g, '/');
    const index = flat.findIndex(item => item.lesson.relativePath === norm);

    if (index === -1) return {};

    return {
      prev: index > 0 ? flat[index - 1] : undefined,
      next: index < flat.length - 1 ? flat[index + 1] : undefined,
    };
  }

  /**
   * Asynchronously fetches raw file content from /content/javascript/...
   * In-memory cache ensures zero lag when re-visiting or tabbing between files.
   */
  static async fetchFileContent(relativePath: string): Promise<string> {
    const norm = relativePath.replace(/\\/g, '/');
    if (contentCache.has(norm)) {
      return contentCache.get(norm)!;
    }

    const url = `/content/javascript/${encodeURI(norm)}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const text = await res.text();
      contentCache.set(norm, text);
      return text;
    } catch (err: any) {
      console.error(`Failed to fetch course file ${norm}:`, err);
      throw new Error(`Could not load lesson content from "${norm}": ${err.message}`);
    }
  }

  static getGitHubUrl(relativePath: string): string | null {
    if (!this.manifest.gitRemote) return null;
    const base = this.manifest.gitRemote.replace(/\/+$/, '');
    const cleanPath = relativePath.replace(/\\/g, '/').replace(/^\/+/, '');
    return `${base}/blob/main/${cleanPath}`;
  }
}
