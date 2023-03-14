import { useRouter } from 'next/router'
import React, { useState } from 'react'
import CancelOrderModal from '../../components/CancelOrderModal'
import ConfirmOrderModal from '../../components/ConfirmOrderModal'
import { trpc } from '../../utils/trpc'

export default function Order() {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false)

    const {data, isLoading} = trpc.order.getOrder.useQuery({id: router.query.orderId as string})

    if(isLoading) {
        return null
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }
    const toggleCancelModal = () => {
        setCancelModalOpen(!cancelModalOpen)
    }

  return (
    <div className="max-w-7xl  py-10 relative">
        
        <div className="mb-4 px-4 text-zinc-100">
            <h2 className="text-3xl font-bold">Order #</h2>
            <p className='text-green-600 my-2 text-xl font-semibold'>{data?.id}</p>
        </div>
        <div className="mb-4 px-4 text-zinc-100">
            <h2 className="text-xl font-bold">Shipping Address</h2>
            <p className='text-zinc-200 my-2'>{data?.shippingAddress}</p>
        </div>
        
        <div className="mb-4 px-4 text-zinc-100">
            <h2 className="text-xl font-bold">Email Address</h2>
            <p className='text-zinc-200 my-2'>{data?.emailAddress}</p>
        </div>
        
        <div className="mb-8 px-4 text-zinc-100">
            <h2 className="text-xl font-bold">Total Paid</h2>
            <p className="text-green-600 font-bold">${data?.total.toFixed(2)}</p>
        </div>
        
        <table className="w-full border-collapse border border-gray-400 mb-8 text-white">
            <thead>
            <tr>
                {/* <th className="text-left px-4 py-2 bg-gray-200 text-zinc-900">Product ID</th> */}
                <th className="text-left px-4 py-2 bg-gray-200 text-zinc-900">Product Name</th>
                <th className="text-left px-4 py-2 bg-gray-200 text-zinc-900">Quantity</th>
            </tr>
            </thead>
            <tbody>
                {data?.orderItem?.map((item: any) => (
                    <tr key={item.product.id}>
                        {/* <td className="text-left overflow-x-scroll px-4 py-2 border border-gray-400">{item.product.id}</td> */}
                        <td className="text-left px-4 py-2 border border-gray-400">{item.product.name}</td>
                        <td className="text-left px-4 py-2 border border-gray-400">{item.productQuantity}</td>
                    </tr>

                ))}
            
            </tbody>
        </table>

        {data && data?.shipped && <div className="flex justify-center items-center flex-col gap-5 my-4">
            <p className='text-green-400'>Order has been shipped!</p>
        </div>}
        <div className="flex justify-center items-center flex-col gap-5">
        {data && !data?.shipped && <button onClick={toggleModal} className="px-4 py-2 w-[55%] shadow-sm shadow-zinc-300 bg-green-600 text-white font-bold rounded hover:bg-green-700">Mark as Shipped</button>}
            <button onClick={toggleCancelModal} className="px-4 py-2 w-[55%] shadow-sm shadow-zinc-300 bg-red-600 text-white font-bold rounded hover:bg-red-700">Cancel Order</button>
        </div>
        
        {/* {data?.shipped === false ? <div className="flex justify-center items-center flex-col gap-5">
            <button onClick={toggleModal} className="px-4 py-2 w-[55%] shadow-sm shadow-zinc-300 bg-green-600 text-white font-bold rounded hover:bg-green-700">Mark as Shipped</button>
            <button onClick={toggleCancelModal} className="px-4 py-2 w-[55%] shadow-sm shadow-zinc-300 bg-red-600 text-white font-bold rounded hover:bg-red-700">Cancel Order</button>
        </div>
        :
        } */}
        {modalOpen && <ConfirmOrderModal id={data?.id as string} emailAddress={data?.emailAddress as string} shippingAddress={data?.shippingAddress as string} setModalOpen={setModalOpen} />}
        {cancelModalOpen && <CancelOrderModal setCancelModalOpen={setCancelModalOpen} />}
    </div>

  )
}
