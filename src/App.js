import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './AppRoutes';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function App() {
  
  const isAdminLoggedIn = Cookies.get('userAuthFashioBlogModerator');
  

  useEffect(() => {
    
  }, []);



  const headerComponent = isAdminLoggedIn ? null : <Header />;
  const footerComponent = isAdminLoggedIn ? null : <Footer />;
  const accessUserRoute = isAdminLoggedIn ? null : <AppRoutes />;

  return (
    <div className="main-wrapper">
      { headerComponent }

      { accessUserRoute }
      
      { footerComponent }
    </div>
  );
}

export default App;
