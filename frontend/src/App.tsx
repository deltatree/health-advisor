import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KontoUebersicht from './components/KontoUebersicht';
import HealthBonus from './components/HealthBonus';
import TransaktionsListe from './components/TransaktionsListe';
import BonusAktionen from './components/BonusAktionen';
import BonusAnimation from './components/BonusAnimation';
import Footer from './components/Footer';
import { api } from './api';
import { KontoData } from './types';
import { RefreshCw, AlertCircle } from 'lucide-react';

function App() {
  const [kontoData, setKontoData] = useState<KontoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [bonusLoading, setBonusLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBonusAnimation, setShowBonusAnimation] = useState(false);
  const [lastBonus, setLastBonus] = useState<{ punkte: number; geldBonus: number } | null>(null);

  // Kontodaten laden
  const loadKontoData = async () => {
    try {
      setError(null);
      const data = await api.getKontoData();
      setKontoData(data);
    } catch (err) {
      setError('Fehler beim Laden der Kontodaten. Bitte Backend starten.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Bonus hinzufügen
  const handleBonusEarned = async (punkte: number, beschreibung: string, geldBonus: number) => {
    setBonusLoading(true);
    try {
      await api.addBonus('manual', punkte, beschreibung);
      
      // Kontodaten aktualisieren
      await loadKontoData();
      
      // Animation anzeigen
      setLastBonus({ punkte, geldBonus });
      setShowBonusAnimation(true);
      
    } catch (err) {
      setError('Fehler beim Hinzufügen der Bonuspunkte');
      console.error('Bonus Error:', err);
    } finally {
      setBonusLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadKontoData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-vr-blue mx-auto mb-4" />
          <p className="text-gray-600">Lade Kontodaten...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <AlertCircle className="w-12 h-12 text-vr-orange mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Verbindungsfehler
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800">
              <strong>Backend starten:</strong><br />
              1. Terminal öffnen<br />
              2. <code>cd backend</code><br />
              3. <code>npm install && npm start</code>
            </p>
          </div>
          <button
            onClick={loadKontoData}
            className="bg-vr-blue text-white px-6 py-2 rounded-lg hover:bg-vr-light-blue transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  if (!kontoData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Konto-Übersicht */}
          <div className="lg:col-span-1">
            <KontoUebersicht kontostand={kontoData.kontostand} />
          </div>
          
          {/* Health-Bonus */}
          <div className="lg:col-span-1">
            <HealthBonus
              aktuellerPunktestand={kontoData.healthBonus.aktuellerPunktestand}
              maximalerPunktestand={kontoData.healthBonus.maximalerPunktestand}
              fortschritt={kontoData.healthBonus.fortschritt}
            />
          </div>
          
          {/* Transaktionen */}
          <div className="lg:col-span-1">
            <TransaktionsListe transaktionen={kontoData.transaktionen} />
          </div>
        </div>

        {/* Bonus-Aktionen */}
        <div className="mb-8">
          <BonusAktionen 
            onBonusEarned={handleBonusEarned}
            loading={bonusLoading}
          />
        </div>

        {/* Demo Info */}
        <div className="text-center py-6 mb-4">
          <div className="bg-blue-50 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-vr-blue text-sm">
              🎯 <strong>Demo-Modus:</strong> Diese Anwendung verwendet Testdaten zur Demonstration der Features des VR-StarterKonto.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {/* Bonus Animation */}
      {showBonusAnimation && lastBonus && (
        <BonusAnimation
          show={showBonusAnimation}
          punkte={lastBonus.punkte}
          geldBonus={lastBonus.geldBonus}
          onComplete={() => {
            setShowBonusAnimation(false);
            setLastBonus(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
