// get content file
import strings from './content.json'

const defaultLocale = 'en'
let appLocale = defaultLocale;

const setLocale = locale => {
  appLocale = locale;
}
// match against the local selection
const translate = str => {
  return strings[str][appLocale];
}
// expose a translation component

export {translate, setLocale}