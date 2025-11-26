// A megadott szabályok alapján generált fix lista.
// Szabályok:
// - Saját magad nem.
// - Marci <> Bogi tiltva.
// - Balázs <> Zsani tiltva.
// - Mindenki csak egyszer szerepel.

// Valid Permutáció (Lánc):
// Anya -> Bence
// Bence -> Marci
// Marci -> Zsani (Valid)
// Zsani -> Pisti (Valid)
// Pisti -> Balázs
// Balázs -> Bogi (Valid)
// Bogi -> Anya (Valid)

export const VALID_NAMES = ['Anya', 'Pisti', 'Marci', 'Balázs', 'Bence', 'Zsani', 'Bogi'];

// A kulcsok kisbetűsítve a könnyebb keresés érdekében
export const PAIRINGS: Record<string, string> = {
  "anya": "Bence",
  "bence": "Marci",
  "marci": "Zsani",
  "zsani": "Pisti",
  "pisti": "Balázs",
  "balázs": "Bogi",
  "bogi": "Anya"
};

// Segédfüggvény az ékezetek kezelésére (opcionális, de hasznos a beírásnál)
export const normalizeName = (name: string): string => {
  return name.trim().toLowerCase();
};
