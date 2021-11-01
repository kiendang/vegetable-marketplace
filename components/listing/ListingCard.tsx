import { Listing } from '.prisma/client'
import { Card, CardActionArea, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from '../common/Link'

interface Props {
  listing: Listing
}

export default function ListingCard({ listing }: Props) {
  console.log(listing)
  return (
    <Card>
      <CardActionArea component={Link} href={`/listing/${listing.id}`}>
        <Box p={2}>
          <Typography variant="h6">{listing.title}</Typography>
          <Typography variant="body1">{listing.description}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}
