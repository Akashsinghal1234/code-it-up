import "./App.css";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { AppBar } from "./components/AppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Courses from "./components/Courses";
import UpdateCourse from "./components/UpdateCourse";
import Home from "./components/Home";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "./store/atom/user";
import PurchasedCourses from "./components/PurchasedCourses";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./config";
function App() {
  return (
    <RecoilRoot>
      <div
        style={{
          backgroundColor: "white",
          width: "100vw",
          minHeight: "100vh",
          maxHeight: "100%",
        }}
      >
        <Router>
          <InitUser />
          <AppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/purchasedCourses" element={<PurchasedCourses />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<UpdateCourse />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

const InitUser = () => {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (error) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
};
export default App;
