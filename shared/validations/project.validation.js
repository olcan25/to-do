import * as z from "zod";

const projectSchema = z.object({
  name: z
    .string()
    .nonempty("Isim alanı boş olamaz.")
    .max(35, "Isim maksimum 35 karakter olabilir."),
  description: z.string(),
  status: z.enum(["planned", "in-progress", "completed"]),
  start_date: z.string().nonempty("Baslangıc Tarihi alanı boş olamaz."),
  end_date: z.string().nullable(),
});

export { projectSchema };
