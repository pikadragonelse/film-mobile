export interface Genres {
    genre_id: number,
    name:string,
}

export interface Actors {
    actor_id:number,
    name:string,
}

export interface Directors {
    director_id:number,
    name:string,
}

export interface Episodes{
    episode_id: number,
    movie_id: number,
    poster_url: string,
    title: string,
    release_date: string,
    num_view: string,
    duration: number,
    episode_no: number,
    posterURL: string
}

export type Film = {
    movieId: number,
    title: string, 
    description:string,
    releaseDate:string,
    nation:string,
    posterURL:string,
    trailerURL:string,
    averageRating:string,
    episodeNum:number,
    level:number,
    genres: Array<Genres>,
    actors: Array<Actors>,
    episodes:Array<Episodes>
    isSeries?:boolean,
    
}