# Tour the Course map

Page: `/tour-the-course` (`src/app/tour-the-course/page.tsx`)
Data: `src/data/course-stations.json` (one entry per pin)

## Station fields
- `id`, `label` (number shown on the pin), `name`, `course` (`Course 1`, `Course 2`, `5-Stand`), `difficulty`
- `x`, `y`: percent of map width/height (0 to 100, from the top-left corner)
- `lat`, `lng`: optional GPS position from Google Maps
- `description`: card text
- `photo`: image path under `/public` (shown when there is no video)
- `video`: YouTube, Vimeo, or an `.mp4` path/URL. Leave `null` to show "Video coming soon".

## Placing real pins
1. Replace the illustrated map with a north-up aerial (drone orthophoto or satellite export you are licensed to use), cropped to the property.
2. Record the latitude of the image's top and bottom edges and the longitude of its left and right edges.
3. In Google Maps, long-press each stand and copy its lat/lng into the matching station.
4. Run `node scripts/latlng-to-xy.mjs <north> <south> <west> <east> --write` to fill in x/y.
5. Add photo and video for each stand as they are ready.

The current map is an illustration and the pin positions are placeholders.
