import React, { FC, useState } from 'react'
import { MovieDetails, MovieProps } from '../types/MyTypes'
import Image from 'next/image'
import axios from "axios";
import { AxiosResponse } from 'axios';
import DetailsModal from './DetailsModal';
import noImage from '../assets/No_Image_Available.jpg'


const SearchItem: FC<any> = ({ movie }): JSX.Element => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [details, setDetails] = useState<AxiosResponse<MovieDetails>[] | null | void>(null);

    const getMoreDetails = (movieID: string) => {
        axios.get(`https://www.omdbapi.com/?apikey=1a085470&i=${movieID}`).then((res) => {
            console.log(res.data)
            setDetails(res.data)
            setIsOpen(true)
        })
    }

    const {
        Title,
        Year,
        imdbID,
        Poster
    } = movie;

    return (
        <div className='flex'>
            <Image
                src={Poster === "N/A" ? noImage : Poster}
                width={100}
                height={50}
                alt={`${Title} movie poster`}
                className='mb-2'
            />
            <div className='flex flex-col mx-3 mt-3'>
                <p className='my-1'>Title: {Title}</p>
                <p className='my-1'>Year: {Year}</p>
                {/* <p>Media ID: {imdbID}</p>
                <p>Media Type: {Type}</p> */}
                <button
                    type='button'
                    onClick={(e) => {
                        e.preventDefault();
                        getMoreDetails(imdbID)
                    }}
                    // disabled={!isValid || pending}
                    className='hover:bg-[#FF4100] py-2 w-32 transition-all hover:text-white bg-[#FF7300] text-white rounded-lg font-bold mt-6'
                >
                    More
                </button>
            </div>

            {details ? <DetailsModal isOpen={isOpen} setIsOpen={setIsOpen} data={details} /> : null}
        </div>
    )
}

export default SearchItem
