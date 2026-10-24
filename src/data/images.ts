export const images = {
  interior: {
    name: "interior",
    alt: "A violet-lit beauty studio with an oval mirror, chrome chair and sheer curtains",
    width: 1280,
    height: 864,
    label: "Retained concept image",
  },
  studio: {
    name: "studio",
    alt: "Soft daylight across a curved mirror edge, chrome chair and plum plaster wall",
    width: 1536,
    height: 1024,
    label: "AI-generated concept image",
  },
  mood: {
    name: "mood",
    alt: "Plum and cream fabric swatches, hair colour references and a silver clip on a blush table",
    width: 1536,
    height: 1024,
    label: "AI-generated concept image",
  },
  craft: {
    name: "craft",
    alt: "A stylist gently arranging dark hair with a comb in the imagined atelier",
    width: 1536,
    height: 1024,
    label: "AI-generated concept image",
  },
  expression: {
    name: "expression",
    alt: "An editorial portrait of a fictional adult model with dark wavy hair and an ivory blouse",
    width: 1024,
    height: 1536,
    label: "AI-generated concept image",
  },
  stillLife: {
    name: "still-life",
    alt: "Unbranded plum and frosted bottles, a silver comb and folded textile on a salon shelf",
    width: 1536,
    height: 1024,
    label: "AI-generated concept image",
  },
} as const;
export type PhotoData = (typeof images)[keyof typeof images];
