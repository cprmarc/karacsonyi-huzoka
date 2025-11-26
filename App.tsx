import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, TreePine, X } from 'lucide-react';
import { PAIRINGS, VALID_NAMES, normalizeName } from './constants';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter suggestions based on input
  const suggestions = VALID_NAMES.filter(name => 
    name.toLowerCase().includes(inputValue.toLowerCase()) && 
    name.toLowerCase() !== inputValue.toLowerCase()
  );

  const handleSearch = () => {
    setError(null);
    setResult(null);

    const normalizedInput = normalizeName(inputValue);

    if (!normalizedInput) {
      setError("Kérlek írd be a neved!");
      return;
    }

    const matchedKey = Object.keys(PAIRINGS).find(key => key === normalizedInput);

    if (!matchedKey) {
      setError("Ez a név nem szerepel a listában. Ellenőrizd a helyesírást!");
      return;
    }

    setIsLoading(true);

    // Mesterséges késleltetés a "suspense" érdekében
    setTimeout(() => {
      setResult(PAIRINGS[matchedKey]);
      setIsLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setInputValue('');
    setResult(null);
    setError(null);
    setShowSuggestions(false);
  };

  const selectSuggestion = (name: string) => {
    setInputValue(name);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full relative">
        
        {/* Dekoratív elemek */}
        <div className="absolute -top-12 -left-8 text-xmas-gold opacity-80 animate-pulse">
          <Sparkles size={48} />
        </div>
        <div className="absolute -bottom-6 -right-6 text-xmas-green opacity-40">
          <TreePine size={120} />
        </div>

        {/* Fő Kártya */}
        <div className="bg-xmas-cream rounded-2xl shadow-2xl border-4 border-xmas-gold overflow-hidden relative z-10">
          
          {/* Fejléc */}
          <div className="bg-xmas-red p-6 text-center border-b-4 border-xmas-gold relative">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            <h1 className="font-display text-4xl text-white drop-shadow-md mb-2">
              Karácsonyi Húzás
            </h1>
            <p className="text-white/90 font-serif italic text-sm">
              Ki lesz az ajándékozottad idén?
            </p>
          </div>

          <div className="p-8">
            
            {!result && !isLoading ? (
              <div className="flex flex-col gap-6">
                <div className="relative">
                  <label htmlFor="name-input" className="block text-xmas-green font-bold mb-2 font-serif text-lg">
                    Írd be a neved:
                  </label>
                  <div className="relative">
                    <input
                      id="name-input"
                      type="text"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        setShowSuggestions(true);
                        setError(null);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Pl. Anya, Marci..."
                      className="w-full p-4 border-2 border-xmas-green/30 rounded-xl bg-white text-xmas-darkRed font-bold text-xl focus:outline-none focus:border-xmas-red focus:ring-2 focus:ring-xmas-gold transition-all placeholder:text-gray-300 placeholder:font-normal"
                      autoComplete="off"
                    />
                    
                    {/* Autocomplete Lista */}
                    {showSuggestions && inputValue && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                        {suggestions.map((name) => (
                          <button
                            key={name}
                            onClick={() => selectSuggestion(name)}
                            className="w-full text-left px-4 py-3 hover:bg-xmas-cream text-xmas-green font-serif border-b border-gray-100 last:border-0 transition-colors"
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {error && (
                    <div className="mt-3 text-xmas-red bg-red-50 p-3 rounded-lg border border-red-100 flex items-start gap-2">
                      <span className="text-sm font-semibold">{error}</span>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-4 font-serif italic">
                    Elérhető nevek: {VALID_NAMES.join(', ')}
                  </p>
                  <button
                    onClick={handleSearch}
                    disabled={!inputValue}
                    className="w-full bg-xmas-green hover:bg-[#0f4625] text-white font-display text-2xl py-3 px-6 rounded-xl shadow-lg transform transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border-2 border-xmas-gold"
                  >
                    Megnézem
                  </button>
                </div>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="relative mb-6">
                  <Gift className="text-xmas-red w-24 h-24 animate-bounce" />
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="text-xmas-gold w-8 h-8 animate-spin-slow" />
                  </div>
                </div>
                <h3 className="text-2xl font-display text-xmas-green animate-pulse">
                  Keresés a manók listájában...
                </h3>
              </div>
            ) : (
              <div className="text-center py-6 animate-fade-in-up">
                <div className="mb-6 flex justify-center">
                    <div className="bg-xmas-gold/20 p-6 rounded-full inline-block">
                        <Gift className="w-16 h-16 text-xmas-red" />
                    </div>
                </div>
                
                <h2 className="text-xl font-serif text-gray-600 mb-2">
                  Szia <span className="text-xmas-green font-bold">{inputValue}</span>!
                </h2>
                <p className="text-lg font-serif italic text-gray-500 mb-6">
                  Az idei karácsonyi húzottad nem más, mint:
                </p>
                
                <div className="bg-white border-2 border-dashed border-xmas-red p-6 rounded-xl mb-8 transform transition-all hover:scale-105 shadow-inner">
                  <span className="block text-4xl font-display text-xmas-darkRed font-bold tracking-wider drop-shadow-sm">
                    {result}
                  </span>
                </div>

                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 mx-auto text-gray-500 hover:text-xmas-green transition-colors font-serif italic text-sm border-b border-transparent hover:border-xmas-green pb-1"
                >
                  <X size={16} />
                  Vissza a kezdőlapra
                </button>
              </div>
            )}
          </div>
          
          {/* Footer Decoration */}
          <div className="bg-xmas-green h-3 w-full border-t border-xmas-gold"></div>
        </div>
        
        <div className="text-center mt-8 text-xmas-cream/60 text-xs font-serif italic">
            Boldog Karácsonyt Kíván a Család! 🎄
        </div>

      </div>
    </div>
  );
};

export default App;