// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateQuestion from "./pages/CreateQuestion";
import Protected from "./utils/Protected"
import QuestionsList from "./pages/QuestionsList";
import QuestionDetails from "./pages/QuestionDetails";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {

  return (
    <>
    <ToastContainer
        position="top-right"   // top-left, bottom-right, bottom-left
        autoClose={3000}       // 3 sec baad band ho jayega
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"        // light, dark, colored
      />
      <AppRoutes /> 
    </>

    // <AuthProvider>
    // </AuthProvider>
    // <BrowserRouter>
    // <Navbar />
    //   <Routes>
    //     <Route path="/login" element={ <Protected> <Login /> </Protected> } />
    //     <Route path="/register" element={<Protected> <Register /> </Protected>} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route path="/ask" element={<CreateQuestion />} />
    //     <Route path="/questions" element={<QuestionsList />} />
    //     <Route path="/questions/:id" element={<QuestionDetails />} />
    //   </Routes>
    // </BrowserRouter>
  );
}
