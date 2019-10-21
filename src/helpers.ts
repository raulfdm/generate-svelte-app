import colors from 'colors/safe';

export function textHighlight(str: string) {
  return colors.bold(colors.inverse(str));
}
