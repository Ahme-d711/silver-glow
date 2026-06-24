import { WORKS_IMAGES } from "./works.images";
import type { WorksShowcaseItemData } from "../types/works-template.types";

export const WORKS_SHOWCASE_ITEMS: WorksShowcaseItemData[] = [
  {
    id: "luna",
    image: WORKS_IMAGES.luna,
    imageAltKey: "showcase1_image_alt",
    labelKey: "showcase1_label",
    titleKey: "showcase1_title",
    descriptionKey: "showcase1_desc",
  },
  {
    id: "celestial",
    image: WORKS_IMAGES.celestial,
    imageAltKey: "showcase2_image_alt",
    labelKey: "showcase2_label",
    titleKey: "showcase2_title",
    descriptionKey: "showcase2_desc",
    reverse: true,
  },
];
