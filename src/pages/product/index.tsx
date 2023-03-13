import Image from 'next/image';
import React, {ChangeEvent, useRef, useState} from 'react'
import useDataUrl from '../../hooks/useDataUrl';
import { trpc } from '../../utils/trpc';

export default function Products() {
    const defaultState = {name: '', category: '', description: '', quantity: '', price: ''}
    const [err, setErr] = useState<boolean>(false)
    const imageRef = useRef<HTMLInputElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [productImage, setProductImage, resetImage] = useDataUrl();
    const [state, setState] = useState(defaultState)
    const submit = trpc.product.addProduct.useMutation();
    

    const handleButtonClick = () => {
        imageRef.current?.classList.add('disabled');
        imageInputRef.current?.click();
     
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductImage(e)
    }

    const submitNewProduct = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const prodObj = {
            ...state,
            quantity: parseInt(state.quantity),
            price: parseFloat(state.price),
            image: productImage as string
        }
        
        submit.mutate(prodObj)
        setState(defaultState)
        resetImage()
        
    }

    const updateState = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setState((prev: any) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

  return (
    <>
        <h1 className="text-2xl px-2 py-4 text-center w-full text-white">
            Add New Product
        </h1>
                
        <form className=" p-6" onSubmit={submitNewProduct}>
            <div className="mb-4">
                <label className="block text-zinc-200 font-bold mb-2" htmlFor="name">
                Name
                </label>
                <input
                onChange={updateState}
                value={state.name}
                name="name"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-900 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter product name"
                />
            </div>
            <div className="mb-4">
                <label className="block text-zinc-200 font-bold mb-2">Category</label>
                <div className="flex items-center mb-2">
                    <label className="mr-4 text-white">
                    <input
                    onChange={updateState}
                    
                        required
                        type="radio"
                        name="category"
                        value="Socks"
                        className="mr-2"
                    />
                    Socks
                    </label>
                    <label className="mr-4 text-white">
                    <input
                    onChange={updateState}
                    
                        required
                        type="radio"
                        name="category"
                        value="Shirts"
                        className="mr-2"
                    />
                    Shirts
                    </label>
                    <label className='text-white'>
                    <input
                    onChange={updateState}
                    
                        required
                        type="radio"
                        name="category"
                        value="Accessories"
                        className="mr-2 " 
                    />
                    Accessories
                    </label>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-zinc-200 font-bold mb-2" htmlFor="description">
                Description
                </label>
                <textarea
                name='description'
                onChange={updateState}
                value={state.description}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-900 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Enter product description"
                rows={5}
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-zinc-200 font-bold mb-2" htmlFor="image">
                Image File
                </label>
                <label
                    htmlFor="image"
                    className="inline-block bg-gray-200 rounded-lg px-4 w-full h-full py-2 font-bold cursor-pointer hover:bg-gray-300"
                    style={{ display: 'inline-block' }}
                    onClick={handleButtonClick}
                >
                    Choose an image
                </label>
                {err && <p>Please choose an image</p>}
                <input
                 onChange={onFileChange} className='hidden w-fit' accept="image/*" type="file" name="image" id="image" ref={imageRef}/>
                <div className="my-4 flex justify-center" id="image-preview">
                    {productImage && <Image width={250} height={250} src={productImage} alt={'product-image'} />}
                </div>
            </div>
            <div className="flex gap-5 justify-center">

                <div className="mb-4 w-[40%]">
                    <label className="block text-zinc-200 font-bold mb-2" htmlFor="quantity">
                    Quantity
                    </label>
                    <input
                    name='quantity'
                    onChange={updateState}
                    value={state.quantity}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-900 leading-tight focus:outline-none focus:shadow-outline"
                    id="quantity"
                    type="number"
                    min="0"
                    />
                </div>
                <div className="mb-4 w-[40%]">
                    <label className="block text-zinc-200 font-bold mb-2" htmlFor="price">
                    Price
                    </label>
                    <input
                    name='price'
                    onChange={updateState}
                    value={state.price}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-900 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center">
                <button
                className="bg-[#46667c] active:bg-[#244e6d] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                >
                Add Product
                </button>
            </div>
            </form>

    </>
  )
}
