import imgImageFrame from "figma:asset/d77ed8d07dbad509bd7ab5e286c6e31590bb0f69.png";
import imgImageFrame1 from "figma:asset/4becfd878069c4df0ebfec7ffb57749b20f5c55f.png";
import imgImageFrame2 from "figma:asset/69e64033d53d8fe3afeedc6660ce8adb3bb1b10a.png";
import imgImageFrame3 from "figma:asset/332b24b3de4e262662ba06ac0d355e3b046308be.png";
import imgImageFrame4 from "figma:asset/f3364c7b257c0b3cc919414fdcfa749e50bbdc2f.png";
import imgImageFrame5 from "figma:asset/410091be46419428c5e5c59d9da30f70a565cea7.png";
import imgImageFrame6 from "figma:asset/f7eaa289a8ed2120f1d1130383a6e1c0725fc497.png";
import imgImageFrame7 from "figma:asset/d032069d0e81c306f7036f6e92d6554c3a1b6eaa.png";

function Expand() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="expand">
      <p className="absolute font-['Font_Awesome_6_Pro:Solid',_sans-serif] h-[12.307px] leading-[normal] left-[1.52px] not-italic text-[#eeeeee] text-[13px] top-[1.85px] w-[12.966px]"></p>
    </div>
  );
}

function ExpandCollapse() {
  return (
    <div className="bg-[#343454] content-stretch flex gap-[10px] items-center justify-center relative rounded-[20px] shrink-0 size-[24px]" data-name=".Expand Collapse">
      <Expand />
    </div>
  );
}

function DropdownIcon() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Dropdown Icon">
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Solid',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d1d2d4] text-[20px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function AssetType() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[4px] py-0 relative rounded-[2px] shrink-0 w-[146px]" data-name=".Asset type">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#d1d2d4] text-[14px] text-center text-nowrap whitespace-pre">Videos (8)</p>
      <DropdownIcon />
    </div>
  );
}

function Frame2430() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0">
      <ExpandCollapse />
      <AssetType />
    </div>
  );
}

function ImageFrame() {
  return (
    <div className="aspect-[264/149] relative rounded-[4px] shrink-0 w-full" data-name=".Image frame">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageFrame} />
    </div>
  );
}

function Frame2419() {
  return (
    <div className="bg-[#232128] h-[103px] relative rounded-[2px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[103px] items-center justify-center p-[2px] relative w-full">
          <ImageFrame />
        </div>
      </div>
    </div>
  );
}

function ImageFrame1() {
  return (
    <div className="h-[99px] relative rounded-[4px] shrink-0 w-[74px]" data-name=".Image frame">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageFrame1} />
    </div>
  );
}

function Frame2420() {
  return (
    <div className="bg-[#232128] h-[103px] relative rounded-[2px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[103px] items-center justify-center p-[2px] relative w-full">
          <ImageFrame1 />
        </div>
      </div>
    </div>
  );
}

function ImageFrame2() {
  return (
    <div className="aspect-[264/149] relative rounded-[4px] shrink-0 w-full" data-name=".Image frame">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageFrame2} />
    </div>
  );
}

function Frame2421() {
  return (
    <div className="bg-[#232128] h-[103px] relative rounded-[2px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[103px] items-center justify-center p-[2px] relative w-full">
          <ImageFrame2 />
        </div>
      </div>
    </div>
  );
}

function ImageFrame3() {
  return (
    <div className="h-[99px] relative rounded-[4px] shrink-0 w-[56px]" data-name=".Image frame">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageFrame3} />
    </div>
  );
}

function Frame2422() {
  return (
    <div className="bg-[#232128] box-border content-stretch flex gap-[10px] h-[103px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 w-[138px]">
      <ImageFrame3 />
    </div>
  );
}

function ImageFrame4() {
  return (
    <div className="h-[103px] relative rounded-[4px] shrink-0 w-[138px]" data-name=".Image frame">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageFrame4} />
    </div>
  );
}

function Frame2418() {
  return (
    <div className="bg-[#232128] box-border content-stretch flex flex-col gap-[10px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0">
      <ImageFrame4 />
    </div>
  );
}

function ImageFrame5() {
  return (
    <div className="aspect-[70/94] basis-0 grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name=".Image frame">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageFrame5} />
    </div>
  );
}

function Frame2423() {
  return (
    <div className="bg-[#232128] box-border content-stretch flex flex-col gap-[10px] h-[103px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0 w-[138px]">
      <ImageFrame5 />
    </div>
  );
}

function ImageFrame6() {
  return (
    <div className="h-[78px] relative rounded-[4px] shrink-0 w-[138px]" data-name=".Image frame">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageFrame6} />
    </div>
  );
}

function Frame2424() {
  return (
    <div className="bg-[#232128] box-border content-stretch flex flex-col gap-[10px] h-[103px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0">
      <ImageFrame6 />
    </div>
  );
}

function ImageFrame7() {
  return (
    <div className="h-[77.886px] relative rounded-[4px] shrink-0 w-[138px]" data-name=".Image frame">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full" src={imgImageFrame7} />
    </div>
  );
}

function Frame2425() {
  return (
    <div className="bg-[#232128] box-border content-stretch flex flex-col gap-[10px] h-[103px] items-center justify-center p-[2px] relative rounded-[2px] shrink-0">
      <ImageFrame7 />
    </div>
  );
}

function ImageCarousel() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[16px] grow items-center min-h-px min-w-px overflow-clip px-[4px] py-0 relative shrink-0 w-[146px]" data-name="Image carousel">
      <Frame2419 />
      <Frame2420 />
      <Frame2421 />
      <Frame2422 />
      <Frame2418 />
      <Frame2423 />
      <Frame2424 />
      <Frame2425 />
    </div>
  );
}

function Down() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip px-[3px] py-0 relative rounded-[2px] shrink-0 size-[16px]" data-name="down">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <p className="font-['Font_Awesome_6_Pro:Solid',_sans-serif] h-[13.773px] leading-[normal] not-italic relative text-[#eeeeee] text-[13px] w-[13.052px]"></p>
        </div>
      </div>
    </div>
  );
}

function IconContainer() {
  return (
    <div className="bg-[#343454] content-stretch flex gap-[10px] items-center justify-center relative rounded-[20px] shrink-0 size-[24px]" data-name="Icon container">
      <Down />
    </div>
  );
}

function Up() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip px-[3px] py-0 relative rounded-[2px] shrink-0 size-[16px]" data-name="up">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <p className="font-['Font_Awesome_6_Pro:Solid',_sans-serif] h-[11.61px] leading-[normal] not-italic relative text-[#979797] text-[13px] w-[12.893px]"></p>
        </div>
      </div>
    </div>
  );
}

function IconContainer1() {
  return (
    <div className="bg-[#343454] content-stretch flex gap-[10px] items-center justify-center relative rounded-[20px] shrink-0 size-[24px]" data-name="Icon container">
      <Up />
    </div>
  );
}

function UpDownIcons() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name=".UpDown icons">
      <IconContainer />
      <IconContainer1 />
    </div>
  );
}

function ImageContainer() {
  return (
    <div className="bg-[#161419] h-full relative rounded-[8px] shrink-0 w-[146px]" data-name="Image container">
      <div className="box-border content-stretch flex flex-col gap-[12px] h-full items-center overflow-clip p-[8px] relative rounded-[inherit] w-[146px]">
        <Frame2430 />
        <ImageCarousel />
        <UpDownIcons />
      </div>
      <div aria-hidden="true" className="absolute border border-[#1c1a1f] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

export default function ImageCarousel1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center px-0 py-[8px] relative size-full" data-name=".Image carousel">
      <ImageContainer />
    </div>
  );
}