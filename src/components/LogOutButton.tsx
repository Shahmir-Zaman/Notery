'use client';

import { logOutAction } from '@/actions/users';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

function LogOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogOut = async () => {
    setLoading(true);
    const result = await logOutAction();

    if (!result.errorMessage) {
      toast.success('Logged Out Successfully!', {
        description: 'You have been logged out of your account.',
      });
      router.push('/');
    } else {
      toast.error(result.errorMessage);
    }
    setLoading(false);
  };
  return (
    <Button
      variant="outline"
      onClick={handleLogOut}
      className="w-24"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : 'Log Out'}
    </Button>
  );
}

export default LogOutButton;
