// Page header photographs. Self-hosted in /public/photos/hero, from Wikimedia Commons under open
// licences. Keep the credit, licence and source link: attribution is a licence requirement. All are
// shown under a dark wash (a modification, which CC BY-SA allows and asks us to note).
export interface HeroPhoto {
  src: string;
  credit: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  /** CSS object-position, to keep the subject in frame. */
  position?: string;
}

const BY_SA_3 = { license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0" };
const BY_SA_4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" };

export const HERO_PHOTOS = {
  deals: {
    src: "/photos/hero/deals.jpg",
    credit: "Kim Hansen",
    ...BY_SA_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Middelgrunden_wind_farm_2009-07-01_edit_filtered.jpg",
    position: "center 55%",
  },
  policy: {
    src: "/photos/hero/policy.jpg",
    credit: "Henning Reiter",
    ...BY_SA_3,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:E126-Prototyp-12-02-2008.jpg",
    position: "70% 45%",
  },
  method: {
    src: "/photos/hero/method.jpg",
    credit: "Dietmar Rabich",
    ...BY_SA_4,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Haltern_am_See,_Westruper_Heide_--_2024_--_5626.jpg",
    position: "center 60%",
  },
  statistics: {
    src: "/photos/hero/statistics.jpg",
    credit: "kallerna",
    ...BY_SA_4,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Planta_Solar_PS20.jpg",
    position: "center 55%",
  },
  about: {
    src: "/photos/hero/about.jpg",
    credit: "Dietmar Rabich",
    ...BY_SA_4,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:D%C3%BClmen,_Buldern,_Umland_--_2013_--_2795.jpg",
    position: "center 45%",
  },
  disclosure: {
    src: "/photos/hero/disclosure.jpg",
    credit: "Kaʁstn",
    license: "CC BY-SA 3.0 DE",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Windpark_Krummh%C3%B6rn_Sonnenuntergang_2010.jpg",
    position: "center 70%",
  },
  corrections: {
    src: "/photos/hero/corrections.jpg",
    credit: "Dietmar Rabich",
    ...BY_SA_4,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:D%C3%BClmen,_Solarpark_--_2014_--_7060.jpg",
    position: "center 60%",
  },
  regions: {
    src: "/photos/hero/regions.jpg",
    credit: "Alexander Blecher",
    ...BY_SA_4,
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Zwei_WKA_auf_der_Neutscher_H%C3%B6he.JPG",
    position: "center 60%",
  },
} satisfies Record<string, HeroPhoto>;
