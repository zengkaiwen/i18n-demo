export default {
    catalogs: [
        {
            path: '<rootDir>/src/locales/{locale}/index',
            include: ['<rootDir>/src'],
            exclude: ['**/node_modules/**'],
        },
    ],
    compileNamespace: 'ts',
    locales: ['en', 'zh'],
    fallbackLocales: {
        default: 'en',
    },
    sourceLocale: 'en',
};
