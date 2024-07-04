import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import GeminiModel from './components/GeminiModel/Geminimodel';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Intro from './components/Intro/Intro';
const clerkKey = 'pk_test_aW1tZW5zZS1tb2xseS00OC5jbGVyay5hY2NvdW50cy5kZXYk';
import Pform from './components/Pform/Pform';
import { Toaster, toast } from 'sonner'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Ddashboard from './components/Ddashboard/Ddashboard';
import Pdashboard from './components/Pdashboard/Pdashboard';

function App() {

  const user = useSelector(state=>state.data.user);

  return (
    <>
      <Toaster />
      <BrowserRouter >
        <Header />
        <Routes>
          <Route path='/' element={<Intro />} />
          <Route path='/geminiModel' element={<GeminiModel />} />
          <Route path='/registration' element={<Pform />} />
          <Route path='/dashboard' element={ user ? user.role === 'doctor' ? <Ddashboard /> : <Pdashboard /> : <></> } />
          <Route path='*' element={
            <div>
              <h1>404</h1>
            </div>
          } />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App;