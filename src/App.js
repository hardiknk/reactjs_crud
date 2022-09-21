// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Category from './components/category/Category';
import Post from './components/post/Post';
import NoPage from './components/NoPage';
import Home from './components/Home';
import AddCategory from './components/category/AddCategory';
import EditCategory from './components/category/EditCategory';
import AddPost from './components/post/AddPost';
import EditPost from './components/post/EditPost';

function App() {
  return (
    // <div className='container'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} >
          <Route index path='home' element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="edit-category/:id" element={<EditCategory />} />

          <Route path="post" element={<Post />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="edit-post/:id" element={<EditPost />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
