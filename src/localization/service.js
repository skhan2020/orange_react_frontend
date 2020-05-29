// get content file
import strings from './content.json'

// Used for interpolation, matches items wrapped in curly brackets
const VARIABLE_NAME = /\{(\w+)}/g;

// Used for replacing mathing pairs of round braces (())
const ROUND_BRACES = /\(\((.+)\)\)/g;

const defaultLocale = 'en'
let appLocale = defaultLocale;

const setLocale = locale => {
  appLocale = locale;
}
const getString = (key, locale, options) => {
  // options for interpolation
  // Replacer function for interpolation
  const interpolate = (match, s) => (options && options[s]) || `{${s}}`;

  const string =
    strings[key][locale];
  // Interpolate values
  const interpolatedString = string.replace(VARIABLE_NAME, interpolate);

  // Replace double round braces with curly braces
  // This needs to be done after interpolation
  const escapedString = interpolatedString.replace(
    ROUND_BRACES,
    (match, s) => `{${s}}`,
  );

  return escapedString;
}
// match against the local selection
const translate = (str, options) => {
  return getString(str, appLocale, options);
}
// expose a translation component

export {translate, setLocale}