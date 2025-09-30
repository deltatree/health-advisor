import React from 'react';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';

interface KontoUebersichtProps {
  kontostand: number;
}

const KontoUebersicht: React.FC<KontoUebersichtProps> = ({ kontostand }) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Kontostand</h3>
        <div className="flex items-center text-vr-green">
          <TrendingUp className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">+2,5%</span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {formatCurrency(kontostand)}
        </div>
        <p className="text-gray-600 text-sm">
          Verfügbarer Betrag
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-vr-gray rounded-lg p-3">
          <div className="flex items-center mb-2">
            <Plus className="w-4 h-4 text-vr-green mr-1" />
            <span className="text-sm font-medium text-gray-700">Eingänge</span>
          </div>
          <div className="text-lg font-semibold text-vr-green">
            {formatCurrency(2125.00)}
          </div>
        </div>
        
        <div className="bg-vr-gray rounded-lg p-3">
          <div className="flex items-center mb-2">
            <TrendingDown className="w-4 h-4 text-vr-orange mr-1" />
            <span className="text-sm font-medium text-gray-700">Ausgaben</span>
          </div>
          <div className="text-lg font-semibold text-vr-orange">
            {formatCurrency(874.25)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KontoUebersicht;