import { useState } from 'react';
import ReportForm from './components/ReportForm';
import MapView from './components/MapView';
import ReportList from './components/ReportList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('report');

  const renderContent = () => {
    switch (activeTab) {
      case 'report':
        return <ReportForm onSubmitSuccess={() => setActiveTab('map')} />;
      case 'map':
        return <MapView />;
      case 'list':
        return <ReportList />;
      default:
        return <ReportForm />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-100">
      <nav className="bg-background-darker backdrop-blur-sm border-b border-surface/30 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 sm:py-0 sm:h-16">
            <div className="flex items-center">
              <img
                src="/src/assets/Green_Guardian_logo_.png"
                alt="Green Guardian"
                className="h-16 sm:h-14 w-auto"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <button
                onClick={() => setActiveTab('report')}
                className={`px-3 py-2 text-sm sm:text-base sm:px-4 rounded-lg transition-all duration-200 ${
                  activeTab === 'report'
                    ? 'bg-primary text-white shadow-glow'
                    : 'text-gray-300 hover:bg-surface hover:text-white'
                }`}
              >
                Report Issue
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-3 py-2 text-sm sm:text-base sm:px-4 rounded-lg transition-all duration-200 ${
                  activeTab === 'map'
                    ? 'bg-primary text-white shadow-glow'
                    : 'text-gray-300 hover:bg-surface hover:text-white'
                }`}
              >
                View Map
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`px-3 py-2 text-sm sm:text-base sm:px-4 rounded-lg transition-all duration-200 ${
                  activeTab === 'list'
                    ? 'bg-primary text-white shadow-glow'
                    : 'text-gray-300 hover:bg-surface hover:text-white'
                }`}
              >
                View List
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <div className="backdrop-blur-sm bg-surface/30 rounded-2xl p-6 shadow-xl">
          {renderContent()}
        </div>
      </main>
      <footer className="w-full py-6 mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm font-light">
            Developed by{' '}
            <a 
              href="https://github.com/Angelel02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition-colors duration-200"
            >
              Angelos Eleftheriou
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
