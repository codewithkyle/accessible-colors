import { RGB } from '../types';

function luminanace(r, g, b) {
    var colorArray = [r, g, b];
    var colorFactor;
    var i;
    for (i = 0; i < colorArray.length; i++) {
        colorFactor = colorArray[i] / 255;
        if (colorFactor <= 0.03928) {
            colorFactor = colorFactor / 12.92;
        } else {
            colorFactor = Math.pow((colorFactor + 0.055) / 1.055, 2.4);
        }
        colorArray[i] = colorFactor;
    }
    return colorArray[0] * 0.2126 + colorArray[1] * 0.7152 + colorArray[2] * 0.0722 + 0.05;
}

function round(number, decimals) {
    // @ts-ignore
    return +(Math.round(number + 'e+' + decimals) + 'e-' + decimals);
}

/**
 * Calculates the contrast ratio between two RGB objects.
 * @see https://stackoverflow.com/a/9733420
 */
export function contrast(color1: RGB, color2: RGB): number {
    const foreGround = luminanace(color1.r, color1.g, color1.b);
    const background = luminanace(color2.r, color2.g, color2.b);
    let luminanceValue = foreGround / background > background / foreGround ? foreGround / background : background / foreGround;
    luminanceValue = round(luminanceValue, 2);
    return luminanceValue;
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
