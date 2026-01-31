import { Button } from '@/components/ui/button'

const fmt = (v: any) => {
  if (v === null || v === undefined || v === '') return '—'
  if (typeof v === 'number') return v.toLocaleString()
  return String(v)
}

const fmtDateTime = (iso?: string) => {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

const isImage = (url: string) =>
  /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(url.split('?')[0])

export default function TowerDetails({ tower }: { tower: any }) {
  return (
    <div className="space-y-4">
      {/* Top summary */}
      <div className="grid gap-3 sm:grid-cols-1">
        <div className="rounded-xl border p-3">
          <div className="text-xs text-muted-foreground">Started</div>
          <div className="mt-1 text-sm">{fmtDateTime(tower.date_started)}</div>
        </div>
      </div>

      {/* Main fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border p-4">
          <div className="text-xs text-muted-foreground">Location</div>
          <div className="mt-1 text-sm">{fmt(tower.location)}</div>

          <div className="mt-3 text-xs text-muted-foreground">Village</div>
          <div className="mt-1 text-sm">{fmt(tower.village)}</div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted-foreground">Latitude</div>
              <div className="mt-1 text-sm">{fmt(tower.latitude)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Longitude</div>
              <div className="mt-1 text-sm">{fmt(tower.longitude)}</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted-foreground">
                Water / Week (L)
              </div>
              <div className="mt-1 text-sm">
                {fmt(tower.water_harvest_per_week)}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">
                CO₂ / Week (tons)
              </div>
              <div className="mt-1 text-sm">
                {fmt(tower.co2_offset_per_week)}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">
                Hours Saved / Day
              </div>
              <div className="mt-1 text-sm">
                {fmt(tower.hours_saved_per_day)}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">
                Lives Improved
              </div>
              <div className="mt-1 text-sm">{fmt(tower.lives_improved)}</div>
            </div>
          </div>

          <div className="mt-4 border-t pt-4 grid grid-cols-3 gap-3">
            <div>
              <div className="text-xs text-muted-foreground">
                Water Till Now
              </div>
              <div className="mt-1 text-sm">
                {fmt(tower.water_harvested_till_now)}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">CO₂ Till Now</div>
              <div className="mt-1 text-sm">
                {fmt(tower.co2_offset_till_now)}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">
                Hours Till Now
              </div>
              <div className="mt-1 text-sm">
                {fmt(tower.hours_saved_till_now)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="rounded-xl border p-4">
        <div className="text-sm font-medium">Images</div>

        {tower.images?.length ? (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {tower.images.map((url: any, idx: any) => (
              <a
                key={`${url}-${idx}`}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-lg border"
              >
                {isImage(url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={url}
                    alt="tower"
                    className="h-28 w-full object-cover"
                  />
                ) : (
                  <div className="p-3 text-xs break-all">{url}</div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-black/40 px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100">
                  Open
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-2 text-sm text-muted-foreground">No images</div>
        )}
      </div>
    </div>
  )
}
