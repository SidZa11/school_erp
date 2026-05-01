import { useRoutes } from 'react-router'
import Routes from './Routes';

function App() {
  const content = useRoutes(Routes);
  return content
}

export default App
