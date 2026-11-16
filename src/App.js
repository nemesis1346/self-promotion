import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import SiteHeader, { SiteFooter } from "./components/navigation/SiteHeader";
import HomePage from "./components/pages/HomePage";
import BlogFirebasePage from './components/pages/BlogFirebasePage';
import SoftwareProjectsPage from './components/pages/SoftwareProjectsPage';
import WebDesignProjectsPage from './components/pages/WebDesignProjectsPage';
import AboutMePage from './components/pages/AboutMePage';
import ServicesPage from './components/pages/ServicesPage';
import { LangProvider } from './content/LangContext';
import 'materialize-css/dist/css/materialize.min.css';
import './components/styles/App.css';
import './components/styles/servicesPage.css';

// Every page shares the light "svc" theme, the site header (FR/EN switch) and the footer.
function App() {
  return (
    <LangProvider>
      <HashRouter>
        <div className="App svc">
          <SiteHeader />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ServicesPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/softwareProjectsPage" element={<SoftwareProjectsPage />} />
              <Route path="/webDesignProjectsPage" element={<WebDesignProjectsPage />} />
              <Route path="/blogFirebasePage" element={<BlogFirebasePage />} />
              <Route path="/aboutMePage" element={<AboutMePage />} />
              <Route path="*" element={<ServicesPage />} />
            </Routes>
          </main>
          <SiteFooter />
        </div>
      </HashRouter>
    </LangProvider>
  );
}

export default App;
