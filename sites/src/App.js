import NxFetch from '../../dist/index';

const http = NxFetch.getInstance();

function App() {
  // console.log(NxFetch);
  return (
    <div className="App">
      Hello App
      <button
        onClick={(e) => {
          http.get('https://api.github.com/users/afeiship', { cancelable: true }).then((res) => {
            console.log(res);
          });
        }}>
        Get api
      </button>
    </div>
  );
}

export default App;
