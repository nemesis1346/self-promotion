import React, { Component, createRef } from "react";
import { Route, Routes, HashRouter, useLocation } from "react-router-dom"; // Import Routes
import NavBar from "./components/navigation/NavBar";
import HomePage from "./components/pages/HomePage";
import BlogFirebasePage from './components/pages/BlogFirebasePage';
import SoftwareProjectsPage from './components/pages/SoftwareProjectsPage';
import WebDesignProjectsPage from './components/pages/WebDesignProjectsPage';
import AboutMePage from './components/pages/AboutMePage';
import ServicesPage from './components/pages/ServicesPage';
import 'materialize-css/dist/css/materialize.min.css';
import './components/styles/App.css';

// The services page (home) has its own header, so the old navbar is hidden there.
const SERVICES_PATHS = ["/", "/services"];
const KNOWN_PATHS = ["/softwareProjectsPage", "/webDesignProjectsPage", "/blogFirebasePage", "/aboutMePage", "/home"];
function NavBarOutsideServices(props) {
  const { pathname } = useLocation();
  const isServices = SERVICES_PATHS.includes(pathname) || !KNOWN_PATHS.includes(pathname);
  return isServices ? null : <NavBar {...props} />;
}

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      isNavbarOpen: false,  //track if the navbar is expanded
      marginTop: 0
    };
  }


  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // Reset the pushed-down margin when the viewport grows back to desktop width
  // (Bootstrap lg breakpoint = 992px, where the burger menu disappears)
  handleResize = () => {
    if (window.innerWidth >= 992 && this.state.marginTop > 0) {
      this.setState({ isNavbarOpen: false, marginTop: 0 });
    }
  }

  toggleNavbar = () => {
    this.setState((prevState) => ({
      isNavbarOpen: !prevState.isNavbarOpen
    }))
  }

  //Function to dynamically set margin-top of main content
  updateMarginTop = (height) => {
    this.setState({ marginTop: height })
  }

  render() {

    return (
      <HashRouter>
        <div className="App">
          <NavBarOutsideServices
            isNavbarOpen={this.state.isNavbarOpen}
            onToggle={this.toggleNavbar}
            updateMarginTop={this.updateMarginTop} />
          <main className="main-content" style={{ marginTop: this.state.marginTop }}>
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
        </div>
      </HashRouter>
    );
  }
}

export default App;
