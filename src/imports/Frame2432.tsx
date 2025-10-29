import svgPaths from "./svg-ykzarvs2x3";
import imgImageFrame from "figma:asset/d77ed8d07dbad509bd7ab5e286c6e31590bb0f69.png";
import imgImageFrame1 from "figma:asset/4becfd878069c4df0ebfec7ffb57749b20f5c55f.png";
import imgImageFrame2 from "figma:asset/69e64033d53d8fe3afeedc6660ce8adb3bb1b10a.png";
import imgImageFrame3 from "figma:asset/332b24b3de4e262662ba06ac0d355e3b046308be.png";
import imgImageFrame4 from "figma:asset/f3364c7b257c0b3cc919414fdcfa749e50bbdc2f.png";
import imgImageFrame5 from "figma:asset/410091be46419428c5e5c59d9da30f70a565cea7.png";
import imgImageFrame6 from "figma:asset/f7eaa289a8ed2120f1d1130383a6e1c0725fc497.png";
import imgImageFrame7 from "figma:asset/d032069d0e81c306f7036f6e92d6554c3a1b6eaa.png";
import imgMapOfBirminghamCity from "figma:asset/9fcda7faf487ffa9a989ea8f44315905f0ff23fa.png";
import imgPegmanOffscreen2X from "figma:asset/747a27fe416ebfaf57b25beae190a98036e77d0e.png";

function BreadcrumbsElement() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[32px] items-center justify-center pb-[12px] pt-[11px] px-0 relative shrink-0" data-name="Breadcrumbs element">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#c34400] text-[14px] text-nowrap whitespace-pre">Home</p>
    </div>
  );
}

function ChevronRight() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[13px]" data-name="chevron-right">
      <div className="flex flex-col font-['Font_Awesome_6_Pro:Light',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#141217] text-[12px] text-center w-full">
        <p className="leading-[normal]"></p>
      </div>
    </div>
  );
}

function BreadcrumbsDivider() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] h-[32px] items-center justify-center pb-[12px] pt-[11px] px-[7px] relative shrink-0" data-name="Breadcrumbs Divider">
      <ChevronRight />
    </div>
  );
}

function BreadcrumbsElementConcept3() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[32px] items-center justify-center pb-[12px] pt-[11px] px-0 relative shrink-0" data-name="Breadcrumbs element concept 3">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#c34400] text-[14px] text-nowrap whitespace-pre">Assets</p>
    </div>
  );
}

function BreadcrumbsElementConcept4() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[32px] items-center justify-center pb-[12px] pt-[11px] px-0 relative shrink-0" data-name="Breadcrumbs element concept 4">
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#c34400] text-[14px] text-nowrap whitespace-pre">Search Results</p>
    </div>
  );
}

function BreadcrumbsElementConcept5() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[32px] items-center justify-center pb-[12px] pt-[11px] px-0 relative shrink-0" data-name="Breadcrumbs element concept 5">
      <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#141217] text-[14px] text-nowrap whitespace-pre">
        <span>{`Asset Detail: `}</span>
        <span className="font-['Inter:Regular',_sans-serif] font-normal">file0_202401021259524060</span>
      </p>
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="box-border content-stretch flex items-start pl-[24px] pr-0 py-0 relative shrink-0" data-name="Breadcrumbs">
      <BreadcrumbsElement />
      <BreadcrumbsDivider />
      <BreadcrumbsElementConcept3 />
      <BreadcrumbsDivider />
      <BreadcrumbsElementConcept4 />
      <BreadcrumbsDivider />
      <BreadcrumbsElementConcept5 />
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-[10px] items-center justify-center px-[6px] py-[3px] relative rounded-[2px] shrink-0" data-name="Tag">
      <div aria-hidden="true" className="absolute border border-[rgba(51,51,51,0.5)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#333333] text-[14px] text-nowrap whitespace-pre">Primary</p>
    </div>
  );
}

function NavigationItem() {
  return (
    <div className="basis-0 content-stretch flex gap-[32px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Navigation Item">
      <Breadcrumbs />
      <Tag />
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Navigation">
      <NavigationItem />
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Top">
      <Navigation />
    </div>
  );
}

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
      <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#d1d2d4] text-[14px] text-center text-nowrap whitespace-pre">Images (8)</p>
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
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[2px]" />
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
      <div aria-hidden="true" className="absolute border border-[#494d4f] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function ImageCarousel1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] h-[849px] items-center px-0 py-[8px] relative shrink-0" data-name=".Image carousel">
      <ImageContainer />
    </div>
  );
}

function TabContainer() {
  return (
    <div className="basis-0 box-border content-stretch flex grow items-center justify-center min-h-px min-w-px px-[24px] py-0 relative shrink-0" data-name="Tab Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#eeeeee] text-[14px] text-center text-nowrap tracking-[0.14px]">
        <p className="leading-[16px] whitespace-pre">Evidence Viewer</p>
      </div>
    </div>
  );
}

function TabLine() {
  return <div className="bg-[#ff7932] h-[2px] rounded-[1px] shrink-0 w-full" data-name="tab line" />;
}

function Tabs() {
  return (
    <div className="content-stretch flex flex-col h-[34px] items-center justify-center relative shrink-0" data-name="Tabs">
      <TabContainer />
      <TabLine />
    </div>
  );
}

function TabContainer1() {
  return (
    <div className="basis-0 box-border content-stretch flex grow items-center justify-center min-h-px min-w-px px-[24px] py-0 relative shrink-0" data-name="Tab Container">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9e9e9e] text-[14px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">Asset Metadata</p>
      </div>
    </div>
  );
}

function TabLine1() {
  return <div className="bg-[#494d4f] h-px rounded-[1px] shrink-0 w-full" data-name="tab line" />;
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[2px] items-start justify-end relative shrink-0 w-full" data-name="Container">
      <TabLine1 />
    </div>
  );
}

function Tabs1() {
  return (
    <div className="content-stretch flex flex-col h-[34px] items-center justify-center relative shrink-0" data-name="Tabs">
      <TabContainer1 />
      <Container />
    </div>
  );
}

function TabContainer2() {
  return (
    <div className="basis-0 box-border content-stretch flex grow items-center justify-center min-h-px min-w-px px-[24px] py-0 relative shrink-0" data-name="Tab Container">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9e9e9e] text-[14px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">See More Assets</p>
      </div>
    </div>
  );
}

function TabLine2() {
  return <div className="bg-[#494d4f] h-px rounded-[1px] shrink-0 w-full" data-name="tab line" />;
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[2px] items-start justify-end relative shrink-0 w-full" data-name="Container">
      <TabLine2 />
    </div>
  );
}

function Tabs2() {
  return (
    <div className="content-stretch flex flex-col h-[34px] items-center justify-center relative shrink-0" data-name="Tabs">
      <TabContainer2 />
      <Container1 />
    </div>
  );
}

function TabContainer3() {
  return (
    <div className="basis-0 box-border content-stretch flex grow items-center justify-center min-h-px min-w-px px-[24px] py-0 relative shrink-0" data-name="Tab Container">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#9e9e9e] text-[14px] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">Audit Trail</p>
      </div>
    </div>
  );
}

function TabLine3() {
  return <div className="bg-[#494d4f] h-px rounded-[1px] shrink-0 w-full" data-name="tab line" />;
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[2px] items-start justify-end relative shrink-0 w-full" data-name="Container">
      <TabLine3 />
    </div>
  );
}

function Tabs3() {
  return (
    <div className="content-stretch flex flex-col h-[34px] items-center justify-center relative shrink-0" data-name="Tabs">
      <TabContainer3 />
      <Container2 />
    </div>
  );
}

function AssetDetailTabs() {
  return (
    <div className="content-stretch flex items-start justify-end relative shrink-0" data-name=".Asset detail tabs">
      <Tabs />
      <Tabs1 />
      <Tabs2 />
      <Tabs3 />
    </div>
  );
}

function TabsContainer() {
  return (
    <div className="box-border content-stretch flex gap-[41px] items-center mb-[-1px] relative shrink-0 w-full z-[2]" data-name="Tabs container">
      <AssetDetailTabs />
    </div>
  );
}

function Video() {
  return (
    <div className="aspect-[160/90] relative shrink-0 w-full" data-name="Video">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageFrame2} />
    </div>
  );
}

function VideosTitlesSpace() {
  return (
    <div className="basis-0 bg-[#100f12] box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="Videos titles space">
      <Video />
    </div>
  );
}

function Back2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip px-[3px] py-0 relative rounded-[2px] shrink-0 size-[16px]" data-name="back">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <p className="font-['Font_Awesome_6_Pro:Solid',_sans-serif] h-[11.994px] leading-[normal] not-italic relative text-[#f5f5f3] text-[13px] w-[10.003px]"></p>
        </div>
      </div>
    </div>
  );
}

function PreviousImage() {
  return (
    <div className="bg-[#343454] content-stretch flex gap-[10px] items-center justify-center relative rounded-[20px] shrink-0 size-[24px]" data-name=".Previous image">
      <Back2 />
    </div>
  );
}

function Frame2278() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">
        <p className="leading-[normal] whitespace-pre">file0_202401021259524060</p>
      </div>
    </div>
  );
}

function Frame2277() {
  return (
    <div className="content-stretch flex gap-[761px] items-center relative shrink-0">
      <Frame2278 />
    </div>
  );
}

function CameraLabel() {
  return (
    <div className="box-border content-stretch flex h-[24px] items-center px-[4px] py-px relative shrink-0" data-name="Camera label">
      <Frame2277 />
    </div>
  );
}

function Next() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip px-[3px] py-0 relative rounded-[2px] shrink-0 size-[16px]" data-name="next">
      <p className="font-['Font_Awesome_6_Pro:Solid',_sans-serif] h-[11.993px] leading-[normal] not-italic relative shrink-0 text-[#f5f5f3] text-[13px] w-full"></p>
    </div>
  );
}

function NextImage() {
  return (
    <div className="bg-[#343454] content-stretch flex gap-[10px] items-center justify-center relative rounded-[20px] shrink-0 size-[24px]" data-name=".Next image">
      <Next />
    </div>
  );
}

function Frame2386() {
  return (
    <div className="basis-0 box-border content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px mr-[-80px] relative shrink-0">
      <PreviousImage />
      <CameraLabel />
      <NextImage />
    </div>
  );
}

function Table() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="table">
      <div className="absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',_sans-serif] h-[18.25px] justify-center leading-[0] left-[1.52px] not-italic text-[21px] text-white top-[12px] translate-y-[-50%] w-[20.954px]">
        <p className="leading-[normal]"></p>
      </div>
    </div>
  );
}

function MultipleVideosIconsContainer() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 size-[40px]" data-name="Multiple videos-icons-container">
      <Table />
    </div>
  );
}

function Expand1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="expand">
      <p className="absolute font-['Font_Awesome_6_Pro:Solid',_sans-serif] inset-[7.94%_11.93%_7.95%_11.93%] leading-[normal] not-italic text-[21px] text-white"></p>
    </div>
  );
}

function FullScreenIconContainer() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 size-[40px]" data-name="Full screen-icon-container">
      <Expand1 />
    </div>
  );
}

function ScreenControls() {
  return (
    <div className="box-border content-stretch flex items-center justify-end mr-[-80px] relative shrink-0" data-name="Screen controls">
      <MultipleVideosIconsContainer />
      <FullScreenIconContainer />
    </div>
  );
}

function AssetNameContainer() {
  return (
    <div className="bg-[#161419] box-border content-stretch flex h-[48px] items-center justify-center pl-[12px] pr-[92px] py-0 relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-[1111px]" data-name=".Asset name container">
      <Frame2386 />
      <ScreenControls />
    </div>
  );
}

function Frame2318() {
  return (
    <div className="basis-0 grow mb-[-1px] min-h-px min-w-px relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full z-[1]">
      <div aria-hidden="true" className="absolute border border-[#494d4f] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-br-[8px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-center p-px relative size-full">
          <VideosTitlesSpace />
          <AssetNameContainer />
        </div>
      </div>
    </div>
  );
}

function EvidenceViewer() {
  return (
    <div className="box-border content-stretch flex flex-col h-[849px] isolate items-start justify-center pb-[9px] pt-0 px-[16px] relative shrink-0 w-[1145px]" data-name=".Evidence viewer">
      <TabsContainer />
      <Frame2318 />
    </div>
  );
}

function LeftSide() {
  return (
    <div className="basis-0 content-stretch flex grow h-full items-end min-h-px min-w-px relative shrink-0" data-name="Left side">
      <ImageCarousel1 />
      <EvidenceViewer />
    </div>
  );
}

function ChevronLeft() {
  return (
    <div className="h-[21px] mr-[-6px] relative shrink-0 w-[13px]" data-name="chevron-left">
      <div className="absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',_sans-serif] inset-[14.29%_15.38%_19.05%_15.38%] justify-center leading-[0] not-italic text-[14px] text-center text-nowrap text-white">
        <p className="leading-[normal] whitespace-pre"></p>
      </div>
    </div>
  );
}

function Frame2314() {
  return (
    <div className="box-border content-stretch flex items-start pl-0 pr-[6px] py-0 relative shrink-0">
      {[...Array(2).keys()].map((_, i) => (
        <ChevronLeft key={i} />
      ))}
    </div>
  );
}

function Frame2312() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative">
      <div className="bg-white h-[12px] relative shrink-0 w-[2px]">
        <div aria-hidden="true" className="absolute border-2 border-black border-dashed inset-0 pointer-events-none" />
      </div>
      <Frame2314 />
      <div className="bg-white h-[12px] relative shrink-0 w-[2px]">
        <div aria-hidden="true" className="absolute border-2 border-black border-dashed inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="bg-[#151515] box-border content-stretch flex h-full items-center justify-center px-[3px] py-[10px] relative shrink-0" data-name="Separator">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Frame2312 />
        </div>
      </div>
    </div>
  );
}

function TabContainer4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Tab Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[24px] py-0 relative size-full">
          <div className="flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#eeeeee] text-[14px] text-center text-nowrap tracking-[0.14px]">
            <p className="leading-[16px] whitespace-pre">Map</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabLine4() {
  return <div className="bg-[#ff7932] h-[2px] rounded-[1px] shrink-0 w-full" data-name="tab line" />;
}

function Tabs4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[34px] items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Tabs">
      <TabContainer4 />
      <TabLine4 />
    </div>
  );
}

function Tabs5() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-px min-w-px relative shrink-0 z-[1]" data-name="Tabs">
      <Tabs4 />
    </div>
  );
}

function RightPanelTabs() {
  return (
    <div className="bg-[#2a2a2a] box-border content-stretch flex isolate items-center max-w-[516px] min-w-[516px] pb-0 pt-px px-0 relative shrink-0 w-[516px]" data-name="Right panel Tabs">
      <Tabs5 />
    </div>
  );
}

function MapsZoomLevels2City() {
  return (
    <div className="absolute bg-white inset-0 overflow-clip" data-name="Maps / Zoom Levels / 2 (City)">
      <div className="absolute h-[1299px] left-1/2 top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%] w-[1346px]" data-name="Map of Birmingham (City)">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMapOfBirminghamCity} />
      </div>
    </div>
  );
}

function ControlsGoogleMapsByline() {
  return (
    <div className="absolute bottom-0 h-[15px] right-0 w-[287px]" data-name="Controls / Google Maps Byline">
      <div className="absolute bg-[rgba(245,245,245,0.8)] bottom-0 left-0 right-[57.84%] top-0" />
      <p className="absolute bottom-0 font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] left-[1.74%] right-[59.58%] text-[10px] text-[rgba(0,0,0,0.8)] text-nowrap top-[20%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Map data @2019 Google
      </p>
      <div className="absolute bg-[rgba(245,245,245,0.8)] bottom-0 left-[42.51%] right-[33.1%] top-0" data-name="Rectangle 3.1" />
      <p className="absolute bottom-0 font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] left-[44.25%] right-[34.84%] text-[10px] text-[rgba(0,0,0,0.8)] text-nowrap top-[20%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Terms of Use
      </p>
      <div className="absolute bg-[rgba(245,245,245,0.8)] bottom-0 left-[67.25%] right-0 top-0" data-name="Rectangle 3.2" />
      <p className="absolute bottom-0 font-['Roboto:Regular',_sans-serif] font-normal leading-[normal] left-[68.99%] right-[1.74%] text-[10px] text-[rgba(0,0,0,0.8)] text-nowrap top-[20%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Report a map error
      </p>
    </div>
  );
}

function GoogleLogo() {
  return (
    <div className="absolute h-[19.672px] left-[2px] top-[3.33px] w-[61.603px]" data-name="Google Logo">
      <div className="absolute inset-[-15.25%_-4.87%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 68 26">
          <g filter="url(#filter0_d_4_12739)" id="Google Logo">
            <path d={svgPaths.p263d6f00} fill="var(--fill-0, #EA4335)" id="Vector" />
            <path d={svgPaths.p18e69280} fill="var(--fill-0, #FBBC05)" id="Vector_2" />
            <path d={svgPaths.p3a060c00} fill="var(--fill-0, #4285F4)" id="Vector_3" />
            <path d={svgPaths.p22589680} fill="var(--fill-0, #34A853)" id="Vector_4" />
            <path d={svgPaths.p36dafd80} fill="var(--fill-0, #EA4335)" id="Vector_5" />
            <path d={svgPaths.pfc6b000} fill="var(--fill-0, #4285F4)" id="Vector_6" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="25.6721" id="filter0_d_4_12739" width="67.6033" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="1.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4_12739" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4_12739" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ControlsGoogleLogoColor() {
  return (
    <div className="absolute bottom-0 h-[26px] left-[5px] w-[66px]" data-name="Controls / Google Logo / Color">
      <GoogleLogo />
    </div>
  );
}

function ControlsStreetView() {
  return (
    <div className="absolute right-[8px] size-[28px] top-[69px]" data-name="Controls / Street View">
      <div className="absolute bg-white inset-0 rounded-[2px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.2)]" data-name="Rectangle" />
      <div className="absolute inset-[14.29%_28.57%]" data-name="pegman-offscreen-2x">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPegmanOffscreen2X} />
      </div>
    </div>
  );
}

function ControlsZoomControls() {
  return (
    <div className="absolute h-[53px] right-[8px] top-[8px] w-[28px]" data-name="Controls / Zoom Controls">
      <div className="absolute inset-[-3.77%_-10.71%_-7.55%_-10.71%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 59">
          <g id="Controls / Zoom Controls">
            <g filter="url(#filter0_d_4_12730)" id="Rectangle">
              <rect fill="var(--fill-0, white)" height="53" rx="2" width="28" x="3" y="2" />
            </g>
            <path d={svgPaths.p3c095000} fill="var(--fill-0, #666666)" id="Union" />
            <path d="M22 43H12V41H22V43Z" fill="var(--fill-0, #666666)" id="Union_2" />
            <rect fill="var(--fill-0, #E6E6E6)" height="1" id="Rectangle 2" width="20" x="7" y="28" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="59" id="filter0_d_4_12730" width="34" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4_12730" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4_12730" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Controls() {
  return (
    <div className="absolute contents right-[8px] top-[8px]" data-name="Controls">
      <ControlsStreetView />
      <ControlsZoomControls />
    </div>
  );
}

function ControlsMapType() {
  return (
    <div className="absolute h-[29px] left-[8px] top-[8px] w-[94px]" data-name="Controls / Map Type">
      <div className="absolute bg-white inset-0 rounded-[2px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.2)]" data-name="Rectangle" />
      <p className="absolute font-['Roboto:Regular',_sans-serif] font-normal inset-[27.59%_8.51%_27.59%_48.94%] leading-[normal] text-[#565656] text-[11px] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Satellite
      </p>
      <div className="absolute bottom-0 flex items-center justify-center left-[40.43%] right-[59.57%] top-0">
        <div className="flex-none">
          <div className="relative size-full" data-name="Line">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 1">
                <line id="Line" stroke="var(--stroke-0, #F2F2F2)" x2="29" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',_sans-serif] font-medium inset-[27.59%_68.08%_27.59%_8.51%] leading-[normal] text-[11px] text-black text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Map
      </p>
    </div>
  );
}

function MapsFullMap() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px overflow-clip relative shrink-0" data-name="Maps / Full Map">
      <MapsZoomLevels2City />
      <ControlsGoogleMapsByline />
      <ControlsGoogleLogoColor />
      <Controls />
      <ControlsMapType />
    </div>
  );
}

function Frame2426() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0 w-full">
      <MapsFullMap />
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[#141414] content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Content">
      <div aria-hidden="true" className="absolute border-[#444444] border-[1px_0px] border-solid inset-0 pointer-events-none" />
      <RightPanelTabs />
      <Frame2426 />
    </div>
  );
}

function RightPanel() {
  return (
    <div className="bg-[#333333] content-stretch flex h-full items-start justify-end relative shrink-0" data-name="Right panel">
      <Separator />
      <Content />
    </div>
  );
}

function RightPanelOpen() {
  return (
    <div className="basis-0 bg-[#100f12] grow min-h-px min-w-px relative shrink-0 w-full" data-name="Right panel open">
      <div className="flex flex-row justify-end size-full">
        <div className="box-border content-stretch flex items-start justify-end pl-[24px] pr-0 py-0 relative size-full">
          <LeftSide />
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

function AssetDetailScreen() {
  return (
    <div className="absolute content-stretch flex flex-col h-[881px] items-center justify-end left-0 top-0 w-[1857px]" data-name=".Asset Detail Screen">
      <Top />
      <RightPanelOpen />
    </div>
  );
}

export default function Frame2432() {
  return (
    <div className="relative size-full">
      <AssetDetailScreen />
    </div>
  );
}