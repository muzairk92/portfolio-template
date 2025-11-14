import Header from './components/Header';
import Hero from './components/Hero';
import './styles/app.css';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
