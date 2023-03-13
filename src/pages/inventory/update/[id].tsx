import { Product } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, {useEffect, useRef, useState} from 'react'
import useDataUrl from '../../../hooks/useDataUrl';
import { trpc } from '../../../utils/trpc'

export default function Item() {
    const imageRef = useRef<HTMLInputElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [productImage, setProductImage, resetImage] = useDataUrl();
    const [err, setErr] = useState<boolean>(false)
    const ctx = trpc.useContext()
    const router = useRouter()
    console.log(router);
    const {data, isLoading} = trpc.product.findProduct.useQuery<{data: Product}>({id: router.query.id as string})
    console.log("data", data);
    const updateCall = trpc.product.updateProduct.useMutation({onSuccess: () => ctx.invalidate()})
    
    
    const [updState, setUpdState] = useState({name: '', description: '', category: '', image: '', quantity: '', price: ''})
    console.log(updState);
    
    
    const {name, description, category, image, quantity, price} = data as Product || {name: '', description: '', category: '', image: '', quantity: '', price: ''}
    
    const onUpdInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setUpdState((prev:any) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleButtonClick = () => {
        imageRef.current?.classList.add('disabled');
        imageInputRef.current?.click();
        
    };
    
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductImage(e)
    }

    const handleUpdateSubmit = (prop: string, newValue: string ) => {
        updateCall.mutate({
            prop,
            id: router.query.id as string,
            newValue
            
            
            
        })
        
        setUpdState({name: '', description: '', category: '', image: '', quantity: '', price: ''})
        resetImage()
        
    }
    
    useEffect(() => {
        setUpdState((prev: any) => {
            return {
                ...prev,
                image: productImage
            }
        })
    }, [productImage])

    if(!router.query.id){
        return null
    }
    if(isLoading) {
        return null
    }
    if(data) {
        return (
          <>
              <div className="max-w-2xl mx-auto">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-4 w-2/4 h-56 mx-auto my-10">
                      <Image width={250} height={250} className="w-full h-fit" src={image} alt="Product image" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className=" p-4 bg-white shadow-lg rounded-lg overflow-hidden w-[85%] mx-auto">
                          <label className="block text-zinc-900 font-bold mb-2 w-fit" htmlFor="image">
                          Image File
                          </label>
                          <label
                              htmlFor="image"
                              className="inline-block my-2 bg-gray-200 rounded-lg px-4 w-full h-10 py-2 font-bold cursor-pointer hover:bg-gray-300"
                              style={{ display: 'inline-block' }}
                              onClick={handleButtonClick}
                          >
                              Choose an image
                          </label>
                          {err && <p>Please choose an image</p>}
                          <input
                          onChange={onFileChange} className='hidden w-fit' accept="image/*" type="file" name="image" id="image" ref={imageRef}/>
                          <div className=" flex justify-center" id="image-preview">
                              {productImage && <Image width={250} height={250} src={productImage} alt={'product-image'} />}
      
                          </div>
                          <button onClick={() => handleUpdateSubmit('image', updState.image)} className="bg-blue-500 my-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Update</button>
                      </div>
                      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[85%] mx-auto">
                      <div className="p-4">
                          <p className="text-xl mb-2 font-semibold">Name</p>
                          {name && <label className="block mb-2" htmlFor="product-name">{name}</label>}
                          <input onChange={onUpdInput} name="name" className="w-full border-gray-300 rounded-md shadow-inner shadow-zinc-900 p-2" type="text" id="product-name" value={updState.name} />
                      </div>
                      <div className="px-4 pb-4">
                          <button onClick={() => handleUpdateSubmit('name', updState.name)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Update</button>
                      </div>
                      </div>
                      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[85%] mx-auto">
                      <div className="p-4">
                      <p className="text-xl mb-2 font-semibold">Description</p>
      
                          <label className="block mb-2" htmlFor="description">{description}</label>
                          <textarea onChange={onUpdInput} name="description" className="w-full border-gray-300 rounded-md shadow-inner shadow-zinc-900 p-2" id="description" value={updState.description}></textarea>
                      </div>
                      <div className="px-4 pb-4">
                          <button onClick={() => handleUpdateSubmit('description', updState.description)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Update</button>
                      </div>
                      </div>
                      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[85%] mx-auto">
                      <div className="p-4">
                          <p className="text-xl mb-2 font-semibold">Category</p>
      
                          <label className="block mb-2">{category}</label>
                          <label className="inline-flex items-center">
                          <input onChange={onUpdInput} className="form-radio" type="radio" name="category" value="Socks"/>
                          <span className="mx-2">Socks</span>
                          </label>
                          <label className="inline-flex items-center">
                          <input onChange={onUpdInput} className="form-radio" type="radio" name="category" value="Shirts"/>
                          <span className="mx-2">Shirts</span>
                          </label>
                          <label className="inline-flex items-center">
                          <input onChange={onUpdInput} className="form-radio" type="radio" name="category" value="Accessories"/>
                          <span className="mx-2">Accessories</span>
                          </label>
                      </div>
                      <div className="px-4 pb-4">
                          <button onClick={() => handleUpdateSubmit('category', updState.category)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Update</button>
                      </div>
                      </div>
                      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[85%] mx-auto">
                      <div className="p-4">
                          <p className="text-xl mb-2 font-semibold">Quantity</p>
      
                          <label className="block mb-2" htmlFor="quantity">{quantity}</label>
                          <input onChange={onUpdInput} name="quantity" className="w-full border-gray-300 rounded-md shadow-inner shadow-zinc-900 p-2" type="number" id="quantity" value={updState.quantity}/>
                      </div>
                      <div className="px-4 pb-4">
                          <button onClick={() => handleUpdateSubmit('quantity', updState.quantity)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Update</button>
                      </div>
                      </div>
                      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[85%] mx-auto">
                          <div className="p-4">
                              <p className="text-xl mb-2 font-semibold">Price</p>
      
                              <label className="block mb-2" htmlFor="price">$ {price}</label>
                              <input min="0"
                          step="0.01" onChange={onUpdInput} name="price" className="w-full border-gray-300 rounded-md shadow-inner shadow-zinc-900 p-2" type="number" id="price" value={updState.price}/>
                          </div>
                          <div className="px-4 pb-4">
                              <button onClick={() => handleUpdateSubmit('price', updState.price)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Update</button>
                          </div>
                      </div>
      
                  </div>
              </div>
          </>
        )

    }
}
