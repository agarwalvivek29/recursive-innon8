import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { ClerkProvider } from '@clerk/clerk-react';
import { useUser, RedirectToSignIn, SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const clerkKey = 'pk_test_aW1tZW5zZS1tb2xseS00OC5jbGVyay5hY2NvdW50cy5kZXYk';

function App() {

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
    
  )
}

export default App;