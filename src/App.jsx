import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login.jsx';
import Listings from './Listings.jsx';
import ItemPage from './ItemPage.jsx';
import Profile from './Profile.jsx';
import YourListings from './YourListings.jsx';
import AddListing from './AddListing.jsx';
import PriceHistory from './PriceHistory.jsx';

// Sources 
// - https://react.dev/reference/react/useEffect
// - https://react.dev/reference/react/useState
// - https://learn.zybooks.com/zybook/ROSEHULMANCSSE280Fall2025 
// - https://react.dev/reference/react 
// - https://stackoverflow.com/questions
// - https://mui.com/x/react-charts/quickstart/#peer-dependencies 


function App() {
    return (
      <>
        <nav id="mainBanner">
          <Link to="/">Login</Link>
          <Link to="/listings">Listings</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/userListings">Your Items</Link>
          <Link to="/addListing">Add Item</Link>
          <Link to="/priceHistory">Price History</Link>
        </nav>
  
        <nav id="main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/itemPage/*" element={<ItemPage />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/userListings/*" element={<YourListings />} />
          <Route path="/addListing" element={<AddListing />} />
          <Route path="/priceHistory" element={<PriceHistory />} />
        </Routes>
        </nav>
      </>
    );
  }

export default App;