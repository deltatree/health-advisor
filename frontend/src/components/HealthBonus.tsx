import React from 'react';
import { Heart, Shield, Target } from 'lucide-react';

interface HealthBonusProps {
  aktuellerPunktestand: number;
  maximalerPunktestand: number;
  fortschritt: number;
}

const HealthBonus: React.FC<HealthBonusProps> = ({ 
  aktuellerPunktestand, 
  maximalerPunktestand, 
  fortschritt 
}) => {
  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return 'bg-vr-green';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-vr-orange';
  };

  const getProgressTextColor = (progress: number): string => {
    if (progress >= 80) return 'text-vr-green';
    if (progress >= 50) return 'text-yellow-600';
    return 'text-vr-orange';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-vr-green bg-opacity-10 rounded-lg p-2 mr-3">
            <Heart className="w-6 h-6 text-vr-green" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Health-Bonus</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          fortschritt >= 80 ? 'bg-vr-green bg-opacity-10 text-vr-green' :
          fortschritt >= 50 ? 'bg-yellow-100 text-yellow-600' :
          'bg-vr-orange bg-opacity-10 text-vr-orange'
        }`}>
          {fortschritt}%
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline mb-2">
          <span className="text-2xl font-bold text-gray-900">
            {aktuellerPunktestand}
          </span>
          <span className="text-gray-600 ml-1">/ {maximalerPunktestand} Punkte</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(fortschritt)}`}
            style={{ width: `${fortschritt}%` }}
          ></div>
        </div>
        
        <p className={`text-sm font-medium ${getProgressTextColor(fortschritt)}`}>
          {maximalerPunktestand - aktuellerPunktestand} Punkte bis zum nächsten Level
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-vr-gray rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-5 h-5 text-vr-blue" />
          </div>
          <div className="text-sm font-medium text-gray-700">Vorsorge</div>
          <div className="text-lg font-semibold text-vr-blue">3/5</div>
        </div>
        
        <div className="text-center p-3 bg-vr-gray rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-vr-green" />
          </div>
          <div className="text-sm font-medium text-gray-700">Ziele</div>
          <div className="text-lg font-semibold text-vr-green">2/3</div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-medium">Tipp:</span> Sammle 500 Punkte für einen 50€ Bonus und 
          exklusive Vorteile bei Partnerunternehmen!
        </p>
      </div>
    </div>
  );
};

export default HealthBonus;