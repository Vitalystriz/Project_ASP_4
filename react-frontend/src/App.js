import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/*epic 1*/}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/*epic 2*/}
        <Route path="/restaurants" element={<ProtectedRoute><Restaurants /></ProtectedRoute>} />
        <Route path="/restaurant/:id" element={<ProtectedRoute><RestaurantPage /></ProtectedRoute>} />
        {/*epic 2+3*/}
        <Route path="/restaurant/:id/products" element={<ProtectedRoute><ProductCard /></ProtectedRoute>} />
        {/*epic 3*/}
        <Route path="/orders" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
        <Route path="/historyOrders" element={<ProtectedRoute><HistoryOrdersPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
