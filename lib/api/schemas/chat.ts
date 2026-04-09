import { z } from "zod";

const chatSourceInputSchema = z.object({
  chunk_id: z.string().optional(),
  chunk_index: z.number().optional(),
  document_id: z.string().optional(),
  document_name: z.string().optional(),
  page: z.number().optional(),
  text: z.string(),
  score: z.number().optional(),
});

export const chatSourceSchema = chatSourceInputSchema.transform((source) => ({
  chunk_id:
    source.chunk_id ??
    (typeof source.chunk_index === "number"
      ? String(source.chunk_index)
      : undefined),
  document_id: source.document_id,
  document_name: source.document_name,
  page: source.page,
  text: source.text,
  score: source.score,
}));

export const chatResponseSchema = z.object({
  answer: z.string(),
  sources: z.array(chatSourceInputSchema).transform((sources) =>
    sources.map((source) => chatSourceSchema.parse(source))
  ),
});

export type ChatSource = z.infer<typeof chatSourceSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
