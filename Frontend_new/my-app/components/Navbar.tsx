'use client';
import { useUrl } from 'nextjs-current-url';

import React from 'react'

const Navbar = () => {
    const { href: currentUrl, pathname } = useUrl() ?? {};
    return (
        <>
            <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm fixed top-0" style={{ zIndex: 100000 }}>
                <nav className="mt-6 relative max-w-[85rem] w-full bg-white border border-gray-200 rounded-[36px] mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto dark:bg-gray-800 dark:border-gray-700" aria-label="Global">
                    <div className="flex items-center justify-between">
                        <a className="flex-none text-xl font-semibold dark:text-white" href="/home" aria-label="Brand">SlideMap</a>
                        <div className="md:hidden">
                            <button type="button" className="hs-collapse-toggle w-8 h-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                                <svg className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                                <svg className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                    </div>
                    <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block">
                        <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
                            <a className={`font-medium ${pathname === "/home" ? "text-[#8A2BE2] hover:text-blue-400" : "text-gray-500 hover:text-[#8A2BE2]"} md:py-6`} href="/home" aria-current="page">Landing</a>
                            <a className={`font-medium ${pathname === "/map" ? "text-[#8A2BE2] hover:text-blue-400" : "text-gray-500 hover:text-[#8A2BE2]"} md:py-6`} href="/map">Map</a>
                            <a className={`font-medium ${pathname === "/report" ? "text-[#8A2BE2] hover:text-blue-400" : "text-gray-500 hover:text-[#8A2BE2]"} md:py-6`} href="/report">Report Landslide</a>
                            <a className={`font-medium ${pathname === "/news" ? "text-[#8A2BE2] hover:text-blue-400" : "text-gray-500 hover:text-[#8A2BE2]"} md:py-6`} href="/news">News</a>
                            <a className={`font-medium ${pathname === "/datasets" ? "text-[#8A2BE2] hover:text-blue-400" : "text-gray-500 hover:text-[#8A2BE2]"} md:py-6`} href="/datasets">Datasets</a>
                            
                            <a className={`flex items-center gap-x-2 font-medium ${pathname === "/login" ? "text-[#8A2BE2] hover:text-blue-400" : "text-gray-500 hover:text-[#8A2BE2]"} md:py-6`} href="/login">
                                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                Log in
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
        </>

    )
}

export default Navbar