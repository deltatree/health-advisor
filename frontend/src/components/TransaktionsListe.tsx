import React from 'react';
import { ArrowUpRight, ArrowDownRight, Gift } from 'lucide-react';
import { Transaktion } from '../types';

interface TransaktionsListeProps {
  transaktionen: Transaktion[];
}

const TransaktionsListe: React.FC<TransaktionsListeProps> = ({ transaktionen }) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const getTransactionIcon = (typ: string, betrag: number) => {
    if (typ === 'bonus') {
      return <Gift className="w-5 h-5 text-vr-green" />;
    }
    return betrag > 0 
      ? <ArrowUpRight className="w-5 h-5 text-vr-green" />
      : <ArrowDownRight className="w-5 h-5 text-vr-orange" />;
  };

  const getTransactionColor = (typ: string, betrag: number): string => {
    if (typ === 'bonus') return 'text-vr-green';
    return betrag > 0 ? 'text-vr-green' : 'text-vr-orange';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Letzte Transaktionen</h3>
      
      <div className="space-y-3">
        {transaktionen.map((transaktion) => (
          <div 
            key={transaktion.id} 
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-gray-100 rounded-full p-2 mr-3">
                {getTransactionIcon(transaktion.typ, transaktion.betrag)}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {transaktion.beschreibung}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(transaktion.datum)}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`font-semibold ${getTransactionColor(transaktion.typ, transaktion.betrag)}`}>
                {transaktion.betrag > 0 ? '+' : ''}{formatCurrency(transaktion.betrag)}
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {transaktion.typ === 'bonus' ? 'Health-Bonus' : 
                 transaktion.typ === 'einzahlung' ? 'Eingang' : 'Ausgabe'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full text-center text-vr-blue hover:text-vr-light-blue font-medium text-sm transition-colors">
          Alle Transaktionen anzeigen
        </button>
      </div>
    </div>
  );
};

export default TransaktionsListe;