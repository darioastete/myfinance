export const  changeOpacity = (rgba: string, newOpacity: number): string => {
    // Usar una expresión regular para extraer los valores de rgba
    const rgbaRegex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([01]?\.?\d*)\)/;
    const match = rgba.match(rgbaRegex);

    if (!match) {
        throw new Error('Invalid rgba format');
    }

    const [_, r, g, b] = match;

    // Retornar el nuevo valor de rgba con la nueva opacidad
    return `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
}


export const hexToRgba = (inputHex: string, opacity: number): string => {
    // Remover el símbolo '#' si está presente
    const hex = inputHex.replace('#', '');

    // Convertir los valores hexadecimales a RGB
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);

    // Retornar el valor en formato rgba
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
