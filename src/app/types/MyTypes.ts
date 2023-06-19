import { StaticImageData } from "next/image"

export type MovieType = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster?: StaticImageData | string
}

export type Rating = {
    Source: string,
    Value: string
}

export type MovieDetails = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster?: StaticImageData | string
  Ratings: Rating [],
  Metascore: number
  imdbRating: number
  imdbVotes: number
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: number
  Production: string
  Website: string
  Response: boolean
}


export interface MovieDetailsProps {
    details: MovieDetails
}

export interface MovieProps {
  movie: MovieType
}

export interface MovieModalProps {
  isOpen: boolean,
  setIsOpen:(openState:boolean) => void,
  movieDetails : MovieDetails
}
