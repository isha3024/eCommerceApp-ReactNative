import {useContext} from 'react';
import {LocalizationContext} from '../../contexts/LocalizationContext';

export const useLocalization = () => useContext(LocalizationContext);
