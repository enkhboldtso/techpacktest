'use client'

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Button
} from '@tremor/react';
import { useState } from 'react'
import Edit from './EditModal';

interface FormDataState {
  id?: number;
  full_name?: string;
  email?: string;
  phone_number?: string;
  degree?: string;
}

export default function JobApplicationsTable({ jobApplications }: { jobApplications: FormDataState[] }) {
  const [selectedApplication, setSelectedApplication] = useState<FormData | null>(null);

  const handleEdit = (application: FormData) => {
    setSelectedApplication(application);
  };
  
  return (<>
  <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Нэр</TableHeaderCell>
          <TableHeaderCell>Имэйл</TableHeaderCell>
          <TableHeaderCell>Утасны дугаар</TableHeaderCell>
          <TableHeaderCell>Боловсролын Зэрэг</TableHeaderCell>
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
            <TableCell>
      <Button onClick={() => handleEdit(application)}>Засах</Button>
    </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
    
  );
}
