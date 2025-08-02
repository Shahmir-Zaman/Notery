'use client';

import { Notes } from '@prisma/client';

type Props = {
  notes: Notes[];
};

function SidebarGroupContent({ notes }: Props) {
  console.log(notes);
  return <div>Your notes here</div>;
}

export default SidebarGroupContent;
