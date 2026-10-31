# Tour the Course map

Page: `/tour-the-course` (`src/app/tour-the-course/page.tsx`)
Data: `src/data/course-stations.json`

## Base imagery
- `public/media/tfc-aerial-2023.(webp|jpg)`: whole property, USDA NAIP 2023 (public domain), north-up, bounds in `bounds`.
- `public/media/tfc-aerial-courses-2023.(webp|jpg)`: crop of the same image around the courses, bounds in `courseView`.
- `boundary`: the 410-acre property outline (Colleton County GIS parcels), drawn as a dashed line.

## Station fields
- `id`, `label` (number on the pin), `name`, `course` (`Riverside`, `Evergreen`, `5-Stand`), `difficulty`
- `lat`, `lng`: position from Jim's Google Maps pins. `position` notes whether it was an exact coordinate or read from his screenshot.
- `x`, `y`: percent of the whole-property image, from `node scripts/latlng-to-xy.mjs 32.9017 32.8868 -80.8815 -80.8525 --write`. The Courses view computes positions from lat/lng.
- `description`, `photo`, `video` (YouTube, Vimeo or .mp4; `null` shows "Video coming soon").

## Rules
- No public pin for the wild side (members-only tease only) and no street address on the map.
