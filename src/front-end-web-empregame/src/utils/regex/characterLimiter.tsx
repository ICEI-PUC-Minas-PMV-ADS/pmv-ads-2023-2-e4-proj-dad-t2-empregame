export function characterLimiter(text: string, caracteres: number) {
  if (text.length > caracteres) {
    const a = text.substring(0, caracteres);
    const b = a + "...";
    return b;
  } else {
    return text;
  }
}
