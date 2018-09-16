import { Category } from "./category.model"

export class Movie {
    title: string
    year: number
    director: string
    image: string
    id: number
    category_id: number
    category: Category
    // quotes (*)
}
