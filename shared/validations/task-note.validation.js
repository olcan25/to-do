import * as z from "zod";

const taskNoteSchema = z.object({
  //task_id: z.number().min(1, "Proje alanı boş olamaz."),
  content: z
    .string()
    .nonempty("Baslık alanı boş olamaz.")
    .max(250, "Baslık maksimum 250 karakter olabilir."),
});

export { taskNoteSchema };
