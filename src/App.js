import './App.css';
import Header from './components/Header';
import DataFetcher from './components/PlayersFetcher';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <DataFetcher />
        <Footer />
      </div>
    </div>
  );
}

export default App;
