export class FontManager {
    constructor() {
        this.loadedFonts = new Map();
    }
    async load({
        name,
        url,
        weight = "400",
        style = "normal"
    }) {
        try {
            const key = `${name}-${weight}-${style}`;
            if (this.loadedFonts.has(key)) {
                return this.loadedFonts.get(key);
            }
            const fontFace = new FontFace(
                name,
                `url("${url}")`,
                {
                    weight,
                    style
                }
            );
            const loadedFont = await fontFace.load();
            document.fonts.add(loadedFont);
            this.loadedFonts.set(key, loadedFont);
            return loadedFont;
        } catch (error) {
            console.error(`Failed to load font ${name} with weight ${weight} and style ${style}:`, error);
        }
    }
    isLoaded(name, weight = "400", style = "normal") {
        return this.loadedFonts.has(`${name}-${weight}-${style}`);
    }
}

export const fontManager = new FontManager();