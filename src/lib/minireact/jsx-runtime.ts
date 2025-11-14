import { Fragment, type VNode } from "./index";

/**
 * Minimal JSX runtime so TypeScript can compile JSX syntax down to VNodes that our
 * lightweight renderer understands.
 */
function createVNode(type: VNode["type"], props: Record<string, unknown> | null, key?: string | number | null): VNode {
  const normalizedProps = props ? { ...props } : {};
  const rawChildren = normalizedProps.children;

  if (rawChildren !== undefined) {
    normalizedProps.children = Array.isArray(rawChildren) ? rawChildren : [rawChildren];
  }

  if (key !== undefined && key !== null) {
    normalizedProps.key = key;
  }

  return {
    type,
    props: normalizedProps,
    key: key ?? null,
  } as VNode;
}

export { Fragment };

export const jsx = createVNode;
export const jsxs = createVNode;
export const jsxDEV = createVNode;
