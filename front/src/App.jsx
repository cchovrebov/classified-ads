import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import PostsPage from "./pages/Posts/PostsList/PostsPage";
import PostCreatePage from "./pages/Posts/PostCreate/PostCreatePage";
import PostEditPage from "./pages/Posts/PostEdit/PostEditPage";
import SignIn from "./pages/Sign-in/SignIn";
import SignUp from "./pages/Sign-up/SignUp";
import Page404 from "./pages/Error/404";
import PostsApprove from "./pages/Posts/PostsApprove/PostsApprove";
import PostView from './pages/Posts/PostView/PostView'
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
            <Route path="/create-post" element={<PostCreatePage />} />
            <Route path="/liked" element={<PostsPage />} />
            <Route path="/approve" element={<PostsApprove />} />
            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/post/:id" element={<PostView />} />
            <Route path="/post/:id/edit" element={<PostEditPage />} />
          </>
        }
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;