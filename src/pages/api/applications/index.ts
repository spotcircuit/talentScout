import type { NextApiRequest, NextApiResponse } from 'next';
import { Application } from '@/types';

let mockApplications: Application[] = [
  { id: 'app1', talent_id: 't1', job_id: 'j1', application_date: new Date().toISOString(), status: 'Submitted' },
  { id: 'app2', talent_id: 't2', job_id: 'j1', application_date: new Date().toISOString(), status: 'Reviewed' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(mockApplications);
      break;
    case 'POST':
      const { talent_id, job_id } = req.body;
      if (!talent_id || !job_id) {
        return res.status(400).json({ message: 'Missing talent_id or job_id' });
      }
      const newApplication: Application = { 
        id: `app${Date.now()}`, 
        talent_id, 
        job_id, 
        application_date: new Date().toISOString(), 
        status: 'Submitted' 
      };
      mockApplications.push(newApplication);
      console.log('Created application:', newApplication);
      res.status(201).json(newApplication);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
