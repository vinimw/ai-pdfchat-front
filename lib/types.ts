export type DocumentItem = {
  document_id: string;
  filename: string;
  created_at?: string;
  pages?: number;
  characters?: number;
};

export type UploadDocumentResponse = {
  document_id: string;
  filename: string;
  pages?: number;
  characters?: number;
  status: "processed" | "queued" | "error";
};

export type ChatSource = {
  chunk_id?: string;
  document_id: string;
  document_name?: string;
  page?: number;
  text: string;
  score?: number;
};

export type ChatResponse = {
  answer: string;
  sources: ChatSource[];
};
