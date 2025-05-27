import type { NextApiRequest, NextApiResponse } from 'next';
import { Talent } from '@/types';

let mockTalent: Talent[] = [
  { id: 't1', first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com', skills: ['React', 'Node.js'], experience_level: 'Senior', linkedin_profile: 'linkedin.com/in/alicesmith', portfolio_url: 'alicesmith.dev', availability: 'Full-time' },
  { id: 't2', first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com', skills: ['Python', 'Django'], experience_level: 'Mid-level', linkedin_profile: 'linkedin.com/in/bobjohnson', portfolio_url: 'bobjohnson.dev', availability: 'Part-time' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(mockTalent);
      break;
    case 'POST':
      const newTalent: Talent = { ...req.body, id: `t${Date.now()}` };
      mockTalent.push(newTalent);
      console.log('Created talent:', newTalent);
      res.status(201).json(newTalent);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
