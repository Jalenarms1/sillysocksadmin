import { Prisma } from "@prisma/client";
import { z } from "zod";
import { transporter } from "../../mailer";

const emailSchema = z.object({id: z.string(), emailAddress: z.string(), shippingAddress: z.string().optional()})

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
        .input(emailSchema)
        .mutation(async ({ctx: {prisma}, input: {id, emailAddress, shippingAddress}}) => {
            const shippedOrder = await prisma.order.update({
                where: {
                    id
                },
                data: {
                    shipped: true,
                    dateShipped: new Date()
                }
            })

            const mailOptions = {
                from: 'sillysocksandmore@sillysocksandmore.com',
                to: emailAddress,
                subject: "Order has been shipped!",
                text: `Order # ${id} has been shipped to ${shippingAddress}. \n Thank you again for your purchase! \n You should expect to recieve your order within 3-5 business days. This does not take into account any external factors that could delay the shipping time. \n If you have any concerns, please do not hesitate to reach out to support@sillysocksandmore.com`
            };
          
            await transporter.sendMail(mailOptions);

            return shippedOrder
        }),
    cancelOrder: protectedProcedure
        .input(emailSchema)
        .mutation(async ({ctx: {prisma}, input: {id, emailAddress}}) => {
            const deletedOrder = await prisma.order.delete({
                where: {
                    id
                }
            })

            const mailOptions = {
                from: 'sillysocksandmore@sillysocksandmore.com',
                to: emailAddress,
                subject: "Urgent Information on your Order",
                text: `Order # ${id} has been canceled. More than likely this was due to a shortage of inventory. \n You should expect to receive a refund for your purchase anywher between 5-10 business days depednding on your bank. \n If you have any concerns, please do not hesitate to reach out to support@sillysocksandmore.com`
            };
          
            await transporter.sendMail(mailOptions);

            return deletedOrder
        })
})
  