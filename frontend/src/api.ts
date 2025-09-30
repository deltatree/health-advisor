import axios from 'axios';
import { KontoData, BonusResponse } from './types';

// Entwicklungsmodus: versuche zuerst lokales Backend, dann Docker
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8080/api'  // Docker Container
  : '/api';  // Production (same origin)

export const api = {
  // Kontodaten abrufen
  getKontoData: async (): Promise<KontoData> => {
    const response = await axios.get(`${API_BASE_URL}/konto`);
    return response.data;
  },

  // Bonuspunkte hinzufügen
  addBonus: async (typ: string, punkte: number, beschreibung: string): Promise<BonusResponse> => {
    const response = await axios.post(`${API_BASE_URL}/bonus`, {
      typ,
      punkte,
      beschreibung
    });
    return response.data;
  }
};