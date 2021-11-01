import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import ErrorHanlder from '../../components/common/ErrorHandler'
import Loader from '../../components/common/Loader'
import { useCreateOrder, useListing } from '../../lib/frontend/data'
import { useState } from 'react'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { createOrder } = useCreateOrder()
  const { enqueueSnackbar } = useSnackbar()
  const { listing, isLoading, isError } = useListing(id)

  const [open, setOpen] = useState(false)

  if (isError) return <ErrorHanlder error={isError} />
  if (!listing || isLoading) return <Loader />

  const submitData = async () => {
    try {
      await createOrder(id)
      enqueueSnackbar('Order successfully placed!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to place order. Try again.', { variant: 'error' })
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await submitData()
    handleClose()
  }

  return (
    <Box m={4}>
      <Typography variant="h3">{listing.title}</Typography>
      <Typography variant="body1">{listing.description}</Typography>
      <Box my={2}>
        <Box mr={2}>
          <Button variant="contained" onClick={handleClickOpen}>
            Place order
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Order confirmation
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Would you like to place an order for ${listing.title}?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>No</Button>
              <Button onClick={handleConfirm}>Yes</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
