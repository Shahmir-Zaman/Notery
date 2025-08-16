import { shadow } from '@/styles/utils';
import Link from 'next/link';
import { Button } from './ui/button';
import { DarkModeToggle } from './DarkModeToggle';
import LogOutButton from './LogOutButton';
import { getUser } from '@/auth/server';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { ThemeLogo } from './ThemeLogo';
import { SidebarTrigger } from './ui/sidebar';

async function Header() {
  const user = await getUser();

  return (
    <header
      className="bg-popover relative flex h-20 w-full items-center px-3 transition-colors duration-500 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      {/* Left side - Sidebar trigger */}
      <div className="flex items-center">
        <SidebarTrigger className="hover:bg-accent size={32} h-10 w-10 rounded-md" />
      </div>

      {/* Center - Logo and Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link href="/" className="flex items-center gap-3">
          <ThemeLogo />
          <h1 className="text-3xl leading-6 font-semibold transition-colors duration-500 sm:text-4xl">
            Notery
          </h1>
        </Link>
      </div>

      {/* Right side - User actions */}
      <div className="ml-auto flex items-center gap-2">
        {user ? (
          <>
            {/* When logged in - show user menu */}
            {/* Desktop view - show logout button inline */}
            <div className="hidden gap-2 sm:flex">
              <LogOutButton />
              <DarkModeToggle />
            </div>

            {/* Mobile view - user dropdown menu */}
            <div className="relative sm:hidden">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-popover absolute top-full right-0 z-50 mt-2 w-40 rounded-md border p-2 shadow-lg">
                  <div className="flex flex-col gap-1">
                    <LogOutButton className="h-8 w-full justify-center text-sm" />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <DarkModeToggle />
          </>
        ) : (
          <>
            {/* When NOT logged in - show sign up/login options */}
            {/* Desktop view - show buttons inline */}
            <div className="hidden gap-2 sm:flex">
              <Button
                asChild
                size="sm"
                className="h-9 px-4 text-sm font-medium"
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-9 px-4 text-sm font-medium"
              >
                <Link href="/login">Login</Link>
              </Button>
            </div>

            {/* Mobile view - dropdown menu (only when NOT logged in) */}
            <div className="relative sm:hidden">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-popover absolute top-full right-0 z-50 mt-2 w-40 rounded-md border p-2 shadow-lg">
                  <div className="flex flex-col gap-1">
                    <Button
                      asChild
                      size="sm"
                      className="h-8 w-full justify-start text-sm"
                    >
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-8 w-full justify-start text-sm"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <DarkModeToggle />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
