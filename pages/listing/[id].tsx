import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import ErrorHanlder from '../../components/common/ErrorHandler'
import Loader from '../../components/common/Loader'
import { useListing } from '../../lib/frontend/data'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { listing, isLoading, isError } = useListing(id)
  if (isError) return <ErrorHanlder error={isError} />
  if (!listing || isLoading) return <Loader />
  return (
    <Box m={4}>
      <Typography variant="h6">{listing.title}</Typography>
      <Typography variant="body1">{listing.description}</Typography>
    </Box>
  )
}

export default Dashboard
