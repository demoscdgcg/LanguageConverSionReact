import logo from './logo.svg';
import './App.css';
import AppRouters from './AppRoutes';
import AppRoutes from './AppRoutes';
import AppLanguage from './util/AppLanguages';
import { useEffect } from 'react';
import i18n from './lang/i18n';

function App() {
  useEffect(() => {
    let language = AppLanguage.getDefaultLanguage();
    language = language === null ? "en" : language;
    i18n.changeLanguage(language);
  }, []);

  return (
    <div className="App">
      <p>Akash Bhol</p>
      <AppRoutes />
    </div>
  );
}

export default App;
