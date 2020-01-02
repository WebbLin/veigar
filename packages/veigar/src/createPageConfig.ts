import {
  Component,
  resolveComponent,
  createBlock,
  openBlock,
} from '@vue/runtime-core';
import { createApp } from './render';
import { generate } from './nodeId';
import VNode, { setData } from './vnode';

export default function createPageConfig(this: any, page: Component) {
  const root = new VNode({
    type: 'root',
    id: generate(),
  });

  return {
    data: {
      root: root.toJSON(),
    },
    onLoad() {
      const app = getApp();
      app.page = {};

      const route = (this as any).__route__;
      app.page[route] = this;

      createApp().mount(
        {
          components: {
            page,
          },
          mounted() {
            app.page[route].__mounted = true;
            setData({});
          },
          render() {
            const page = resolveComponent('page');
            return openBlock(), createBlock(page!);
          },
        },
        root
      );
    },
    onReady() {},
    onShow() {},
    onHide() {},
    onUnload() {},
    onPullDownRefresh() {},
    onReachBottom() {},
    onShareAppMessage() {},
    onPageScroll() {},
  };
}
