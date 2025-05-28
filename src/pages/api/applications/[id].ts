import type { NextApiRequest, NextApiResponse } from 'next';
import { Application } from '@/types';

let mockApplications: Application[] = [
  { id: 'app1', talent_id: 't1', job_id: 'j1', application_date: new Date().toISOString(), status: 'Submitted' },
  { id: 'app2', talent_id: 't2', job_id: 'j1', application_date: new Date().toISOString(), status: 'Reviewed' },
  { id: 'app3', talent_id: 't1', job_id: 'j2', application_date: new Date().toISOString(), status: 'Interviewing' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;

  const applicationId = id as string;

  switch (method) {
    case 'GET':
      const application = mockApplications.find(app => app.id === applicationId);
      if (application) {
        res.status(200).json(application);
      } else {
        res.status(404).json({ message: `Application with id ${applicationId} not found.` });
      }
      break;
    case 'PUT': // Specifically for updating status
      const appIndex = mockApplications.findIndex(app => app.id === applicationId);
      if (appIndex > -1) {
        if (body.status) {
          mockApplications[appIndex].status = body.status;
          console.log(`Updated application ${applicationId} status to: ${body.status}`);
          res.status(200).json(mockApplications[appIndex]);
        } else {
          res.status(400).json({ message: 'Status is required for updating an application.' });
        }
      } else {
        res.status(404).json({ message: `Application with id ${applicationId} not found.` });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
