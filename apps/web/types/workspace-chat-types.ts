
import { type LocalFile } from "@/hooks/use-file-upload";

export type ChatRole = 'user' | 'ai';

export interface ChatMessage {
    id: string;
    role: ChatRole;
    attachments?: LocalFile[];
    content: string;
}
