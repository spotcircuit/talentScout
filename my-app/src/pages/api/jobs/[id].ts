import type { NextApiRequest, NextApiResponse } from 'next';
import { Job } from '@/types';

let mockJobs: Job[] = [
  { id: 'j1', company_id: '1', title: 'Software Engineer', description: 'Develop amazing software.', location: 'Remote', salary_range_min: 80000, salary_range_max: 120000, job_type: 'Full-time', is_active: true },
  { id: 'j2', company_id: '2', title: 'Product Manager', description: 'Lead product strategy.', location: 'New York, NY', salary_range_min: 100000, salary_range_max: 150000, job_type: 'Full-time', is_active: true },
  { id: 'j3', company_id: '1', title: 'Frontend Developer', description: 'Build beautiful UIs.', location: 'San Francisco, CA', salary_range_min: 90000, salary_range_max: 130000, job_type: 'Full-time', is_active: false },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;

  const jobId = id as string;

  switch (method) {
    case 'GET':
      const job = mockJobs.find(j => j.id === jobId);
      if (job) {
        res.status(200).json(job);
      } else {
        res.status(404).json({ message: `Job with id ${jobId} not found.` });
      }
      break;
    case 'PUT':
      const jobIndex = mockJobs.findIndex(j => j.id === jobId);
      if (jobIndex > -1) {
        mockJobs[jobIndex] = { ...mockJobs[jobIndex], ...body };
        console.log(`Updated job ${jobId}:`, mockJobs[jobIndex]);
        res.status(200).json(mockJobs[jobIndex]);
      } else {
        res.status(404).json({ message: `Job with id ${jobId} not found.` });
      }
      break;
    case 'DELETE':
      const initialLength = mockJobs.length;
      mockJobs = mockJobs.filter(j => j.id !== jobId);
      if (mockJobs.length < initialLength) {
        console.log(`Deleted job ${jobId}`);
        res.status(200).json({ message: `Job ${jobId} deleted successfully.` });
      } else {
        res.status(404).json({ message: `Job with id ${jobId} not found.` });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
