import React from 'react'
import { trpc } from '../utils/trpc'

export default function ConfirmOrderModal({setModalOpen, id, emailAddress, shippingAddress}: {setModalOpen: React.Dispatch<React.SetStateAction<boolean>>, id: string, emailAddress: string, shippingAddress: string}) {
    const ctx = trpc.useContext()
    const shipped = trpc.order.markAsShipped.useMutation({onSuccess: () => ctx.invalidate()})

    const onOrderSubmit = () => {
        shipped.mutate({
            id,
            emailAddress,
            shippingAddress
        })

        setModalOpen(false)
    }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
        <div className="fixed w-full h-full bg-gray-800 opacity-50"></div>
            <div className="relative w-[90%] rounded-lg shadow-lg bg-white transform transition-all py-6 ">
                <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
                <div className="px-4">
                <h2 className="text-xl font-bold mb-4">Confirm</h2>
                <p>Clicking confirm will mark the order as shipped and send out a confirmation email to the customer.</p>
                <button onClick={onOrderSubmit} className="bg-[#46667c] active:bg-[#244e6d] text-white px-4 py-2 rounded-md mt-5 w-full">Order has been shipped</button>
            </div>
        </div>
    </div>
  )
}
