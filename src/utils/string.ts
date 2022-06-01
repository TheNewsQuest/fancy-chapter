/**
 * Capitalize a word
 * @param word Text to be capitalized
 * @returns Capitalized word
 */
export const capitalize = (word: string) =>
  `${word[0].toUpperCase()}${word.slice(1)}`;

/**
 * Extract preview from wall of text
 * @param text Text-based content
 * @returns Preview of text
 */
export const extractPreview = (text: string, limit = 10): string =>
  `${text.split(' ').slice(0, limit).join(' ')}...`;
