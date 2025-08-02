import { getUser } from '@/auth/server';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { prisma } from '@/db/prisma';
import { Notes } from '@prisma/client';
import Link from 'next/link';
import SidebarGroupContent from './SidebarGroupContent';

async function AppSidebar() {
  const user = await getUser();
  let all_notes: Notes[] = [];
  if (user) {
    all_notes = await prisma.notes.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
  return (
    <Sidebar>
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="bitcount mt-2 mb-2 text-3xl font-bold">
            {user ? (
              'Your Notes'
            ) : (
              <p>
                <Link href="/login" className="underline">
                  Login
                </Link>{' '}
                to see your notes
              </p>
            )}
          </SidebarGroupLabel>
          {user && <SidebarGroupContent notes={all_notes} />}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
