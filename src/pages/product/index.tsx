import Image from 'next/image';
import React, {useRef} from 'react'
import useDataUrl from '../../hooks/useDataUrl';

export default function Product() {

    const imageRef = useRef<HTMLInputElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [productImage, setProductImage] = useDataUrl();
    

    const handleButtonClick = () => {
        imageRef.current?.classList.add('disabled');
        imageInputRef.current?.click();
     
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductImage(e)
    }
  return (
    <>
        <h1 className="text-2xl px-2 py-4 text-center w-full text-white">
            Add New Product
        </h1>
        <form className=" p-6">
            <div className="mb-4">
                <label className="block text-zinc-200 font-bold mb-2" htmlFor="name">
                Name
                </label>
                <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-900 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter product name"
                />
            </div>
            <div className="mb-4">
                <label className="block text-zinc-200 font-bold mb-2" htmlFor="category">
                Category
                </label>
                <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-900 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                type="text"
                placeholder="Enter product category"
                />
            </div>
            <div className="mb-4">
                <label className="block text-zinc-200 font-bold mb-2" htmlFor="description">
                Description
                </label>
                <textarea
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
