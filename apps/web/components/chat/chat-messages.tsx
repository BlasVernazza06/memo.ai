'use client';

import { Bot, User } from 'lucide-react';
import { motion } from 'motion/react';

import AttachmentCard from '@/components/chat/attachment-card';
import { ChatMessage } from '@/types/workspace-chat-types';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isAiLoading: boolean;
}

export default function ChatMessages({
  messages,
  isAiLoading,
}: ChatMessagesProps) {
  return (
    <div className="space-y-8 pb-10">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`flex gap-4 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center shadow-sm ${
                message.role === 'ai'
                  ? 'bg-primary text-white'
                  : 'bg-card border border-border text-foreground'
              }`}
            >
              {message.role === 'ai' ? (
                <Bot className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div className="space-y-4">
              {message.attachments && (
                <div className="flex flex-wrap gap-2">
                  {message.attachments.map((file) => (
                    <AttachmentCard key={file.id} file={file} />
                  ))}
                </div>
              )}
              {message.content && (
                <div
                  className={`p-5 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                    message.role === 'ai'
                      ? 'bg-muted border border-transparent text-foreground rounded-tl-none'
                      : 'bg-primary text-white rounded-tr-none'
                  }`}
                >
                  {message.content.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
      {isAiLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-start"
        >
          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 rounded-2xl bg-primary text-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div className="bg-muted border border-transparent p-4 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
