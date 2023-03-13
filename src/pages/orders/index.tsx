import type { Order } from '@prisma/client';
import React from 'react'
import { trpc } from '../../utils/trpc'
import {HiSearchCircle} from 'react-icons/hi/index'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Orders() {
    const router = useRouter()
    const {data, isLoading} = trpc.order.getOrders.useQuery<{data: Order[]}>();
    console.log(data);
    
    const viewOrder = (id: string) => {
        router.push(`/orders/${id}`)
    }

    if(isLoading) {
        return null
    }

  return (
    <>
        <div className="overflow-x-auto">
            <p className="text-3xl text-white pt-4  text-center">Unshipped Orders</p>
            <p className="text-sm text-zinc-200 text-center py-3">Click any order to view</p>
            <table className="table-auto w-full text-white my-5">
                <thead>
                    <tr>
                        <th className="w-[35%] text-left px-2">Order ID</th>
                        <th className="text-left w-[35%] px-2">Date</th>
                        <th className="text-left px-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data?.filter((item: any) => !item.shipped).map((item: any) => (
                        
                        <tr onClick={() => viewOrder(item.id)} key={item.id}>
                            <td className="border border-zinc-300 w-[35%] text-left px-3 py-4">{item.id}</td>
                            <td className="border border-zinc-300 text-left px-3 py-4">{item.createdAt.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: '2-digit'})}</td>
                            <td className="border border-zinc-300 text-left px-3 py-4">${item.total.toFixed(2)}</td>
                        </tr>

                    ))}
                    
                </tbody>
            </table>
            <hr className='mt-7 w-[75%] mx-auto' />
            <div id="completed-orders-wrap" className='mt-7'>
                <p className="text-3xl text-white text-center ">Completed Orders</p>
            </div>
            <div id="search" className='flex flex-col items-center gap-5 justify-center relative'>
                <label htmlFor="order-search" className='text-sm w-full text-zinc-300 text-center'>Search for Order by id, customer email or shipping address</label>
                <input type="text" className="block w-full  border-gray-300 shadow-md shadow-zinc-800 py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10" placeholder="Search completed orders..."/>
                <button type="submit" className="absolute top-5 right-0 h-full px-4 py-2 text-gray-700 z-50">
                    <HiSearchCircle className='text-2xl' /> </button>
            </div>
            <table className="table-auto w-full text-white my-5">
                <thead>
                    <tr>
                        <th className="w-[35%] text-left px-2">Order ID</th>
                        <th className="text-left w-[35%] px-2">Shipped</th>
                        <th className="text-left px-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data?.filter((item: any) => item.shipped).map((item: any, index: number) => (
                        <tr key={index}>
                            <td className="border border-zinc-300 w-[35%] text-left px-3 py-4">{item.id}</td>
                            <td className="border border-zinc-300 text-left px-3 py-4">{item.dateShipped.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: '2-digit'})}</td>
                            <td className="border border-zinc-300 text-left px-3 py-4">${item.total.toFixed(2)}</td>
                        </tr>

                    ))}
                    
                </tbody>
            </table>
        </div>
    </>
  )
}
