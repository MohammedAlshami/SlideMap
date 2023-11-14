import React from 'react'

interface PopupProbs {
    name: string;
}

const Popupsmall = ({ name }: PopupProbs) => {
    const responsive_header = "sm:text-sm md:text-md lg:text-lg"
    const theme_color = "#9747FF"
    return (

        <div className={`flex items-center space-x-4 bg-white h-fit w-fit py-4 rounded-xl justify-center shadow-2xl	shadow-[${theme_color}]/40 hover:cursor-pointer`}>
            <img src="images/icons/location_icon.svg" alt="" className='w-6/12 md:w-2/12' />
            <h2 className={`text-[${theme_color}] font-sans font-bold ${responsive_header}`}>{name}</h2>
        </div>
    )
}

export default Popupsmall