export function endsWith(str: string, search: string): boolean {
  const strLength = str.length;
  return str.substring(strLength - search.length, strLength) === search;
}

export function startsWith(str: string, search: string, pos?: number): boolean {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}
