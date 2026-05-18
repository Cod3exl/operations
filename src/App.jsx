import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DailyOverview from './pages/DailyOverview';
import Analytics from './pages/Analytics';
import Karigar from './pages/Karigar';
import Repairs from './pages/Repairs';
import Alerts from './pages/Alerts';

function App() {
  return (
    <Routes>
      <Route path="/operations" element={<Layout />}>
        <Route index element={<Navigate to="/operations/overview" replace />} />
        <Route path="overview" element={<DailyOverview />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="karigar" element={<Karigar />} />
        <Route path="repairs" element={<Repairs />} />
        <Route path="alerts" element={<Alerts />} />
      </Route>
      <Route path="*" element={<Navigate to="/operations/overview" replace />} />
    </Routes>
  );
}

export default App;
