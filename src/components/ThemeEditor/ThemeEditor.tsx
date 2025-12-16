import { useState, useEffect, useRef, useCallback } from 'react';
import './ThemeEditor.css';

type ThemeMode = 'dark' | 'light';

interface ThemeColor {
    name: string;
    variable: string;
    darkDefault: string;
    lightDefault: string;
}

const THEME_COLORS: ThemeColor[] = [
    // Primary Colors
    { name: 'Primary', variable: '--color-primary', darkDefault: '#6366f1', lightDefault: '#6366f1' },
    { name: 'Primary Hover', variable: '--color-primary-hover', darkDefault: '#4f46e5', lightDefault: '#4f46e5' },
    { name: 'Primary Light', variable: '--color-primary-light', darkDefault: '#818cf8', lightDefault: '#818cf8' },
    { name: 'Primary Dark', variable: '--color-primary-dark', darkDefault: '#4338ca', lightDefault: '#4338ca' },

    // Secondary Colors
    { name: 'Secondary', variable: '--color-secondary', darkDefault: '#8b5cf6', lightDefault: '#8b5cf6' },
    { name: 'Secondary Hover', variable: '--color-secondary-hover', darkDefault: '#7c3aed', lightDefault: '#7c3aed' },

    // Accent Colors
    { name: 'Accent', variable: '--color-accent', darkDefault: '#06b6d4', lightDefault: '#06b6d4' },
    { name: 'Accent Hover', variable: '--color-accent-hover', darkDefault: '#0891b2', lightDefault: '#0891b2' },

    // Background Colors
    { name: 'Background Primary', variable: '--color-bg-primary', darkDefault: '#0f0f23', lightDefault: '#ffffff' },
    { name: 'Background Secondary', variable: '--color-bg-secondary', darkDefault: '#1a1a2e', lightDefault: '#f8fafc' },
    { name: 'Background Tertiary', variable: '--color-bg-tertiary', darkDefault: '#252542', lightDefault: '#f1f5f9' },

    // Text Colors
    { name: 'Text Primary', variable: '--color-text-primary', darkDefault: '#ffffff', lightDefault: '#1e293b' },
    { name: 'Text Secondary', variable: '--color-text-secondary', darkDefault: '#a0a0b0', lightDefault: '#64748b' },
    { name: 'Text Muted', variable: '--color-text-muted', darkDefault: '#6b6b80', lightDefault: '#94a3b8' },

    // Status Colors
    { name: 'Success', variable: '--color-success', darkDefault: '#10b981', lightDefault: '#10b981' },
    { name: 'Warning', variable: '--color-warning', darkDefault: '#f59e0b', lightDefault: '#f59e0b' },
    { name: 'Error', variable: '--color-error', darkDefault: '#ef4444', lightDefault: '#ef4444' },
    { name: 'Info', variable: '--color-info', darkDefault: '#3b82f6', lightDefault: '#3b82f6' },
];

const MODE_STORAGE_KEY = 'storybook-theme-mode';
const DARK_COLORS_KEY = 'theme-dark-colors';
const LIGHT_COLORS_KEY = 'theme-light-colors';
const API_URL = 'http://localhost:3001/api/theme';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

// ============================================
// RENK MANİPÜLASYON FONKSİYONLARI
// ============================================

// Hex'i RGB'ye çevir
function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

// RGB'yi Hex'e çevir
function rgbToHex(r: number, g: number, b: number): string {
    const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
    return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b).toString(16).padStart(2, '0')}`;
}

// Rengi aydınlat (light varyant için)
function lightenColor(hex: string, percent: number): string {
    const { r, g, b } = hexToRgb(hex);
    const amount = 255 * (percent / 100);
    return rgbToHex(r + amount, g + amount, b + amount);
}

// Rengi koyulaştır (dark/hover varyant için)
function darkenColor(hex: string, percent: number): string {
    const { r, g, b } = hexToRgb(hex);
    const factor = 1 - percent / 100;
    return rgbToHex(r * factor, g * factor, b * factor);
}

// Ana renkten varyantlar oluştur
interface ColorVariants {
    base: string;
    hover: string;
    light: string;
    dark: string;
}

function generateColorVariants(baseColor: string): ColorVariants {
    return {
        base: baseColor,
        hover: darkenColor(baseColor, 15),  // %15 koyu
        light: lightenColor(baseColor, 20), // %20 açık
        dark: darkenColor(baseColor, 25),   // %25 koyu
    };
}

// Renk ters hesaplama - varyanttan base'e
function calculateBaseFromVariant(color: string, type: 'hover' | 'light' | 'dark'): string {
    const { r, g, b } = hexToRgb(color);

    if (type === 'hover') {
        // Hover %15 koyu, tersini al
        const factor = 1 / (1 - 0.15);
        return rgbToHex(r * factor, g * factor, b * factor);
    } else if (type === 'light') {
        // Light %20 açık, tersini al  
        const amount = 255 * 0.20;
        return rgbToHex(r - amount, g - amount, b - amount);
    } else {
        // Dark %25 koyu, tersini al
        const factor = 1 / (1 - 0.25);
        return rgbToHex(r * factor, g * factor, b * factor);
    }
}

// Renk grupları - herhangi birini değiştirince diğerleri güncellenir
interface ColorGroup {
    base: string;
    hover: string;
    light?: string;
    dark?: string;
}

const COLOR_GROUPS: ColorGroup[] = [
    { base: '--color-primary', hover: '--color-primary-hover', light: '--color-primary-light', dark: '--color-primary-dark' },
    { base: '--color-secondary', hover: '--color-secondary-hover' },
    { base: '--color-accent', hover: '--color-accent-hover' },
];

// Light tema için nötr beyaz tonları
const LIGHT_BG_PRESETS: Record<string, string> = {
    '--color-bg-primary': '#ffffff',
    '--color-bg-secondary': '#f8f9fa',
    '--color-bg-tertiary': '#e9ecef',
    '--color-bg-card': 'rgba(255, 255, 255, 0.95)',
};

// Text renkleri için koyu tonlar
const LIGHT_TEXT_PRESETS: Record<string, string> = {
    '--color-text-primary': '#1a1a2e',
    '--color-text-secondary': '#495057',
    '--color-text-muted': '#868e96',
};

export const ThemeEditor = () => {
    // Theme mode
    const [mode, setMode] = useState<ThemeMode>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(MODE_STORAGE_KEY);
            if (saved === 'light' || saved === 'dark') return saved;
        }
        return 'dark';
    });

    // Colors per mode
    const [darkColors, setDarkColors] = useState<Record<string, string>>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(DARK_COLORS_KEY);
            if (saved) return JSON.parse(saved);
        }
        return THEME_COLORS.reduce((acc, c) => ({ ...acc, [c.variable]: c.darkDefault }), {});
    });

    const [lightColors, setLightColors] = useState<Record<string, string>>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(LIGHT_COLORS_KEY);
            if (saved) return JSON.parse(saved);
        }
        return THEME_COLORS.reduce((acc, c) => ({ ...acc, [c.variable]: c.lightDefault }), {});
    });

    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
    const [autoSave, setAutoSave] = useState(true);
    const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Current colors based on mode
    const currentColors = mode === 'dark' ? darkColors : lightColors;
    const setCurrentColors = mode === 'dark' ? setDarkColors : setLightColors;

    // Apply theme mode to document (NO API call - just visual switch)
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem(MODE_STORAGE_KEY, mode);

        // Apply current mode's colors locally
        Object.entries(currentColors).forEach(([variable, value]) => {
            document.documentElement.style.setProperty(variable, value);
        });
    }, [mode, currentColors]);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem(DARK_COLORS_KEY, JSON.stringify(darkColors));
    }, [darkColors]);

    useEffect(() => {
        localStorage.setItem(LIGHT_COLORS_KEY, JSON.stringify(lightColors));
    }, [lightColors]);

    // Save BOTH themes to API (dark goes to :root, light goes to [data-theme="light"])
    const saveToApi = useCallback(async () => {
        setSaveStatus('saving');
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dark: darkColors,   // -> :root
                    light: lightColors  // -> [data-theme="light"]
                }),
            });

            if (response.ok) {
                setSaveStatus('saved');
                setTimeout(() => setSaveStatus('idle'), 2000);
            } else {
                setSaveStatus('error');
            }
        } catch {
            setSaveStatus('error');
        }
    }, [darkColors, lightColors]);

    // Track if colors actually changed (not just mode switch)
    const prevDarkRef = useRef(JSON.stringify(darkColors));
    const prevLightRef = useRef(JSON.stringify(lightColors));

    // Auto save ONLY when colors change (not on mode switch)
    useEffect(() => {
        const currentDark = JSON.stringify(darkColors);
        const currentLight = JSON.stringify(lightColors);

        // Only save if colors actually changed
        if (autoSave && (currentDark !== prevDarkRef.current || currentLight !== prevLightRef.current)) {
            prevDarkRef.current = currentDark;
            prevLightRef.current = currentLight;

            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
            saveTimeoutRef.current = setTimeout(saveToApi, 500);
        }
    }, [darkColors, lightColors, autoSave, saveToApi]);

    const handleColorChange = (variable: string, value: string) => {
        // Bu değişken bir renk grubuna ait mi?
        const group = COLOR_GROUPS.find(g =>
            g.base === variable ||
            g.hover === variable ||
            g.light === variable ||
            g.dark === variable
        );

        if (group) {
            // Hangi tip değişti?
            let baseColor: string;

            if (variable === group.base) {
                // Ana renk değişti
                baseColor = value;
            } else if (variable === group.hover) {
                // Hover değişti - base'i hesapla
                baseColor = calculateBaseFromVariant(value, 'hover');
            } else if (variable === group.light) {
                // Light değişti - base'i hesapla
                baseColor = calculateBaseFromVariant(value, 'light');
            } else {
                // Dark değişti - base'i hesapla
                baseColor = calculateBaseFromVariant(value, 'dark');
            }

            // Tüm varyantları oluştur
            const variants = generateColorVariants(baseColor);

            setCurrentColors(prev => {
                const updated = { ...prev };
                updated[group.base] = variants.base;
                updated[group.hover] = variants.hover;
                if (group.light) updated[group.light] = variants.light;
                if (group.dark) updated[group.dark] = variants.dark;
                return updated;
            });
        } else {
            // Normal renk değişikliği (background, text, status vb.)
            setCurrentColors(prev => ({ ...prev, [variable]: value }));
        }
    };

    // Light tema oluştur - beyaz tonlarında background, koyu text
    const generateLightFromDark = () => {
        const newLightColors: Record<string, string> = {};

        THEME_COLORS.forEach(color => {
            const darkValue = darkColors[color.variable] || color.darkDefault;

            // Background için preset beyaz tonları kullan
            if (LIGHT_BG_PRESETS[color.variable]) {
                newLightColors[color.variable] = LIGHT_BG_PRESETS[color.variable];
            }
            // Text için preset koyu tonları kullan
            else if (LIGHT_TEXT_PRESETS[color.variable]) {
                newLightColors[color.variable] = LIGHT_TEXT_PRESETS[color.variable];
            }
            // Diğer renkler (primary, secondary, accent, status) aynı kalsın
            else {
                newLightColors[color.variable] = darkValue;
            }
        });

        setLightColors(newLightColors);

        // Light moda geç
        if (mode !== 'light') {
            setMode('light');
        }
    };

    const handleReset = () => {
        if (mode === 'dark') {
            setDarkColors(THEME_COLORS.reduce((acc, c) => ({ ...acc, [c.variable]: c.darkDefault }), {}));
        } else {
            setLightColors(THEME_COLORS.reduce((acc, c) => ({ ...acc, [c.variable]: c.lightDefault }), {}));
        }
    };

    const handleExport = () => {
        const darkCss = Object.entries(darkColors)
            .map(([v, val]) => `  ${v}: ${val};`)
            .join('\n');
        const lightCss = Object.entries(lightColors)
            .map(([v, val]) => `  ${v}: ${val};`)
            .join('\n');

        const fullCss = `:root {\n${darkCss}\n}\n\n[data-theme="light"] {\n${lightCss}\n}`;
        navigator.clipboard.writeText(fullCss);
        alert('Her iki tema CSS kopyalandı!');
    };

    const groupedColors = {
        'Primary': THEME_COLORS.filter(c => c.variable.includes('primary') && !c.variable.includes('bg') && !c.variable.includes('text')),
        'Secondary': THEME_COLORS.filter(c => c.variable.includes('secondary') && !c.variable.includes('bg')),
        'Accent': THEME_COLORS.filter(c => c.variable.includes('accent') && !c.variable.includes('text')),
        'Background': THEME_COLORS.filter(c => c.variable.includes('bg')),
        'Text': THEME_COLORS.filter(c => c.variable.includes('text')),
        'Status': THEME_COLORS.filter(c => ['success', 'warning', 'error', 'info'].some(s => c.variable.includes(s))),
    };

    const statusText = {
        idle: '',
        saving: '💾',
        saved: '✅',
        error: '⚠️',
    };

    return (
        <div className="theme-editor">
            <div className="theme-editor__header">
                <div className="theme-editor__title-row">
                    <h1 className="theme-editor__title">🎨 Tema Düzenleyici</h1>

                    <div className="theme-editor__mode-buttons">
                        <button
                            className={`theme-editor__mode-btn ${mode === 'dark' ? 'theme-editor__mode-btn--active' : ''}`}
                            onClick={() => setMode('dark')}
                        >
                            🌙 Dark
                        </button>
                        <button
                            className={`theme-editor__mode-btn ${mode === 'light' ? 'theme-editor__mode-btn--active' : ''}`}
                            onClick={() => setMode('light')}
                        >
                            ☀️ Light
                        </button>
                    </div>
                </div>

                <div className="theme-editor__toolbar">
                    <button className="theme-editor__generate-btn" onClick={generateLightFromDark}>
                        ✨ Dark'tan Light Oluştur
                    </button>
                    <span className="theme-editor__status">{statusText[saveStatus]}</span>
                    <label className="theme-editor__checkbox">
                        <input type="checkbox" checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />
                        Auto Save
                    </label>
                </div>
            </div>

            {Object.entries(groupedColors).map(([section, sectionColors]) => (
                <div key={section} className="theme-editor__section">
                    <h2 className="theme-editor__section-title">{section}</h2>
                    <div className="theme-editor__grid">
                        {sectionColors.map(color => (
                            <div key={color.variable} className="theme-editor__item">
                                <input
                                    type="color"
                                    className="theme-editor__color-input"
                                    value={currentColors[color.variable] || (mode === 'dark' ? color.darkDefault : color.lightDefault)}
                                    onChange={(e) => handleColorChange(color.variable, e.target.value)}
                                />
                                <div className="theme-editor__label">
                                    <span className="theme-editor__label-name">{color.name}</span>
                                    <span className="theme-editor__label-var">{color.variable}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="theme-editor__actions">
                <button className="theme-editor__reset-btn" onClick={handleReset}>
                    {mode === 'dark' ? 'Dark' : 'Light'} Sıfırla
                </button>
                <button className="theme-editor__export-btn" onClick={handleExport}>
                    Her İki Temayı Kopyala
                </button>
            </div>
        </div>
    );
};

export default ThemeEditor;
