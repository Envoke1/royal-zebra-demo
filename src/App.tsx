import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import AdJourney from './pages/AdJourney';
import QRJourney from './pages/QRJourney';
import Dashboard from './pages/Dashboard';
import Brands from './pages/Brands';
import Network from './pages/Network';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey-ad" element={<AdJourney />} />
        <Route path="/journey-qr" element={<QRJourney />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/network" element={<Network />} />
      </Routes>
    </Layout>
  );
}
