import * as z from "zod";

const taskSchema = z.object({
  project_id: z.number().min(1, "Proje alanı boş olamaz."),
  title: z
    .string()
    .nonempty("Baslık alanı boş olamaz.")
    .max(35, "Baslık maksimum 35 karakter olabilir."),
  description: z.string().nullable(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["to_do", "in_progress", "completed"]),
});


export { taskSchema };