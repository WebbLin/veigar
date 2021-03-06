/*
 * Created Date: January 9th 2020, 8:09:22 pm
 * Author: zhoupengcheng
 * -----
 * Last Modified: January 9th 2020, 8:09:22 pm
 */
import { compileFile } from 'pug';
import path from 'path';
import { getComponents } from '../loader';
import { getEntry } from '../build/entry';

export default function emitTemplate(assets: any) {
  const components = getComponents();

  const compile = compileFile(
    path.join(__dirname, '../../templates/base.pug'),
    {
      cache: true,
      pretty: process.env.NODE_ENV === 'development',
      doctype: 'html',
    }
  );
  const baseTmpl = compile(components);

  assets['base.ttml'] = {
    source() {
      return baseTmpl;
    },
    size() {
      return baseTmpl.length;
    },
  };

  const compilePage = compileFile(
    path.join(__dirname, '../../templates/page.pug'),
    {
      cache: true,
      pretty: process.env.NODE_ENV === 'development',
    }
  );

  const entries = getEntry();

  for (const { page } of entries) {
    const baseTemplate = path.relative(path.dirname(page), 'base.ttml');
    const pageTmpl = compilePage({
      baseTemplate,
    });

    assets[`${page}.ttml`] = {
      source() {
        return pageTmpl;
      },
      size() {
        return pageTmpl.length;
      },
    };
  }
}
