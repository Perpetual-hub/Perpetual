import {
  BatteryCharging,
  Droplets,
  Flame,
  FlaskConical,
  Sprout,
  Sun,
  Waves,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { Technology } from "./types";

export interface TechMeta {
  id: Technology;
  label: string;
  /** CSS variable holding the colour, for use in styles. */
  cssVar: string;
  /** Raw hex, for the map and charts (canvas can't read CSS vars). Keep in sync with globals.css. */
  hex: string;
  icon: LucideIcon;
  short: string;
  explainer: string;
}

export const TECHNOLOGIES: TechMeta[] = [
  {
    id: "solar",
    label: "Solar",
    cssVar: "var(--tech-solar)",
    hex: "#0B5CAD",
    icon: Sun,
    short: "Photovoltaic and concentrated solar power.",
    explainer:
      "Solar projects turn sunlight into electricity, mostly with photovoltaic (PV) panels and sometimes with mirrors that concentrate heat (CSP). We record capacity in AC unless a source only gives DC, and we label which one we use.",
  },
  {
    id: "wind",
    label: "Wind",
    cssVar: "var(--tech-wind)",
    hex: "#34A04A",
    icon: Wind,
    short: "Onshore and offshore wind farms.",
    explainer:
      "Wind farms use turbines to turn moving air into electricity. Onshore farms sit on land, while offshore farms sit at sea, either fixed to the seabed or floating. Offshore projects are usually bigger and take longer to build.",
  },
  {
    id: "hydro",
    label: "Hydro",
    cssVar: "var(--tech-hydro)",
    hex: "#5AA9E6",
    icon: Droplets,
    short: "Reservoir, run-of-river and pumped storage.",
    explainer:
      "Hydropower uses flowing or falling water to spin turbines. Reservoir plants store water behind a dam, and run-of-river plants use a river's natural flow. Pumped storage moves water uphill when power is cheap and releases it when it is needed.",
  },
  {
    id: "storage",
    label: "Storage",
    cssVar: "var(--tech-storage)",
    hex: "#8E6CD8",
    icon: BatteryCharging,
    short: "Grid-scale battery energy storage (BESS).",
    explainer:
      "Battery storage projects soak up electricity when there is plenty and give it back when it is scarce. We list both power (MW, how fast it can discharge) and energy (MWh, how much it holds).",
  },
  {
    id: "geothermal",
    label: "Geothermal",
    cssVar: "var(--tech-geothermal)",
    hex: "#D9653B",
    icon: Flame,
    short: "Power from heat below the earth's surface.",
    explainer:
      "Geothermal plants tap heat from deep underground to make steam and drive turbines. They run around the clock, but drilling is expensive and the best sites are in volcanic regions. Newer 'enhanced' systems aim to work almost anywhere.",
  },
  {
    id: "hydrogen",
    label: "Hydrogen",
    cssVar: "var(--tech-hydrogen)",
    hex: "#13A8B8",
    icon: FlaskConical,
    short: "Green hydrogen from renewable-powered electrolysers.",
    explainer:
      "We only track green hydrogen: hydrogen made by splitting water in an electrolyser that runs on renewable power. Capacity is the electrolyser's power input in MW. Where known, we also show output in tonnes per year.",
  },
  {
    id: "bioenergy",
    label: "Bioenergy",
    cssVar: "var(--tech-bioenergy)",
    hex: "#A3AE2E",
    icon: Sprout,
    short: "Biomass, biogas and residue-fired power.",
    explainer:
      "Bioenergy plants burn or digest organic material, such as crop residues, wood waste or manure, to make power and often heat. Whether a project is truly low-carbon depends on where its fuel comes from.",
  },
  {
    id: "marine",
    label: "Marine",
    cssVar: "var(--tech-marine)",
    hex: "#C2457E",
    icon: Waves,
    short: "Tidal stream and wave energy.",
    explainer:
      "Marine energy uses the movement of the sea. Tidal stream turbines sit in fast tidal channels, and wave devices ride the swell. It is an early-stage technology, so projects are small but closely watched.",
  },
];

export const TECH_BY_ID = Object.fromEntries(TECHNOLOGIES.map((t) => [t.id, t])) as Record<
  Technology,
  TechMeta
>;

export const TECH_IDS = TECHNOLOGIES.map((t) => t.id);

export function isTechnology(x: string): x is Technology {
  return (TECH_IDS as string[]).includes(x);
}
