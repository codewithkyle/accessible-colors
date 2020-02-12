function luminanace(r, g, b) {
    let a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
/**
 * Calculates the contrast ratio between two RGB objects.
 * @see https://stackoverflow.com/a/9733420
 */
export function contrast(color1: RGB, color2: RGB): number {
    return (luminanace(color1.r, color1.g, color1.b) + 0.05) / (luminanace(color2.r, color2.g, color2.b) + 0.05);
}

/**
 * Converts a HEX string to an RGB object.
 * @see https://stackoverflow.com/a/5624139
 */
export function hexToRgb(hex: string): RGB {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}
