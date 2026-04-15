import { useAuth } from './context/AuthContext';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Toastboard';
import './style/style.css';

function App() {
  const { user } = useAuth();

  return (
    <>
      {user ? <Dashboard /> : <Auth />}
    </>
  );
}

export default App;