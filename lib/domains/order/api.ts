import { Listing, Order, Prisma } from '.prisma/client'
import { prisma } from '../../db/prisma'

export const createOrder = async (createOrderPayload: Prisma.OrderCreateInput) => {
  const result = await prisma.order.create({
    data: createOrderPayload,
  })
  return result
}

export type OrderWithListing = Order & { listing: Listing }

export const listMyOrders = async (userId: string): Promise<OrderWithListing[]> => {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: { listing: true }
  })
  return orders
}
