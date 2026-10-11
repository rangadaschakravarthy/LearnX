import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Play,
  Square,
  RotateCcw,
  Terminal,
  FileCode2,
  FolderGit2,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Eye,
  Sparkles,
  AlertCircle,
  ExternalLink,
  BookOpen,
  PanelLeftOpen,
  PanelLeftClose,
  List,
  Layers,
  Code2,
  Globe
} from 'lucide-react';
import { ContentService } from '../services/contentService';
import { ExecutionService } from '../services/executionService';
import { IExecutionController } from '../services/runtime/types';
import { useProgress } from '../context/ProgressContext';
import { LessonFile, Phase, DayTopic, ConsoleLogEntry } from '../types/course';
import { WorkspaceSidebar } from '../components/workspace/WorkspaceSidebar';
import { WorkspaceContextNav } from '../components/workspace/WorkspaceContextNav';
import { LessonTabs } from '../components/workspace/LessonTabs';
import { MarkdownRenderer } from '../components/markdown/MarkdownRenderer';
import { CodeEditor } from '../components/editor/CodeEditor';
import { ConsoleOutput } from '../components/playground/ConsoleOutput';
import { HtmlSandboxPreview } from '../components/sandbox/HtmlSandboxPreview';

export const LearningWorkspacePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const manifest = ContentService.getManifest();
  const { isCompleted, toggleComplete, recordVisit } = useProgress();

  // Responsive sidebar collapse defaults
  const [leftCollapsed, setLeftCollapsed] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
  });
  const [rightCollapsed, setRightCollapsed] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 1400 : true;
  });
  const [isZenMode, setIsZenMode] = useState(false); // Expanded workspace mode

  // Workspace view mode: 'split' | 'code' | 'console' | 'preview'
  const [editorViewMode, setEditorViewMode] = useState<'split' | 'code' | 'console' | 'preview'>('split');

  // Active lesson file path from URL ?file=...
  const activeFilePath = searchParams.get('file') ||
    manifest.phases[0]?.days[0]?.tabs.theory[0]?.relativePath ||
    manifest.phases[0]?.days[0]?.allLessons[0]?.relativePath ||
    'README.md';

  const [lessonContent, setLessonContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // In-situ JS execution state (when viewing .js files directly)
  const [editableCode, setEditableCode] = useState<string>('');
  const [originalCode, setOriginalCode] = useState<string>('');
  const [jsLogs, setJsLogs] = useState<ConsoleLogEntry[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [execDuration, setExecDuration] = useState<number | undefined>(undefined);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [solutionContent, setSolutionContent] = useState<string>('');

  // Find phase, day, and lesson file
  const { currentLesson, currentPhase, currentDay } = useMemo(() => {
    let lesson = ContentService.getLessonByPath(activeFilePath);
    let phase: Phase | undefined;
    let day: DayTopic | undefined;

    for (const p of manifest.phases) {
      for (const d of p.days) {
        if (d.allLessons.some(l => l.relativePath === activeFilePath) || d.readmePath === activeFilePath) {
          phase = p;
          day = d;
          if (!lesson) {
            lesson = d.allLessons.find(l => l.relativePath === activeFilePath);
          }
          break;
        }
      }
      if (phase) break;
    }

    if (!lesson) {
      // Fallback virtual lesson object for loose/guide files
      lesson = {
        id: activeFilePath.replace(/[\\/]/g, '-'),
        title: activeFilePath.split(/[\\/]/).pop()?.replace(/\.(md|js)$/, '') || 'Lesson',
        fileName: activeFilePath.split(/[\\/]/).pop() || 'Lesson',
        relativePath: activeFilePath,
        extension: activeFilePath.endsWith('.js') ? 'js' : 'md',
        type: 'reference',
        sizeBytes: 0,
      };
    }

    return {
      currentLesson: lesson,
      currentPhase: phase || manifest.phases[0],
      currentDay: day,
    };
  }, [activeFilePath, manifest]);

  // Set appropriate view mode & collapse panels on file type change
  useEffect(() => {
    if (currentLesson.extension === 'html') {
      setEditorViewMode(typeof window !== 'undefined' && window.innerWidth < 1024 ? 'preview' : 'split');
      setRightCollapsed(true);
    } else if (currentLesson.extension === 'js') {
      setEditorViewMode(typeof window !== 'undefined' && window.innerWidth < 1024 ? 'code' : 'split');
      setRightCollapsed(true);
    }
  }, [currentLesson.extension]);

  // Find companion files in the same directory (e.g., script.js, style.css, README.md alongside index.html)
  const companionFiles = useMemo(() => {
    if (!currentDay) return [];
    const currentDir = activeFilePath.substring(0, activeFilePath.lastIndexOf('/'));
    if (!currentDir) return [];
    return currentDay.allLessons.filter(
      l => l.relativePath.startsWith(currentDir + '/') && l.relativePath !== activeFilePath
    );
  }, [currentDay, activeFilePath]);

  // Load lesson text content on path change
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setLoadError(null);
    setShowSolution(false);
    setSolutionContent('');
    setJsLogs([]);
    setExecDuration(undefined);

    ContentService.fetchFileContent(activeFilePath)
      .then((text) => {
        if (isMounted) {
          setLessonContent(text);
          if (['js', 'html', 'css', 'json'].includes(currentLesson.extension)) {
            setEditableCode(text);
            setOriginalCode(text);
          }
          setIsLoading(false);

          // Record visit in storage
          recordVisit({
            courseId: manifest.id,
            phaseId: currentPhase?.id || 'general',
            dayId: currentDay?.id,
            lessonPath: activeFilePath,
            lessonTitle: currentLesson.title,
          });
        }
      })
      .catch((err) => {
        if (isMounted) {
          setLoadError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [activeFilePath]);

  // Pre-load solution if this is an exercise in a day that has a solutions tab
  useEffect(() => {
    if (currentLesson.type === 'exercise' && currentDay?.tabs.solutions.length) {
      const matchingSolution = currentDay.tabs.solutions[0];
      if (matchingSolution) {
        ContentService.fetchFileContent(matchingSolution.relativePath)
          .then(text => setSolutionContent(text))
          .catch(() => {});
      }
    }
  }, [currentLesson, currentDay]);

  const handleSelectLesson = (file: LessonFile) => {
    setSearchParams({ file: file.relativePath });
  };

  // Previous and Next lesson calculation
  const { prev, next } = useMemo(() => {
    return ContentService.getAdjacentLessons(activeFilePath);
  }, [activeFilePath]);

  const workspaceControllerRef = useRef<IExecutionController | null>(null);

  // Execute in-situ JavaScript with real-time streaming
  const handleRunCode = () => {
    setIsExecuting(true);
    setJsLogs([]);
    setExecDuration(undefined);

    const { promise, controller } = ExecutionService.executeStreaming(editableCode, {
      onLog: (entry) => {
        setJsLogs((prev) => [...prev, entry]);
      },
      onStatusChange: (status) => {
        if (status !== 'running') {
          setIsExecuting(false);
        }
      },
    });

    workspaceControllerRef.current = controller;

    promise.then((result) => {
      setExecDuration(result.durationMs);
      setIsExecuting(false);

      if (typeof window !== 'undefined' && window.innerWidth < 1024 && editorViewMode === 'code') {
        if (result.logs.some((l) => l.type === 'error')) {
          setEditorViewMode('console');
        }
      }
    });
  };

  const handleStopCode = () => {
    if (workspaceControllerRef.current) {
      workspaceControllerRef.current.stop('Stopped by user');
    } else {
      ExecutionService.cancelCurrent();
    }
    setIsExecuting(false);
  };

  const handleResetCode = () => {
    setEditableCode(originalCode);
    setJsLogs([]);
    setExecDuration(undefined);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(editableCode || lessonContent);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {}
  };

  const handleOpenInPlayground = () => {
    sessionStorage.setItem(
      'learnx_playground_transfer',
      JSON.stringify({
        code: editableCode || lessonContent,
        sourcePath: activeFilePath,
        timestamp: Date.now(),
      })
    );
    navigate('/playground');
  };

  // Toggle Zen / Expanded workspace mode
  const toggleZenMode = () => {
    const nextZen = !isZenMode;
    setIsZenMode(nextZen);
    if (nextZen) {
      setLeftCollapsed(true);
      setRightCollapsed(true);
      setEditorViewMode('split');
    } else {
      setLeftCollapsed(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
      setRightCollapsed(typeof window !== 'undefined' ? window.innerWidth < 1400 : true);
    }
  };

  const isCurrentCompleted = isCompleted(activeFilePath);
  const isHtmlFile = currentLesson.extension === 'html' || activeFilePath.endsWith('.html');
  const isJavaScriptFile = (currentLesson.extension === 'js' || activeFilePath.endsWith('.js')) && !isHtmlFile;
  const isCodeOnlyFile = ['css', 'json'].includes(currentLesson.extension);
  const isMarkdownFile = !isHtmlFile && !isJavaScriptFile && !isCodeOnlyFile;

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-slate-950">
      {/* Left Panel: Course Sidebar */}
      {!isZenMode && (
        <WorkspaceSidebar
          manifest={manifest}
          activePhaseId={currentPhase?.id || manifest.phases[0].id}
          activeLessonPath={activeFilePath}
          onSelectLesson={handleSelectLesson}
          isCollapsed={leftCollapsed}
          onToggleCollapse={() => setLeftCollapsed(!leftCollapsed)}
        />
      )}

      {/* Center Panel: Main Lesson Workspace */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-hidden">
        {/* Lesson Category Tabs (Theory, Examples, Exercises, Solutions) */}
        {currentDay && !isZenMode && (
          <LessonTabs
            day={currentDay}
            currentLessonPath={activeFilePath}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {/* Lesson Header Bar (Fully Responsive) */}
        <div className="px-3 sm:px-6 py-2.5 sm:py-3 border-b border-slate-800 bg-slate-900/60 backdrop-blur space-y-2 flex-shrink-0">
          {/* Top Row: Syllabus Button, Breadcrumbs, and Action Toolbar */}
          <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
            {/* Left side: Syllabus Toggle & Breadcrumb path */}
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              {leftCollapsed && !isZenMode && (
                <button
                  onClick={() => setLeftCollapsed(false)}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center space-x-1.5 border border-slate-700 transition flex-shrink-0 shadow-sm"
                  title="Open syllabus"
                >
                  <PanelLeftOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden xs:inline text-[11px]">Syllabus</span>
                </button>
              )}

              <nav className="flex items-center space-x-1 text-xs text-slate-400 font-mono truncate" aria-label="Breadcrumb">
                <Link to="/courses" className="hover:text-indigo-400 hidden sm:inline">Courses</Link>
                <span className="hidden sm:inline">›</span>
                {currentPhase && (
                  <>
                    <Link to={`/courses/${manifest.id}`} className="hover:text-indigo-400 truncate max-w-[120px] md:max-w-[160px] hidden md:inline">
                      {currentPhase.title}
                    </Link>
                    <span className="hidden md:inline">›</span>
                  </>
                )}
                {currentDay && (
                  <>
                    <span className="text-slate-300 truncate max-w-[140px] md:max-w-[180px]">{currentDay.title}</span>
                    <span>›</span>
                  </>
                )}
                <span className="text-indigo-400 font-semibold truncate max-w-[140px] sm:max-w-[200px]">{currentLesson.fileName}</span>
              </nav>
            </div>

            {/* Right side: Action Toolbar */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
              {/* Zen / Expand Workspace Toggle */}
              <button
                onClick={toggleZenMode}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 border shadow-sm ${
                  isZenMode
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title={isZenMode ? 'Restore side navigation panels' : 'Hide navigation & expand code/result side-by-side'}
              >
                {isZenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isZenMode ? 'Restore Panels' : 'Expand Workspace'}</span>
              </button>

              {(isJavaScriptFile || isHtmlFile || isCodeOnlyFile) && (
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition border border-slate-700 flex items-center space-x-1.5"
                  title="Copy code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden xs:inline">{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              )}

              {isJavaScriptFile && (
                <button
                  onClick={handleOpenInPlayground}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 hover:text-white text-xs font-medium transition border border-indigo-500/40 flex items-center space-x-1.5 shadow-sm"
                  title="Open in Full Playground"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Playground</span>
                </button>
              )}

              {isHtmlFile && (
                <a
                  href={`/content/javascript/${activeFilePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 hover:text-white text-xs font-medium transition border border-cyan-500/30 flex items-center space-x-1.5 shadow-sm"
                  title="Launch in independent browser window"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Launch App</span>
                </a>
              )}

              <button
                onClick={() => toggleComplete(activeFilePath)}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 border ${
                  isCurrentCompleted
                    ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title={isCurrentCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrentCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="hidden xs:inline">{isCurrentCompleted ? 'Completed' : 'Mark Done'}</span>
              </button>

              {/* Right Outline / Resources Toggle */}
              {rightCollapsed && !isZenMode && (
                <button
                  onClick={() => setRightCollapsed(false)}
                  className="p-1.5 sm:px-2 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center space-x-1 border border-slate-700 transition shadow-sm"
                  title="Open outline and resources"
                >
                  <List className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden lg:inline text-[11px]">Outline</span>
                </button>
              )}
            </div>
          </div>

          {/* Middle Row: Full-Width Title and Meta Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight break-words flex-1 min-w-[200px]">
              {currentLesson.title}
            </h2>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                {currentLesson.type}
              </span>

              {currentLesson.difficulty && (
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${
                  currentLesson.difficulty === 'easy'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : currentLesson.difficulty === 'medium'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  {currentLesson.difficulty}
                </span>
              )}
            </div>
          </div>

          {/* Bottom Row: Clean Truncated Relative Path */}
          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-mono">
            <FolderGit2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            <span className="truncate max-w-2xl text-slate-400" title={activeFilePath}>{activeFilePath}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className={`flex-1 min-h-0 w-full flex flex-col ${
          isMarkdownFile || showSolution
            ? 'overflow-y-auto p-3 sm:p-4 md:p-6'
            : 'overflow-hidden p-2 sm:p-3 md:p-4'
        }`}>
          {isLoading && (
            <div className="py-20 text-center space-y-3 my-auto">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400">Loading lesson content from repository...</p>
            </div>
          )}

          {loadError && (
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/40 text-rose-300 space-y-2 max-w-4xl mx-auto my-auto">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Failed to load lesson content</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">{loadError}</p>
            </div>
          )}

          {/* 1. Markdown Lessons: Theory, Overview, Guides */}
          {!isLoading && !loadError && isMarkdownFile && (
            <div className="max-w-4xl mx-auto w-full flex-1 pb-8">
              <MarkdownRenderer
                content={lessonContent}
                sourcePath={activeFilePath}
              />
            </div>
          )}

          {/* 2. HTML Web Project Files: Interactive Web Preview Sandbox & Code Editor */}
          {!isLoading && !loadError && isHtmlFile && (
            <div className="h-full flex-1 flex flex-col min-h-0 space-y-2">
              {/* Companion Files Navigator (e.g. script.js, expected-output.md in mini-project) */}
              {companionFiles.length > 0 && (
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs overflow-x-auto scrollbar-none flex-shrink-0">
                  <span className="text-[11px] text-slate-500 font-mono flex-shrink-0 font-medium">
                    Project Files:
                  </span>
                  <button
                    className="px-2.5 py-1 rounded-md bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-semibold flex items-center space-x-1 flex-shrink-0 shadow-sm"
                  >
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{currentLesson.fileName}</span>
                  </button>
                  {companionFiles.map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => handleSelectLesson(comp)}
                      className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700/60 font-mono text-xs flex items-center space-x-1 flex-shrink-0 transition"
                      title={comp.relativePath}
                    >
                      {comp.extension === 'js' ? (
                        <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{comp.fileName}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Responsive Web IDE Workspace Container */}
              <div className="flex-1 flex flex-col min-h-0 rounded-xl border border-slate-800 bg-[#1e1e1e] overflow-hidden shadow-2xl">
                {/* Unified Sub-Header Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 flex-shrink-0">
                  <div className="flex items-center space-x-2 min-w-0">
                    <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="font-mono text-slate-200 font-medium truncate max-w-[140px] sm:max-w-xs">
                      {currentLesson.fileName}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hidden sm:inline">
                      Live Sandbox
                    </span>
                  </div>

                  {/* Responsive View Switcher: Live App / HTML Code / Console / Split */}
                  <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setEditorViewMode('preview')}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1.5 transition ${
                        editorViewMode === 'preview'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Interactive Live App Preview"
                    >
                      <Globe className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Live App</span>
                    </button>

                    <button
                      onClick={() => setEditorViewMode('code')}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1.5 transition ${
                        editorViewMode === 'code'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="View & Edit HTML Code"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>HTML Code</span>
                    </button>

                    <button
                      onClick={() => setEditorViewMode('console')}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1.5 transition relative ${
                        editorViewMode === 'console'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="View Sandbox Console Output"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Console</span>
                      {jsLogs.length > 0 && (
                        <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-500/30 text-indigo-200 font-mono font-semibold">
                          {jsLogs.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setEditorViewMode('split')}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1.5 transition ${
                        editorViewMode === 'split'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Side-by-side Code and Live Preview"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Split</span>
                    </button>
                  </div>

                  {/* Actions: Reset Code */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleResetCode}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1 border border-slate-700 transition"
                      title="Reset code to original starter"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  </div>
                </div>

                {/* Main Workspace Body for HTML */}
                <div className="flex-1 min-h-0 relative">
                  {editorViewMode === 'split' && (
                    <div className="h-full grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                      {/* Code Editor Panel */}
                      <div className="h-full min-h-[300px] lg:min-h-0 flex flex-col overflow-hidden">
                        <CodeEditor
                          value={editableCode}
                          onChange={setEditableCode}
                          language="html"
                          height="100%"
                          className="border-0 rounded-none shadow-none"
                        />
                      </div>

                      {/* Live App Sandbox Preview Panel */}
                      <div className="h-full min-h-[300px] lg:min-h-0 flex flex-col overflow-hidden">
                        <HtmlSandboxPreview
                          htmlContent={editableCode}
                          sourcePath={activeFilePath}
                          onConsoleLog={(entry) => setJsLogs((prev) => [...prev, entry])}
                          className="border-0 rounded-none shadow-none"
                        />
                      </div>
                    </div>
                  )}

                  {editorViewMode === 'preview' && (
                    <div className="h-full flex flex-col overflow-hidden">
                      <HtmlSandboxPreview
                        htmlContent={editableCode}
                        sourcePath={activeFilePath}
                        onConsoleLog={(entry) => setJsLogs((prev) => [...prev, entry])}
                        className="border-0 rounded-none shadow-none"
                      />
                    </div>
                  )}

                  {editorViewMode === 'code' && (
                    <div className="h-full flex flex-col overflow-hidden">
                      <CodeEditor
                        value={editableCode}
                        onChange={setEditableCode}
                        language="html"
                        height="100%"
                        className="border-0 rounded-none shadow-none"
                      />
                    </div>
                  )}

                  {editorViewMode === 'console' && (
                    <div className="h-full flex flex-col overflow-hidden">
                      <ConsoleOutput
                        logs={jsLogs}
                        onClear={() => setJsLogs([])}
                        durationMs={execDuration}
                        isRunning={false}
                        className="border-0 rounded-none shadow-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 3. Pure Code Files (CSS, JSON) */}
          {!isLoading && !loadError && isCodeOnlyFile && (
            <div className="h-full flex-1 flex flex-col min-h-0 rounded-xl border border-slate-800 bg-[#1e1e1e] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <FileCode2 className="w-4 h-4 text-indigo-400" />
                  <span className="font-mono text-slate-200">{currentLesson.fileName}</span>
                </div>
                <span className="text-[11px] uppercase font-mono text-slate-500">{currentLesson.extension} source</span>
              </div>
              <div className="flex-1 min-h-0">
                <CodeEditor
                  value={editableCode}
                  onChange={setEditableCode}
                  language={currentLesson.extension as any}
                  height="100%"
                  className="border-0 rounded-none shadow-none"
                />
              </div>
            </div>
          )}

          {/* 4. JavaScript Files: Responsive IDE Workspace (Code Editor & Live Execution Console) */}
          {!isLoading && !loadError && isJavaScriptFile && (
            <div className="h-full flex-1 flex flex-col min-h-0 space-y-2">
              {/* Practice Challenge Description Box (if exercise) */}
              {currentLesson.type === 'exercise' && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-start justify-between gap-3 flex-shrink-0">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-indigo-200">
                      Practice Challenge: {currentLesson.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Complete the TODO items directly in the code editor below. Hit <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300 font-mono text-[10px]">Ctrl+Enter</kbd> or "Run Code" to execute.
                    </p>
                  </div>

                  {solutionContent && (
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center space-x-1.5 flex-shrink-0 self-start"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>{showSolution ? 'Hide Solution' : 'Reveal Solution'}</span>
                    </button>
                  )}
                </div>
              )}

              {/* Responsive IDE Workspace Container */}
              <div className="flex-1 flex flex-col min-h-0 rounded-xl border border-slate-800 bg-[#1e1e1e] overflow-hidden shadow-2xl">
                {/* Unified IDE Sub-Header Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 flex-shrink-0">
                  <div className="flex items-center space-x-2 min-w-0">
                    <FileCode2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span className="font-mono text-slate-200 font-medium truncate max-w-[140px] sm:max-w-xs">
                      {currentLesson.fileName}
                    </span>
                  </div>

                  {/* Responsive View Switcher: Code / Console / Split */}
                  <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setEditorViewMode('code')}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1.5 transition ${
                        editorViewMode === 'code'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Focus on Code Editor"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </button>

                    <button
                      onClick={() => setEditorViewMode('console')}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1.5 transition relative ${
                        editorViewMode === 'console'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="View Execution Console"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Console</span>
                      {jsLogs.length > 0 && (
                        <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-500/30 text-indigo-200 font-mono font-semibold">
                          {jsLogs.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setEditorViewMode('split')}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1.5 transition ${
                        editorViewMode === 'split'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Side-by-side or stacked view"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Split</span>
                    </button>
                  </div>

                  {/* Editor Actions: Reset & Run */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleResetCode}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1 border border-slate-700 transition"
                      title="Reset code to original starter"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>

                    {isExecuting ? (
                      <button
                        onClick={handleStopCode}
                        className="px-3.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition animate-pulse"
                        title="Stop running program"
                      >
                        <Square className="w-3 h-3 fill-current" />
                        <span>Stop</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleRunCode}
                        className="px-3.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition"
                        title="Execute JavaScript (Ctrl + Enter)"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Run Code</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Main Workspace Body based on editorViewMode */}
                <div className="flex-1 min-h-0 relative">
                  {editorViewMode === 'split' && (
                    <div className="h-full grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                      {/* Code Editor Panel */}
                      <div className="h-full min-h-[300px] lg:min-h-0 flex flex-col overflow-hidden">
                        <CodeEditor
                          value={editableCode}
                          onChange={setEditableCode}
                          onRun={handleRunCode}
                          height="100%"
                          className="border-0 rounded-none shadow-none"
                        />
                      </div>

                      {/* Execution Console Panel */}
                      <div className="h-full min-h-[260px] lg:min-h-0 flex flex-col overflow-hidden">
                        <ConsoleOutput
                          logs={jsLogs}
                          onClear={() => setJsLogs([])}
                          durationMs={execDuration}
                          isRunning={isExecuting}
                          className="border-0 rounded-none shadow-none"
                        />
                      </div>
                    </div>
                  )}

                  {editorViewMode === 'code' && (
                    <div className="h-full flex flex-col overflow-hidden">
                      <CodeEditor
                        value={editableCode}
                        onChange={setEditableCode}
                        onRun={handleRunCode}
                        height="100%"
                        className="border-0 rounded-none shadow-none"
                      />
                    </div>
                  )}

                  {editorViewMode === 'console' && (
                    <div className="h-full flex flex-col overflow-hidden">
                      <ConsoleOutput
                        logs={jsLogs}
                        onClear={() => setJsLogs([])}
                        durationMs={execDuration}
                        isRunning={isExecuting}
                        className="border-0 rounded-none shadow-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Solution Accordion (when revealed) */}
              {showSolution && solutionContent && (
                <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3 flex-shrink-0">
                  <div className="flex items-center space-x-2 text-amber-400 text-sm font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Official Solution Reference</span>
                  </div>
                  <MarkdownRenderer
                    content={solutionContent}
                    sourcePath={currentDay?.tabs.solutions[0]?.relativePath}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Docked Lesson Navigation Footer (Cleanly pinned, NEVER overlaps editor or console) */}
        <footer className="px-3 sm:px-6 py-2 sm:py-2.5 border-t border-slate-800/90 bg-slate-900/95 backdrop-blur flex items-center justify-between gap-3 flex-shrink-0 z-20 shadow-lg">
          {prev ? (
            <button
              onClick={() => handleSelectLesson(prev.lesson)}
              className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-medium transition group"
              title={`Previous: ${prev.lesson.title}`}
            >
              <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-white flex-shrink-0 transition" />
              <div className="text-left hidden sm:block">
                <span className="text-[10px] text-slate-400 uppercase font-mono block leading-none">Previous</span>
                <span className="font-medium text-slate-200 max-w-[130px] md:max-w-[200px] truncate block text-xs">{prev.lesson.title}</span>
              </div>
              <span className="sm:hidden text-xs">Prev</span>
            </button>
          ) : (
            <div className="w-12 sm:w-20" />
          )}

          <button
            onClick={() => toggleComplete(activeFilePath)}
            className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 border shadow-sm ${
              isCurrentCompleted
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500/30'
            }`}
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{isCurrentCompleted ? 'Completed ✓' : 'Mark Lesson Complete'}</span>
          </button>

          {next ? (
            <button
              onClick={() => handleSelectLesson(next.lesson)}
              className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-medium transition group"
              title={`Next: ${next.lesson.title}`}
            >
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-slate-400 uppercase font-mono block leading-none">Next</span>
                <span className="font-medium text-slate-200 max-w-[130px] md:max-w-[200px] truncate block text-xs">{next.lesson.title}</span>
              </div>
              <span className="sm:hidden text-xs">Next</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white flex-shrink-0 transition" />
            </button>
          ) : (
            <div className="w-12 sm:w-20" />
          )}
        </footer>
      </main>

      {/* Right Panel: Contextual Navigation */}
      {!isZenMode && (
        <WorkspaceContextNav
          day={currentDay}
          currentLesson={currentLesson}
          headings={currentLesson.headings}
          isCollapsed={rightCollapsed}
          onToggleCollapse={() => setRightCollapsed(!rightCollapsed)}
          onSelectLesson={handleSelectLesson}
        />
      )}
    </div>
  );
};
