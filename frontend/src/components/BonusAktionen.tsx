import React, { useState } from 'react';
import { Check, Shield, Users, Plus, Loader2 } from 'lucide-react';

interface BonusAktionenProps {
  onBonusEarned: (punkte: number, beschreibung: string, geldBonus: number) => void;
  loading: boolean;
}

const BonusAktionen: React.FC<BonusAktionenProps> = ({ onBonusEarned, loading }) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleBonusAction = async (typ: string, punkte: number, beschreibung: string) => {
    setActiveAction(typ);
    try {
      await onBonusEarned(punkte, beschreibung, punkte * 0.5);
    } finally {
      setActiveAction(null);
    }
  };

  const bonusAktionen = [
    {
      id: 'vorsorge',
      titel: 'Vorsorge-Check absolviert',
      beschreibung: 'Gesundheitscheck oder Vorsorgeuntersuchung',
      punkte: 50,
      icon: Check,
      color: 'vr-green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'versicherung',
      titel: 'Erste Versicherung abgeschlossen',
      beschreibung: 'Berufsunfähigkeit, Haftpflicht oder Krankenversicherung',
      punkte: 100,
      icon: Shield,
      color: 'vr-blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'beratung',
      titel: 'Finanzberatung wahrgenommen',
      beschreibung: 'Persönliches Gespräch mit VR-Berater',
      punkte: 75,
      icon: Users,
      color: 'vr-orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Bonus-Aktionen</h3>
        <div className="text-sm text-gray-600">
          Sammle Punkte für deine Gesundheit
        </div>
      </div>

      <div className="space-y-4">
        {bonusAktionen.map((aktion) => {
          const Icon = aktion.icon;
          const isActive = activeAction === aktion.id;
          const isLoading = loading && isActive;
          
          return (
            <div 
              key={aktion.id}
              className={`${aktion.bgColor} ${aktion.borderColor} border rounded-xl p-4 transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className={`bg-white rounded-lg p-3 mr-4 shadow-sm`}>
                    <Icon className={`w-6 h-6 text-${aktion.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {aktion.titel}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {aktion.beschreibung}
                    </p>
                    <div className="flex items-center">
                      <Plus className={`w-4 h-4 text-${aktion.color} mr-1`} />
                      <span className={`font-semibold text-${aktion.color}`}>
                        {aktion.punkte} Punkte
                      </span>
                      <span className="text-gray-500 ml-2">
                        (+{(aktion.punkte * 0.5).toFixed(2)}€)
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleBonusAction(aktion.id, aktion.punkte, aktion.titel)}
                  disabled={loading}
                  className={`
                    px-6 py-3 bg-${aktion.color} text-white font-medium rounded-lg
                    hover:opacity-90 active:scale-95 transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center min-w-[120px] justify-center
                  `}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verarbeite...
                    </>
                  ) : (
                    'Jetzt sammeln'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Info:</span> Bonus-Punkte werden automatisch in Geldprämien 
          umgewandelt (1 Punkt = 0,50€) und deinem Konto gutgeschrieben.
        </p>
      </div>
    </div>
  );
};

export default BonusAktionen;