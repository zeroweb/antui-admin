import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { outputFileSync } from 'fs-extra';
import { exec } from 'child_process';

const dist = join(__dirname, '../lib/components');
const cssjsFile = "'use strict';\nrequire('../../../style/index.css');\nrequire('./index.css');";

// 编译js（es6）至 es5

if (existsSync(dist)) {
  readdirSync(dist).forEach((cmpt) => {
    const cmptPath = join(dist, cmpt, 'style');
    // 编译
    console.log(`${cmpt}/style/index.less > ${cmpt}/style/index.css`);
    exec(`lessc ${cmptPath}/index.less > ${cmptPath}/index.css`);
    // 创建 css.js
    console.log(`touch ${cmpt}/style/css.js`);
    outputFileSync(`${cmptPath}/css.js`, cssjsFile, 'utf-8');
  });
} else {
  console.log(`${dist} 目录不存在`);
}

// 编译main less
const lessPath = join(__dirname, '../lib/style');
console.log(`style/index.less > /style/index.css`);
exec(`lessc ${lessPath}/index.less > ${lessPath}/index.css`);
