import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { locales } from "../.";

export const { redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
