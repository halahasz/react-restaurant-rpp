import React from "react";
import "./index.css";
import AppContext from "./context";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MenuPage from "./pages/MenuPage/MenuPage";
import NewsPage from "./pages/NewsPage/NewsPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import soupImage from './assets/img/soup.jpg';
import friesImage from './assets/img/fries.jpg';
import ravioliImage from './assets/img/ravioli.jpg';

class App extends React.Component {
  initMenu = () => {
    const init = [
      {
        title: 'Creamy roasted beetroot soup with pear',
        price: '14zl',
        image: soupImage,
        ingredients: 'vegan cream, toasted pumpkin seeds'
      },
      {
        title: 'Herbal polenta fries',
        price: '12zl',
        image: friesImage,
        ingredients: 'mayo dip'
      },
    ];
    const data = (() => {
      if (sessionStorage["menu"] != null) {
        return JSON.parse(sessionStorage["menu"]);
      } else {
        return init;
      }
    })();

    this.setState({ menu: data });
  };

  componentDidMount() {
    this.initMenu();
  }
  initNews = () => {
    const data = (() => {
      if (sessionStorage["news"] != null) {
        return JSON.parse(sessionStorage["news"]);
      } else {
        return [];
      }
    })();

    this.setState({ news: data });
  };

  componentDidMount() {
    this.initNews();
  }
  initGallery= () => {
    const data = (() => {
      if (sessionStorage["gallery"] != null) {
        return JSON.parse(sessionStorage["gallery"]);
      } else {
        return [];
      }
    })();

    this.setState({ gallery: data });
  };

  componentDidMount() {
    this.initMenu();
    this.initNews();
    this.initGallery();
  }

  state = {
    menu: [],
    news: [],
    gallery: [],
    isModalOpen: false
  };

  addItem = (e, newItem) => {
    e.preventDefault();
    this.setState(prevState => ({
      [newItem.type]: [...prevState[newItem.type], newItem]
    }));
    this.closeModal();
    if (newItem.type == "menu") {
      return (sessionStorage["menu"] = JSON.stringify([
        ...this.state["menu"],
        newItem
      ]));
    } else if (newItem.type == "news") {
      return (sessionStorage["news"] = JSON.stringify([
        ...this.state["news"],
        newItem
      ]));
    } else {
      return (sessionStorage["gallery"] = JSON.stringify([
        ...this.state["gallery"],
        newItem
      ]));
    }
  };

  openModal = () => {
    this.setState({
      isModalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  render() {
    const { isModalOpen } = this.state;
    const contextElements = {
      ...this.state,
      addItem: this.addItem
    };
    return (
      <BrowserRouter>
        <AppContext.Provider value={contextElements}>
          <Header openModalFn={this.openModal} />
          <Switch>
            <Route exact path="/" component={MenuPage} />
            <Route path="/news" component={NewsPage} />
            <Route path="/gallery" component={GalleryPage} />
          </Switch>
          {isModalOpen && <Modal closeModalFn={this.closeModal} />}
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
