import React, {createContext, useEffect, useMemo, useState} from 'react';

import {i18n} from '../i18nTranslation/i18n';

export const LocalizationContext = createContext();

export const LocalizationProvider = ({children}) => {
  // const {languageData} = useSelector(state => ({
  //   languageData: state?.languageReducer?.currentLanguage,
  // }));
  const [locale, setLocale] = useState('en');

  const localizationContext = useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, {locale, ...options}),
      locale,
      setLocale,
    }),
    [locale],
  );

  useEffect(() => {
    setLocale('en');
  }, [setLocale]);

  return (
    <LocalizationContext.Provider value={localizationContext}>
      {children}
    </LocalizationContext.Provider>
  );
};
