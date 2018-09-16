import { Movie } from "./movie.model"

export class Quote {
    text: string
    character: string
    id: number
    movie_id: number
    movie: Movie
}
