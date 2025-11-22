import { z } from "zod";

export const GenderEnum = z.enum(["male", "female", "other"]);

export const NewPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  ssn: z.string().min(1, "SSN is required"),
  gender: GenderEnum,
  occupation: z.string().min(1, "Occupation is required")
});

export type NewPatientRequest = z.infer<typeof NewPatientSchema>;