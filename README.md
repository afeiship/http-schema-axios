# next-fetch
> Abstract for browser or node.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @feizheng/next-fetch
```

## options
| option       | type        | default               | description                       |
| ------------ | ----------- | --------------------- | --------------------------------- |
| fetch        | Function    | require('node-fetch') | Defult fetch implement            |
| dataType     | String      | json                  | json/raw/urlencoded/multipart     |
| responseType | String/Null | json                  | json/text/blob/null               |

## usage
```js
import NxFetch from '@feizheng/next-fetch';

const http = NxFetch.getInstance({ responseType:'json' });

http.get('https://api.github.com/users/afeiship').then(res=>{
  console.log(res);
});

// {
//   login: 'afeiship',
//   id: 3038631,
//   node_id: 'MDQ6VXNlcjMwMzg2MzE=',
//   avatar_url: 'https://avatars2.githubusercontent.com/u/3038631?v=4',
    // .....
// }
```

## resources
- https://github.com/afeiship/next-abstract-request

## license
Code released under [the MIT license](https://github.com/afeiship/next-fetch/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@feizheng/next-fetch
[version-url]: https://npmjs.org/package/@feizheng/next-fetch

[license-image]: https://img.shields.io/npm/l/@feizheng/next-fetch
[license-url]: https://github.com/afeiship/next-fetch/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@feizheng/next-fetch
[size-url]: https://github.com/afeiship/next-fetch/blob/master/dist/next-fetch.min.js

[download-image]: https://img.shields.io/npm/dm/@feizheng/next-fetch
[download-url]: https://www.npmjs.com/package/@feizheng/next-fetch
