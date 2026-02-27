import { MicrosoftWord, PDF } from '@ridemountainpig/svgl-react';
import { FileText } from 'lucide-react';
import { type JSX } from 'react';

export function getFileIcon(fileType: string, size: number = 18): JSX.Element {
  switch (fileType) {
    case 'pdf':
      return <PDF width={size} height={size} />;
    case 'doc':
      return <MicrosoftWord width={size} height={size} />;
    default:
      return (
        <FileText className={`w-[${size}px] h-[${size}px] text-slate-400`} />
      );
  }
}
