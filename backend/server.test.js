const request = require('supertest');
const express = require('express');

// Mock des Servers für Tests
const app = express();
app.use(express.json());

// Mock-Daten für Tests
let testKontoData = {
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
    }
  ]
};

// Test Endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'VR-StarterKonto Backend API'
  });
});

app.get('/api/konto', (req, res) => {
  const response = {
    kontostand: testKontoData.kontostand,
    healthBonus: {
      aktuellerPunktestand: testKontoData.healthBonusPunkte,
      maximalerPunktestand: testKontoData.maxHealthBonusPunkte,
      fortschritt: Math.round((testKontoData.healthBonusPunkte / testKontoData.maxHealthBonusPunkte) * 100)
    },
    transaktionen: testKontoData.transaktionen.slice(0, 5),
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

app.post('/api/bonus', (req, res) => {
  const { typ, punkte, beschreibung } = req.body;
  
  if (!typ || !punkte || !beschreibung) {
    return res.status(400).json({ 
      error: 'Fehlende Parameter: typ, punkte und beschreibung sind erforderlich' 
    });
  }

  testKontoData.healthBonusPunkte = Math.min(
    testKontoData.healthBonusPunkte + punkte, 
    testKontoData.maxHealthBonusPunkte
  );

  const geldBonus = punkte * 0.5;
  testKontoData.kontostand += geldBonus;

  res.json({
    success: true,
    message: `${punkte} Bonuspunkte erfolgreich hinzugefügt!`,
    neuerPunktestand: testKontoData.healthBonusPunkte,
    geldBonus: geldBonus,
    neuerKontostand: testKontoData.kontostand
  });
});

describe('VR-StarterKonto Backend API Tests', () => {
  
  beforeEach(() => {
    // Reset test data before each test
    testKontoData = {
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
        }
      ]
    };
  });

  describe('GET /api/health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('service', 'VR-StarterKonto Backend API');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/konto', () => {
    test('should return account data with correct structure', async () => {
      const response = await request(app)
        .get('/api/konto')
        .expect(200);

      expect(response.body).toHaveProperty('kontostand');
      expect(response.body).toHaveProperty('healthBonus');
      expect(response.body).toHaveProperty('transaktionen');
      expect(response.body).toHaveProperty('timestamp');

      expect(response.body.healthBonus).toHaveProperty('aktuellerPunktestand');
      expect(response.body.healthBonus).toHaveProperty('maximalerPunktestand');
      expect(response.body.healthBonus).toHaveProperty('fortschritt');
    });

    test('should calculate health bonus progress correctly', async () => {
      const response = await request(app)
        .get('/api/konto')
        .expect(200);

      const expectedProgress = Math.round((200 / 500) * 100);
      expect(response.body.healthBonus.fortschritt).toBe(expectedProgress);
    });
  });

  describe('POST /api/bonus', () => {
    test('should add bonus points successfully', async () => {
      const bonusData = {
        typ: 'vorsorge',
        punkte: 50,
        beschreibung: 'Vorsorge-Check absolviert'
      };

      const response = await request(app)
        .post('/api/bonus')
        .send(bonusData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('neuerPunktestand', 250);
      expect(response.body).toHaveProperty('geldBonus', 25);
      expect(response.body).toHaveProperty('neuerKontostand', 1275.75);
    });

    test('should return error for missing parameters', async () => {
      const incompleteData = {
        typ: 'vorsorge',
        punkte: 50
        // beschreibung fehlt
      };

      const response = await request(app)
        .post('/api/bonus')
        .send(incompleteData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Fehlende Parameter');
    });

    test('should not exceed maximum bonus points', async () => {
      // Set points close to maximum
      testKontoData.healthBonusPunkte = 480;

      const bonusData = {
        typ: 'versicherung',
        punkte: 100,
        beschreibung: 'Erste Versicherung abgeschlossen'
      };

      const response = await request(app)
        .post('/api/bonus')
        .send(bonusData)
        .expect(200);

      expect(response.body.neuerPunktestand).toBe(500); // Maximum
    });

    test('should calculate money bonus correctly', async () => {
      const bonusData = {
        typ: 'beratung',
        punkte: 75,
        beschreibung: 'Finanzberatung wahrgenommen'
      };

      const response = await request(app)
        .post('/api/bonus')
        .send(bonusData)
        .expect(200);

      expect(response.body.geldBonus).toBe(37.5); // 75 * 0.5
    });
  });
});

module.exports = app;