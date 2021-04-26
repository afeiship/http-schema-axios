import NxFetch from '../../dist/index';
import res1 from './interceptors/response/res1';
import removeUrlField from './interceptors/response/remove-url-field';
import normalizeDate from './interceptors/response/normalize-date';
import trimNull from './interceptors/response/trim-null';

const http = NxFetch.getInstance({
  response: ({ url, config, data }) => {
    return data;
  },
  interceptors: [
    { type: 'response', fn: res1 },
    { type: 'response', fn: removeUrlField },
    { type: 'response', fn: normalizeDate },
    { name: 'trim-nil', type: 'response', fn: trimNull }
  ]
});

// console.log(http);

function App() {
  // console.log(NxFetch);
  return (
    <div className="App">
      Hello App
      <button
        onClick={(e) => {
          const res = http
            .get('https://api.github.com/users/afeiship', { timeout: 10 * 1000, cancelable: true })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              if (err.type === 'timeout') {
                res.cancel();
                console.log(err);
              }
            });
        }}>
        Get api
      </button>
    </div>
  );
}

export default App;
