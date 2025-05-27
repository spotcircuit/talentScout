import type { NextApiRequest, NextApiResponse } from 'next';
import { Company } from '@/types'; // Assuming your types are in @/types

// Mock data - in a real app, this would come from a database
let mockCompanies: Company[] = [
  { id: '1', name: 'Innovatech Solutions', description: 'Leading tech innovator.', website: 'innovatech.com', contact_email: 'contact@innovatech.com', hiring_status: true },
  { id: '2', name: 'Synergy Corp', description: 'Collaborative work environment.', website: 'synergy.com', contact_email: 'hr@synergy.com', hiring_status: false },
  { id: '3', name: 'Alpha Dynamics', description: 'Pioneering new technologies.', website: 'alphadynamics.com', contact_email: 'info@alphadynamics.com', hiring_status: true },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;

  const companyId = id as string;

  switch (method) {
    case 'GET':
      const company = mockCompanies.find(c => c.id === companyId);
      if (company) {
        res.status(200).json(company);
      } else {
        res.status(404).json({ message: `Company with id ${companyId} not found.` });
      }
      break;
    case 'PUT':
      const companyIndex = mockCompanies.findIndex(c => c.id === companyId);
      if (companyIndex > -1) {
        // Update the company
        mockCompanies[companyIndex] = { ...mockCompanies[companyIndex], ...body };
        console.log(`Updated company ${companyId}:`, mockCompanies[companyIndex]);
        res.status(200).json(mockCompanies[companyIndex]);
      } else {
        res.status(404).json({ message: `Company with id ${companyId} not found.` });
      }
      break;
    case 'DELETE':
      const initialLength = mockCompanies.length;
      mockCompanies = mockCompanies.filter(c => c.id !== companyId);
      if (mockCompanies.length < initialLength) {
        console.log(`Deleted company ${companyId}`);
        res.status(200).json({ message: `Company ${companyId} deleted successfully.` });
      } else {
        res.status(404).json({ message: `Company with id ${companyId} not found.` });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
