import { z } from "zod";

export const documentItemSchema = z.object({
  document_id: z.string(),
  filename: z.string(),
  created_at: z.string().optional(),
  pages: z.number().optional(),
  characters: z.number().optional(),
});

export const documentsResponseSchema = z.union([
  z.array(documentItemSchema),
  z.object({
    items: z.array(documentItemSchema),
  }),
]);

export const uploadDocumentResponseSchema = z.object({
  document_id: z.string(),
  filename: z.string(),
  pages: z.number().optional(),
  characters: z.number().optional(),
  status: z.enum(["processed", "queued", "error"]),
});

export type DocumentItem = z.infer<typeof documentItemSchema>;
export type DocumentsResponse = z.infer<typeof documentsResponseSchema>;
export type UploadDocumentResponse = z.infer<
  typeof uploadDocumentResponseSchema
>;
