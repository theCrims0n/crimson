import { cn } from "../../../lib/utils";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> { }

const InputChat = React.forwardRef<HTMLTextAreaElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <textarea
            placeholder="Type here..."
                className={cn(
                    "[resize:none] placeholder-gray-300 placeholder-opacity-75 autofill:shadow-[inset_0_0_0px_1000px_rgb(0,0,0)] autofill-text bg-black flex h-9 w-full font-normal rounded-none border-2 border-rose-950 bg-black px-3 py-2 text-sm/[14px] text-zinc-100 shadow-sm shadow-black/5 ring-offset-background transition-shadow focus:outline-none focus:ring-0 focus:border-lime-500 disabled:cursor-not-allowed disabled:opacity-50",
                    type === "search" &&
                    "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
                    type === "file" &&
                    "placeholder-gray-300 placeholder-opacity-75 p-0 pr-3 italic text-zinc-100 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-black file:px-3 file:text-xs file:font-medium file:not-italic file:text-zinc-100 focus:bg-purple-800",
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
InputChat.displayName = "InputChat";

export { InputChat };