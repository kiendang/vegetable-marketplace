import { Listing, Prisma } from '.prisma/client'
import { prisma } from '../../db/prisma'

export const createListing = async (createListingPayload: Prisma.ListingCreateInput) => {
  const result = await prisma.listing.create({
    data: createListingPayload,
  })
  return result
}

export const listListings = async (): Promise<Listing[]> => {
  const listings = await prisma.listing.findMany({
    where: { orders: { none: {} } }
  })
  return listings
}

export const listMyListings = async (userId: string): Promise<Listing[]> => {
  const listings = await prisma.listing.findMany({
    where: { user: { id: userId } },
  })
  return listings
}

export type ListingWithSold = Listing & { sold: boolean }

export const findListingById = async (id: string): Promise<ListingWithSold | null> => {
  const listingWithCount = await prisma.listing.findUnique({
    where: { id },
    include: { _count: { select: { orders: true } } }
  })

  // filter _count out of the query result
  const listingWithCountNotNull = { ...listingWithCount, _count: listingWithCount?._count }
  const { _count, ...listing } = listingWithCountNotNull

  const sold = (listingWithCount?._count?.orders ?? 0) > 0
  const listingWithSold = { ...listing, sold }
  // have to do an explicit type cast here. there might be a better way?
  return listingWithSold as ListingWithSold
}
