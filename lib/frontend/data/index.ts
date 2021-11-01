import { Listing } from '.prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { ListingWithSold } from '../../domains/listing/api'
import { OrderWithListing } from '../../domains/order/api'
import { creater, fetcher } from './helpers'

export function useListings() {
  const { data, error } = useSWR<Listing[], Error>(`/api/listings`, fetcher)
  return {
    listings: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useMyListings() {
  const { data, error } = useSWR<Listing[], Error>(`/api/listings?myListings=true`, fetcher)
  return {
    myListings: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCreateListing() {
  const { mutate } = useSWRConfig()
  const createListing = async (title: string, description: string): Promise<Listing> => {
    const body = { title, description }
    const response = await creater<Listing>('/api/listings/', body)

    mutate(`/api/listings`)
    mutate(`/api/listings?myListings=true`)
    return response
  }
  return { createListing }
}

export function useListing(id: string) {
  const { data, error } = useSWR<ListingWithSold, Error>(`/api/listings/${id}`, fetcher)
  return {
    listing: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCreateOrder() {
  const { mutate } = useSWRConfig()
  const createOrder = async (listingId: string): Promise<Listing> => {
    const body = { listingId }
    const response = await creater<Listing>('/api/orders/', body)

    mutate(`/api/orders`)
    return response
  }
  return { createOrder }
}

export function useMyOrders() {
  const { data, error } = useSWR<OrderWithListing[], Error>(`/api/orders`, fetcher)
  return {
    myOrders: data,
    isLoading: !error && !data,
    isError: error,
  }
}
