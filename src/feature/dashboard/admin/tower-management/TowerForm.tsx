import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import MultiFileUploader from '@/components/web/MultiFileUploader'
import { useApiMutation } from '@/hooks/useApi'
import { useForm } from '@tanstack/react-form'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { TowerFormInput, TowerSchema } from '../schemas/tower.schema'
import LocationPickerMap from './LocationPickerMap' // ✅ path adjust
import { useQueryClient } from '@tanstack/react-query'
import { TOWER_QUERY_KEY } from '../service/tower.service'
type Mode = 'create' | 'edit'

function round6(num: number) {
  return Math.round(num * 1e6) / 1e6
}
const TowerForm = ({ mode = 'create', data }: { mode: Mode; data?: any }) => {

  const qc = useQueryClient()
  const isEdit = mode === 'edit'
  const updateUrl = data?.id ? `/tower/admin/?id=${data.id}` : '/tower/admin/'

  const createTower = useApiMutation<any, TowerFormInput>({
    method: isEdit ? 'PUT' : 'POST',
    url: updateUrl,
  })

  const numValue = (v: unknown) =>
    v === null || v === undefined ? '' : String(v)
  const toNumOrEmpty = (raw: string) => (raw === '' ? '' : Number(raw))

  const form = useForm({
    defaultValues: {
      location: data?.location ?? '',
      village: data?.village ?? '',
      latitude: (data?.latitude || 23.7643863) as any,
      longitude: (data?.longitude ?? 90.3890144) as any,
      water_harvest_per_week: (data?.water_harvest_per_week ?? '') as any,
      co2_offset_per_week: (data?.co2_offset_per_week ?? '') as any,
      hours_saved_per_day: (data?.hours_saved_per_day ?? '') as any,
      lives_improved: (data?.lives_improved ?? '') as any,
      images: (data?.images ?? []) as any[],
      //  "date_started": "2025-06-01T06:00:00+06:00",
      date_started: data?.date_started
        ? new Date(data.date_started).toISOString().split('T')[0]
        : '',
    },
    validators: { onSubmit: TowerSchema },
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        latitude: round6(Number(value.latitude)),
        longitude: round6(Number(value.longitude)),
      }
      createTower.mutate(payload, {
        onSuccess: () => {
          toast.success(
            isEdit
              ? 'Tower updated successfully!'
              : 'Tower created successfully!',
          )
          qc.invalidateQueries({ queryKey: [TOWER_QUERY_KEY] })
          if (!isEdit) form.reset()
        },
        onError: (e: any) => {
          console.log('error', e)
          toast.error(e?.message ?? 'Failed to create tower')
        },
      })
    },
  })

  const loading = createTower.isPending

  return (
    <Card className="w-full max-w-4xl">
      <CardContent className="pt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            {/* Location */}
            <form.Field name="location">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full Location</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter full location address"
                      aria-invalid={isInvalid}
                      disabled={loading}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Village */}
            <form.Field name="village">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Village</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter village name"
                      aria-invalid={isInvalid}
                      disabled={loading}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* ✅ Map + Lat/Lng synced */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <form.Field name="latitude">
                  {(latField) => {
                    const isInvalid =
                      latField.state.meta.isTouched &&
                      !latField.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={latField.name}>
                          Latitude
                        </FieldLabel>
                        <Input
                          id={latField.name}
                          name={latField.name}
                          inputMode="decimal"
                          type="number"
                          step="any"
                          value={numValue(latField.state.value)}
                          onBlur={latField.handleBlur}
                          onChange={(e) =>
                            latField.handleChange(
                              toNumOrEmpty(e.target.value) as any,
                            )
                          }
                          placeholder="e.g. 23.8103"
                          aria-invalid={isInvalid}
                          disabled={loading}
                        />
                        {isInvalid && (
                          <FieldError errors={latField.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>

                <form.Field name="longitude">
                  {(lngField) => {
                    const isInvalid =
                      lngField.state.meta.isTouched &&
                      !lngField.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={lngField.name}>
                          Longitude
                        </FieldLabel>
                        <Input
                          id={lngField.name}
                          name={lngField.name}
                          inputMode="decimal"
                          type="number"
                          step="any"
                          value={numValue(lngField.state.value)}
                          onBlur={lngField.handleBlur}
                          onChange={(e) =>
                            lngField.handleChange(
                              toNumOrEmpty(e.target.value) as any,
                            )
                          }
                          placeholder="e.g. 90.4125"
                          aria-invalid={isInvalid}
                          disabled={loading}
                        />
                        {isInvalid && (
                          <FieldError errors={lngField.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>
              </div>

              {/* ✅ Only render map when we have numbers (or let it auto-init via geolocation) */}
              <form.Subscribe
                selector={(s) => ({
                  lat: s.values.latitude,
                  lng: s.values.longitude,
                })}
              >
                {({ lat, lng }) => {
                  const latNum = typeof lat === 'number' ? lat : Number(lat)
                  const lngNum = typeof lng === 'number' ? lng : Number(lng)

                  const mapValue =
                    Number.isFinite(latNum) && Number.isFinite(lngNum)
                      ? { lat: latNum, lng: lngNum }
                      : null

                  return (
                    <LocationPickerMap
                      value={mapValue}
                      onChange={({ lat, lng }) => {
                        form.setFieldValue('latitude', lat as any)
                        form.setFieldValue('longitude', lng as any)
                      }}
                      zoom={13}
                    />
                  )
                }}
              </form.Subscribe>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <form.Field name="water_harvest_per_week">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Water Harvest / Week (L)
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        step="any"
                        value={numValue(field.state.value)}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            toNumOrEmpty(e.target.value) as any,
                          )
                        }
                        placeholder="e.g. 1200"
                        aria-invalid={isInvalid}
                        disabled={loading}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>

              <form.Field name="co2_offset_per_week">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        CO₂ Offset / Week (tons)
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        step="any"
                        value={numValue(field.state.value)}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            toNumOrEmpty(e.target.value) as any,
                          )
                        }
                        placeholder="e.g. 2.5"
                        aria-invalid={isInvalid}
                        disabled={loading}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>

              <form.Field name="hours_saved_per_day">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Hours Saved / Day
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        step="any"
                        value={numValue(field.state.value)}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            toNumOrEmpty(e.target.value) as any,
                          )
                        }
                        placeholder="0 - 24"
                        aria-invalid={isInvalid}
                        disabled={loading}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>

              <form.Field name="lives_improved">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Lives Improved
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        step="1"
                        value={numValue(field.state.value)}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            toNumOrEmpty(e.target.value) as any,
                          )
                        }
                        placeholder="e.g. 350"
                        aria-invalid={isInvalid}
                        disabled={loading}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </div>

            {/* Date */}
            <form.Field name="date_started">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Date Started</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="date"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      disabled={loading}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
            {/* // Images */}
            <form.Field name="images">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Images</FieldLabel>

                    <MultiFileUploader
                      label="Upload Tower Images"
                      value={field.state.value ?? []}
                      onChange={(urls) => {
                        field.handleChange(urls)
                        field.handleBlur() // touched
                      }}
                      maxFiles={5}
                      multiple
                      accept="image/*"
                      disabled={loading}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Submit */}
            <Field>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Tower
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default TowerForm
