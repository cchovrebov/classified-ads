import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import PostsPage from "./pages/Posts/PostsList/PostsPage";
import PostCreatePage from "./pages/Posts/PostCreate/PostCreatePage";
import SignIn from "./pages/Sign-in/SignIn";
import SignUp from "./pages/Sign-up/SignUp";
import Page404 from "./pages/Error/404";
import CategoriesList from "./pages/Cotegories/CategoriesList/CategoriesList";
import { useSelector } from 'react-redux'

function App() {
  const userReducer = useSelector((state) => state.userReducer);
  const isAuthenticated = !!userReducer.token;

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ?

          <>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </>
          :
          <>
            <Route path="/" element={<PostsPage />} />
            <Route path="/create-ad" element={<PostCreatePage />} />
            <Route path="/liked" element={<PostsPage />} />
            <Route path="/approve" element={<PostsPage />} />
            <Route path="/categories" element={<CategoriesList />} />
          </>
        }
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;