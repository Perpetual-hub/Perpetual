import { countryPhotos, type CountryPhoto } from "./country-photos";
import { curatedCountryPhotos } from "./country-photos-curated";

/** The landmark photo chosen by hand when there is one, otherwise the generated Wikivoyage photo. */
export function countryPhoto(iso: string): CountryPhoto | undefined {
  return curatedCountryPhotos[iso] ?? countryPhotos[iso];
}
