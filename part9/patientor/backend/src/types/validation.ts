// schemas.ts или types.ts в бэкенде
import { z } from "zod";

export const GenderEnum = z.enum(["male", "female", "other"]);

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional()
});

export const BaseEntrySchema = z.object({
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  specialist: z.string().min(1, "Specialist is required"),
  diagnosisCodes: z.array(z.string()).optional()
});

export const HealthCheckRatingEnum = z.enum(["0", "1", "2", "3"]).transform(v => Number(v) as 0 | 1 | 2 | 3);

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingEnum
});

export const SickLeaveSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required")
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1, "Employer name is required"),
  sickLeave: SickLeaveSchema.optional()
});

export const DischargeSchema = z.object({
  date: z.string().min(1, "Discharge date is required"),
  criteria: z.string().min(1, "Discharge criteria is required")
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema
});

export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema
]);

export const NewPatientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  ssn: z.string().min(1, "SSN is required"),
  gender: GenderEnum,
  occupation: z.string().min(1, "Occupation is required")
});

export const PatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: GenderEnum,
  occupation: z.string(),
  entries: z.array(EntrySchema)
});



export const NonSensitivePatientSchema = PatientSchema.omit({ ssn: true, entries: true });


export type Patient = z.infer<typeof PatientSchema>;
export type NonSensitivePatient = z.infer<typeof NonSensitivePatientSchema>;
export type NewPatientRequest = z.infer<typeof NewPatientSchema>;
export type NewEntry = z.infer<typeof EntrySchema>;
export type Entry = NewEntry & { id: string };
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
export type Diagnosis = z.infer<typeof DiagnosisSchema>;