import { LoaderCircle } from "lucide-react"

export const Spinner = () => {
    return (
        <div className="w-full h-full flex justify-center place-items-center">
            <LoaderCircle className="-ms-1 me-2 animate-spin"
                size={20}
                strokeWidth={2}
                aria-hidden="true"
                color="white" /></div>
    )
}