'use client';

import { Notes } from '@prisma/client';
import {
  SidebarGroupContent as SidebarGroupContentShadCN,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import SelectNoteButton from './SelectNoteButton';
import DeleteNoteButton from './DeleteNoteButton';

type Props = {
  notes: Notes[];
};

function SidebarGroupContent({ notes }: Props) {
  const [searchText, setSearchText] = useState('');
  const [localNotes, setLocalNotes] = useState(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [searchText, notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ['text'],
      threshold: 0.4,
    });
  }, [localNotes]);

  const filteredNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId)
    );
  };

  return (
    <SidebarGroupContentShadCN>
      <div className="relative flex items-center">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          className="bg-muted pl-10"
          placeholder="Search Your Notes...."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <SidebarMenu className="mt-4">
        {filteredNotes.map((notes) => (
          <SidebarMenuItem key={notes.id} className="group/item">
            <SelectNoteButton note={notes} />
            <DeleteNoteButton
              noteId={notes.id}
              deleteNoteLocally={deleteNoteLocally}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContentShadCN>
  );
}

export default SidebarGroupContent;
