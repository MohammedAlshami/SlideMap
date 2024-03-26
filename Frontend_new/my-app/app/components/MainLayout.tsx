import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer1 from './Footers/Footer1';

interface LayoutProps {
    children: ReactNode;
}
const MainLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <Navbar></Navbar>
            <div className=''>
                {children}
            </div>

            <Footer1></Footer1>
     
        </>
    )
}

export default MainLayout