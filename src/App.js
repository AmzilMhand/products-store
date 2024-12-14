import ProductsList from "./components/ProductsList";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from './components/Footer';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
        <Route path="/" element={<Home />} />

          <Route path="/products" element={<ProductsList />} />
          <Route path="/single/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;
