import type { NextPage } from "next";
import DatasetBlock from "./dataset-block";

const Frame: NextPage = () => {
  return (
    <div className="w-[1065px] max-w-full flex flex-row items-start justify-start tracking-[normal]">
      <section className="h-[872px] flex-1 flex flex-row flex-wrap items-start justify-start relative gap-[15px_19.2px] max-w-full text-left text-base-7 text-white font-helvetica">
        <DatasetBlock
          image31="/image-31@2x.png"
          prop="400 Polygons"
          theHiltonHotel="Alor Setar, Kedah Landslide "
          lisbonPortugal="Alor Setar, Kedah"
          prop1="2023/11/23"
        />
        <DatasetBlock
          image31="/image-31-1@2x.png"
          prop="2000 Polygons"
          theHiltonHotel="Petaling Jaya, Selangor Landslide "
          lisbonPortugal="Petaling Jaya, Selango"
          prop1="2019/04/23"
          image31IconLeft="362.1px"
          image31IconTop="0px"
          frameDivMinWidth="79px"
          theHiltonHotelWidth="284px"
          lisbonPortugalHeight="46.2px"
          lisbonPortugalPadding="0px 0px 24.200000000000728px"
          divMinWidth="unset"
          frameDivPadding="0px 1px 0px 0px"
          frameDivDebugCommit="unset"
          divDebugCommit="unset"
        />
        <DatasetBlock
          image31="/image-31-2@2x.png"
          prop="5400 Polygons "
          theHiltonHotel="Kuala Terengganu Landslide"
          lisbonPortugal="Kuala Terengganu, Terengganu"
          prop1="2020/11/23"
          image31IconLeft="724.1px"
          image31IconTop="0px"
          frameDivMinWidth="79px"
          theHiltonHotelWidth="242px"
          lisbonPortugalHeight="46.2px"
          lisbonPortugalPadding="0px 0px 24.200000000000728px"
          divMinWidth="unset"
          frameDivPadding="unset"
          frameDivDebugCommit="unset"
          divDebugCommit="unset"
        />
        <DatasetBlock
          image31="/image-31-3@2x.png"
          prop="5400 Polygons "
          theHiltonHotel="Kuala Terengganu Landslide"
          lisbonPortugal="Kuala Terengganu, Terengganu"
          prop1="2020/11/23"
          image31IconLeft="0px"
          image31IconTop="443.3px"
          frameDivMinWidth="79px"
          theHiltonHotelWidth="242px"
          lisbonPortugalHeight="unset"
          lisbonPortugalPadding="unset"
          divMinWidth="unset"
          frameDivPadding="unset"
          frameDivDebugCommit="unset"
          divDebugCommit="unset"
        />
        <div className="h-[429px] w-[341px] !m-[0] absolute top-[443.3px] left-[362.1px] rounded-[15px] bg-blueviolet-100 box-border flex flex-col items-center justify-start py-[149px] px-5 gap-[45px] border-[10px] border-solid border-white">
          <div className="flex-1 flex flex-row items-start justify-start py-0 pr-1.5 pl-[6.5px]">
            <img
              className="h-16 w-16 relative"
              loading="lazy"
              alt=""
              src="/vector-4.svg"
            />
          </div>
          <div className="relative inline-block min-w-[77px]">Add More</div>
        </div>
        <div className="absolute !m-[0] top-[443.3px] left-[724.2px] text-xs inline-block min-w-[9px]">
          B
        </div>
      </section>
    </div>
  );
};

export default Frame;
