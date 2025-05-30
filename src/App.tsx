import { useState } from 'react';
import ReportForm from './components/ReportForm';
import MapView from './components/MapView';
import ReportList from './components/ReportList';
import logo from './assets/Green_Guardian_logo_.png';
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
                src={logo}
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
          <div className="flex flex-col items-center gap-2">
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
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com/in/angelos-eleftheriou/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5"
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/Angelel02" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
                aria-label="GitHub Profile"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5"
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
