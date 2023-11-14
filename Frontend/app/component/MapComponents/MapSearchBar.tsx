'use client';
import React, { useState, useRef } from 'react';

interface MapSearchBarProps {
    handleClick: () => void;
}

const MapSearchBar: React.FC<MapSearchBarProps> = ({ handleClick }: MapSearchBarProps) => {
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const searchBarRef = useRef<HTMLDivElement>(null);

    const handleToggleHistory = () => {
        setIsHistoryVisible(!isHistoryVisible);
    };


    return (
        <>
            <div className='w-screen'>
                <div className={`m-4 bg-white absolute z-50 w-8/12 sm:w-1/12 md:w-3/12 rounded-3xl overflow-hidden transition-all duration-500 ${isHistoryVisible ? 'h-auto' : 'h-14'}`}>
                    <div className='bg-white h-14 w-full rounded-3xl flex justify-between p-2 pl-4' >
                        <div className='flex items-center space-x-4' onClick={handleToggleHistory}>
                            <img src="images/icons/SearchIcon.svg" alt="" className='w-1/12' />
                            <input type="Search Anything" className='appearance-none outline-none w-full' placeholder='Search anything....' />
                        </div>
                        <img src="images/icons/SearchOptionIcon.svg" alt="" />
                    </div>
                    <div id='search-history' className={`transition-all duration-500 hidden ${isHistoryVisible ? 'block' : 'hidden'}`}>
                        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                        <div className='space-y-0 py-2'>
                            <div className='space-y-0 pt-0'>
                                <div className='flex space-x-8 px-6 py-4  items-center hover:cursor-pointer hover:bg-gray-100'>
                                    <img src="images/icons/SearchIcon.svg" alt="" className='w-[20px]' />
                                    <h4 className='w-fit overflow-hidden text-ellipsis'>Googleasdddddddddddddddddddddddddddddddddddddddddddddddddd</h4>
                                </div>
                                <div className='flex space-x-8 px-6 py-4  items-center hover:cursor-pointer hover:bg-gray-100'>
                                    <img src="images/icons/SearchIcon.svg" alt="" className='w-[20px]' />
                                    <h4 className='w-fit overflow-hidden text-ellipsis'>Googleasdddddddddddddddddddddddddddddddddddddddddddddddddd</h4>
                                </div>
                                <div className='flex space-x-8 px-6 py-4  items-center hover:cursor-pointer hover:bg-gray-100'>
                                    <img src="images/icons/SearchIcon.svg" alt="" className='w-[20px]' />
                                    <h4 className='w-fit overflow-hidden text-ellipsis'>Googleasdddddddddddddddddddddddddddddddddddddddddddddddddd</h4>
                                </div>
                                <div className='flex space-x-8 px-6 py-4  items-center hover:cursor-pointer hover:bg-gray-100'>
                                    <img src="images/icons/SearchIcon.svg" alt="" className='w-[20px]' />
                                    <h4 className='w-fit overflow-hidden text-ellipsis'>Googleasdddddddddddddddddddddddddddddddddddddddddddddddddd</h4>
                                </div>
                                <div className='flex space-x-8 px-6 py-4  items-center hover:cursor-pointer hover:bg-gray-100'>
                                    <img src="images/icons/SearchIcon.svg" alt="" className='w-[20px]' />
                                    <h4 className='w-fit overflow-hidden text-ellipsis'>Googleasdddddddddddddddddddddddddddddddddddddddddddddddddd</h4>
                                </div>
                            </div>          </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default MapSearchBar;
