export interface Country {
    translations: Translations
    cca2: string;
    continents: string[];
}

interface Translations {
    fra: Translation;
}

interface Translation {
    common: string;
}