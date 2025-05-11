
import { useState } from 'react';
import './App.css'
import EventList from './components/EventList'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import "@fontsource/inter/400.css";
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return <div className="min-h-screen bg-primary-50">
        <Navbar/>
        <main>
          <HeroSection currentPage={currentPage} />
          <EventList currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </main>
        <footer>
          <Footer/>
        </footer>
    </div>
}

export default App
