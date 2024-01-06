interface CreditsEntry {
  image: string;
  author?: string;
  link?: string;
  license?: string;
  source?: string;
}

export default function useImageCredits() {
  const { data } = useAsyncData("imageCredits", () =>
    queryContent<{ body: CreditsEntry[] }>("_image-credits")
      .only(["body"])
      .findOne(),
  );
  return computed<Record<string, CreditsEntry>>(() => {
    if (!data.value) return {};
    const entries = Object.fromEntries(
      data.value.body.map((v) => [v.image, v]),
    );
    return new Proxy(entries, {
      get: (target, p: string) =>
        target[p] ?? target[p.replace(/^\/?images\/?/, "")],
    });
  });
}
