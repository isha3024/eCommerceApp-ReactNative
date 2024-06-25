import {I18n} from 'i18n-js';

const en = require('../En');
// const hn = require('../Hn');

const i18n = new I18n();

i18n.enableFallback = true;
i18n.translations = {en};

module.exports = {
  i18n: i18n,
};
