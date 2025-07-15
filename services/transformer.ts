import { defineTransformer, type PageCollectionItemBase } from "@nuxt/content";
import { visit, textContent, type MinimarkElement, type MinimarkNode } from "minimark";
import type { Ingredient, IngredientGroup } from "~~/types/recipes";
import { isObject, isPlainObject } from "@vue/shared";

type Element<T extends string> = [T, Props, ...MinimarkNode[]];
type Props = Record<string, unknown>;

const element = (n?: MinimarkNode) => (Array.isArray(n) ? n : undefined);
const tag = (n?: MinimarkNode) => element(n)?.[0];
const props = (n?: MinimarkNode) => element(n)?.[1];
const children = (n?: MinimarkNode) => (element(n)?.slice?.(2) as MinimarkNode[]) ?? [];

const isElement =
  <T extends string>(tag: T) =>
  (n: unknown): n is Element<T> =>
    Array.isArray(n) && n[0] === tag && isPlainObject(n[1]);

const isSlot =
  <P extends string>(prop: P) =>
  (n: MinimarkNode): n is MinimarkElement =>
    isElement("template")(n) && `v-slot:${prop}` in n[1];

const isPage = (content: unknown): content is PageCollectionItemBase =>
  isObject(content) && isObject(content.body) && content.body.type === "minimark";

const tableToJson = <T>(el: Element<"table">) => {
  const [thead, tbody] = children(el);
  const [headerRow] = children(thead);
  const rows = children(tbody);

  const columns = children(headerRow).map(textContent);

  return rows.map((tr) => {
    const values = children(tr).map(textContent);
    if (values.length !== columns.length) throw new Error("Invalid table");
    return Object.fromEntries(
      values.map((value, i) => value && [columns[i], value]).filter((x): x is string[] => !!x),
    ) as T & Record<string, string>;
  });
};

export default defineTransformer({
  name: "transform-ingredient-tables",
  extensions: [".md"],
  transform(content) {
    if (!isPage(content)) return content;

    visit(content.body, isElement("recipe"), (recipe) => {
      const slot = children(recipe).find(isSlot("ingredients"));
      if (!slot) return;

      const listProps = {
        ingredients: [] as Ingredient[],
        groups: [] as IngredientGroup[],
      };
      let group: IngredientGroup | undefined;

      for (let node of children(slot)) {
        if (tag(node)?.match(/^h[1-6]$/)) {
          // Start group
          group = { title: textContent(node), ingredients: [] };
          listProps.groups.push(group);
        } else if (isElement("table")(node)) {
          // Ingredients table
          const ingredients = tableToJson(node).map(({ amount, volume, mass, ...other }) => {
            const amounts = [amount, volume, mass]
              .flatMap((t) => t?.split("@"))
              .map((t) => t?.trim())
              .filter((s) => s);
            return { amount: amounts, ...other } as Ingredient;
          });
          // noinspection JSUnusedAssignment
          (group ?? listProps).ingredients.push(...ingredients);
        }
      }
      return [tag(recipe), props(recipe), ["ingredient-list", listProps]];
    });

    return content;
  },
});
