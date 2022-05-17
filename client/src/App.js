import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Routes} from "react-router-dom";
import Main from './views/Main';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';
import AddProduct from './components/AddProduct';
// import ShowProducts from './components/ShowProducts';
import ProductDetail from './components/ProductDetails';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>} default />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/show-products" element={<ShowProducts />} /> */}
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/new-post/:id" element={<NewPost />} />
          <Route path="/details/:id" element={<ProductDetail />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
