'use client';

/**
 * Website Theme Customizer
 * 
 * Provides 50+ curated colour palettes. When a palette is selected,
 * it writes the --primary and --accent CSS variables directly to the
 * <html> element so the change is instant and site-wide.
 * 
 * The chosen theme is persisted in localStorage so it survives page reload.
 */

import { useState, useEffect, useCallback } from 'react';
import { Check, Palette, RotateCcw, Sparkles, Eye, Sun, Moon, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// ─── Colour Palette Definition ────────────────────────────────────────────────

export interface ColourPalette {
    id: string;
    name: string;
    category: string;
    primary: string;   // HSL string e.g. "355 85% 40%"
    primaryDark: string;
    accent: string;
    accentName: string;
    preview: string;   // hex for swatch display
    accentHex: string;
    description: string;
}

const COLOUR_PALETTES: ColourPalette[] = [
    // ── Reds ──────────────────────────────────────────────────────────────────
    { id: 'aries-red', category: 'Red', name: 'Aries Red ★', primary: '355 85% 40%', primaryDark: '355 80% 58%', accent: '38 95% 50%', accentName: 'Amber', preview: '#C4102D', accentHex: '#F59E0B', description: 'Original Aries PhysioCare brand colour' },
    { id: 'crimson', category: 'Red', name: 'Crimson', primary: '348 83% 38%', primaryDark: '348 78% 55%', accent: '45 93% 47%', accentName: 'Gold', preview: '#B91C3E', accentHex: '#EAB308', description: 'Deep crimson with gold accent' },
    { id: 'rose-red', category: 'Red', name: 'Rose Red', primary: '0 72% 45%', primaryDark: '0 68% 60%', accent: '25 90% 52%', accentName: 'Orange', preview: '#C73232', accentHex: '#F97316', description: 'Classic rose red tone' },
    { id: 'ruby', category: 'Red', name: 'Ruby', primary: '345 90% 35%', primaryDark: '345 85% 52%', accent: '300 60% 55%', accentName: 'Lavender', preview: '#A80D34', accentHex: '#C084FC', description: 'Gem-inspired deep ruby' },
    { id: 'scarlet', category: 'Red', name: 'Scarlet', primary: '5 85% 46%', primaryDark: '5 80% 62%', accent: '55 97% 53%', accentName: 'Yellow', preview: '#D42B14', accentHex: '#FDE047', description: 'Vivid scarlet energy' },
    { id: 'burgundy', category: 'Red', name: 'Burgundy', primary: '340 65% 28%', primaryDark: '340 60% 45%', accent: '38 85% 52%', accentName: 'Warm Gold', preview: '#7B2040', accentHex: '#F59E0B', description: 'Rich wine burgundy' },
    { id: 'carmine', category: 'Red', name: 'Carmine', primary: '352 88% 36%', primaryDark: '352 83% 53%', accent: '165 60% 45%', accentName: 'Teal', preview: '#A8002C', accentHex: '#14B8A6', description: 'Intense carmine with teal' },

    // ── Blues ─────────────────────────────────────────────────────────────────
    { id: 'azure-blue', category: 'Blue', name: 'Azure Blue', primary: '210 90% 42%', primaryDark: '210 85% 60%', accent: '38 95% 50%', accentName: 'Amber', preview: '#0F6BB5', accentHex: '#F59E0B', description: 'Professional azure blue' },
    { id: 'royal-blue', category: 'Blue', name: 'Royal Blue', primary: '225 73% 44%', primaryDark: '225 70% 62%', accent: '45 93% 47%', accentName: 'Gold', preview: '#2244B0', accentHex: '#EAB308', description: 'Regal royal blue' },
    { id: 'navy', category: 'Blue', name: 'Navy', primary: '222 72% 30%', primaryDark: '222 68% 48%', accent: '38 90% 52%', accentName: 'Warm Gold', preview: '#1A317A', accentHex: '#F59E0B', description: 'Deep navy authority' },
    { id: 'cobalt', category: 'Blue', name: 'Cobalt', primary: '218 85% 40%', primaryDark: '218 80% 58%', accent: '55 97% 53%', accentName: 'Yellow', preview: '#0F4FA8', accentHex: '#FDE047', description: 'Bold cobalt blue' },
    { id: 'sapphire', category: 'Blue', name: 'Sapphire', primary: '231 80% 42%', primaryDark: '231 75% 60%', accent: '38 95% 50%', accentName: 'Amber', preview: '#1A2FBF', accentHex: '#F59E0B', description: 'Precious sapphire' },
    { id: 'sky-blue', category: 'Blue', name: 'Sky Blue', primary: '199 89% 42%', primaryDark: '199 85% 58%', accent: '38 90% 52%', accentName: 'Golden', preview: '#0891B2', accentHex: '#F59E0B', description: 'Clear sky blue' },
    { id: 'indigo', category: 'Blue', name: 'Indigo', primary: '244 75% 45%', primaryDark: '244 70% 62%', accent: '38 95% 50%', accentName: 'Amber', preview: '#3730A3', accentHex: '#F59E0B', description: 'Deep indigo violet' },

    // ── Greens ────────────────────────────────────────────────────────────────
    { id: 'emerald', category: 'Green', name: 'Emerald', primary: '158 78% 35%', primaryDark: '158 72% 52%', accent: '38 95% 50%', accentName: 'Amber', preview: '#059669', accentHex: '#F59E0B', description: 'Lush emerald green' },
    { id: 'forest-green', category: 'Green', name: 'Forest Green', primary: '140 60% 30%', primaryDark: '140 55% 48%', accent: '45 93% 47%', accentName: 'Gold', preview: '#166534', accentHex: '#EAB308', description: 'Deep forest green' },
    { id: 'jade', category: 'Green', name: 'Jade', primary: '160 65% 35%', primaryDark: '160 60% 52%', accent: '38 90% 52%', accentName: 'Warm Gold', preview: '#1A7A52', accentHex: '#F59E0B', description: 'Serene jade green' },
    { id: 'teal-classic', category: 'Green', name: 'Teal Classic', primary: '175 80% 32%', primaryDark: '175 75% 50%', accent: '38 95% 50%', accentName: 'Amber', preview: '#0D7B6B', accentHex: '#F59E0B', description: 'Healthcare classic teal' },
    { id: 'olive', category: 'Green', name: 'Olive', primary: '85 50% 35%', primaryDark: '85 45% 52%', accent: '38 95% 50%', accentName: 'Amber', preview: '#4D7C0F', accentHex: '#F59E0B', description: 'Earthy olive tone' },
    { id: 'mint', category: 'Green', name: 'Mint Fresh', primary: '168 68% 38%', primaryDark: '168 62% 55%', accent: '300 55% 52%', accentName: 'Lavender', preview: '#0F9B78', accentHex: '#C084FC', description: 'Fresh mint green' },

    // ── Purples ───────────────────────────────────────────────────────────────
    { id: 'purple-royale', category: 'Purple', name: 'Purple Royale', primary: '270 75% 44%', primaryDark: '270 70% 62%', accent: '38 95% 50%', accentName: 'Amber', preview: '#7E22CE', accentHex: '#F59E0B', description: 'Regal purple royale' },
    { id: 'violet', category: 'Purple', name: 'Violet', primary: '258 80% 48%', primaryDark: '258 75% 65%', accent: '45 93% 47%', accentName: 'Gold', preview: '#7C3AED', accentHex: '#EAB308', description: 'Vivid violet' },
    { id: 'plum', category: 'Purple', name: 'Plum', primary: '292 55% 38%', primaryDark: '292 50% 55%', accent: '38 90% 52%', accentName: 'Warm Gold', preview: '#6B2D8A', accentHex: '#F59E0B', description: 'Rich plum purple' },
    { id: 'mauve', category: 'Purple', name: 'Mauve', primary: '285 40% 48%', primaryDark: '285 35% 65%', accent: '38 95% 50%', accentName: 'Amber', preview: '#8B5CF6', accentHex: '#F59E0B', description: 'Soft mauve purple' },
    { id: 'amethyst', category: 'Purple', name: 'Amethyst', primary: '280 70% 42%', primaryDark: '280 65% 60%', accent: '45 93% 47%', accentName: 'Gold', preview: '#7B2FBE', accentHex: '#EAB308', description: 'Gemstone amethyst' },

    // ── Oranges ───────────────────────────────────────────────────────────────
    { id: 'burnt-orange', category: 'Orange', name: 'Burnt Orange', primary: '18 85% 43%', primaryDark: '18 80% 60%', accent: '210 80% 50%', accentName: 'Steel Blue', preview: '#C2410C', accentHex: '#3B82F6', description: 'Bold burnt orange' },
    { id: 'amber', category: 'Orange', name: 'Amber', primary: '35 90% 42%', primaryDark: '35 85% 58%', accent: '210 80% 50%', accentName: 'Blue', preview: '#B45309', accentHex: '#3B82F6', description: 'Warm amber tone' },
    { id: 'tangerine', category: 'Orange', name: 'Tangerine', primary: '22 88% 46%', primaryDark: '22 83% 63%', accent: '210 75% 45%', accentName: 'Navy', preview: '#D35400', accentHex: '#1D4ED8', description: 'Vibrant tangerine' },
    { id: 'saffron', category: 'Orange', name: 'Saffron', primary: '40 88% 42%', primaryDark: '40 83% 58%', accent: '210 80% 50%', accentName: 'Blue', preview: '#B07D12', accentHex: '#3B82F6', description: 'Rich Indian saffron' },

    // ── Pinks ─────────────────────────────────────────────────────────────────
    { id: 'hot-pink', category: 'Pink', name: 'Hot Pink', primary: '330 85% 45%', primaryDark: '330 80% 62%', accent: '200 80% 50%', accentName: 'Sky Blue', preview: '#DB2777', accentHex: '#0EA5E9', description: 'Energetic hot pink' },
    { id: 'rose', category: 'Pink', name: 'Rose', primary: '345 72% 48%', primaryDark: '345 68% 65%', accent: '38 95% 50%', accentName: 'Amber', preview: '#E11D75', accentHex: '#F59E0B', description: 'Elegant rose pink' },
    { id: 'fuchsia', category: 'Pink', name: 'Fuchsia', primary: '300 78% 45%', primaryDark: '300 73% 62%', accent: '45 93% 47%', accentName: 'Gold', preview: '#A21CAF', accentHex: '#EAB308', description: 'Vivid fuchsia magenta' },
    { id: 'blush', category: 'Pink', name: 'Blush', primary: '350 65% 50%', primaryDark: '350 60% 67%', accent: '38 90% 52%', accentName: 'Warm Gold', preview: '#E4677A', accentHex: '#F59E0B', description: 'Soft blush pink' },

    // ── Teals ─────────────────────────────────────────────────────────────────
    { id: 'teal-ocean', category: 'Teal', name: 'Ocean Teal', primary: '188 85% 32%', primaryDark: '188 80% 50%', accent: '38 95% 50%', accentName: 'Amber', preview: '#0C7895', accentHex: '#F59E0B', description: 'Deep ocean teal' },
    { id: 'cyan', category: 'Teal', name: 'Cyan', primary: '190 90% 36%', primaryDark: '190 85% 54%', accent: '38 90% 52%', accentName: 'Warm Gold', preview: '#0891B2', accentHex: '#F59E0B', description: 'Bright cyan blue' },
    { id: 'peacock', category: 'Teal', name: 'Peacock', primary: '182 78% 34%', primaryDark: '182 73% 52%', accent: '45 93% 47%', accentName: 'Gold', preview: '#0D7F84', accentHex: '#EAB308', description: 'Rich peacock blue-green' },

    // ── Browns / Earth ────────────────────────────────────────────────────────
    { id: 'terracotta', category: 'Earth', name: 'Terracotta', primary: '15 60% 40%', primaryDark: '15 55% 57%', accent: '45 80% 48%', accentName: 'Gold', preview: '#A0522D', accentHex: '#EAB308', description: 'Warm terracotta earth' },
    { id: 'sienna', category: 'Earth', name: 'Sienna', primary: '22 65% 38%', primaryDark: '22 60% 55%', accent: '38 85% 52%', accentName: 'Amber', preview: '#A0400F', accentHex: '#F59E0B', description: 'Rich sienna brown' },
    { id: 'chocolate', category: 'Earth', name: 'Dark Chocolate', primary: '25 55% 28%', primaryDark: '25 50% 45%', accent: '38 90% 52%', accentName: 'Warm Gold', preview: '#6B3921', accentHex: '#F59E0B', description: 'Luxurious dark chocolate' },

    // ── Neutrals / Premium ────────────────────────────────────────────────────
    { id: 'slate', category: 'Neutral', name: 'Slate', primary: '215 25% 30%', primaryDark: '215 20% 50%', accent: '38 95% 50%', accentName: 'Amber', preview: '#393F52', accentHex: '#F59E0B', description: 'Professional slate grey' },
    { id: 'charcoal', category: 'Neutral', name: 'Charcoal', primary: '220 15% 25%', primaryDark: '220 12% 42%', accent: '45 93% 47%', accentName: 'Gold', preview: '#303540', accentHex: '#EAB308', description: 'Elegant charcoal' },
    { id: 'midnight', category: 'Neutral', name: 'Midnight', primary: '230 40% 22%', primaryDark: '230 35% 40%', accent: '38 95% 50%', accentName: 'Amber', preview: '#1E2342', accentHex: '#F59E0B', description: 'Deep midnight blue-black' },
    { id: 'graphite', category: 'Neutral', name: 'Graphite', primary: '210 12% 28%', primaryDark: '210 10% 46%', accent: '355 85% 40%', accentName: 'Aries Red', preview: '#374151', accentHex: '#C4102D', description: 'Modern graphite' },

    // ── Premium / Luxury ──────────────────────────────────────────────────────
    { id: 'gold-luxury', category: 'Luxury', name: 'Gold Luxury', primary: '42 80% 38%', primaryDark: '42 75% 55%', accent: '355 85% 40%', accentName: 'Red', preview: '#92650A', accentHex: '#C4102D', description: 'Premium gold luxury finish' },
    { id: 'rose-gold', category: 'Luxury', name: 'Rose Gold', primary: '12 60% 52%', primaryDark: '12 55% 68%', accent: '42 80% 38%', accentName: 'Gold', preview: '#C9716E', accentHex: '#92650A', description: 'Fashionable rose gold' },
    { id: 'copper', category: 'Luxury', name: 'Copper', primary: '18 68% 44%', primaryDark: '18 63% 60%', accent: '210 75% 45%', accentName: 'Blue', preview: '#B55A2A', accentHex: '#1D4ED8', description: 'Warm copper metal' },
    { id: 'platinum', category: 'Luxury', name: 'Platinum', primary: '210 20% 40%', primaryDark: '210 18% 60%', accent: '42 80% 38%', accentName: 'Gold', preview: '#54677A', accentHex: '#92650A', description: 'Sleek platinum silver' },

    // ── Healthcare Specific ───────────────────────────────────────────────────
    { id: 'medical-blue', category: 'Healthcare', name: 'Medical Blue', primary: '204 75% 40%', primaryDark: '204 70% 58%', accent: '142 65% 45%', accentName: 'Green', preview: '#1A7AAF', accentHex: '#16A34A', description: 'Clinical medical blue' },
    { id: 'health-green', category: 'Healthcare', name: 'Health Green', primary: '145 72% 34%', primaryDark: '145 67% 52%', accent: '38 90% 52%', accentName: 'Warm Gold', preview: '#15803D', accentHex: '#F59E0B', description: 'Vitality health green' },
    { id: 'care-purple', category: 'Healthcare', name: 'Care Purple', primary: '265 72% 42%', primaryDark: '265 67% 60%', accent: '38 95% 50%', accentName: 'Amber', preview: '#7E22CE', accentHex: '#F59E0B', description: 'Caring purple wellness' },
    { id: 'trust-teal', category: 'Healthcare', name: 'Trust Teal', primary: '180 70% 34%', primaryDark: '180 65% 52%', accent: '38 95% 50%', accentName: 'Amber', preview: '#0D7377', accentHex: '#F59E0B', description: 'Trustworthy teal healthcare' },
    { id: 'calm-blue', category: 'Healthcare', name: 'Calm Blue', primary: '207 82% 44%', primaryDark: '207 77% 62%', accent: '142 65% 45%', accentName: 'Green', preview: '#1269A3', accentHex: '#16A34A', description: 'Calming patient-facing blue' },
];

const CATEGORIES = ['All', ...Array.from(new Set(COLOUR_PALETTES.map(p => p.category)))];

const STORAGE_KEY = 'aries_website_theme';

// ─── Colour Application Helper ───────────────────────────────────────────────

function applyTheme(palette: ColourPalette) {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');

    root.style.setProperty('--primary', isDark ? palette.primaryDark : palette.primary);
    root.style.setProperty('--secondary', palette.primary.replace(/(\d+)%$/, m => `${Math.min(100, parseInt(m) + 55)}%`).replace(/(\d+) (\d+)%/, (_, h, s) => `${h} ${Math.max(5, parseInt(s) - 60)}%`));
    root.style.setProperty('--ring', isDark ? palette.primaryDark : palette.primary);
    root.style.setProperty('--accent', palette.accent);
    root.style.setProperty('--border', `${palette.primary.split(' ')[0]} 15% 90%`);
    root.style.setProperty('--sidebar-primary', isDark ? palette.primaryDark : palette.primary);
    root.style.setProperty('--sidebar-ring', isDark ? palette.primaryDark : palette.primary);
    root.style.setProperty('--chart-1', isDark ? palette.primaryDark : palette.primary);
    root.style.setProperty('--chart-2', palette.accent);

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: palette.id }));
}

function resetTheme() {
    const root = document.documentElement;
    // Remove inline overrides — CSS file defaults take over
    const vars = ['--primary', '--secondary', '--ring', '--accent', '--border', '--sidebar-primary', '--sidebar-ring', '--chart-1', '--chart-2'];
    vars.forEach(v => root.style.removeProperty(v));
    localStorage.removeItem(STORAGE_KEY);
}

// ─── Theme Customizer Component ───────────────────────────────────────────────

export default function WebsiteThemePage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedId, setSelectedId] = useState<string>('aries-red');
    const [searchQ, setSearchQ] = useState('');
    const { toast } = useToast();

    // Load persisted theme on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const { id } = JSON.parse(saved);
                const palette = COLOUR_PALETTES.find(p => p.id === id);
                if (palette) {
                    setSelectedId(id);
                    // Re-apply on mount (handles page refresh)
                    applyTheme(palette);
                }
            }
        } catch (_) { }
    }, []);

    const filtered = COLOUR_PALETTES.filter(p => {
        const matchCat = activeCategory === 'All' || p.category === activeCategory;
        const matchSearch = searchQ === '' || p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.description.toLowerCase().includes(searchQ.toLowerCase());
        return matchCat && matchSearch;
    });

    const handleSelect = useCallback((palette: ColourPalette) => {
        setSelectedId(palette.id);
        applyTheme(palette);
        toast({
            title: `✅ Theme applied: ${palette.name}`,
            description: `${palette.description}. Primary + ${palette.accentName} accent active.`,
        });
    }, [toast]);

    const handleReset = () => {
        resetTheme();
        setSelectedId('aries-red');
        toast({ title: '🔄 Theme reset', description: 'Reverted to Aries Red default theme.' });
    };

    const handleCopyCSS = () => {
        const palette = COLOUR_PALETTES.find(p => p.id === selectedId);
        if (!palette) return;
        const css = `/* ${palette.name} Theme */\n--primary: ${palette.primary};\n--accent: ${palette.accent};`;
        navigator.clipboard.writeText(css);
        toast({ title: '📋 CSS Copied', description: 'Paste into globals.css to make permanent.' });
    };

    const selectedPalette = COLOUR_PALETTES.find(p => p.id === selectedId);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* ── Page Header ───────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Palette className="w-5 h-5 text-primary" />
                        <h1 className="text-3xl font-bold font-headline">Website Theme</h1>
                        <Badge variant="secondary" className="ml-2">
                            {COLOUR_PALETTES.length} Palettes
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">
                        Select a colour palette. Changes apply instantly site-wide and persist across sessions.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCopyCSS} className="font-semibold gap-2">
                        <Copy className="w-4 h-4" /> Copy CSS
                    </Button>
                    <Button variant="outline" onClick={handleReset} className="font-semibold gap-2 text-muted-foreground">
                        <RotateCcw className="w-4 h-4" /> Reset Default
                    </Button>
                </div>
            </div>

            {/* ── Active Theme Preview Card ──────────────────────────── */}
            {selectedPalette && (
                <div className="relative overflow-hidden rounded-2xl border shadow-xl" style={{ background: `linear-gradient(135deg, hsl(${selectedPalette.primary}) 0%, hsl(${selectedPalette.primary} / 0.7) 100%)` }}>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
                    <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl shadow-lg flex-shrink-0" style={{ background: selectedPalette.preview }} />
                                <div className="w-12 h-12 rounded-xl shadow-lg flex-shrink-0" style={{ background: selectedPalette.accentHex }} />
                                <div>
                                    <p className="text-white font-bold text-xl font-headline">{selectedPalette.name}</p>
                                    <p className="text-white/70 text-sm">{selectedPalette.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="bg-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                                <span className="text-white/60 text-xs block">Primary</span>
                                <span className="font-mono font-bold">{selectedPalette.preview}</span>
                            </div>
                            <div className="bg-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                                <span className="text-white/60 text-xs block">Accent ({selectedPalette.accentName})</span>
                                <span className="font-mono font-bold">{selectedPalette.accentHex}</span>
                            </div>
                            <div className="bg-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
                                <span className="text-white/60 text-xs block">HSL</span>
                                <span className="font-mono font-bold text-xs">{selectedPalette.primary}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Filters ───────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-wrap gap-2 flex-1">
                    {CATEGORIES.map(cat => (
                        <Button
                            key={cat}
                            size="sm"
                            variant={activeCategory === cat ? 'default' : 'outline'}
                            onClick={() => setActiveCategory(cat)}
                            className="font-semibold"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Search palettes…"
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}
                    className="border rounded-lg px-4 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 w-full sm:w-48"
                />
            </div>

            {/* ── Palette Grid ──────────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filtered.map(palette => {
                    const isSelected = palette.id === selectedId;
                    return (
                        <button
                            key={palette.id}
                            onClick={() => handleSelect(palette)}
                            className={cn(
                                'group relative flex flex-col rounded-2xl border-2 overflow-hidden transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-offset-2',
                                isSelected
                                    ? 'border-primary ring-2 ring-primary/30 scale-[1.03] shadow-xl shadow-primary/20'
                                    : 'border-border hover:border-primary/40 hover:scale-[1.02] hover:shadow-lg'
                            )}
                            title={palette.description}
                            aria-pressed={isSelected}
                        >
                            {/* Colour swatch */}
                            <div className="relative h-20 w-full flex-shrink-0" style={{ background: `linear-gradient(135deg, ${palette.preview} 0%, ${palette.preview}CC 100%)` }}>
                                {/* Accent dot */}
                                <div
                                    className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white/50 shadow-md"
                                    style={{ background: palette.accentHex }}
                                />
                                {/* Selected check */}
                                {isSelected && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg">
                                            <Check className="w-5 h-5" style={{ color: palette.preview }} />
                                        </div>
                                    </div>
                                )}
                                {/* Category badge */}
                                <div className="absolute top-1.5 left-1.5">
                                    <span className="text-[9px] font-bold uppercase tracking-widest bg-black/30 text-white px-1.5 py-0.5 rounded-full">
                                        {palette.category}
                                    </span>
                                </div>
                                {/* Default badge */}
                                {palette.id === 'aries-red' && (
                                    <div className="absolute top-1.5 right-1.5">
                                        <span className="text-[9px] font-bold uppercase tracking-widest bg-white/90 text-red-600 px-1.5 py-0.5 rounded-full">
                                            Default
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-3 bg-card flex-1">
                                <p className={cn('font-bold text-xs truncate', isSelected && 'text-primary')}>
                                    {palette.name}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: palette.preview }} />
                                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: palette.accentHex }} />
                                    <span className="text-[10px] text-muted-foreground truncate">{palette.accentName}</span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <Palette className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No palettes found for "{searchQ}"</p>
                    <Button variant="ghost" size="sm" onClick={() => { setSearchQ(''); setActiveCategory('All'); }} className="mt-3">
                        Clear filters
                    </Button>
                </div>
            )}

            {/* ── UI Preview Widgets ────────────────────────────────── */}
            <div className="space-y-4">
                <h2 className="font-headline text-xl font-bold flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" /> Live Widget Preview
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Stat Card */}
                    <div className="premium-card p-6 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-muted-foreground">Monthly Sessions</span>
                            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                        </div>
                        <div className="text-3xl font-black">2,847</div>
                        <div className="text-xs text-green-600 font-semibold flex items-center gap-1">
                            ↑ 18% vs last month
                        </div>
                        <div className="w-full bg-secondary rounded-full h-1.5">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: '72%' }} />
                        </div>
                    </div>

                    {/* Button Showcase */}
                    <div className="premium-card p-6 space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground mb-2">Button Styles</p>
                        <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity">
                            Primary Button
                        </button>
                        <button className="w-full py-2.5 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 transition-opacity">
                            Accent Button
                        </button>
                        <button className="w-full py-2.5 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors">
                            Outline Button
                        </button>
                    </div>

                    {/* Colour Swatches */}
                    <div className="premium-card p-6 space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground mb-2">Active Colours</p>
                        {[
                            { label: 'Primary', var: 'var(--primary)', cls: 'bg-primary' },
                            { label: 'Accent', var: 'var(--accent)', cls: 'bg-accent' },
                            { label: 'Secondary', var: 'var(--secondary)', cls: 'bg-secondary' },
                            { label: 'Muted', var: 'var(--muted)', cls: 'bg-muted' },
                        ].map(c => (
                            <div key={c.label} className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg ${c.cls} border`} />
                                <span className="text-sm font-medium">{c.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Important Note ─────────────────────────────────────── */}
            <div className="rounded-2xl bg-secondary/40 border p-6 space-y-2">
                <p className="font-bold text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> How It Works
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5 list-none">
                    <li>• <strong>Instant preview</strong> — Changes apply to the entire website immediately via CSS variables</li>
                    <li>• <strong>Persistent</strong> — Your chosen theme is saved in the browser and restored on every visit</li>
                    <li>• <strong>Permanent change?</strong> — Click "Copy CSS" and paste the --primary value into <code>globals.css</code> to bake it into the build</li>
                    <li>• <strong>Dark mode compatible</strong> — Each palette includes separate light and dark primary values</li>
                </ul>
            </div>
        </div>
    );
}
