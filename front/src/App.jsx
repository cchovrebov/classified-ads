import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import PostsPage from "./pages/Posts/PostsList/PostsPage";
import SignIn from "./pages/Sign-in/SignIn";
import SignUp from "./pages/Sign-up/SignUp";
import Page404 from "./pages/Error/404";
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
          </>
        }
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;