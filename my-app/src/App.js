import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Main from './Pages/Main';
import Design from './Pages/Design';
import MyShoes from './Pages/MyShoes';
import ProductDetails from './components/ProductDetails';
import Product from './components/Product';
import Shoe3D from './Pages/Shoe3D';
import Cart from "./components/Cart";
import { StateContextProvider } from "./context/StateContext";
import Landing from "./Pages/Landing";
import ResetPassword from "./components/ResetPassword";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <StateContextProvider>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Design" element={<Design />} />
          <Route path="/MyShoes" element={<MyShoes />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/Shoe3D" element={<Shoe3D />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path="/ResetPassword" element={<ResetPassword />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </StateContextProvider>
    </BrowserRouter>
  );
}

export default App;
