import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type DatasetBlockType = {
  image31?: string;
  prop?: string;
  theHiltonHotel?: string;
  lisbonPortugal?: string;
  prop1?: string;

  /** Style props */
  image31IconLeft?: CSSProperties["left"];
  image31IconTop?: CSSProperties["top"];
  frameDivMinWidth?: CSSProperties["minWidth"];
  theHiltonHotelWidth?: CSSProperties["width"];
  lisbonPortugalHeight?: CSSProperties["height"];
  lisbonPortugalPadding?: CSSProperties["padding"];
  divMinWidth?: CSSProperties["minWidth"];
  frameDivPadding?: CSSProperties["padding"];
  frameDivDebugCommit?: CSSProperties["debugCommit"];
  divDebugCommit?: CSSProperties["debugCommit"];
};

const DatasetBlock: NextPage<DatasetBlockType> = ({
  image31,
  prop,
  theHiltonHotel,
  lisbonPortugal,
  prop1,
  image31IconLeft,
  image31IconTop,
  frameDivMinWidth,
  theHiltonHotelWidth,
  lisbonPortugalHeight,
  lisbonPortugalPadding,
  divMinWidth,
  frameDivPadding,
  frameDivDebugCommit,
  divDebugCommit,
}) => {
  const datasetBlockStyle: CSSProperties = useMemo(() => {
    return {
      left: image31IconLeft,
      top: image31IconTop,
    };
  }, [image31IconLeft, image31IconTop]);

  const divStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: frameDivMinWidth,
    };
  }, [frameDivMinWidth]);

  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      width: theHiltonHotelWidth,
    };
  }, [theHiltonHotelWidth]);

  const frameDiv1Style: CSSProperties = useMemo(() => {
    return {
      height: lisbonPortugalHeight,
      padding: lisbonPortugalPadding,
    };
  }, [lisbonPortugalHeight, lisbonPortugalPadding]);

  const lisbonPortugalStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: divMinWidth,
    };
  }, [divMinWidth]);

  const frameDiv2Style: CSSProperties = useMemo(() => {
    return {
      padding: frameDivPadding,
    };
  }, [frameDivPadding]);

  const div1Style: CSSProperties = useMemo(() => {
    return {
      debugCommit: frameDivDebugCommit,
    };
  }, [frameDivDebugCommit]);

  const frameDiv3Style: CSSProperties = useMemo(() => {
    return {
      debugCommit: divDebugCommit,
    };
  }, [divDebugCommit]);

  return (
    <div
      className="h-[428.3px] w-[340.9px] !m-[0] absolute top-[0px] left-[0px] rounded-3xs-4 bg-white box-border flex flex-col items-start justify-start pt-[18.799999999999272px] px-4 pb-[18.899999999999636px] gap-[22.333333333333332px] text-left text-base-4 text-gray font-helvetica border-[0.6px] border-solid border-gainsboro-100"
      style={datasetBlockStyle}
    >
      <div className="self-stretch flex-1 flex flex-row items-end justify-start pt-3 px-[14.099999999999907px] pb-[12.199999999998909px] relative">
        <img
          className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-[11.75px] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src={image31}
        />
        <button className="cursor-pointer pt-[8.700000000000728px] pb-[8.899999999999636px] pr-[7px] pl-[8.700000000000045px] bg-white h-[33.6px] rounded-[7.31px] shadow-[0px_1.5px_4.61px_rgba(0,_0,_0,_0.25)] box-border flex flex-row items-start justify-start gap-[5.6px] whitespace-nowrap z-[1] border-[0.7px] border-solid border-gainsboro-100 hover:bg-gainsboro-200 hover:box-border hover:border-[0.7px] hover:border-solid hover:border-lightgray">
          <img
            className="h-[12.4px] w-[11.7px] relative"
            alt=""
            src="/vector.svg"
          />
          <div
            className="relative text-xs font-helvetica text-blueviolet-200 text-left inline-block min-w-[73px]"
            style={divStyle}
          >
            {prop}
          </div>
        </button>
      </div>
      <div
        className="w-[238px] flex flex-row items-start justify-start py-0 pr-5 pl-0 box-border"
        style={frameDivStyle}
      >
        <div
          className="h-[46.2px] flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-[24.200000000000728px] box-border gap-[6.299999999999272px]"
          style={frameDiv1Style}
        >
          <div className="self-stretch relative shrink-0 [debug_commit:f6aba90] text-black">
            {theHiltonHotel}
          </div>
          <div
            className="relative text-sm text-dimgray inline-block min-w-[110px] shrink-0 [debug_commit:f6aba90] text-black"
            style={lisbonPortugalStyle}
          >
            {lisbonPortugal}
          </div>
        </div>
      </div>
      <div
        className="self-stretch flex flex-row items-start justify-between gap-[20px] text-lg-8 text-blueviolet-200"
        style={frameDiv2Style}
      >
        <div
          className="h-[25px] relative inline-block min-w-[41px]"
          style={div1Style}
        >
          Own
        </div>
        <div className="h-[21.5px] flex flex-col items-start justify-start pt-[3.5px] px-0 pb-0 box-border text-sm">
          <div
            className="flex-1 flex flex-row items-start justify-start gap-[7.2px]"
            style={frameDiv3Style}
          >
            <img
              className="h-[17.9px] w-[18.9px] relative min-h-[18px]"
              alt=""
              src="/group.svg"
            />
            <div className="relative inline-block min-w-[71px]">{prop1}</div>
          </div>
        </div>
      </div>
      <button className="cursor-pointer [border:none] pt-[11.800000000001091px] px-5 pb-[11.699999999998909px] bg-blueviolet-100 self-stretch rounded-[7.05px] flex flex-row items-start justify-center gap-[28.21192169189453px] hover:bg-darkorchid">
        <img
          className="h-[22px] w-[21.2px] relative hidden min-h-[22px]"
          alt=""
          src="/vector.svg"
        />
        <div className="relative text-base-7 font-helvetica text-white text-left inline-block min-w-[62px]">
          Explore
        </div>
      </button>
    </div>
  );
};

export default DatasetBlock;
