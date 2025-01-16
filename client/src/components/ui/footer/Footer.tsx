import { Windows_Dimensions } from "../windows-dimensions/windows-dimensions"

export const Footer = () => {
    const windows = Windows_Dimensions()
    return (
        <>
            {
                windows.width > 1000 ?
                    <footer className="flex w-screen h-14 fade-in justify-center items-center">
                        <p className="block mb-4 text-xs text-center text-zinc-400 mt-4 ">
                            Copyright © 2024&nbsp;
                            <a href="https://github.com/theCrims0n" target="_blank" rel="noreferrer">Miguel Salomon Project</a>.
                        </p>
                    </footer>
                    :
                    <footer className="flex w-screen fade-in h-10 justify-center items-center">
                        <p className="block mb-4 text-[9px]  text-center text-zinc-400 mt-4 ">
                            Copyright © 2024&nbsp;
                            <a href="https://github.com/theCrims0n" target="_blank" rel="noreferrer">Miguel Salomon Project</a>.
                        </p>
                    </footer>
            }
        </>


    )
}