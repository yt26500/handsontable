import staticRegister from '../utils/staticRegister';
import {extendNotExistingKeys} from './utils';
import DEFAULT_DICTIONARY from './languages/en-US';

export const DEFAULT_LANGUAGE_CODE = DEFAULT_DICTIONARY.languageCode;

const {
  register: registerGloballyLanguageDictionary,
  getItem: getGlobalLanguageDictionary,
  hasItem: hasGlobalLanguageDictionary,
  getValues: getGlobalLanguagesDictionaries
} = staticRegister('languagesDictionaries');

/**
 * Register language dictionary for specific language code.
 *
 * @param {string|Object} languageCode Language code for specific language i.e. 'en-US', 'pt-BR', 'de-DE' or object representing dictionary.
 * @param {Object} dictionary Dictionary for specific language (optional if first parameter has already dictionary).
 */
export function registerLanguage(languageCode, dictionary) {
  if (arguments.length === 1) {
    // Just dictionary passed.

    dictionary = arguments[0]; // eslint-disable-line prefer-rest-params
    languageCode = arguments[0].languageCode; // eslint-disable-line prefer-rest-params
  }

  extendLangDictionaryByDefaultLangDictionary(languageCode, dictionary);
  registerGloballyLanguageDictionary(languageCode, dictionary);

  return dictionary;
};

/**
 * Get language dictionary for specific language code.
 *
 * @param {String} languageCode Language code.
 * @returns {Object} Object with constants representing identifiers for translation (as keys) and corresponding translation phrases (as values).
 */
export function getLanguage(languageCode) {
  if (!hasLanguage(languageCode)) {
    return null;
  }

  return getGlobalLanguageDictionary(languageCode);
}

/**
 *
 * Get if language with specified language code was registered.
 *
 * @param {string} languageCode Language code for specific language i.e. 'en-US', 'pt-BR', 'de-DE'.
 * @returns {Boolean}
 */
export function hasLanguage(languageCode) {
  return hasGlobalLanguageDictionary(languageCode);
}

/**
 * Get default language dictionary.
 *
 * @returns {Object} Object with constants representing identifiers for translation (as keys) and corresponding translation phrases (as values).
 */
export function getDefaultLanguage() {
  return DEFAULT_DICTIONARY;
}

/**
 * Extend handled dictionary by default language dictionary. As result, if any dictionary key isn't defined for specific language, it will be filled with default language value ("dictionary gaps" are supplemented).
 *
 * @private
 * @param {String} languageCode Language code.
 * @param {Object} dictionary Dictionary which is extended.
 */
function extendLangDictionaryByDefaultLangDictionary(languageCode, dictionary) {
  if (languageCode !== DEFAULT_LANGUAGE_CODE) {
    extendNotExistingKeys(dictionary, getGlobalLanguageDictionary(DEFAULT_LANGUAGE_CODE));
  }
}

/**
 * Get registered language dictionaries.
 *
 * @returns {Array}
 */
export function getLanguages() {
  return getGlobalLanguagesDictionaries();
}

/**
 * Automatically registers default dictionary.
 */
registerLanguage(DEFAULT_LANGUAGE_CODE, DEFAULT_DICTIONARY);