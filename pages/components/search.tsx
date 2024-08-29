import {IoSearch} from "react-icons/io5"

const search = () => {
  return (
    <div className='relative flex flex-1'>
        <input type="text" placeholder='Search...' className='w-full rounded-md py-2 pl-10 border-gray-200'/>
        <IoSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-500"/>
    </div>
  )
}

export default search