import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import HomePage from "./components/pages/HomePage";
import BlogFirebasePage from './components/pages/BlogFirebasePage';
import BlogDjangoPage from './components/pages/BlogDjangoPage';
import ProjectsPage from './components/pages/ProjectsPage';
import CarouselPage from './components/pages/CarouselPage';
import AboutMePage from './components/pages/AboutMePage';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <NavBar />
          <Route path="/" exact component={HomePage} />
          <Route path="/blogFirebasePage" exact component={BlogFirebasePage} />
          <Route path = "/blogDjangoPage" exact component = {BlogDjangoPage}></Route>
          <Route path = '/projects' exact component = {ProjectsPage}></Route>
          <Route path = '/aboutMe' exact component = {AboutMePage}></Route>
          <Route path = '/carousel' exact component = {CarouselPage}></Route>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
