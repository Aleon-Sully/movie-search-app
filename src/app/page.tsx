"use client";

import { useState, useEffect } from 'react'
import axios from "axios";
import { AxiosResponse } from 'axios';
import SearchItem from './components/SearchItem';
import { MovieProps, MovieType } from './types/MyTypes';
import loadingImg from './assets/loading.gif'
import noResults from './assets/6134065.png'
import Image from 'next/image'
import MyPagination from './components/MyPagination';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import "swiper/css/navigation";
import ErrorModal from './components/ErrorModal';
import './globals.css'

function classNames(...classes: any): any {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

  const navItems: string[] = [
    "Thrillers",
    "Animations",
    "Anime",
    "Documentaries"
  ];



  const [movieName, setMovieName] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<AxiosResponse<MovieType>[] | null | void>(null);
  const [resultLength, setResultsLength] = useState(0)
  const [requestStatus, setRequestStatus] = useState(0);
  const [resultsResponse, setResultsResponse] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [myPages, setMyPages] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const numbersPerPage = 5;

  let pages: number[] = []
  let pagesContent: any[] = []

  const searchMovie = () => {
    setLoading(true)
    axios.get(`https://www.omdbapi.com/?apikey=1a085470&s=${movieName}`).then((res) => {
      setSearchResults(res.data?.Search);
      setResultsLength(res.data?.Search?.length);
      setRequestStatus(res.status)
      setResultsResponse(res.data.Response)
    }).catch((err) => {
      console.log(err)
      setIsOpen(true);
    });
  }


  useEffect(() => {
    if (requestStatus === 200) {
      setLoading(false)
      for (
        let i = 1;
        i <= Math.ceil(resultLength / numbersPerPage);
        i++
      ) {
        pages.push(i)
      }

      for (let i = 1; i < pages.length + 1; i++) {
        let lastNumberIndex = i * numbersPerPage
        let firstNumberIndex = lastNumberIndex - numbersPerPage
        let arr = searchResults?.slice(firstNumberIndex, lastNumberIndex)
        pagesContent.push(arr)
      }

      setMyPages(pagesContent);
    }

  }, [searchResults])

  const handleDebouncedInputChange = debounce((value: string) => {
    // Perform the actual operation you want to debounce
    setSearchResults(null);
    setResultsLength(0);
    setRequestStatus(0)
    setResultsResponse('')
    searchMovie();
  }, 500); // Debounce time in milliseconds


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieName(event.target.value);
    handleDebouncedInputChange(event.target.value);
  };



  return (
    <main className="flex flex-col py-8">
      <div className="flex flex-row justify-center text-center px-2  items-center">
        {navItems.map((item, key) =>
          <span key={key} className="mx-1 cursor-pointer">{item}</span>
        )}
      </div>
      <h1 className="md:text-[64px] text-[32px] text-center">Movie Search App</h1>
      <form>
        <div className="flex flex-row justify-center">
          <input
            type='text'
            name={''}
            id={''}
            placeholder={'Movie Title'}
            onChange={handleChange}
            value={movieName}
            className='text-center rounded-lg border-2 my-1 mx-1 border-gray-500 h-9'
          />
          <button
            type='submit'
            // disabled={!isValid || pending}
            className='hover:bg-[#FF4100] my-1 mx-1 transition-all hover:text-white  bg-[#FF7300] text-white px-8 rounded-lg font-bold'
          >
            Search
          </button>
        </div>
      </form>
      <div className='flex flex-col px-2'>
        {searchResults ? <h3 className='text-bold text-[30px] text-left mb-3'>Search Results</h3> : null}
        <div className=''>
          {loading ? <div className='flex justify-center items-center'>
            <Image
              src={loadingImg}
              width={100}
              height={50}
              className='mb-2'
              alt='loading GIF'
            />
          </div> :
            <div >
              {resultsResponse === 'False' ? <>
                <div className='flex flex-col justify-center col-start-2 items-center py-4'> <Image
                  src={noResults}
                  width={50}
                  height={150}
                  className='mb-2'
                  alt='loading GIF'
                  loading="lazy"
                />
                  <h4 className='font-bold text-xl'>No Results for your search</h4>
                </div>
              </> : <>
                <Swiper
                  pagination={{
                    type: "fraction",
                    el: '.swiper-custom-pagination',
                  }}
                  modules={[Pagination, Navigation]}
                  navigation={true}
                  onSlideChange={(swiper) => {
                    setCurrentPage(swiper.realIndex + 1)

                  }
                  }
                  className=''
                >
                  {myPages && myPages?.map((page: any[], key: number) => {
                    // console.log(myPages)
                    return (
                      <SwiperSlide
                        key={key}
                        className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between items-center px-16'
                      >
                        <>
                          {page.map((item, index) => (
                            <div key={index} className='mx-2 my-2'>
                              <SearchItem movie={item} />
                            </div>
                          ))}
                        </>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
                <div className="swiper-custom-pagination" />
              </>
              }
            </div>
          }
        </div>
      </div>
      <ErrorModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  )
}


function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
