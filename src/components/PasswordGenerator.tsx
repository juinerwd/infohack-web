import React, { useMemo, useState } from "react";

type Props = {
  initialLength?: number;
};

// Componente React (TypeScript) - Generador de contraseñas seguras
// Uso: import PasswordGenerator from './PasswordGenerator'
// <PasswordGenerator initialLength={16} />

export default function PasswordGenerator({ initialLength = 16 }: Props) {
  const [length, setLength] = useState<number>(initialLength);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [pronounceable, setPronounceable] = useState<boolean>(false);

  const AMBIGUOUS = "{}[]()\/\\'\"`~,;:.<>";

  const CHARSETS = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?/~`",
  } as const;

  const charset = useMemo(() => {
    let set = "";
    if (useLower) set += CHARSETS.lower;
    if (useUpper) set += CHARSETS.upper;
    if (useNumbers) set += CHARSETS.numbers;
    if (useSymbols) set += CHARSETS.symbols;
    if (excludeAmbiguous) {
      // remove ambiguous-looking characters
      set = set.split("").filter((c) => !"Il1O0|\/".includes(c)).join("");
    }
    return set;
  }, [useLower, useUpper, useNumbers, useSymbols, excludeAmbiguous]);

  function getEntropyBits(len: number, charsetSize: number) {
    if (charsetSize <= 0 || len <= 0) return 0;
    // Entropy (approx) = length * log2(charsetSize)
    return Number((len * Math.log2(charsetSize)).toFixed(2));
  }

  function strengthLabel(entropy: number) {
    if (entropy < 28) return { label: "Muy débil", color: "bg-red-500" };
    if (entropy < 36) return { label: "Débil", color: "bg-orange-500" };
    if (entropy < 60) return { label: "Media", color: "bg-yellow-400" };
    if (entropy < 80) return { label: "Fuerte", color: "bg-green-500" };
    return { label: "Muy fuerte", color: "bg-teal-600" };
  }

  function randomFromSet(set: string) {
    return set.charAt(Math.floor(Math.random() * set.length));
  }

  // Generador aleatorio
  function generateRandom(len: number) {
    if (!charset || charset.length === 0) return "";
    let pass = "";

    // Asegurar que al menos un caracter de cada categoría seleccionada esté presente
    const categories: string[] = [];
    if (useLower) categories.push(CHARSETS.lower);
    if (useUpper) categories.push(CHARSETS.upper);
    if (useNumbers) categories.push(CHARSETS.numbers);
    if (useSymbols) categories.push(CHARSETS.symbols);

    // shuffle helper
    function shuffle(str: string) {
      return str.split("").sort(() => 0.5 - Math.random()).join("");
    }

    // Fill guaranteed chars first
    let guaranteed = "";
    categories.forEach((cat) => {
      let c = randomFromSet(cat);
      if (excludeAmbiguous && "Il1O0|\/".includes(c)) {
        // try again up to a few times
        for (let i = 0; i < 8 && "Il1O0|\/".includes(c); i++) {
          c = randomFromSet(cat);
        }
      }
      guaranteed += c;
    });

    // Fill the rest
    for (let i = 0; i < Math.max(0, len - guaranteed.length); i++) {
      pass += randomFromSet(charset);
    }

    pass += guaranteed;
    pass = shuffle(pass);

    return pass;
  }

  // Generador de contraseña 'pronunciable' simple — NO es tan seguro como el aleatorio, pero puede ayudar a memorizar
  function generatePronounceable(len: number) {
    const vowels = "aeiouAEIOU";
    const consonants = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ".split("").filter(c => !"Il1O0|\/".includes(c)).join("");
    let pass = "";
    for (let i = 0; i < len; i++) {
      if (i % 2 === 0) {
        pass += consonants.charAt(Math.floor(Math.random() * consonants.length));
      } else {
        pass += vowels.charAt(Math.floor(Math.random() * vowels.length));
      }
    }
    // Inject numbers or symbols if the user wants them
    if (useNumbers && Math.random() > 0.5) pass = pass.substring(0, Math.max(1, Math.floor(pass.length/2))) + CHARSETS.numbers.charAt(Math.floor(Math.random()*CHARSETS.numbers.length)) + pass.substring(Math.max(1, Math.floor(pass.length/2)));
    if (useSymbols && Math.random() > 0.7) pass = pass.substring(0, Math.max(1, Math.floor(pass.length/3))) + CHARSETS.symbols.charAt(Math.floor(Math.random()*CHARSETS.symbols.length)) + pass.substring(Math.max(1, Math.floor(pass.length/3)));
    return pass.substring(0, len);
  }

  function handleGenerate() {
    setCopied(false);
    let p = pronounceable ? generatePronounceable(length) : generateRandom(length);
    // If charset omitted categories and resulted empty, fallback
    if (!p) p = generateRandom(length);
    setPassword(p);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("No se pudo copiar:", err);
    }
  }

  const entropy = useMemo(() => getEntropyBits(length, new Set(charset.split("")).size), [length, charset]);
  const strength = strengthLabel(entropy);

  return (
    <div className="max-w-lg w-full mx-auto bg-white/80 dark:bg-slate-800/80 shadow-lg rounded-2xl p-6 ring-1 ring-slate-200 dark:ring-slate-700">
      <h3 className="text-xl font-semibold mb-2">Generador de contraseñas seguras</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Elige las opciones y pulsa <span className="font-medium">Generar</span>. Puedes copiar la contraseña al portapapeles.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Contraseña generada</label>
        <div className="flex items-center gap-2">
          <input
            readOnly
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Pulsa Generar"
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 bg-slate-50 dark:bg-slate-900"
          />
          <button onClick={() => setShowPassword(s => !s)} className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm">{showPassword ? 'Ocultar' : 'Mostrar'}</button>
          <button onClick={handleCopy} disabled={!password} className="px-3 py-2 rounded-lg bg-green-500 text-white text-sm disabled:opacity-50">{copied ? 'Copiado' : 'Copiar'}</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Longitud: <span className="font-semibold">{length}</span></label>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div className="col-span-1 flex items-center gap-2">
          <input id="lower" type="checkbox" checked={useLower} onChange={() => setUseLower(s => !s)} className="w-4 h-4" />
          <label htmlFor="lower" className="text-sm">Minúsculas</label>
        </div>

        <div className="col-span-1 flex items-center gap-2">
          <input id="upper" type="checkbox" checked={useUpper} onChange={() => setUseUpper(s => !s)} className="w-4 h-4" />
          <label htmlFor="upper" className="text-sm">Mayúsculas</label>
        </div>

        <div className="col-span-1 flex items-center gap-2">
          <input id="numbers" type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(s => !s)} className="w-4 h-4" />
          <label htmlFor="numbers" className="text-sm">Números</label>
        </div>

        <div className="col-span-1 flex items-center gap-2">
          <input id="symbols" type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(s => !s)} className="w-4 h-4" />
          <label htmlFor="symbols" className="text-sm">Símbolos</label>
        </div>

        <div className="col-span-1 flex items-center gap-2">
          <input id="ambig" type="checkbox" checked={excludeAmbiguous} onChange={() => setExcludeAmbiguous(s => !s)} className="w-4 h-4" />
          <label htmlFor="ambig" className="text-sm">Excluir caracteres ambiguos</label>
        </div>

        <div className="col-span-1 flex items-center gap-2">
          <input id="pron" type="checkbox" checked={pronounceable} onChange={() => setPronounceable(s => !s)} className="w-4 h-4" />
          <label htmlFor="pron" className="text-sm">Pronunciable (más fácil de recordar)</label>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="text-xs text-slate-600 dark:text-slate-300 mb-1">Fortaleza</div>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className={`${strength.color} h-3 rounded-full`} style={{ width: `${Math.min(100, (entropy / 100) * 100)}%` }} />
          </div>
          <div className="text-xs mt-1 text-slate-600 dark:text-slate-300">{strength.label} — {entropy} bits de entropía aproximada</div>
        </div>
        <div className="w-48 text-right">
          <button onClick={handleGenerate} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Generar</button>
        </div>
      </div>

      <div className="text-sm text-slate-600 dark:text-slate-300">
        <strong>Consejo:</strong> una contraseña única y larga es la mejor defensa. Considera usar un gestor de contraseñas para almacenar tus claves de forma segura.
      </div>
    </div>
  );
}
