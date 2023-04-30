import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '@pages/ErrorPage';
import Home from '@pages/Home';

const rootRouter = createBrowserRouter([
  {
    path: '',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

export default rootRouter;
