# leancloud
> Leancloud api.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/leancloud
```

## usage
```js
import LC from '@jswork/leancloud';

// get
const res = await LC.get('60f77c8e85071346450995d3');
// value
const value = await LC.val('60f77c8e85071346450995d3');
// set
await LC.set('60f77c8e85071346450995d3', 'abc-test');
```

## license
Code released under [the MIT license](https://github.com/afeiship/leancloud/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/leancloud
[version-url]: https://npmjs.org/package/@jswork/leancloud

[license-image]: https://img.shields.io/npm/l/@jswork/leancloud
[license-url]: https://github.com/afeiship/leancloud/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/leancloud
[size-url]: https://github.com/afeiship/leancloud/blob/master/dist/leancloud.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/leancloud
[download-url]: https://www.npmjs.com/package/@jswork/leancloud
