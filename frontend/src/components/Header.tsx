import React from 'react';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-gradient-to-r from-vr-blue to-vr-light-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-vr-blue font-bold text-lg">VR</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">StarterKonto</h1>
              <p className="text-blue-100 text-sm">Gesundheit & Struktur</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <p className="text-sm font-medium">Dein Start ins Berufsleben</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <h2 className="text-lg md:text-xl font-medium">
            „Mit deinem Berufseinstieg starten auch deine Finanzen – 
            <br className="hidden md:block" />
            <span className="text-yellow-300 font-semibold">gesund, sicher & strukturiert.</span>"
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;