import { RouterProvider } from 'react-router-dom';

import rootRouter from '@routers/root.router';

function App() {
  return <RouterProvider router={rootRouter} />;
}

export default App;
