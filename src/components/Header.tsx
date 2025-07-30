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

async function Header() {
  const user = await getUser();

  return (
    <header
      className="bg-popover relative flex h-20 w-full items-center justify-between px-3 transition-colors duration-500 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      <Link href="/" className="flex items-center gap-3">
        <ThemeLogo />
        <h1 className="bitcount ml-2 text-4xl leading-6 font-semibold transition-colors duration-500">
          Notery
        </h1>
      </Link>
      <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <Collapsible>
            <div className="hidden gap-4 sm:flex">
              <Button asChild className="bitcount-single">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button asChild variant="outline" className="bitcount-single">
                <Link href="/login">Login</Link>
              </Button>
            </div>
            <CollapsibleTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="lg" className="text-xl">
                ☰
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-popover absolute top-full right-0 z-50 rounded-md border p-4 shadow-lg sm:hidden">
              <div className="flex min-w-[150px] flex-col gap-2">
                <Button asChild className="bitcount-single w-full">
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bitcount-single w-full"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
