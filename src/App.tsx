import { LanguageProvider } from './Pages/PortfolioPage/LanguageContext';
import { PortfolioPage } from './Pages/PortfolioPage/PortfolioPage';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <PortfolioPage />
    </LanguageProvider>
  );
}

export default App;
