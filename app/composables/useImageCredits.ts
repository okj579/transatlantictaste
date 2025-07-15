import type { ImageCreditsCollectionItem } from "@nuxt/content";

interface CreditsEntry {
  image: string;
  author?: string;
  authorLink?: string;
  link?: string;
  license?: string;
  source?: string;
}

export function useImageCreditsList() {
  const { data } = useAsyncData(() => queryCollection("imageCredits").first(), {
    transform: (data): ImageCreditsCollectionItem["body"] => data?.body ?? [],
    default: (): ImageCreditsCollectionItem["body"] => [],
  });
  return data;
}

export default function useImageCredits() {
  const list = useImageCreditsList();
  return computed<Record<string, CreditsEntry>>(() => {
    const entries = Object.fromEntries(list.value.map((v) => [v.image, v]));
    return new Proxy(entries, {
      get: (target, p: string) =>
        target[p] ?? target[p.replace(/^\/?images\/?/, "")],
    });
  });
}
