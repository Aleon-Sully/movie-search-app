import React, { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import errorImg from '../assets/error.gif'
import { XMarkIcon } from "@heroicons/react/24/solid"


const ErrorModal: FC<any> = ({ isOpen, setIsOpen }) => {

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
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
                                        className='flex flex-row justify-end items-end mt-2 px-4'
                                    >
                                        <XMarkIcon
                                            className='h-10'
                                            onClick={e => {
                                                e.preventDefault()
                                                closeModal()
                                            }}
                                        />
                                    </Dialog.Title>
                                    <div className='mt-2 flex flex-col px-5 items-center'>
                                        <Image
                                            src={errorImg}
                                            width={200}
                                            height={50}
                                            alt={`Error Image`}
                                        />
                                        <p className='text-center text-2xl font-bold -mt-5 mb-3'>Sorry we are having challenges at the moment please try again later</p>
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

export default ErrorModal
