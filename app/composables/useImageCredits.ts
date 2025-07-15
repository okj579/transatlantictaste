interface CreditsEntry {
  image: string;
  author?: string;
  authorLink?: string;
  link?: string;
  license?: string;
  source?: string;
}

export function useImageCreditsList() {
  const { data } = useAsyncData("imageCredits", () =>
    queryContent<{ body: CreditsEntry[] }>("_image-credits")
      .only(["body"])
      .findOne(),
  );
  return computed<CreditsEntry[]>(() => {
    return data.value?.body ?? [];
  });
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
