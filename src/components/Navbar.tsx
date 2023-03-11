import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {CgCloseR} from 'react-icons/cg/index'

export default function Navbar() {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const navbarRef = useRef(null);
  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      
      console.log(event);
      if(!event.target.classList.contains('menu') && !event.target.classList.contains("navbar-toggler")){
        setIsNavOpen(false);

      } else {
        setIsNavOpen(true)
      }
      
      
    }

    if (isNavOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isNavOpen]);
  return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//     <div className="container-fluid">
//         <div className="flex w-full justify-between">
//             <Link className="navbar-brand" href="/"><Image width={100} height={100} src="/images/sockslogo.png" alt="Logo"/></Link>
//             <button   type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             </button> 
//             {/* <Image width={100} height={100}  src="/images/closed.png" alt="closed-tab" className="tab-img navbar-toggler"/>  */}
            
//             <svg id="menu-toggle" className="navbar-toggler hamburger-tab" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
//                 <path className="navbar-toggler" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
//             </svg>
            

                
//         </div>
//         <div id="menu" className="slide-menu">
//             <div className="logout-wrap">
//                 <a href="logout.php">
//                     <Image width={100} height={100} src="/images/house.png" alt="logout" className="logout-img"/>

//                 </a>

//             </div>
//             <ul>
//                 <li><a href="/admin/index.php">Dashboard</a></li>
//                 <li><a href="/admin/orders/index.php">Order History</a></li>
//                 <li><a href="https://www.sillysocksandmore.com" target="_blank" rel="noreferrer">Visit Site</a></li>
//             </ul>
//         </div>
//         <div className="hide collapse navbar-collapse justify-content-end" id="navbarNav">
//         </div>
//     </div>
// </nav>
    <nav className="flex items-center justify-between flex-wrap bg-zinc-300 px-4 py-2 shadow-md shadow-red-900 relative">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Image width={200} height={200} className=" w-24" src="/images/sockslogo.png" alt="Logo"/>
        </div>
        <div className="block lg:hidden">
            <svg id="menu-toggle" onClick={toggleNav} className="navbar-toggler hamburger-tab active:bg-zinc-400 rounded-lg" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                <path className="navbar-toggler" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
        </div>
        <div
        className={`${
          isNavOpen ? "right-0" : "right-[-300px]"
        } block flex-grow lg:flex lg:items-center lg:w-auto absolute  top-0 h-screen p-5 w-52 bg-zinc-400 shadow-md shadow-zinc-800 menu`}
        id="nav-content"
      >
        <CgCloseR className='text-2xl active:bg-gray-600 rounded'/>
        <div className="text-sm lg:flex-grow ">
          <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 shadow-md shadow-zinc-500 bg-gradient-to-b from-[#3d0c0c] to-[#3f1a1a] px-3 w-[90%] p-1 rounded-full hover:bg-red-800 active:bg-[#3d0c0c] hover:text-white mr-4">
              Home
          </Link>
          <Link href="/about" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 shadow-md shadow-zinc-500 bg-gradient-to-b from-[#3d0c0c] to-[#3f1a1a] px-3 w-[90%] p-1 rounded-full hover:bg-red-800 active:bg-[#3d0c0c] hover:text-white mr-4">
              About
            
          </Link>
          <Link href="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 shadow-md shadow-zinc-500 bg-gradient-to-b from-[#3d0c0c] to-[#3f1a1a] px-3 w-[90%] p-1 rounded-full hover:bg-red-800 active:bg-[#3d0c0c] hover:text-white">
              Contact
            
          </Link>
        </div>
      </div>
    </nav>
  )
}
