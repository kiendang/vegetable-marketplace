import { handleAuth, handleCallback, handleLogin, Session } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { getOrCreateUserFromSession } from '../../../lib/domains/user/api'
import { attachUserIdToSession } from '../../../lib/domains/user/helpers'

const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
  let user = await getOrCreateUserFromSession(session)
  const sessionWithUser = attachUserIdToSession(user, session)
  return sessionWithUser
}

export default handleAuth({
  async callback(req, res) {
    try {
      // Attach user info to the session token
      await handleCallback(req, res, { afterCallback })
    } catch (error: any) {
      res.status(error.status || 500).end(error.message)
    }
  },
  async login(req, res) {
    try {
      // Modifying the returnTo
      await handleLogin(req, res, { returnTo: '/marketplace' })
    } catch (error: any) {
      res.status(error.status || 400).end(error.message)
    }
  },
})
