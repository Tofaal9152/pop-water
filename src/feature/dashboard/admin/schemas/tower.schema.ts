import { z } from 'zod'

export const TowerSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  village: z.string().min(1, 'Village is required'),

  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),

  water_harvest_per_week: z.coerce.number().min(0, 'Must be positive'),

  co2_offset_per_week: z.coerce.number().min(0, 'Must be positive'),

  hours_saved_per_day: z.coerce.number().min(0).max(24),

  lives_improved: z.coerce.number().min(0),

  images: z.array(z.string().optional()),

  date_started: z.string(), // ISO string
})

export type TowerFormInput = z.infer<typeof TowerSchema>
