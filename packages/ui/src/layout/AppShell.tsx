import React, { useState } from 'react';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { AppSidebar } from './Sidebar.js';

export interface AppShellProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  currentTheme?: string;
  onThemeChange?: (theme: string) => void;
  title?: string;
}

export function AppShell({
  children,
  activeTab = 'dashboard',
  onTabChange,
  currentTheme = 'light',
  onThemeChange,
  title = 'Enterprise Platform',
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="ent-app-shell min-h-screen flex flex-col bg-background text-foreground antialiased" data-theme={currentTheme}>
      {/* Top Global Header */}
      <Header
        title={title}
        currentTheme={currentTheme}
        onThemeChange={onThemeChange}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        <AppSidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          collapsed={sidebarCollapsed}
          onCollapseToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          {children}
        </main>
      </div>

      {/* Bottom Global Footer */}
      <Footer />
    </div>
  );
}
