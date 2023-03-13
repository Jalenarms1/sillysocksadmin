import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'

export default function Admin() {

    const {data: session} = useSession();
    console.log(session);

    if(session?.user?.email?.toLowerCase() !== 'sillysocksandmore@gmail.com') {
        return (
            <div>You are not authorized to use this application. Please Logout.</div>
        )
    }
    

  return (
    <div className="flex flex-col justify-center items-center p-4 w-full">
        <div className="heading text-gray-100 w-full flex flex-col justify-center items-center gap-4 mt-3">
          <h1 className="text-4xl font-semibold">Welcome, Admin!</h1>
          <p className="text-sm text-gray-400">There are 0 orders waiting to bu fulfilled.</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 mt-8 w-full">
          <div className="bg-gray-300 rounded-lg shadow-lg p-4 my-2 w-full flex flex-col justify-center items-center gap-5">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Manage Orders</h2>
            <Link href="/orders" className="bg-[#46667c] active:bg-[#244e6d] text-white font-bold py-2 px-4 rounded-full w-full text-center">Continue</Link>
          </div>
          <div className="bg-gray-300 rounded-lg shadow-lg p-4 my-2 w-full flex flex-col justify-center items-center gap-5">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Manage Inventory</h2>
            <Link href="/inventory" className="bg-[#46667c] active:bg-[#244e6d] text-white font-bold py-2 px-4 rounded-full w-full text-center">Continue</Link>
          </div>
          <div className="bg-gray-300 rounded-lg shadow-lg p-4 my-2 w-full flex flex-col justify-center items-center gap-5">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Add New Product</h2>
            <Link href={`/product`} className="bg-[#46667c] active:bg-[#244e6d] text-white font-bold py-2 px-4 rounded-full w-full text-center">Continue</Link>
          </div>
        </div>
      </div>
  )
}
