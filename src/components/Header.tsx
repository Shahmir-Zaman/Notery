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
            <LogOutButton />
            <DarkModeToggle />
          </>
        ) : (
          <>
            <Collapsible>
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
              <CollapsibleTrigger asChild className="sm:hidden">
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  ☰
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-popover absolute top-full right-0 z-50 mt-1 rounded-md border p-2 shadow-lg sm:hidden">
                <div className="flex min-w-[140px] flex-col gap-1">
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
            <DarkModeToggle />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
