# next-fetch
> Abstract for browser or node.

## installation
```bash
npm install -S @feizheng/next-fetch
```

## apis
| api     | params                               | description    |
| ------- | ------------------------------------ | -------------- |
| request | (inUrl, inMethod, inData, inOptions) | The entry api  |
| get     | (inUrl, inData, inOptions)           | The get api    |
| post    | (inUrl, inData, inOptions)           | The post api   |
| delete  | (inUrl, inData, inOptions)           | The delete api |
| put     | (inUrl, inData, inOptions)           | The put api    |
| head    | (inUrl, inData, inOptions)           | The head api   |
| patch   | (inUrl, inData, inOptions)           | The patch api  |

## options
| option       | type        | default               | description                       |
| ------------ | ----------- | --------------------- | --------------------------------- |
| fetch        | Function    | require('node-fetch') | Defult fetch implement            |
| dataType     | String      | json                  | json/raw/urlencoded/multipart     |
| delay        | Number      | 0                     | The every request delay timer(ms) |
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
