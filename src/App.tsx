import { Toaster } from 'react-hot-toast'
import LoadingFetch from './components/LoadingFetch/LoadingFetch'
import { useRoutes } from 'react-router-dom'
import routes from './routes/routes'
import axios from 'axios';

axios.defaults.baseURL = 'https://dummyjson.com';

function App() {
  const route = useRoutes(routes);

  return (
    <>
      {route}
      <LoadingFetch />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
