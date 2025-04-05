import { z } from "zod";

export const RecipeTemplateSchema = z.object({
  title: z.string(),
  ingredients: z.array(z.string()),
  steps: z
    .array(z.string())
    .describe(
      "The instructions to cook the recipe. Do not prefix it with numbers or use markdown, just the instructions."
    ),
});

// Export the type derived from the schema
export type RecipeTemplate = z.infer<typeof RecipeTemplateSchema>;
