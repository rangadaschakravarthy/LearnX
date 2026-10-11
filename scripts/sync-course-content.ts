import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Helper to load simple .env if present
function loadEnv(): Record<string, string> {
  const envPath = path.join(projectRoot, '.env');
  const env: Record<string, string> = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx > -1) {
          const key = trimmed.substring(0, idx).trim();
          const val = trimmed.substring(idx + 1).trim();
          env[key] = val;
        }
      }
    }
  }
  return env;
}

const env = loadEnv();
const configuredRepoPath = process.env.COURSE_REPOSITORY_PATH || env.COURSE_REPOSITORY_PATH || '../JavaScript';
const repoPath = path.isAbsolute(configuredRepoPath)
  ? configuredRepoPath
  : path.resolve(projectRoot, configuredRepoPath);

console.log('----------------------------------------------------');
console.log('🚀 LearnX Course Content Synchronization Pipeline');
console.log('----------------------------------------------------');
console.log(`📂 Project Root:       ${projectRoot}`);
console.log(`🔍 Configured Repo:    ${configuredRepoPath}`);
console.log(`📍 Resolved Repo Path: ${repoPath}`);

if (!fs.existsSync(repoPath)) {
  console.error('\n❌ ERROR: Source course repository not found!');
  console.error(`Expected location: ${repoPath}`);
  console.error('\nPlease ensure the repository exists or configure COURSE_REPOSITORY_PATH in .env or environment variable.');
  console.error('Example in LearnX/.env:');
  console.error('COURSE_REPOSITORY_PATH=../JavaScript\n');
  process.exit(1);
}

// Target directories
const publicContentDir = path.join(projectRoot, 'public', 'content', 'javascript');
const generatedSrcDir = path.join(projectRoot, 'src', 'generated');

fs.mkdirSync(publicContentDir, { recursive: true });
fs.mkdirSync(generatedSrcDir, { recursive: true });

export interface LessonFile {
  id: string;
  title: string;
  fileName: string;
  relativePath: string;
  extension: 'md' | 'js' | 'html' | 'css' | 'json';
  type: 'overview' | 'theory' | 'example' | 'exercise' | 'solution' | 'interview' | 'project' | 'reference';
  difficulty?: 'easy' | 'medium' | 'challenge';
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

export interface CourseManifest {
  id: string;
  title: string;
  technology: string;
  description: string;
  sourceRepositoryName: string;
  sourceRepositoryPath: string;
  gitRemote?: string;
  generatedAt: string;
  stats: {
    totalPhases: number;
    totalDays: number;
    totalLessons: number;
    totalMarkdownFiles: number;
    totalJavaScriptFiles: number;
    totalExercises: number;
    totalExamples: number;
  };
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

function cleanTitle(raw: string): string {
  // Turn 01-javascript-history-and-ecmascript into JavaScript History And ECMAScript
  const withoutExt = raw.replace(/\.(md|js|html|css|json)$/i, '');
  const withoutNumber = withoutExt.replace(/^\d+[-_.]\s*/, '');
  return withoutNumber
    .split(/[-_]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function extractFirstHeadingAndPreview(content: string): { title?: string; preview?: string; headings: string[] } {
  const headings: string[] = [];
  let title: string | undefined;
  let preview: string | undefined;

  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) {
      const headingText = trimmed.replace(/^#+\s*/, '').trim();
      headings.push(headingText);
      if (!title && trimmed.startsWith('# ')) {
        title = headingText;
      }
    } else if (!preview && trimmed.length > 20 && !trimmed.startsWith('```') && !trimmed.startsWith('---') && !trimmed.startsWith('>')) {
      preview = trimmed.slice(0, 180);
    }
  }

  return { title, preview, headings };
}

function extractDayMetadata(readmeContent: string) {
  let summary = '';
  let estimatedTime = '';
  const topicsCovered: string[] = [];

  const lines = readmeContent.split('\n');
  let inTopics = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes('Day Objective') || line.includes('Objective:')) {
      summary = lines[i + 1]?.trim() || '';
    }
    if (line.includes('Estimated Study Time') || line.includes('Study Time:')) {
      for (let j = i + 1; j < Math.min(lines.length, i + 8); j++) {
        if (lines[j].includes('Total:') || lines[j].includes('**Total:**')) {
          estimatedTime = lines[j].replace(/.*Total:\*{0,2}/i, '').replace(/\*+/g, '').trim();
          break;
        }
      }
    }
    if (line.includes('Topics Covered') || line.includes('Topics:')) {
      inTopics = true;
      continue;
    }
    if (inTopics) {
      if (line.startsWith('---') || (line.startsWith('#') && !line.includes('Topics'))) {
        inTopics = false;
      } else if (line.match(/^\d+\.\s+\*\*(.+?)\*\*/)) {
        const match = line.match(/^\d+\.\s+\*\*(.+?)\*\*/);
        if (match) topicsCovered.push(match[1]);
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        topicsCovered.push(line.replace(/^[-*]\s+/, ''));
      }
    }
  }

  return { summary, estimatedTime, topicsCovered };
}

// Global stats counters
let totalMarkdownFiles = 0;
let totalJavaScriptFiles = 0;
let totalExercises = 0;
let totalExamples = 0;
const searchIndex: SearchItem[] = [];

function copyFilePreservingStructure(srcFile: string, relPath: string) {
  const destFile = path.join(publicContentDir, relPath);
  const destDir = path.dirname(destFile);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(srcFile, destFile);
}

function processFile(
  fullPath: string,
  relPath: string,
  type: LessonFile['type'],
  phaseTitle?: string,
  dayTitle?: string
): LessonFile {
  const fileName = path.basename(fullPath);
  const ext = (path.extname(fileName).slice(1).toLowerCase() || 'txt') as LessonFile['extension'];
  const stat = fs.statSync(fullPath);
  const sizeBytes = stat.size;

  // Copy to public directory
  copyFilePreservingStructure(fullPath, relPath);

  let title = cleanTitle(fileName);
  let preview = '';
  let headings: string[] = [];

  let content = '';
  try {
    content = fs.readFileSync(fullPath, 'utf-8');
  } catch (err) {
    // Binary or unreadable
  }

  if (ext === 'md') {
    totalMarkdownFiles++;
    const meta = extractFirstHeadingAndPreview(content);
    if (meta.title) title = meta.title;
    if (meta.preview) preview = meta.preview;
    headings = meta.headings;
  } else if (ext === 'js') {
    totalJavaScriptFiles++;
    // Extract first comment block for preview/title if available
    const firstCommentMatch = content.match(/\/\*\*\s*([\s\S]*?)\*\//);
    if (firstCommentMatch) {
      const commentLines = firstCommentMatch[1].split('\n').map(l => l.replace(/^\s*\*\s?/, '').trim()).filter(Boolean);
      if (commentLines[0]) {
        preview = commentLines[0];
        if (preview.length < 60) title = preview;
      }
    }
  }

  // Difficulty detection
  let difficulty: LessonFile['difficulty'];
  const lowerRel = relPath.toLowerCase();
  if (lowerRel.includes('easy') || lowerRel.includes('🟢')) difficulty = 'easy';
  else if (lowerRel.includes('medium') || lowerRel.includes('🟡')) difficulty = 'medium';
  else if (lowerRel.includes('challenge') || lowerRel.includes('hard') || lowerRel.includes('🔴')) difficulty = 'challenge';

  if (type === 'exercise') totalExercises++;
  if (type === 'example') totalExamples++;

  const id = relPath.replace(/[\\/]/g, '--').replace(/\.[^/.]+$/, '').toLowerCase();

  // Add to search index
  const keywords = Array.from(new Set([
    ...title.toLowerCase().split(/[\s,._-]+/).filter(w => w.length > 2),
    ...(phaseTitle ? phaseTitle.toLowerCase().split(/[\s,._-]+/).filter(w => w.length > 2) : []),
    ...(dayTitle ? dayTitle.toLowerCase().split(/[\s,._-]+/).filter(w => w.length > 2) : []),
    ext,
    type,
    ...(difficulty ? [difficulty] : [])
  ]));

  searchIndex.push({
    id,
    title,
    type,
    phaseTitle,
    dayTitle,
    relativePath: relPath.replace(/\\/g, '/'),
    extension: ext,
    preview: preview.slice(0, 160),
    keywords
  });

  return {
    id,
    title,
    fileName,
    relativePath: relPath.replace(/\\/g, '/'),
    extension: ext,
    type,
    difficulty,
    sizeBytes,
    preview,
    headings: headings.slice(0, 12),
  };
}

// Natural sort helper for files (e.g. 01-... before 02-..., easy before medium)
function naturalSortFiles(files: LessonFile[]): LessonFile[] {
  return [...files].sort((a, b) => {
    // For exercises: sort easy -> medium -> challenge
    if (a.type === 'exercise' && b.type === 'exercise') {
      const order = { easy: 1, medium: 2, challenge: 3 };
      const aRank = a.difficulty ? order[a.difficulty] : 2;
      const bRank = b.difficulty ? order[b.difficulty] : 2;
      if (aRank !== bRank) return aRank - bRank;
    }

    // Extract leading numbers (e.g. 01, 02)
    const aMatch = a.fileName.match(/^(\d+)/);
    const bMatch = b.fileName.match(/^(\d+)/);
    if (aMatch && bMatch) {
      const aNum = parseInt(aMatch[1], 10);
      const bNum = parseInt(bMatch[1], 10);
      if (aNum !== bNum) return aNum - bNum;
    }
    if (aMatch) return -1;
    if (bMatch) return 1;

    return a.fileName.localeCompare(b.fileName, undefined, { numeric: true, sensitivity: 'base' });
  });
}

// Scan topic directory (Day-XX or assessment or project)
function scanTopicDirectory(dirPath: string, relPath: string, phaseTitle: string): DayTopic {
  const folderName = path.basename(dirPath);
  const slug = folderName.toLowerCase();
  let dayNumber: number | undefined;
  const dayMatch = folderName.match(/Day-(\d+)/i);
  if (dayMatch) {
    dayNumber = parseInt(dayMatch[1], 10);
  }

  let title = folderName.replace(/-/g, ' ');
  if (dayNumber !== undefined) {
    title = `Day ${String(dayNumber).padStart(2, '0')}: ` + cleanTitle(folderName.replace(/Day-\d+-?/i, ''));
  } else {
    title = cleanTitle(folderName);
  }

  const topic: DayTopic = {
    id: relPath.replace(/[\\/]/g, '--').toLowerCase(),
    title,
    slug,
    folderName,
    relativePath: relPath.replace(/\\/g, '/'),
    dayNumber,
    tabs: {
      theory: [],
      examples: [],
      exercises: [],
      solutions: [],
      interview: [],
      miniProject: [],
      reference: [],
    },
    allLessons: []
  };

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  // 1. Look for Day README.md (Overview & Roadmap)
  let overviewLesson: LessonFile | undefined;
  const dayReadme = entries.find(e => e.isFile() && e.name.toLowerCase() === 'readme.md');
  if (dayReadme) {
    const full = path.join(dirPath, dayReadme.name);
    const rel = path.join(relPath, dayReadme.name);
    topic.readmePath = rel.replace(/\\/g, '/');
    const content = fs.readFileSync(full, 'utf-8');
    const meta = extractDayMetadata(content);
    topic.summary = meta.summary;
    topic.estimatedTime = meta.estimatedTime;
    topic.topicsCovered = meta.topicsCovered;

    overviewLesson = processFile(full, rel, 'overview', phaseTitle, title);
    overviewLesson.title = `${title} — Overview & Roadmap`;
    topic.tabs.reference.push(overviewLesson);
  }

  // 2. Scan subdirectories and loose files into categorized buckets
  const rawTheory: LessonFile[] = [];
  const rawExamples: LessonFile[] = [];
  const rawExercises: LessonFile[] = [];
  const rawSolutions: LessonFile[] = [];
  const rawInterview: LessonFile[] = [];
  const rawMiniProject: LessonFile[] = [];
  const rawReference: LessonFile[] = [];

  for (const entry of entries) {
    const full = path.join(dirPath, entry.name);
    const rel = path.join(relPath, entry.name);

    if (entry.isDirectory()) {
      const subName = entry.name.toLowerCase();
      const subFiles = getAllFilesRecursively(full);

      for (const sf of subFiles) {
        const fileRel = path.relative(repoPath, sf);
        const ext = path.extname(sf).toLowerCase();
        if (!['.md', '.js', '.html', '.css', '.json'].includes(ext)) continue;

        let category: LessonFile['type'] = 'reference';
        if (subName.includes('theory')) category = 'theory';
        else if (subName.includes('example')) category = 'example';
        else if (subName.includes('exercise') || subName.includes('practice')) category = 'exercise';
        else if (subName.includes('solution')) category = 'solution';
        else if (subName.includes('interview')) category = 'interview';
        else if (subName.includes('mini-project') || subName.includes('project')) category = 'project';

        const lesson = processFile(sf, fileRel, category, phaseTitle, title);

        if (category === 'theory') rawTheory.push(lesson);
        else if (category === 'example') rawExamples.push(lesson);
        else if (category === 'exercise') rawExercises.push(lesson);
        else if (category === 'solution') rawSolutions.push(lesson);
        else if (category === 'interview') rawInterview.push(lesson);
        else if (category === 'project') rawMiniProject.push(lesson);
        else rawReference.push(lesson);
      }
    } else if (entry.isFile() && entry.name.toLowerCase() !== 'readme.md') {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.md', '.js', '.html', '.css', '.json'].includes(ext)) {
        const lowerName = entry.name.toLowerCase();
        let category: LessonFile['type'] = 'reference';
        if (lowerName.includes('theory')) category = 'theory';
        else if (lowerName.includes('example')) category = 'example';
        else if (lowerName.includes('exercise') || lowerName.includes('practice')) category = 'exercise';
        else if (lowerName.includes('solution')) category = 'solution';
        else if (lowerName.includes('interview')) category = 'interview';

        const lesson = processFile(full, rel, category, phaseTitle, title);
        if (category === 'theory') rawTheory.push(lesson);
        else if (category === 'example') rawExamples.push(lesson);
        else if (category === 'exercise') rawExercises.push(lesson);
        else if (category === 'solution') rawSolutions.push(lesson);
        else if (category === 'interview') rawInterview.push(lesson);
        else rawReference.push(lesson);
      }
    }
  }

  // 3. Sort each category numerically / pedagogically
  topic.tabs.theory = naturalSortFiles(rawTheory);
  topic.tabs.examples = naturalSortFiles(rawExamples);
  topic.tabs.exercises = naturalSortFiles(rawExercises);
  topic.tabs.solutions = naturalSortFiles(rawSolutions);
  topic.tabs.interview = naturalSortFiles(rawInterview);
  topic.tabs.miniProject = naturalSortFiles(rawMiniProject);
  topic.tabs.reference = [
    ...(overviewLesson ? [overviewLesson] : []),
    ...naturalSortFiles(rawReference)
  ];

  // 4. Construct topic.allLessons in strict foundational order:
  // Overview -> Theory 1, 2, 3... -> Examples 1, 2, 3... -> Exercises (Easy, Med, Hard) -> Projects -> Interview -> Solutions
  topic.allLessons = [
    ...(overviewLesson ? [overviewLesson] : []),
    ...topic.tabs.theory,
    ...topic.tabs.examples,
    ...topic.tabs.exercises,
    ...topic.tabs.miniProject,
    ...topic.tabs.interview,
    ...topic.tabs.solutions,
    ...naturalSortFiles(rawReference)
  ];

  return topic;
}

function getAllFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    if (item.name === '.git' || item.name === 'node_modules') continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getAllFilesRecursively(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

// Scan entire Phase
function scanPhaseDirectory(phaseDir: string): Phase {
  const folderName = path.basename(phaseDir);
  const phaseRel = path.relative(repoPath, phaseDir);
  const phaseMatch = folderName.match(/Phase-(\d+)/i);
  const phaseNumber = phaseMatch ? parseInt(phaseMatch[1], 10) : 99;

  let title = cleanTitle(folderName);
  if (phaseMatch) {
    title = `Phase ${String(phaseNumber).padStart(2, '0')}: ` + cleanTitle(folderName.replace(/Phase-\d+-?/i, ''));
  }

  const entries = fs.readdirSync(phaseDir, { withFileTypes: true });
  const readmeEntry = entries.find(e => e.isFile() && e.name.toLowerCase() === 'readme.md');

  let readmePath: string | undefined;
  let description: string | undefined;

  if (readmeEntry) {
    const full = path.join(phaseDir, readmeEntry.name);
    const rel = path.join(phaseRel, readmeEntry.name);
    readmePath = rel.replace(/\\/g, '/');
    copyFilePreservingStructure(full, rel);
    const content = fs.readFileSync(full, 'utf-8');
    const { title: headingTitle, preview } = extractFirstHeadingAndPreview(content);
    if (headingTitle && !headingTitle.toLowerCase().includes('readme')) {
      title = headingTitle;
    }
    description = preview;
  }

  const days: DayTopic[] = [];

  // Sort subdirectories: Day-01, Day-02... then assessment, final-project, etc.
  const subdirs = entries.filter(e => e.isDirectory());
  subdirs.sort((a, b) => {
    const aDay = a.name.match(/Day-(\d+)/i);
    const bDay = b.name.match(/Day-(\d+)/i);
    if (aDay && bDay) {
      return parseInt(aDay[1], 10) - parseInt(bDay[1], 10);
    }
    if (aDay) return -1;
    if (bDay) return 1;
    return a.name.localeCompare(b.name);
  });

  for (const dir of subdirs) {
    const full = path.join(phaseDir, dir.name);
    const rel = path.join(phaseRel, dir.name);
    const topic = scanTopicDirectory(full, rel, title);
    if (topic.allLessons.length > 0) {
      days.push(topic);
    }
  }

  // Also check loose markdown files in phase root (e.g. Problem-Solving-Template.md)
  const looseFiles = entries.filter(e => e.isFile() && e.name.toLowerCase() !== 'readme.md' && e.name.endsWith('.md'));
  if (looseFiles.length > 0) {
    const extraTopic: DayTopic = {
      id: `${folderName}-resources`.toLowerCase(),
      title: `${title} — Additional Resources`,
      slug: 'additional-resources',
      folderName: 'resources',
      relativePath: phaseRel.replace(/\\/g, '/'),
      tabs: {
        theory: [],
        examples: [],
        exercises: [],
        solutions: [],
        interview: [],
        miniProject: [],
        reference: []
      },
      allLessons: []
    };
    for (const lf of looseFiles) {
      const full = path.join(phaseDir, lf.name);
      const rel = path.join(phaseRel, lf.name);
      const lesson = processFile(full, rel, 'reference', title, extraTopic.title);
      extraTopic.tabs.reference.push(lesson);
      extraTopic.allLessons.push(lesson);
    }
    days.push(extraTopic);
  }

  const totalLessons = days.reduce((acc, d) => acc + d.allLessons.length, 0);

  return {
    id: `phase-${String(phaseNumber).padStart(2, '0')}`,
    title,
    slug: folderName.toLowerCase(),
    folderName,
    phaseNumber,
    relativePath: phaseRel.replace(/\\/g, '/'),
    description,
    readmePath,
    days,
    totalLessons,
  };
}

// Discover Root Markdown Documentation (README, ROADMAP, CHEATSHEET, etc.)
function scanRootResources(): RootResource[] {
  const rootResources: RootResource[] = [];
  const rootFiles = fs.readdirSync(repoPath, { withFileTypes: true });

  const knownRootDocs = [
    { file: 'README.md', desc: 'Main repository guide and JavaScript learning overview' },
    { file: 'ROADMAP.md', desc: 'Comprehensive step-by-step 22-phase mastery roadmap' },
    { file: 'CHEATSHEET.md', desc: 'Syntax and feature quick-reference cheatsheet' },
    { file: 'COMMON-MISTAKES.md', desc: 'Frequent pitfalls, edge cases, and best practice solutions' },
    { file: 'GLOSSARY.md', desc: 'Key JavaScript terms, engine concepts, and runtime vocabulary' },
    { file: 'INTERVIEW.md', desc: 'Curated technical interview questions and tricky output patterns' },
  ];

  for (const doc of knownRootDocs) {
    const full = path.join(repoPath, doc.file);
    if (fs.existsSync(full)) {
      copyFilePreservingStructure(full, doc.file);
      const stat = fs.statSync(full);
      const content = fs.readFileSync(full, 'utf-8');
      const { title } = extractFirstHeadingAndPreview(content);
      rootResources.push({
        id: `root-${doc.file.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        title: title || cleanTitle(doc.file),
        fileName: doc.file,
        relativePath: doc.file,
        description: doc.desc,
        sizeBytes: stat.size,
      });

      // Also add to search index
      searchIndex.push({
        id: `root-${doc.file.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        title: title || cleanTitle(doc.file),
        type: 'guide',
        phaseTitle: 'Course Overview & Guides',
        relativePath: doc.file,
        extension: 'md',
        preview: doc.desc,
        keywords: [doc.file.toLowerCase(), 'guide', 'roadmap', 'cheatsheet', 'interview', 'glossary']
      });
    }
  }

  return rootResources;
}

// Main Execution
console.log('\n⏳ Scanning course repository phases and lessons...');

const rootEntries = fs.readdirSync(repoPath, { withFileTypes: true });
const phaseDirs = rootEntries
  .filter(e => e.isDirectory() && e.name.toLowerCase().startsWith('phase-'))
  .map(e => path.join(repoPath, e.name));

// Sort phase directories numerically
phaseDirs.sort((a, b) => {
  const aMatch = path.basename(a).match(/Phase-(\d+)/i);
  const bMatch = path.basename(b).match(/Phase-(\d+)/i);
  const aNum = aMatch ? parseInt(aMatch[1], 10) : 99;
  const bNum = bMatch ? parseInt(bMatch[1], 10) : 99;
  return aNum - bNum;
});

const phases: Phase[] = [];
for (const pDir of phaseDirs) {
  const phase = scanPhaseDirectory(pDir);
  phases.push(phase);
  console.log(`  ✓ Indexed ${phase.title} (${phase.days.length} topics/days, ${phase.totalLessons} files)`);
}

const rootResources = scanRootResources();

// Extract Git Remote if available
let gitRemote: string | undefined;
try {
  const gitConfigPath = path.join(repoPath, '.git', 'config');
  if (fs.existsSync(gitConfigPath)) {
    const gitConfig = fs.readFileSync(gitConfigPath, 'utf-8');
    const match = gitConfig.match(/url\s*=\s*(https?:\/\/[^\s]+|git@[^\s]+)/);
    if (match) {
      gitRemote = match[1].replace(/\.git$/, '');
      if (gitRemote.startsWith('git@github.com:')) {
        gitRemote = gitRemote.replace('git@github.com:', 'https://github.com/');
      }
    }
  }
} catch {
  // Ignore git reading errors
}

const totalLessonsCount = phases.reduce((acc, p) => acc + p.totalLessons, 0);
const totalDaysCount = phases.reduce((acc, p) => acc + p.days.length, 0);

const manifest: CourseManifest = {
  id: 'javascript-mastery',
  title: 'Full-Stack JavaScript Mastery',
  technology: 'JavaScript',
  description: 'An exhaustive, 22-phase curriculum spanning JavaScript fundamentals, async programming, browser APIs, engines, internals, and fullstack frameworks.',
  sourceRepositoryName: path.basename(repoPath),
  sourceRepositoryPath: configuredRepoPath,
  gitRemote,
  generatedAt: new Date().toISOString(),
  stats: {
    totalPhases: phases.length,
    totalDays: totalDaysCount,
    totalLessons: totalLessonsCount,
    totalMarkdownFiles,
    totalJavaScriptFiles,
    totalExercises,
    totalExamples,
  },
  rootResources,
  phases,
};

// Write manifest to generated directory and public content directory
const manifestJson = JSON.stringify(manifest, null, 2);
fs.writeFileSync(path.join(generatedSrcDir, 'course-manifest.json'), manifestJson, 'utf-8');
fs.writeFileSync(path.join(publicContentDir, '..', 'course-manifest.json'), manifestJson, 'utf-8');

// Write search index
const searchJson = JSON.stringify(searchIndex);
fs.writeFileSync(path.join(generatedSrcDir, 'search-index.json'), searchJson, 'utf-8');
fs.writeFileSync(path.join(publicContentDir, '..', 'search-index.json'), searchJson, 'utf-8');

console.log('\n----------------------------------------------------');
console.log('✅ Synchronization Complete!');
console.log('----------------------------------------------------');
console.log(`📦 Phases Indexed:           ${phases.length}`);
console.log(`📅 Days & Modules:           ${totalDaysCount}`);
console.log(`📄 Total Lessons & Files:    ${totalLessonsCount}`);
console.log(`📝 Markdown Files:           ${totalMarkdownFiles}`);
console.log(`⚡ JavaScript Code Files:     ${totalJavaScriptFiles}`);
console.log(`🎯 Practice Exercises:       ${totalExercises}`);
console.log(`💡 Code Examples:            ${totalExamples}`);
console.log(`🔎 Search Index Entries:     ${searchIndex.length}`);
console.log(`📂 Output Assets:            LearnX/public/content/javascript`);
console.log(`📋 Manifest:                 LearnX/src/generated/course-manifest.json`);
console.log('----------------------------------------------------\n');
