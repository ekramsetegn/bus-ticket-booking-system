import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import './App.css';
import './Home.css';
import About from './Component/About';
import Contact from './Component/Contact';
import LoginUser from './Component/LoginUser';
import LoginAdmin from './Component/LoginAdmin';
import SignupUser from './Component/SignUpUser';
import UserDashboard from './Component/UserDashboard';
import BusList from './Component/BusList';
import MyBookings from './Component/MyBookings';
import AddBus from './Component/AddBus';
import AdminBuses from './Component/AdminBuses';
import RequireAdmin from './Component/RequireAdmin';
import NotAuthorized from './Component/NotAuthorized';
import SelectPassengers from './Component/SelectPassengers';
import PassengerForm from './Component/PassengerForm';
import Payment from './Component/Payment';
import AdminUsers from './Component/AdminUsers';
import AdminBookings from './Component/AdminBookings';
import MainLayout from './Component/AdminLayout';
import Footer from './Component/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('/bus.jpg')]">
      
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-black/60 backdrop-blur-md text-white shadow-md z-50">
        <div className="flex items-center gap-3">
          <img src="./Images/ethiogo.png" alt="EthioGo Logo" className="w-20 h-10 rounded-full shadow-md" />
          <h1 className="text-2xl font-extrabold tracking-wide font-serif">EthioGo</h1>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="https://www.ethio_go.com/" className="hover:text-yellow-400">Home</a>
          <a href="/about" className="hover:text-yellow-400">About</a>
          <a href="/contact" className="hover:text-yellow-400">Contact</a>
          <Link
            to="/login"
            className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300 transition"
          >
            Log In
          </Link>
        </nav>
      </header>
      
      {/* Welcome Section */}
      <div className="flex flex-col items-center justify-center text-center h-screen text-white px-4 bg-black/40 backdrop-blur-sm">
        <h1 className="text-4xl md:text-6xl font-bold animate-fade-in">
          Welcome to <span className="text-yellow-400">EthioGo</span>
        </h1>
        <p className="text-lg md:text-xl mt-4 max-w-xl text-gray-200">
          Fast, easy and reliable ticket reservations across Ethiopia.
        </p>
        <Link
          to="/login"
          className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 shadow-lg transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
      <h1 className="text-4xl font-bold mb-8 animate-fade-in">Select Login Type</h1>
      <div className="flex flex-wrap gap-10 justify-center">
        <div
          className="bg-white bg-opacity-90 text-black p-8 rounded-xl shadow-2xl text-center w-64 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-yellow-400/50 duration-300 animate-fade-in"
          onClick={() => navigate("/login-user")}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="User" className="w-20 h-20 mx-auto mb-4 rounded-full shadow-md" />
          <p className="font-semibold text-lg">User Login</p>
        </div>

        <div
          className="bg-white bg-opacity-90 text-black p-8 rounded-xl shadow-2xl text-center w-64 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-red-400/50 duration-300 animate-fade-in"
          onClick={() => navigate("/login-admin")}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="Admin" className="w-20 h-20 mx-auto mb-4 rounded-full shadow-md" />
          <p className="font-semibold text-lg">Admin Login</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const AppWrapper = () => {
    const location = useLocation();
    const hideFooter = location.pathname.startsWith('/admin');
    return (
      <>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-user" element={<LoginUser />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/signup-user" element={<SignupUser />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/buses" element={<BusList />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/select-passengers" element={<SelectPassengers />} />
          <Route path="/passengers" element={<PassengerForm />} />
          <Route path="/payment" element={<Payment />} />

          {/* Admin Routes*/}
          <Route path="/admin/buses" element={
            <RequireAdmin>  <AdminBuses /> </RequireAdmin>
          } />
          <Route path="/admin/add-bus" element={
            <RequireAdmin>
              <MainLayout><AddBus /></MainLayout>
            </RequireAdmin>
          } />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/admin/users" element={
  <RequireAdmin>
    <MainLayout><AdminUsers /></MainLayout>
  </RequireAdmin>
} />

<Route path="/admin/bookings" element={
  <RequireAdmin>
    <MainLayout><AdminBookings /></MainLayout>
  </RequireAdmin>
} />

        </Routes>

        {/* Only show footer on non-admin pages */}
        {!hideFooter && <Footer />}
      </>
    );
  };
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
