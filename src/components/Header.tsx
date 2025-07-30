"use client"

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useTheme } from 'next-themes'
import { shadow } from '@/styles/utils'
import { Button } from './ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { DarkModeToggle } from './DarkModeToggle';
import LogOutButton from './LogOutButton'

function Header() {
  const user = 1;
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Use resolvedTheme to get the actual theme (handles 'system' theme)
  const isDark = mounted ? resolvedTheme === 'dark' : false
  const logoSrc = isDark ? '/Notery_Logo_Light.png' : '/Notery_Logo_Dark.png'

  return (
    <header className='relative flex h-20 w-full items-center justify-between bg-popover px-3 sm:px-8' style={{ boxShadow: shadow }}>
      <Link href="/" className='flex items-center gap-3'>
        <Image src={logoSrc} height={48} width={48} alt={'logo'} className=''></Image>
        <h1 className='text-4xl font-semibold font-semibold leading-6 bitcount ml-2 '>
          Notery
        </h1>
      </Link>
      <div className="flex gap-4">
        {user ? (
          <LogOutButton/>
        ) : (
          <Collapsible>
            <div className="hidden sm:flex gap-4">
              <Button asChild className="bitcount-single">
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button asChild variant="outline" className="bitcount-single">
                <Link href="/login">Login</Link>
              </Button>
            </div>
            <CollapsibleTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="lg" className="text-xl">☰</Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="sm:hidden absolute top-full right-0 bg-popover border rounded-md shadow-lg p-4 z-50">
              <div className="flex flex-col gap-2 min-w-[150px]">
                <Button asChild className="bitcount-single w-full">
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <Button asChild variant="outline" className="bitcount-single w-full">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
        <DarkModeToggle />
      </div>
    </header>
  )
}




export default Header