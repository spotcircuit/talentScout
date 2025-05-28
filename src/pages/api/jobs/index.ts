import type { NextApiRequest, NextApiResponse } from 'next';
import { Job } from '@/types';

let mockJobs: Job[] = [
  { id: 'j1', company_id: '1', title: 'Software Engineer', description: 'Develop amazing software.', location: 'Remote', salary_range_min: 80000, salary_range_max: 120000, job_type: 'Full-time', is_active: true },
  { id: 'j2', company_id: '2', title: 'Product Manager', description: 'Lead product strategy.', location: 'New York, NY', salary_range_min: 100000, salary_range_max: 150000, job_type: 'Full-time', is_active: true },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(mockJobs);
      break;
    case 'POST':
      const newJob: Job = { ...req.body, id: `j${Date.now()}`, posted_at: new Date().toISOString(), is_active: true };
      mockJobs.push(newJob);
      console.log('Created job:', newJob);
      res.status(201).json(newJob);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
