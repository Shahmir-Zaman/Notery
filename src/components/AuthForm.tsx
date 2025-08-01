'use client';

import { toast } from 'sonner';
import { CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useTransition } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { loginAction, signUpAction } from '@/actions/users';
import { useRouter } from 'next/navigation';

type Props = {
  type: 'login' | 'signUp';
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === 'login';

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        let result;
        if (isLoginForm) {
          result = await loginAction(email, password);
        } else {
          result = await signUpAction(email, password);
        }

        if (result?.errorMessage) {
          toast.error(result.errorMessage);
        } else {
          const successMessage = isLoginForm
            ? 'Logged in successfully!'
            : 'Check your email for confirmation link';
          toast.success(successMessage);
          router.replace('/');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            'Login'
          ) : (
            'Sign Up'
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm
            ? "Don't have an account yet?"
            : 'Already have an account?'}{' '}
          <Link
            href={isLoginForm ? '/sign-up' : '/login'}
            className={`text-blue-500 underline ${isPending ? 'pointer-events-none opacity-50' : ''}`}
          >
            {isLoginForm ? 'Sign Up' : 'Login'}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
