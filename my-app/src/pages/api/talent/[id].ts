import type { NextApiRequest, NextApiResponse } from 'next';
import { Talent } from '@/types';

let mockTalent: Talent[] = [
  { id: 't1', first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com', skills: ['React', 'Node.js'], experience_level: 'Senior', linkedin_profile: 'linkedin.com/in/alicesmith', portfolio_url: 'alicesmith.dev', availability: 'Full-time' },
  { id: 't2', first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com', skills: ['Python', 'Django'], experience_level: 'Mid-level', linkedin_profile: 'linkedin.com/in/bobjohnson', portfolio_url: 'bobjohnson.dev', availability: 'Part-time' },
  { id: 't3', first_name: 'Carol', last_name: 'Williams', email: 'carol@example.com', skills: ['Java', 'Spring'], experience_level: 'Junior', linkedin_profile: 'linkedin.com/in/carolwilliams', portfolio_url: 'carolwilliams.dev', availability: 'Internship' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;

  const talentId = id as string;

  switch (method) {
    case 'GET':
      const talent = mockTalent.find(t => t.id === talentId);
      if (talent) {
        res.status(200).json(talent);
      } else {
        res.status(404).json({ message: `Talent with id ${talentId} not found.` });
      }
      break;
    case 'PUT':
      const talentIndex = mockTalent.findIndex(t => t.id === talentId);
      if (talentIndex > -1) {
        // Update the talent
        mockTalent[talentIndex] = { ...mockTalent[talentIndex], ...body };
        console.log(`Updated talent ${talentId}:`, mockTalent[talentIndex]);
        res.status(200).json(mockTalent[talentIndex]);
      } else {
        res.status(404).json({ message: `Talent with id ${talentId} not found.` });
      }
      break;
    case 'DELETE':
      const initialLength = mockTalent.length;
      mockTalent = mockTalent.filter(t => t.id !== talentId);
      if (mockTalent.length < initialLength) {
        console.log(`Deleted talent ${talentId}`);
        res.status(200).json({ message: `Talent ${talentId} deleted successfully.` });
      } else {
        res.status(404).json({ message: `Talent with id ${talentId} not found.` });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
