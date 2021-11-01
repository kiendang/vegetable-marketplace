import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import ErrorHanlder from '../../components/common/ErrorHandler'
import Loader from '../../components/common/Loader'
import { useCreateOrder, useListing } from '../../lib/frontend/data'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { createOrder } = useCreateOrder()
  const { enqueueSnackbar } = useSnackbar()
  const { listing, isLoading, isError } = useListing(id)
  if (isError) return <ErrorHanlder error={isError} />
  if (!listing || isLoading) return <Loader />

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await createOrder(id)
      enqueueSnackbar('Order successfully placed!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to place order. Try again.', { variant: 'error' })
    }
  }

  return (
    <Box m={4}>
      <Typography variant="h3">{listing.title}</Typography>
      <Typography variant="body1">{listing.description}</Typography>
      <form onSubmit={submitData}>
        <Box my={2}>
          <Box mr={2}>
            <Button variant="contained" type="submit">
              Place order
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default Dashboard
