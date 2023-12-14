import './App.css'
import Header from './components/Header';
import DataFetcher from './components/PlayersFetcher';
import Footer from './components/Footer';
import CristianoRonaldo from './components/Cristiano';

function App() {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex-1 overflow-y-auto pr-4'>
        <DataFetcher />
        <CristianoRonaldo />
        <Footer />
      </div>
    </div>
    
  ) ;
}

export default App;
