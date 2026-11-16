import type { FlameCopy } from "@/components/work/FlameScene";
import type { Locale } from "./i18n";

/* Copy for the Flaregrain flame sequence on its case page. */
export const flameCopy: Record<Locale, FlameCopy> = {
  en: {
    kicker: "Why fire is different in space", earth: "On Earth", space: "In microgravity",
    earthBody: "Hot gases rise and pull in fresh air. That draught gives a flame its teardrop shape.",
    spaceBody: "Without that draught, oxygen arrives by diffusion. The flame becomes a slow blue sphere, and smoke does not rise to warn you.",
    gravity: "Gravity", shape: "Shape", oxygen: "Oxygen by", colour: "Colour",
    teardrop: "teardrop", sphere: "sphere", buoyant: "rising draught", diffusion: "diffusion", yellow: "yellow", blue: "blue",
    note: "Illustration drawn in code, not NASA footage.", source: "NASA's explanation", scroll: "Scroll to remove gravity",
  },
  es: {
    kicker: "Por qué el fuego es distinto en el espacio", earth: "En la Tierra", space: "En microgravedad",
    earthBody: "Los gases calientes suben y atraen aire fresco. Esa corriente da a la flama su forma de gota.",
    spaceBody: "Sin esa corriente, el oxígeno llega por difusión. La flama se vuelve una esfera lenta y azul, y el humo no sube para avisar.",
    gravity: "Gravedad", shape: "Forma", oxygen: "Oxígeno por", colour: "Color",
    teardrop: "gota", sphere: "esfera", buoyant: "corriente ascendente", diffusion: "difusión", yellow: "amarillo", blue: "azul",
    note: "Ilustración dibujada con código, no es video de la NASA.", source: "Explicación de la NASA", scroll: "Desplaza para quitar la gravedad",
  },
};
