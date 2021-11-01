import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ErrorHanlder from '../components/common/ErrorHandler'
import { NextLinkComposed } from '../components/common/Link'
import Loader from '../components/common/Loader'
import ListingList from '../components/listing/ListingList'
import { useMyListings, useMyOrders } from '../lib/frontend/data'

const Dashboard: NextPage = () => {
  const {
    myListings,
    isLoading: isListingsLoading,
    isError: isListingsError
  } = useMyListings()

  const {
    myOrders,
    isLoading: isOrdersLoading,
    isError: isOrdersError
  } = useMyOrders()

  const isLoading = isListingsLoading || isOrdersLoading
  const isError = isListingsError || isOrdersError

  if (isLoading) return <Loader />
  if (isError) return <ErrorHanlder error={isError} />
  return (
    <>
      <Box m={4}>
        <Typography variant="h3" gutterBottom>
          My Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          My listings
        </Typography>
        <ListingList listings={myListings} />
        <Button sx={{ my: 4 }} component={NextLinkComposed} to={'/createListing'} variant="contained">
          Create new listing
        </Button>
        <Typography variant="h6" gutterBottom>
          My orders
        </Typography>
        <ListingList listings={myOrders?.map(({ listing }) => listing)} />
      </Box>
    </>
  )
}

export default Dashboard
