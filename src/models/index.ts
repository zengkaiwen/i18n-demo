import { atom } from 'recoil';
import { SupportedLocale } from '../locales';

export const recoilLocale = atom<SupportedLocale>({
    key: 'recoilLocale',
    default: 'en'
})
