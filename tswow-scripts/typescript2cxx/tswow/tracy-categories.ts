const categories: {[key: string]: string} = {}

export function set_tracy_category_color(cat: string, value: string) {
    categories[cat] = value
}

export function get_tracy_category_color(cat: string) {
    return categories[cat];
}