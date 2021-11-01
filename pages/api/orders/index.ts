import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { handleGetOrders } from '../../../lib/apiHelpers/listings/get'
import { handlePostOrder } from '../../../lib/apiHelpers/listings/post'
import { getUserIdFromSession } from '../../../lib/domains/user/helpers'

export default withApiAuthRequired(async function handle(req, res) {
  const session = getSession(req, res)
  const userId = getUserIdFromSession(session)
  if (!userId) {
    res.status(401).end
    return
  }
  const { method } = req
  switch (method) {
    case 'GET': {
      const orders = await handleGetOrders(userId)
      res.status(200).json(orders)
      break
    }

    case 'POST':
      const { listingId } = req.body
      const order = await handlePostOrder(userId, listingId)
      if (!order) {
        res.status(400).end()
      } else {
        res.json(order)
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
