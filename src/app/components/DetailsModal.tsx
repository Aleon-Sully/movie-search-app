import React, { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from "@heroicons/react/24/solid"
import Image from 'next/image'
import { MovieModalProps, Rating } from '../types/MyTypes'
import noImage from '../assets/No_Image_Available.jpg'

const DetailsModal: FC<any> = (props :MovieModalProps) => {

    const closeModal = () => {
        props.setIsOpen(false);
    }
    

    const {
        Title,
        Year,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Poster,
        Ratings,
    } = props.movieDetails

    return (
        <div>
            <Transition appear show={props.isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-60' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className='flex flex-row justify-between items-center mt-2 px-4'
                                    >
                                        <div className='flex flex-col'>
                                            <h3 className='flex text-center md:text-xl text-base font-bold'>{Title}</h3>
                                            <div className='flex justify-between md:items-start items-center font-semibold md:text-sm text-xs'>
                                                <span>{Year}</span>-
                                                <span>{Rated}</span>-
                                                <span>{Runtime} </span>
                                                <span>{Genre} </span>
                                            </div>
                                        </div>
                                        <XMarkIcon
                                            className='h-10'
                                            onClick={e => {
                                                e.preventDefault()
                                                closeModal()
                                            }}
                                        />
                                    </Dialog.Title>
                                    <div className='mt-2 flex flex-col px-5'>
                                        <div className='flex md:flex-row flex-col items-center mb-3'>

                                            <img
                                                src={Poster === "N/A" ? noImage : Poster}
                                                className='md:h-[500px] md:w-[350px] h-[250px] w-[150px]'
                                            />
                                            <div className='flex flex-col'>
                                                <h3 className='text-lg font-extrabold mt-1 mx-3'>Ratings</h3>
                                                <div className='flex md:flex-row flex-col items-start md:items-center mt-1'>
                                                    {Ratings.map((rate: Rating) => (
                                                        <p className='text-xs font-semibold col-span-1 mx-3 text-center'>
                                                            <span>{rate.Source}</span>:<span className='font-bold'> {rate.Value}</span>
                                                        </p>
                                                    ))}
                                                </div>
                                                <h3 className='text-lg font-extrabold mt-1 mx-3'>Plot</h3>
                                                <div className='mx-3 text-sm font-medium text-left'>
                                                    {Plot}
                                                </div>
                                                <h3 className='text-lg font-extrabold mt-1 mx-3'>Director</h3>
                                                <p className='mx-3 text-sm'>{Director}</p>
                                                <h3 className='text-lg font-extrabold mt-1 mx-3'>Writers</h3>
                                                <p className='mx-3 text-sm'>{Writer}</p>
                                                <h3 className='text-lg font-extrabold mt-1 mx-3'>Actors</h3>
                                                <p className='mx-3 text-sm'>{Actors}</p>
                                                <h3 className='text-lg font-extrabold mt-1 mx-3'>Release Date</h3>
                                                <p className='mx-3 text-sm'>{Released}</p>
                                                <h3 className='text-lg font-extrabold mt-1 mx-3'>Language</h3>
                                                <p className='mx-3 text-sm'>{Language}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default DetailsModal
