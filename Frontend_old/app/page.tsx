import Image from 'next/image'
import Popup from './component/MapComponents/PopupBig'
import Popupsmall from './component/MapComponents/Popupsmall'
import PopupEvent from './component/events/PopupEvent'
import MapSearchBar from './component/MapComponents/MapSearchBar'
import BaseMap from './component/Map'
// import Heatmap from './component/HeatMap'
export default function Home() {
  
  return (
    <main className="w-screen h-screen overflow-hidden">

      <div>
        <BaseMap></BaseMap>
        {/* <Heatmap></Heatmap> */}
      </div>


    </main>
  )
}
