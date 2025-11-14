/**
 * A very small React-inspired runtime that supports JSX, state and effects.
 * It is purposely minimalist but gives us enough power to model the hero screen
 * without requiring any external dependencies from npm (the environment is offline).
 */

export type Component<Props = Record<string, unknown>> = (props: Props & { children?: VNodeChild }) => VNodeChild;

export type DOMTag = keyof HTMLElementTagNameMap;

export type VNode = {
  type: DOMTag | Component | typeof Fragment;
  props: Record<string, unknown> & { children?: VNodeChild };
  key?: string | number | null;
};

export type VNodeChild = VNode | string | number | boolean | null | undefined | VNodeChild[];

type EffectRecord = {
  deps?: unknown[];
  cleanup?: () => void;
};

type EffectQueueItem = {
  index: number;
  callback: () => void | (() => void);
};

export const Fragment = Symbol("Fragment");

let rootComponent: Component | null = null;
let rootContainer: HTMLElement | null = null;

let stateStore: unknown[] = [];
let hookCursor = 0;

let effectStore: EffectRecord[] = [];
let effectCursor = 0;
let effectQueue: EffectQueueItem[] = [];

/** Create a root that mirrors the API of `ReactDOM.createRoot`. */
export function createRoot(container: HTMLElement) {
  rootContainer = container;
  return {
    render(component: Component) {
      rootComponent = component;
      rerender();
    },
  };
}

/** Trigger a re-render for the current root component. */
export function rerender() {
  if (!rootComponent || !rootContainer) {
    return;
  }

  hookCursor = 0;
  effectCursor = 0;

  const tree = normalizeVNode(rootComponent({ children: [] as VNodeChild }));
  const dom = mount(tree);

  if (dom) {
    rootContainer.replaceChildren(dom);
  }

  flushEffects();
}

export function useState<T>(initial: T | (() => T)) {
  const currentIndex = hookCursor++;

  if (stateStore.length <= currentIndex) {
    stateStore[currentIndex] =
      typeof initial === "function" ? (initial as () => T)() : (initial as T);
  }

  const setState = (next: T | ((prev: T) => T)) => {
    const value = typeof next === "function" ? (next as (prev: T) => T)(stateStore[currentIndex] as T) : next;
    if (Object.is(stateStore[currentIndex], value)) {
      return;
    }

    stateStore[currentIndex] = value;
    rerender();
  };

  return [stateStore[currentIndex] as T, setState] as const;
}

export function useEffect(effect: () => void | (() => void), deps?: unknown[]) {
  const currentIndex = effectCursor++;
  const previous = effectStore[currentIndex];
  const hasChanged = deps ? hasDepsChanged(previous?.deps, deps) : true;

  if (hasChanged) {
    effectQueue.push({ index: currentIndex, callback: effect });
  }

  effectStore[currentIndex] = { deps };
}

export function useRef<T>(initial: T | null = null) {
  const [ref] = useState<{ current: T | null }>(() => ({ current: initial }));
  return ref;
}

function hasDepsChanged(prev: unknown[] | undefined, next: unknown[]) {
  if (!prev) {
    return true;
  }

  if (prev.length !== next.length) {
    return true;
  }

  return next.some((value, index) => !Object.is(value, prev[index]));
}

function flushEffects() {
  effectQueue.forEach(({ index, callback }) => {
    const record = effectStore[index];
    if (record?.cleanup) {
      record.cleanup();
    }

    const cleanup = callback();
    if (typeof cleanup === "function") {
      if (record) {
        record.cleanup = cleanup;
      }
    }
  });

  effectQueue = [];
}

function normalizeVNode(node: VNodeChild): VNode | string | number | null {
  if (Array.isArray(node)) {
    return {
      type: Fragment,
      props: { children: node },
    };
  }

  if (node === false || node === true || node === undefined) {
    return null;
  }

  return node as VNode | string | number | null;
}

function mount(node: VNode | string | number | null): Node | null {
  if (node == null) {
    return document.createComment("empty");
  }

  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(String(node));
  }

  if (typeof node.type === "function") {
    const component = node.type as Component;
    const rendered = normalizeVNode(component({ ...(node.props || {}), children: node.props?.children }));
    return mount(rendered);
  }

  if (node.type === Fragment) {
    const fragment = document.createDocumentFragment();
    const children = toChildArray(node.props?.children);
    children.forEach((child) => {
      const childNode = mount(child as VNode | string | number | null);
      if (childNode) {
        fragment.appendChild(childNode);
      }
    });
    return fragment;
  }

  const element = document.createElement(node.type as DOMTag);
  const props = node.props || {};

  Object.entries(props).forEach(([key, value]) => {
    if (key === "children" || value == null) {
      return;
    }

    if (key === "className") {
      element.className = String(value);
      return;
    }

    if (key === "ref" && typeof value === "object") {
      (value as { current: Element | null }).current = element;
      return;
    }

    if (key === "style" && typeof value === "object") {
      Object.entries(value as Record<string, string | number>).forEach(([prop, propValue]) => {
        if (propValue == null) return;
        const cssValue = typeof propValue === "number" && prop !== "opacity" ? `${propValue}px` : String(propValue);
        (element.style as CSSStyleDeclaration & Record<string, string>)[prop] = cssValue;
      });
      return;
    }

    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value as EventListener);
      return;
    }

    const attributeName = key === "htmlFor" ? "for" : key;

    if (typeof value === "boolean") {
      if (value) {
        element.setAttribute(attributeName, "");
      }
      return;
    }

    element.setAttribute(attributeName, String(value));
  });

  const children = toChildArray(node.props?.children);
  children.forEach((child) => {
    const childNode = mount(child as VNode | string | number | null);
    if (childNode) {
      element.appendChild(childNode);
    }
  });

  return element;
}

function toChildArray(children: VNodeChild | undefined): (VNode | string | number | null)[] {
  if (children == null) {
    return [];
  }

  if (!Array.isArray(children)) {
    return [children as VNode | string | number | null];
  }

  return children.flatMap((child) => {
    if (Array.isArray(child)) {
      return toChildArray(child);
    }
    return [child as VNode | string | number | null];
  });
}
