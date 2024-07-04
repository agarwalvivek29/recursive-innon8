import { useUser, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

export default function AuthBtn() {
    const user = useUser();

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