import Foo from "./Foo";

function App() {
  var i = 1+2;
  return (
    <div>
      <Foo a="1" b="a" c={i} />
      <Foo a="2" b="b" c={i+1} />
      <Foo a="3" b="c" c={i+1} />
    </div>
  );
}

export default App;