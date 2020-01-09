import VNode from './vnode';
import { generate } from './nodeId';

export const nodeOps = {
  insert: (child: VNode, parent: VNode, anchor?: VNode) => {
    if (anchor != null) {
      parent.insertBefore(child, anchor);
    } else {
      parent.appendChild(child);
    }
  },

  remove: (child: VNode) => {
    const parent = child.parentNode;
    if (parent != null) {
      parent.removeChild(child);
    }
  },

  createElement: (tag: string): VNode => {
    return new VNode({
      type: tag,
      id: generate(),
    });
  },

  createText: (text: string): VNode =>
    new VNode({ type: 'text', text, id: generate() }),

  createComment: (text: string): VNode =>
    new VNode({ type: 'text', text: '', id: generate() }),

  setText: (node: VNode, text: string) => {
    node.setText(text);
  },

  setElementText: (el: VNode, text: string) => {
    el.setText(text);
  },

  parentNode: (node: VNode): VNode | null => node.parentNode,

  nextSibling: (node: VNode): VNode | null => node.nextSibling,

  querySelector: (selector: string): VNode | null => null,

  setScopeId(el: VNode, id: string) {
    el.props && (el.props[id] = '');
  },
};
