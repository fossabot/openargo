import { login } from '@openargo/core'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  const headers = await login(req.body.code, req.body.username, req.body.password)
  res.send(headers)
}
