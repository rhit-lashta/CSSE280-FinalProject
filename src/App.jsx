import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login.jsx';
import Listings from './Listings.jsx';
import ItemPage from './ItemPage.jsx';
import Profile from './Profile.jsx';
import YourListings from './YourListings.jsx';
import AddListing from './AddListing.jsx';
import PriceHistory from './PriceHistory.jsx';

function App() {
    return (
      <>
        <nav id="mainBanner">
          <img src="/images/testImage.jpg" alt = "testImage" style={{ height: '60px', margin: '10px' }}/>
          <Link to="/">Login</Link>
          <Link to="/listings">Listings</Link>
          <Link to="/listings/itemPage">Item Page</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/profile/yourListings">Listings</Link>
          <Link to="/profile/yourListings/addListing">AddListing</Link>
          <Link to="/priceHistory">PriceHistory</Link>
        </nav>
  
        <nav id="main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/itemPage" element={<ItemPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/yourListings" element={<YourListings />} />
          <Route path="/profile/yourListings/addListing" element={<AddListing />} />
          <Route path="/priceHistory" element={<PriceHistory />} />
        </Routes>
        </nav>
      </>
    );
  }

export default App;