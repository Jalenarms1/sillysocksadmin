import React from 'react'

export default function CancelOrderModal({setCancelModalOpen}: {setCancelModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ">
        <div className="fixed w-full h-full bg-gray-800 opacity-50"></div>
            <div className="relative w-[90%] rounded-lg shadow-lg bg-white transform transition-all py-6 ">
                <button onClick={() => setCancelModalOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
                <div className="px-4">
                <h2 className="text-xl font-bold mb-4">Confirm</h2>
                <p>Clicking confirm will cancel the order and send out a confirmation of cancellation email to the customer.</p>
                <button className="bg-[#ad3636] active:bg-[#244e6d] text-white px-4 py-2 rounded-md mt-5 w-full">Cancel Order</button>
            </div>
        </div>
    </div>
  )
}
