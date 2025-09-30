const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock-Daten im Memory
let kontoData = {
  kontostand: 1250.75,
  healthBonusPunkte: 200,
  maxHealthBonusPunkte: 500,
  transaktionen: [
    {
      id: 1,
      datum: '2024-09-28',
      beschreibung: 'Gehalt September',
      betrag: 2100.00,
      typ: 'einzahlung'
    },
    {
      id: 2,
      datum: '2024-09-27',
      beschreibung: 'Supermarkt',
      betrag: -45.30,
      typ: 'ausgabe'
    },
    {
      id: 3,
      datum: '2024-09-26',
      beschreibung: 'Health-Bonus: Vorsorgecheck',
      betrag: 25.00,
      typ: 'bonus'
    },
    {
      id: 4,
      datum: '2024-09-25',
      beschreibung: 'Tankstelle',
      betrag: -55.80,
      typ: 'ausgabe'
    },
    {
      id: 5,
      datum: '2024-09-24',
      beschreibung: 'Online-Shopping',
      betrag: -89.99,
      typ: 'ausgabe'
    }
  ]
};

// GET /konto - Liefert alle Kontodaten
app.get('/api/konto', (req, res) => {
  try {
    const response = {
      kontostand: kontoData.kontostand,
      healthBonus: {
        aktuellerPunktestand: kontoData.healthBonusPunkte,
        maximalerPunktestand: kontoData.maxHealthBonusPunkte,
        fortschritt: Math.round((kontoData.healthBonusPunkte / kontoData.maxHealthBonusPunkte) * 100)
      },
      transaktionen: kontoData.transaktionen.slice(0, 5), // Nur die letzten 5 Transaktionen
      timestamp: new Date().toISOString()
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Laden der Kontodaten' });
  }
});

// POST /bonus - Fügt Bonuspunkte hinzu
app.post('/api/bonus', (req, res) => {
  try {
    const { typ, punkte, beschreibung } = req.body;
    
    if (!typ || !punkte || !beschreibung) {
      return res.status(400).json({ 
        error: 'Fehlende Parameter: typ, punkte und beschreibung sind erforderlich' 
      });
    }

    // Bonuspunkte hinzufügen
    kontoData.healthBonusPunkte = Math.min(
      kontoData.healthBonusPunkte + punkte, 
      kontoData.maxHealthBonusPunkte
    );

    // Geldbonus berechnen (50% der Punkte als Euro-Cent)
    const geldBonus = punkte * 0.5;
    kontoData.kontostand += geldBonus;

    // Neue Transaktion hinzufügen
    const neueTransaktion = {
      id: kontoData.transaktionen.length + 1,
      datum: new Date().toISOString().split('T')[0],
      beschreibung: `Health-Bonus: ${beschreibung}`,
      betrag: geldBonus,
      typ: 'bonus'
    };

    kontoData.transaktionen.unshift(neueTransaktion);

    // Response mit aktualisierten Daten
    const response = {
      success: true,
      message: `${punkte} Bonuspunkte erfolgreich hinzugefügt!`,
      neuerPunktestand: kontoData.healthBonusPunkte,
      geldBonus: geldBonus,
      neuerKontostand: kontoData.kontostand,
      fortschritt: Math.round((kontoData.healthBonusPunkte / kontoData.maxHealthBonusPunkte) * 100),
      neueTransaktion: neueTransaktion
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Hinzufügen der Bonuspunkte' });
  }
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'VR-StarterKonto Backend API'
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint nicht gefunden' });
});

// Error Handler
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ error: 'Interner Serverfehler' });
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 VR-StarterKonto Backend läuft auf Port ${PORT}`);
  console.log(`📊 API verfügbar unter: http://localhost:${PORT}/api/`);
  console.log(`🔗 Gesundheitscheck: http://localhost:${PORT}/api/health`);
});