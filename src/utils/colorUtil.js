export const hexToRgbaHex = (hex, opacity) => {
    const normalizedHex = hex.replace("#", "").slice(0, 6);
    const alpha = Math.round((opacity / 100) * 255);

    return `#${normalizedHex}${alpha.toString(16).padStart(2, "0")}`.toUpperCase();
};

export const rgbaHexToOpacity = (hex) => {
    const alpha = hex.length === 9
        ? parseInt(hex.slice(7, 9), 16)
        : 255;

    return Math.round((alpha / 255) * 100);
};