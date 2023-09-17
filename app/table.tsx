import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

import { Generated } from 'kysely';

interface FormDataState {
  id?: number;
  full_name?: string;
  email?: string;
  phone_number?: string;
  degree?: string;
}

export default function JobApplicationsTable({ jobApplications }: { jobApplications: FormDataState[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Phone Number</TableHeaderCell>
          <TableHeaderCell>Degree</TableHeaderCell>
          {/* Add more header cells for other fields as needed */}
        </TableRow>
      </TableHead>
      <TableBody>
        {jobApplications.map((application, index) => (
          <TableRow key={index}>
            <TableCell>{application.full_name}</TableCell>
            <TableCell>
              <Text>{application.email}</Text>
            </TableCell>
            <TableCell>{application.phone_number}</TableCell>
            <TableCell>{application.degree}</TableCell>
            {/* Add more cells for other fields as needed */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
