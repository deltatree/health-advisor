export interface KontoData {
  kontostand: number;
  healthBonus: {
    aktuellerPunktestand: number;
    maximalerPunktestand: number;
    fortschritt: number;
  };
  transaktionen: Transaktion[];
  timestamp: string;
}

export interface Transaktion {
  id: number;
  datum: string;
  beschreibung: string;
  betrag: number;
  typ: 'einzahlung' | 'ausgabe' | 'bonus';
}

export interface BonusResponse {
  success: boolean;
  message: string;
  neuerPunktestand: number;
  geldBonus: number;
  neuerKontostand: number;
  fortschritt: number;
  neueTransaktion: Transaktion;
}