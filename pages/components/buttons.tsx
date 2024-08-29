import Link from "next/link"
import {IoAddSharp} from "react-icons/io5"

export const CreateButton = () => {
    return (
        <Link href="/contact/create" className="inline-flex items-center space-x-1 text-white bg-blue-700 hover:bg-blue-800 rounded-md px-4 py-[9px]">
            <IoAddSharp size={20}/>
            Create
        </Link>
    )
}