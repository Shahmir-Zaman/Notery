'use client';

import useNote from '@/hooks/useNote';
import { Notes } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SidebarMenuButton } from './ui/sidebar';
import Link from 'next/link';

type Props = {
  note: Notes;
};

function SelectNoteButton({ note }: Props) {
  const noteId = useSearchParams().get('noteId') || '';
  const { noteText: selectedNoteText } = useNote();
  const [shouldUseGlobalNoteText, setShouldUseGlobalNoteText] = useState(false);
  const [localNoteText, setLocalNoteText] = useState(note.text);

  useEffect(() => {
    if (noteId === note.id) {
      setShouldUseGlobalNoteText(true);
    } else {
      setShouldUseGlobalNoteText(false);
    }
  }, [noteId, note.id]);

  useEffect(() => {
    if (shouldUseGlobalNoteText) {
      setLocalNoteText(selectedNoteText);
    }
  }, [selectedNoteText, shouldUseGlobalNoteText]);

  // Helper function to extract the first line as title
  const getFirstLineAsTitle = (text: string): string => {
    if (!text || text.trim() === '') {
      return 'EMPTY NOTE';
    }

    const firstLine = text.split('\n')[0].trim();
    return firstLine || 'EMPTY NOTE';
  };

  let noteText = localNoteText || '';
  if (shouldUseGlobalNoteText) {
    noteText = selectedNoteText || '';
  }

  const noteTitle = getFirstLineAsTitle(noteText);

  return (
    <SidebarMenuButton
      asChild
      className={`items-start gap-0 pr-12 ${note.id === noteId && 'bg-sidebar-accent/50}'}`}
    >
      <Link href={`/?noteId=${note.id}`} className="flex h-fit flex-col">
        <p className="w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
          {noteTitle}
        </p>
        <p className="text-muted-foreground text-xs">
          {note.updatedAt.toLocaleDateString()}
        </p>
      </Link>
    </SidebarMenuButton>
  );
}

export default SelectNoteButton;
