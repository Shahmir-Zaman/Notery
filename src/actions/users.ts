'use server';

import { createClient } from '@/auth/server';
import { prisma } from '@/db/prisma';
import { handleError } from '@/lib/utils';
import { AuthApiError } from '@supabase/supabase-js';

// A more specific error handler for Supabase Auth errors
const handleAuthError = (error: unknown) => {
  if (error instanceof AuthApiError) {
    switch (error.message) {
      case 'Invalid login credentials':
        return { errorMessage: 'Invalid email or password. Please try again.' };
      case 'Password should be at least 6 characters':
        return { errorMessage: 'Password must be at least 6 characters long.' };
      case 'User already registered':
        return {
          errorMessage: 'A user with this email already exists. Please log in.',
        };
      default:
        return {
          errorMessage: 'An authentication error occurred. Please try again.',
        };
    }
  }
  // Fallback for other types of errors, including Prisma's unique constraint
  if (
    error instanceof Error &&
    error.message.includes('Unique constraint failed')
  ) {
    return {
      errorMessage: 'A user with this email already exists. Please log in.',
    };
  }
  return handleError(error);
};

export const loginAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleAuthError(error);
  }
};

export const logOutAction = async () => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const signUpAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();

    const { data, error } = await auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error('Error signing up');

    // add user to databse
    await prisma.user.create({
      data: {
        id: userId,
        email: email,
      },
    });
    return { errorMessage: null };
  } catch (error) {
    return handleAuthError(error);
  }
};
