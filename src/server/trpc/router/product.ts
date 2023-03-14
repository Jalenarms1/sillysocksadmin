import { z } from "zod";
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dvlhy87zl',
  api_key: '132219615124213',
  api_secret: 'jaTgCwIuhsA_6rGrxRqG7xVh71U',
});

const productSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string(),
  image: z.string().url(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

import { router, publicProcedure, protectedProcedure } from "../trpc";
import type { Product } from "@prisma/client";

export const productRouter = router({
  addProduct: publicProcedure
    .input(productSchema)
    .mutation(async ({ ctx: {prisma}, input: {name, category, description, image, quantity, price} }) => {
      const uploadedImage = await cloudinary.v2.uploader.upload(image);

      // Build the new product object
      const newProduct = {
        name,
        category,
        description,
        image: uploadedImage.secure_url,
        quantity,
        price,
      };

      // Validate the new product object against the schema
      productSchema.parse(newProduct);

      // Create the new product in the database
      const createdProduct = await prisma.product.create({
        data: newProduct,
      });

      // Return the created product object
      return createdProduct;
    }),
    getProducts: publicProcedure
    .query(async ({ctx: {prisma}}) => {
      const products = await prisma.product.findMany();

      return products
    }),
    deleteProducts: protectedProcedure
    .input(z.object({ids: z.string().array()}))
    .mutation(async ({ctx: {prisma}, input}) => {
      try {
        const orderIds = await prisma.orderItem.findMany({
          where: {
            productId: {
              in: input.ids
            }
          },
          select: {
            orderId: true
          }
        })

        

        const deleteOrders = await prisma.order.deleteMany({
          where: {
            id: {
              in: orderIds.map((item:any) => item.orderId)
            },
            shipped: false
          }
        })

        const deletedProds = await prisma.product.deleteMany({
          where: {
            id: {
              in: input.ids // array of IDs to delete
            }
          }
        });


        return deletedProds
      } catch (error) {
        console.log(error);
        return error
        
      }
    }),
    findProduct: protectedProcedure
    .input(z.object({id: z.string().optional()}))
    .query(async ({ctx: {prisma}, input: {id}}) => {
      try {
        const product = await prisma.product.findUnique({
          where: {
            id
          }
        })
        if(!product) {
          return null
        }
        return product
      } catch (error) {
        console.log(error);
        return error
        
      }
    }),
    updateProduct: protectedProcedure
    .input(z.object({id: z.string(), prop: z.string(), newValue: z.string()}))
    .mutation(async ({ctx: {prisma}, input}) => {
      try {
          switch(input.prop) {
            case 'name':
              const updName = await prisma.product.update({
                where: {
                  id: input.id
                },
                data: {
                  name: input.newValue
                }
              })
              return updName
              break
            case 'description':
              const updDescription = await prisma.product.update({
                where: {
                  id: input.id
                },
                data: {
                  description: input.newValue
                }
              })
              return updDescription
              break
            case 'category':
              const updCategory = await prisma.product.update({
                where: {
                  id: input.id
                },
                data: {
                  category: input.newValue
                }
              })
              return updCategory
              break
            case 'image':
              const upload = await cloudinary.v2.uploader.upload(input.newValue);
              const updImage = await prisma.product.update({
                where: {
                  id: input.id
                },
                data: {
                  image: upload.secure_url
                }
              })
              return updImage
              break
            case 'quantity':
              const updQuantity = await prisma.product.update({
                where: {
                  id: input.id
                },
                data: {
                  quantity: parseFloat(input.newValue)
                }
              })
              return updQuantity
              break
            case 'price':
              const updPrice = await prisma.product.update({
                where: {
                  id: input.id
                },
                data: {
                  price: parseFloat(input.newValue)
                }
              })
              return updPrice
              break
            default:
              return null 
              break
          }
      } catch (error) {
        console.log(error);
        return error
        
      }
    })
  
});
