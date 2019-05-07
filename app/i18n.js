/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const zhLocaleData = require('react-intl/locale-data/zh');
const enLocaleData = require('react-intl/locale-data/en');
const jaLocaleData = require('react-intl/locale-data/ja');

const zhTranslationMessages = require('./translations/zh.json');
const enTranslationMessages = require('./translations/en.json');
const jaTranslationMessages = require('./translations/ja.json');

addLocaleData(zhLocaleData);
addLocaleData(enLocaleData);
addLocaleData(jaLocaleData);

const DEFAULT_LOCALE = 'zh';

// prettier-ignore
const appLocales = [
  'zh',
  'en',
  'ja',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, zhTranslationMessages)
      : {};
  const flattzhFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattzhFormattedMessages, {});
};

const translationMessages = {
  zh: formatTranslationMessages('zh', zhTranslationMessages),
  en: formatTranslationMessages('en', enTranslationMessages),
  ja: formatTranslationMessages('ja', jaTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
