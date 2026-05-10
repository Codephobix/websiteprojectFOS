/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Tournaments } from './pages/Tournaments';
import { TournamentDetails } from './pages/TournamentDetails';
import { Games } from './pages/Games';
import { Teams } from './pages/Teams';
import { News } from './pages/News';
import { Dashboard } from './pages/Dashboard';
import { StaticPage } from './pages/StaticPage';
import { ModalProvider } from './components/ui/ModalContext';

export default function App() {
  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="turniere" element={<Tournaments />} />
            <Route path="turniere/:id" element={<TournamentDetails />} />
            <Route path="spiele" element={<Games />} />
            <Route path="teams" element={<Teams />} />
            <Route path="nachrichten" element={<News />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* Static Pages */}
            <Route path="ranglisten" element={<StaticPage />} />
            <Route path="hilfe" element={<StaticPage />} />
            <Route path="regeln" element={<StaticPage />} />
            <Route path="ueber-uns" element={<StaticPage />} />
            <Route path="presse" element={<StaticPage />} />
            <Route path="kontakt" element={<StaticPage />} />
            <Route path="datenschutz" element={<StaticPage />} />
            <Route path="agb" element={<StaticPage />} />
            <Route path="impressum" element={<StaticPage />} />
          </Route>
        </Routes>
      </ModalProvider>
    </Router>
  );
}
