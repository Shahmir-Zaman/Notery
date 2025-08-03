import { getUser } from '@/auth/server';
import AskAIButton from '@/components/AskAIButton';
import NewNoteButton from '@/components/NewNoteButton';
import NoteTextInput from '@/components/NoteTextInput';
import { prisma } from '@/db/prisma';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const user = await getUser();

  // Redirect to login if user is not authenticated
  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold">
            Please log in to continue
          </h1>
          <p className="text-muted-foreground">
            You need to be authenticated to access your notes.
          </p>
        </div>
      </div>
    );
  }

  const noteIdParam = (await searchParams).noteId;

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || '';

  const note = await prisma.notes.findUnique({
    where: {
      id: noteId,
      authorId: user.id, // Now user is guaranteed to be non-null
    },
  });

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIButton user={user} />
        <NewNoteButton user={user} />
      </div>

      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ''} />
    </div>
  );
}

export default HomePage;
