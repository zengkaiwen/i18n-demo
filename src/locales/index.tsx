import * as React from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useRecoilState } from 'recoil';
import { recoilLocale } from '../models';

export type SupportedLocale = 'en' | 'zh';

async function dynamicActivate(locale: SupportedLocale) {
    const { messages } = await import(`./${locale}/index`);
    i18n.loadAndActivate({ locale, messages })
}

const I18n: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [loadLocale, setLoadLocale] = React.useState(false);
    const [locale, setLocaleModel] = useRecoilState(recoilLocale);

    const handleDynamicActivate = React.useCallback(async () => {
        try {
            await dynamicActivate(locale);
            setLocaleModel(locale);
            setLoadLocale(true);
        } catch (error) {
            console.error('Failed to activate locale', locale, error);
        }
    }, [locale, setLocaleModel]);

    React.useEffect(() => {
        if (!locale) return;
        handleDynamicActivate();
    }, [locale, handleDynamicActivate]);

    if (!loadLocale) return null;
    return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export default I18n;
