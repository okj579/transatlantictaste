import type {
  ContentTransformer,
  MarkdownNode,
  ParsedContent,
} from "@nuxt/content";
import { visit } from "unist-util-visit";
import { selectAll } from "unist-util-select";
import { is } from "unist-util-is";
import type { Node, Parent } from "unist";
import type { Ingredient, IngredientGroup } from "~/types/recipes";

interface ElementNode<Tag extends string = string> extends MarkdownNode {
  type: "element";
  tag: Tag;
}
interface TextNode extends MarkdownNode {
  type: "text";
  value: string;
}

const isElement =
  <T extends string>(tag?: T) =>
  (node: unknown): node is ElementNode<T> =>
    is(node, { type: "element", tag });

const isSlot =
  (component: string, slot: string) =>
  (node: unknown, _i?: number, parent?: unknown): boolean =>
    isElement(component)(parent) &&
    isElement("template")(node) &&
    `v-slot:${slot}` in (node.props ?? {});

const getText = (node: Node) =>
  (selectAll("text", node) as TextNode[]).map((node) => node.value).join(" ");

const tableToJson = <T>(table: MarkdownNode) => {
  const columns = selectAll("[tag=thead] [tag=th]", table).map(getText);
  return selectAll("[tag=tbody] > [tag=tr]", table).map((tr) => {
    const values = (tr as Parent).children.map(getText);
    return Object.fromEntries(
      values
        .map((value, i) => value && [columns[i], value])
        .filter((x): x is string[] => !!x),
    ) as T & Record<string, string>;
  });
};

export default <ContentTransformer>{
  name: "transform-ingredient-tables",
  extensions: [".md"],
  transform(content: ParsedContent) {
    visit(content.body!, isSlot("recipe", "ingredients"), (slot) => {
      const props = {
        ingredients: [] as Ingredient[],
        groups: [] as IngredientGroup[],
      };
      let group: IngredientGroup | undefined;

      for (let node of slot.children ?? []) {
        switch (node.tag) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
            group = { title: getText(node), ingredients: [] };
            props.groups.push(group);
            break;
          case "table":
            const ingredients = tableToJson(node).map(
              ({ amount, volume, mass, ...other }) => {
                const amounts = [amount, volume, mass]
                  .filter(Boolean)
                  .flatMap((t) => t.split("@"))
                  .map((t) => t.trim());
                return { amount: amounts, ...other } as Ingredient;
              },
            );
            // noinspection JSUnusedAssignment
            (group ?? props).ingredients.push(...ingredients);
            break;
        }
      }

      slot.children = [
        {
          type: "element",
          tag: "ingredient-list",
          props,
        },
      ];
    });
    return content;
  },
};
