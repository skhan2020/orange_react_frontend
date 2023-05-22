// get content file
import strings from './content.json'

// Used for interpolation, matches items wrapped in curly brackets
const VARIABLE_NAME = /\{(\w+)}/g;

// Used for replacing mathing pairs of round braces (())
const ROUND_BRACES = /\(\((.+)\)\)/g;

const defaultLocale = 'en'
let appLocale = defaultLocale;

const setLocale = (locale: string) => {
  appLocale = locale;
}
// TODO: check object type
const getString = (key: string, locale: string, options?: object) => {
  // options for interpolation
  // Replacer function for interpolation
// @ts-ignore
  const interpolate = (s: string) => (options && options[s]) || `{${s}}`;

  let string: string = "";
// @ts-ignore
  if (strings[key]) {
// @ts-ignore
    string = strings[key][locale];
  } else {
    return key;
  }
  // Interpolate values
  const interpolatedString = string.replace(VARIABLE_NAME, interpolate);

  // Replace double round braces with curly braces
  // This needs to be done after interpolation
  const escapedString = interpolatedString.replace(
    ROUND_BRACES,
    (s) => `{${s}}`,
  );

  return escapedString;
}
// match against the local selection
const translate = (str: string, options?: object) => {
  return getString(str, appLocale, options);
}
// expose a translation component

export {translate, setLocale}