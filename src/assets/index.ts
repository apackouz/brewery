const images: { [key: string]: () => Promise<{ default: string }> } = {
  bar: () => import("./bar.webp"),
  brewpub: () => import("./brewpub.webp"),
  closed: () => import("./closed.webp"),
  contract: () => import("./contract.webp"),
  large: () => import("./large.webp"),
  micro: () => import("./micro.webp"),
  nano: () => import("./nano.webp"),
  planning: () => import("./planning.webp"),
  proprietor: () => import("./proprietor.webp"),
  regional: () => import("./regional.webp"),
};

export default images;
