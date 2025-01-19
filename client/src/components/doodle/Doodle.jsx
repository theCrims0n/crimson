
export const Doodle = () => {

  return (
    <>
      <div className="relative flex flex-row w-full h-full">
        <div className="absolute flex h-full w-full">
          <div className="flex w-full h-full justify-start items-center">
            <div className="flex bg-black bg-black border border-rose-950 border-t-0 h-full w-[50px] ml-4" />
            <div className="flex bg-black bg-black border border-rose-950 border-t-0 h-full w-[50px] ml-4" />
          </div>
          <div className="flex w-full h-full justify-end items-center pr-4">
            <div className="flex bg-black bg-black border border-rose-950 border-t-0 h-full w-[50px] ml-4" />
            <div className="flex bg-black bg-black border border-rose-950 border-t-0 h-full w-[50px] ml-4" />
          </div>
        </div>

        <div className="absolute flex flex-col w-full h-full ">
          <div className="flex flex-col w-full h-full justify-start items-center space-y-4 pt-4">
            <div className="flex bg-black bg-black border border-rose-950 border-l-0 h-[50px] w-full " />
            <div className="flex bg-black bg-black border border-rose-950 border-l-0 h-[50px] w-full " />
          </div>
          <div className="flex flex-col w-full h-full justify-end items-center space-y-4 pb-4">
            <div className="flex bg-black bg-black border border-rose-950 border-l-0 h-[50px] w-full " />
            <div className="flex bg-black bg-black border border-rose-950 border-l-0 h-[50px] w-full " />
          </div>
        </div>
      </div>
    </>
  );
};