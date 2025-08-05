import type { MaybeRefOrGetter } from "@vue/reactivity";

interface CreditsEntry {
  image?: string;
  author?: string;
  authorLink?: string;
  link?: string;
  license?: string;
  source?: string;
}

const _useCredit = <T>(key: MaybeRefOrGetter<string>, transform: (data: Record<string, CreditsEntry>) => T) =>
  useAsyncData(
    () => `image-credit-${toValue(key)}`,
    () => import("~~/content/_data/image-credits.yaml").then((m) => m.default),
    { transform },
  );

export const useImageCreditsList = () =>
  _useCredit("list", (data) => Object.entries(data).map(([image, values]) => ({ image, ...values })));

export const useImageCredits = (image: MaybeRefOrGetter<string>) =>
  _useCredit(image, (data) => data[toValue(image).replace(/^\/images\//, "")]);
