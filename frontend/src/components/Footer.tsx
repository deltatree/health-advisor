import React from 'react';
import { Smartphone, Laptop, Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Features */}
          <div className="text-center">
            <div className="bg-vr-blue bg-opacity-10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Smartphone className="w-6 h-6 text-vr-blue" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Mobile-First</h4>
            <p className="text-sm text-gray-600">
              Optimiert für dein Smartphone - Banking unterwegs, immer griffbereit.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-vr-green bg-opacity-10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-vr-green" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Persönliche Beratung</h4>
            <p className="text-sm text-gray-600">
              Dein VR-Berater unterstützt dich beim Berufseinstieg und finanziellen Zielen.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-vr-orange bg-opacity-10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Laptop className="w-6 h-6 text-vr-orange" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Digital & Sicher</h4>
            <p className="text-sm text-gray-600">
              Modernste Technologie für deine finanzielle Sicherheit und Struktur.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-sm mb-2">
            <strong>VR-StarterKonto Gesundheit & Struktur</strong>
          </p>
          <p className="text-gray-500 text-xs">
            Demo-Anwendung • Entwickelt für junge Erwachsene am Berufseinstieg
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;