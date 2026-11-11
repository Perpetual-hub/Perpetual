// Hero photos for technology pages. Self-hosted in /public/photos, sourced from Wikimedia
// Commons under open licences. Keep the credit, licence and source link: attribution is a
// licence requirement, and showing it is part of Perpetual's disclosure promise.
import type { Technology } from "./types";

export interface TechPhoto {
  src: string;
  alt: string;
  /** Author as named on the source page. Omitted for images supplied directly to Perpetual. */
  credit?: string;
  license?: string;
  licenseUrl?: string;
  /** The Commons file page. */
  sourceUrl?: string;
  /** CSS object-position, to keep the subject in frame. */
  position?: string;
  /** True when we crop/darken it (CC BY-SA asks us to say so). */
  modified?: boolean;
}

export const TECH_PHOTOS: Partial<Record<Technology, TechPhoto>> = {
  hydrogen: {
    src: "/photos/hydrogen-station.jpg",
    alt: "Hydrogen refuelling station with a blue H2 canopy at Stuttgart Airport, Germany",
    credit: "5R-MFT",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Wasserstoff_Tankstelle_Stuttgart_Flughafen.jpg",
    position: "center 12%",
    modified: true,
  },
  solar: {
    src: "/photos/solar.jpg",
    alt: "Rows of solar panels at a photovoltaic plant in Frechilla de Almaz\u00e1n, Soria, Spain",
    credit: "Diego Delso",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Estaci%C3%B3n_fotovolt%C3%A1ica_en_Frechilla_de_Almaz%C3%A1n,_Soria,_Espa%C3%B1a,_2015-12-29,_DD_76.JPG",
    position: "center 60%",
    modified: true,
  },
  wind: {
    src: "/photos/wind.jpg",
    alt: "Wind turbines at the Schwegenheim wind park, Germany, under a blue sky with clouds",
    credit: "Achim Lammerts",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2026-09-10_Windpark-Schwegenheim_(Z5-10926E)_by_Achim_Lammerts.jpg",
    position: "70% 40%",
    modified: true,
  },
  hydro: {
    src: "/photos/hydro.jpg",
    alt: "Glen Canyon Dam seen from downstream in the canyon, Page, Arizona",
    credit: "Christian David",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Glen_Canyon_Dam_from_downstream,_Page,_Arizona_-_April_2026.jpg",
    position: "center 45%",
    modified: true,
  },
  storage: {
    src: "/photos/storage.jpg",
    alt: "Aerial view of the Desert Sunlight battery energy storage system beside a solar farm in the California desert",
    credit: "Bureau of Land Management California",
    license: "Public domain",
    licenseUrl: "https://commons.wikimedia.org/wiki/File:Desert_Sunlight_Battery_Energy_Storage_System_(52945816430).jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Desert_Sunlight_Battery_Energy_Storage_System_(52945816430).jpg",
    position: "center 55%",
    modified: true,
  },
  geothermal: {
    src: "/photos/geothermal.jpg",
    alt: "Bjarnarflag geothermal power station venting steam beside the Blue Lake, Iceland",
    credit: "Jakub Ha\u0142un",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bjarnarflag_Geothermal_Power_Station_and_the_Blue_Lake,_Iceland,_20240716_1412_1511.jpg",
    position: "center 40%",
    modified: true,
  },
  bioenergy: {
    src: "/photos/bioenergy.jpg",
    alt: "IOI Sandakan biomass power plant with smoke stacks in a green valley, Sabah, Malaysia",
    credit: "CEphoto, Uwe Aranas",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sandakan_Sabah_IOI-Sandakan-Biomass-Power-Plant-02.jpg",
    position: "60% 40%",
    modified: true,
  },
  marine: {
    src: "/photos/marine.jpg",
    alt: "The PLAT-I in-stream tidal energy platform floating offshore near Westport, Nova Scotia",
    credit: "Gordon Leggett",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2022-07-27_02_PLAT-I_in-stream_tidal_energy_platform_-_Westport,_NS_CAN.jpg",
    position: "center 60%",
    modified: true,
  },
};
