// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from "@/lib/sanity.client"


export default function handler(req, res) {
  if(req.method === 'POST') {
    const user = req.body;

    client.createIfNotExists(user)
        .then(() => res.status(200).json('Login Success'))
  }
}
