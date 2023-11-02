import './App.css';
import Login from './pages/LoginForm';
import Signup from './pages/SignupForm';
import Home from './pages/Home';
import MainPage from './pages/MainPage';
import Contact from './pages/Contact';
import About from './pages/Testimonial';
import Prices from './pages/Prices';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './pages/NotFound';
import PrivateRoutes from './PrivateRoutes';
import { PastPaperProvider } from './pages/PastPaperContext';
import TermsandConditions from './pages/TermsandConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DisableRightClick from './DisableRightClick';

function App() {
  return (
    <>
    <DisableRightClick />
    <PastPaperProvider>

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Prices />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/terms-and-condition" element={<TermsandConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>

    </PastPaperProvider>
    </>
  );
}

export default App;
