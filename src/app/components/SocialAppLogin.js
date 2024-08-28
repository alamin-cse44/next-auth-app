'use client';

import { useRouter } from 'next/navigation';

const SocialAppLogin = () => {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    
  };

  const handleGithubSignIn = () => {
    
  };
  return (
    <div className="flex justify-between mb-4">
      <button onClick={handleGoogleSignIn} type="button" className="w-1/2 bg-red-600 text-white py-2 rounded mr-2">
        Sign up with Google
      </button>
      <button onClick={handleGithubSignIn} type="button" className="w-1/2 bg-black text-white py-2 rounded ml-2">
        Sign up with GitHub
      </button>
    </div>
  );
};

export default SocialAppLogin;