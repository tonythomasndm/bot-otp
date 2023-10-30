import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import BuyNumber from './pages/BuyNumber';
import AddBalance from './pages/AddBalance';
import NumberHistory from './pages/NumberHistory';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App bg-[#E1EEFE]">
      <Router>
				<Header />
				<Routes>
					<Route path='/' element={<Login/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/buy-number' element={<BuyNumber />} />
          <Route path='/add-balance' element={<AddBalance />} />
					<Route path='/number-history' element={<NumberHistory />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
				<Footer />
			</Router>
    </div>
  );
}

export default App;
