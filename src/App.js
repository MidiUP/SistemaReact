import { BrowserRouter, Routes } from 'react-router-dom'
import MyRoutes from './routes'
import AuthProvider from './contexts/auth';
import 'toastr/build/toastr.min.css'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
