import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback="Loading...">
      <h1>Hello world!</h1>
    </Suspense>
  );
}

export default App;
