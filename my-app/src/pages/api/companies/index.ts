import type { NextApiRequest, NextApiResponse } from 'next';
import { Company } from '@/types'; // Assuming your types are in @/types

let mockCompanies: Company[] = [
  { id: '1', name: 'Innovatech Solutions', description: 'Leading tech innovator.', website: 'innovatech.com', contact_email: 'contact@innovatech.com', hiring_status: true },
  { id: '2', name: 'Synergy Corp', description: 'Collaborative work environment.', website: 'synergy.com', contact_email: 'hr@synergy.com', hiring_status: false },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(mockCompanies);
      break;
    case 'POST':
      const newCompany: Company = { ...req.body, id: Date.now().toString() };
      mockCompanies.push(newCompany);
      console.log('Created company:', newCompany);
      res.status(201).json(newCompany);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
