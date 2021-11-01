import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { handleGetListing } from '../../../lib/apiHelpers/listings/get'
import { getUserIdFromSession } from '../../../lib/domains/user/helpers'

export default withApiAuthRequired(async function handle(req, res) {
  const session = getSession(req, res)
  const userId = getUserIdFromSession(session)
  if (!userId) {
    res.status(401).end
    return
  }
  const { method, query } = req
  switch (method) {
    case 'GET': {
      const listing = await handleGetListing(query.id as string)
      res.status(200).json(listing)
      break
    }
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
