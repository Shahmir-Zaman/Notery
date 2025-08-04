'use client';

import { User } from '@supabase/supabase-js';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Fragment, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Textarea } from './ui/textarea';
import { ArrowUpIcon } from 'lucide-react';
import { askAIAboutNoteAction } from '@/actions/notes';

type Props = {
  user: User;
};

function AskAIButton({ user }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push('/login');
    } else {
      if (isOpen) {
        setQuestionText('');
        setQuestions([]);
        setResponses([]);
      }
      setOpen(isOpen);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleClickInput = () => {
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!questionText.trim()) return;

    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText('');
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const response = await askAIAboutNoteAction(newQuestions, responses);
      setResponses((prev) => [...prev, response]);

      setTimeout(scrollToBottom, 100);
    });
  };

  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">Ask AI</Button>
      </DialogTrigger>
      <DialogContent className="flex h-[85vh] max-w-4xl flex-col p-0">
        {/* Header - Compact */}
        <div className="border-b px-6 py-4">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg">
              Ask AI About Your Notes
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Our AI can answer questions about all of your notes
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Chat Area - Flexible */}
        <div
          className="custom-scrollbar flex-1 overflow-y-auto px-6 py-4"
          ref={contentRef}
        >
          <div className="flex flex-col gap-4">
            {questions.map((question, index) => (
              <Fragment key={index}>
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground max-w-[70%] rounded-lg px-3 py-2 text-sm">
                    {question}
                  </div>
                </div>
                {responses[index] && (
                  <div className="flex justify-start">
                    <div
                      className="bg-muted max-w-[70%] rounded-lg px-3 py-2 text-sm"
                      dangerouslySetInnerHTML={{ __html: responses[index] }}
                    />
                  </div>
                )}
              </Fragment>
            ))}
            {isPending && (
              <div className="flex justify-start">
                <div className="bg-muted animate-pulse rounded-lg px-3 py-2 text-sm">
                  Thinking...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area - Fixed */}
        <div className="border-t px-6 py-4">
          <div
            className="bg-background flex cursor-text items-end gap-3 rounded-lg border p-3"
            onClick={handleClickInput}
          >
            <Textarea
              ref={textareaRef}
              placeholder="Ask me anything about your notes..."
              className="placeholder:text-muted-foreground min-h-0 flex-1 resize-none border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              rows={1}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <Button size="sm" className="h-8 w-8 shrink-0 rounded-full p-0">
              <ArrowUpIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AskAIButton;
