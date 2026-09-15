// Product name shown everywhere in the UI. The source strings (and their translations) still
// say "openGym" — the upstream project this is built on — and t() swaps the name in at
// render time, so a single edit here rebrands every language.
export const APP_NAME = 'FISAI Gym'
export const UPSTREAM_NAME = 'openGym'

export const brand = s => (typeof s === 'string' ? s.replaceAll(UPSTREAM_NAME, APP_NAME) : s)
