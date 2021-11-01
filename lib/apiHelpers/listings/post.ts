import { Listing, Order } from '.prisma/client'
import { Prisma } from '@prisma/client'
import { createListing } from '../../../lib/domains/listing/api'
import { createOrder } from '../../../lib/domains/order/api'

export async function handlePostListing(userId: string, body: any): Promise<Listing> {
  const { title, description } = body
  // TODO remove these stand in attributes
  const createListingPayload: Prisma.ListingCreateInput = {
    title,
    description,
    user: { connect: { id: userId } },
  }
  return createListing(createListingPayload)
}

export async function handlePostOrder(userId: string, listingId: string): Promise<Order> {
  const createOrderPayload: Prisma.OrderCreateInput = {
    user: { connect: { id: userId } },
    listing: { connect: { id: listingId } }
  }
  return createOrder(createOrderPayload)
}
