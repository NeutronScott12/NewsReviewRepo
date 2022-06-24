export const createSlug = (title: string) =>
    title.trim().toLowerCase().replace(/ /g, '-')
