import AuthForm from '@/components/AuthForm';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

function SignUpPage() {
  return (
    <div className="mt-20 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="mb-4">
          <CardTitle className="bitcount text-center text-5xl font-medium">
            SignUp
          </CardTitle>
        </CardHeader>

        <AuthForm type="signUp" />
      </Card>
    </div>
  );
}

export default SignUpPage;
