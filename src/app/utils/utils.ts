export function isValidImageUrl(url: string): boolean {
    const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i;
    return imageUrlRegex.test(url);
  }