import { searchFonts } from "../../../../api/propertiesApi"
import { fontManager } from "../../../../utils/FontManager";

export const fetchFonts = async (page = 1, size = 10, query = "", category = "") => {
    const response = await searchFonts(page, size, query);
    const loadPromises = [];

    response?.forEach(font => {
        if (!font?.url || !font?.name) return;

        const weights = font.weight?.length ? font.weight : ["400"];
        const styles = font.style?.length ? font.style : ["normal"];

        weights.forEach(weight => {
            styles.forEach(style => {
                if (!fontManager.isLoaded(font.name, weight, style)) {
                    loadPromises.push(
                        fontManager.load({
                            name: font.name,
                            url: font.url,
                            weight,
                            style
                        })
                    );
                }
            });
        });
    });
    await Promise.all(loadPromises);
    return response;

};

