# next-fetch
> Abstract for browser or node.

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
