import "./App.css";
// import Routes from './Routes';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import BehaviorToDo from "./pages/BehaviorToDo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginSignup from "./pages/LoginSignup";
import AuthRoute from "./components/AuthRoute";

function App() {
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />;

  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route
          index
          path="/login"
          element={<LoginSignup formName={"Login"} />}
        />
        <Route
          index
          path="/signup"
          element={<LoginSignup formName={"Signup"} />}
        />
        <Route
          index
          path="/behaviour/:name"
          element={
            <AuthRoute>
              <BehaviorToDo />
            </AuthRoute>
          }
        />
      </Routes>
      <Routes />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
