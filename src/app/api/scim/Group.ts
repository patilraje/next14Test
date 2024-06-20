import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({ message: 'Get Groups' });
      break;
    case 'POST':
      res.status(201).json({ message: 'Group Created' });
      break;
    case 'PUT':
      res.status(200).json({ message: 'Group Updated' });
      break;
    case 'DELETE':
      res.status(204).end();
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
