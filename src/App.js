import ProductsList from "./pages/ProductsPage/ProductsList";
import ProductDetails from "./pages/SingleProduct/ProductDetails";
import Header from "./components/Header/Header";
import Home from "./pages/HomePage/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from './components/Footer/Footer';
import About from "./pages/ComingSoonPages/About";
import Contact from "./pages/ComingSoonPages/Contact";
import Terms from "./pages/ComingSoonPages/Terms";
import Privacy from "./pages/ComingSoonPages/Privacy";
import Cart from "./pages/ComingSoonPages/Cart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
