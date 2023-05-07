import { CookiesProvider } from 'react-cookie';
import Router from './components/Router';

export default function App() {
  
  return (
    <CookiesProvider>
      <Router></Router>
    </CookiesProvider>
  );
}
