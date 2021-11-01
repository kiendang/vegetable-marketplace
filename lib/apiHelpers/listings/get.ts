import { Listing } from '.prisma/client'
import { findListingById, listListings, listMyListings } from '../../../lib/domains/listing/api'
import { listMyOrders, OrderWithListing } from '../../domains/order/api'

export async function handleGetListings(userId: string, query: {
  [key: string]: string | string[]
}): Promise<Listing[]> {
  let listings: Listing[]
  if (query.myListings) {
    listings = await listMyListings(userId)
  } else {
    listings = await listListings()
  }
  return listings
}

export async function handleGetListing(id: string): Promise<Listing | null> {
  return await findListingById(id)
}

export async function handleGetOrders(userId: string): Promise<OrderWithListing[]> {
  return await listMyOrders(userId)
}
