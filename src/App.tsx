import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseOverviewPage } from './pages/CourseOverviewPage';
import { LearningWorkspacePage } from './pages/LearningWorkspacePage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppLayout: React.FC = () => {
  const location = useLocation();

  // Hide footer on workspace and playground for maximum coding and reading space
  const isFullHeightWorkspace =
    location.pathname.includes('/learn') || location.pathname === '/playground';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseOverviewPage />} />
          <Route path="/courses/:courseId/learn" element={<LearningWorkspacePage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {!isFullHeightWorkspace && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ProgressProvider>
    </ThemeProvider>
  );
};

export default App;
