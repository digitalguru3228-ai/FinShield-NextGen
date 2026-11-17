import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InvestigationProvider } from './context/InvestigationContext';
import { MainLayout } from './components/layout/MainLayout';
import { OverviewPage } from './pages/OverviewPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { NetworkInvestigationPage } from './pages/NetworkInvestigationPage';
import { AIInvestigationPage } from './pages/AIInvestigationPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <InvestigationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="network" element={<NetworkInvestigationPage />} />
            <Route path="ai-investigation" element={<AIInvestigationPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </InvestigationProvider>
  );
}
