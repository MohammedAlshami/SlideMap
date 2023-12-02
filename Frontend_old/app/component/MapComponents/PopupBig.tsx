import React from 'react'

interface PopupProbs {
    header: string;
    img: string;
    trigger: string;
    size: string;
}
function Popup({header, img, trigger, size}: PopupProbs) {

    const responsive_header = "sm:text-sm md:text-md lg:text-lg"
    const theme_color = "#9747FF"
    return (
        <div className={`bg-white w-7/12 sm:w-3/12 h-fit p-2 rounded-lg overflow-hidden space-y-4 shadow-2xl	shadow-[${theme_color}]/40 hover:cursor-pointer`}>
            <div>
                <img className='w-full h-48 object-cover rounded-lg' src={img} alt="" />

            </div>
            <div className='space-y-6 pl-2 pr-2 pb-2'>
                <div className='flex justify-between w-full'>
                    <div className='flex  items-center space-x-4 w-full hover:cursor-pointer'>
                        <img src="images/icons/location_icon.svg" alt="" className='w-2/12' />
                        <h2 className={`text-[${theme_color}] font-sans font-bold ${responsive_header}`}>{header}</h2>
                    </div>
                    <img src="images/icons/add_icon.svg" alt="" className='w-[40px] hover:cursor-pointer' />

                </div>

                <div className='flex justify-between text-xs  text-[#84888C]'>
                    <h4>Trigger: {trigger}</h4>
                    <h3 className='font-bold'>{size}</h3>
                </div>

            </div>
        </div>
    )
}

export default Popup