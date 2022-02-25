import { Mimetype } from '@/enums/mimetype';

export type BytesType = string | ArrayBuffer | Uint8Array;

export const renderInIframe = (pdfBytes: Blob | BytesType) => {
  const blob = new Blob([pdfBytes], { type: Mimetype.pdf });
  return URL.createObjectURL(blob);
};
