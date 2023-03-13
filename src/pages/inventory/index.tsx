import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { trpc } from '../../utils/trpc'
import {HiSearchCircle} from 'react-icons/hi/index'
import {TfiTrash} from 'react-icons/tfi/index'

export default function Inventory() {
    const ctx = trpc.useContext();
    const {data, isLoading} = trpc.product.getProducts.useQuery();
    const deleteProducts = trpc.product.deleteProducts.useMutation({onSuccess: () => ctx.invalidate()})
    const [deleteIds, setDeleteIds] = useState<string[]>([])
    console.log(deleteIds);
    

    const handleDelCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        if(deleteIds.filter((item:any) => item === e.target.id).length > 0) {
            setDeleteIds(deleteIds.filter((item:any) => item !== e.target.id))
        } else {
            setDeleteIds((prev: any) => {
                return [...prev, e.target.id]
            })
        }
    }

    const submitDelete = () => {
        setDeleteIds([])
        deleteProducts.mutate({
            ids: deleteIds
        })
    }

    if(isLoading) {
        return null
    }

  return (
    
    <div className="max-w-md mx-auto">

        <div className="relative ">
            <input type="text" className="block w-full  border-gray-300 shadow-md shadow-zinc-800 py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10" placeholder="Search products..."/>
            <button type="submit" className="absolute top-0 right-0 h-full px-4 py-2 text-gray-700">
               <HiSearchCircle className='text-2xl' /> 
            </button>
        </div>
        {deleteIds.length > 0 && <div className="confirm-delete w-full h-10 flex justify-between items-center px-2  bg-red-600">
            <p className='font-semibold text-white'>Delete {deleteIds.length} item(s)</p>
            <TfiTrash onClick={submitDelete} className='text-white text-2xl'/>
        </div>}

        <div id="card-wrap " className='w-full flex flex-col justify-center items-center mt-10'>
            
            {data?.map((item: any, index: number) => (
                <div key={index} className="bg-white rounded-lg relative shadow-md overflow-hidden w-3/5 mb-5">
                    <input onChange={handleDelCheck} id={item.id} type="checkbox" className="absolute top-0 left-0 m-4 z-10 w-6 h-6" />
                    <Link href={`inventory/update/${item.id}`}>
                        <Image width={250} height={250} src={item.image} alt="Product Image" className="w-full h-64 object-cover"/>
                    </Link>
                    <div className="p-4 shadow-inner shadow-zinc-900">
                        <p className="text-lg font-semibold mb-4">{item.quantity} <span className='text-sm text-green-400 ml-2'>in-stock</span></p>
                        <p className="text-lg font-semibold">{item.name}</p>
                    </div>
                </div>

            ))}
            


        </div>
    </div>
            
    
  )
}
