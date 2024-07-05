import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

export default function AuthBtn() {

    return <>
        <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>  
}