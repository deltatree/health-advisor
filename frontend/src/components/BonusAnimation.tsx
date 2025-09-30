import React, { useEffect, useState } from 'react';
import { CheckCircle, Gift, Sparkles } from 'lucide-react';

interface BonusAnimationProps {
  show: boolean;
  punkte: number;
  geldBonus: number;
  onComplete: () => void;
}

const BonusAnimation: React.FC<BonusAnimationProps> = ({ 
  show, 
  punkte, 
  geldBonus, 
  onComplete 
}) => {
  const [phase, setPhase] = useState<'enter' | 'celebrate' | 'exit'>('enter');

  useEffect(() => {
    if (!show) return;

    const timer1 = setTimeout(() => setPhase('celebrate'), 200);
    const timer2 = setTimeout(() => setPhase('exit'), 2000);
    const timer3 = setTimeout(() => onComplete(), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [show, onComplete]);

  if (!show) return null;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <div 
      className={`
        fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50
        transition-opacity duration-300
        ${phase === 'exit' ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <div 
        className={`
          bg-white rounded-2xl p-8 max-w-sm mx-4 text-center transform transition-all duration-500
          ${phase === 'enter' ? 'scale-95 opacity-0' : 
            phase === 'celebrate' ? 'scale-100 opacity-100' : 
            'scale-105 opacity-0'}
        `}
      >
        {/* Glitzer-Animation */}
        <div className="relative mb-6">
          {[...Array(6)].map((_, i) => (
            <Sparkles
              key={i}
              className={`
                absolute w-6 h-6 text-yellow-400 animate-ping
                ${phase === 'celebrate' ? 'opacity-100' : 'opacity-0'}
              `}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 2) * 20}px`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
          
          <div className="bg-gradient-to-r from-vr-green to-emerald-500 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Glückwunsch! 🎉
        </h3>
        
        <p className="text-gray-600 mb-6">
          Du hast erfolgreich Bonuspunkte gesammelt:
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center bg-vr-green bg-opacity-10 rounded-lg p-4">
            <Gift className="w-6 h-6 text-vr-green mr-3" />
            <div>
              <div className="font-bold text-vr-green text-xl">
                +{punkte} Punkte
              </div>
              <div className="text-sm text-gray-600">
                Health-Bonus
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-blue-50 rounded-lg p-4">
            <div className="text-2xl mr-3">💰</div>
            <div>
              <div className="font-bold text-vr-blue text-xl">
                +{formatCurrency(geldBonus)}
              </div>
              <div className="text-sm text-gray-600">
                Geldprämie
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Die Beträge wurden deinem Konto gutgeschrieben
        </div>
      </div>
    </div>
  );
};

export default BonusAnimation;