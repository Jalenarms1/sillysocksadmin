import { Prisma } from "@prisma/client";
import { z } from "zod";



import { router, publicProcedure, protectedProcedure } from "../trpc";


export const orderRouter = router({
    getOrders: protectedProcedure
        .query(async ({ctx: {prisma}}) => {
            const orders = await prisma.order.findMany();

            return orders
           
        }),
    getOrder: protectedProcedure
        .input(z.object({id: z.string()}))
        .query(async ({ctx: {prisma}, input: {id}}) => {
            const order = await prisma.order.findUnique({
                where: {
                    id
                },
                include: {
                    orderItem: {
                        include: {
                            product: true
                        }
                    }
                }
            })

            if(!order) {
                return null
            }

            return order
        }),
    markAsShipped: protectedProcedure
        .input(z.object({id: z.string(), emailAddress: z.string(), shippingAddress: z.string()}))
        .mutation(async ({ctx: {prisma}, input: {id, emailAddress, shippingAddress}}) => {
            const currentTime: any = await prisma.$queryRaw`SELECT NOW() as currentTime`;

            console.log(currentTime?.currentTime);
            

            const shippedOrder = await prisma.order.update({
                where: {
                    id
                },
                data: {
                    shipped: true,
                    dateShipped: new Date(currentTime?.currentTime)
                }
            })

            return shippedOrder
        })
})
  