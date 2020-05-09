import {  getVoti } from '@openargo/core'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  const voti = await getVoti(req.body.headers)
  res.send(voti)
}
