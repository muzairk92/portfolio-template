import type { VNode } from "./index";

declare global {
  namespace JSX {
    type Element = VNode | string | number | null;
    interface ElementClass {}
    interface ElementChildrenAttribute {
      children: {};
    }
    interface IntrinsicElements {
      [elemName: string]: Record<string, unknown>;
    }
  }
}
