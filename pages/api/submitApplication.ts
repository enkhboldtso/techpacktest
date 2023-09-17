// pages/api/submitApplication.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { queryBuilder } from '../../lib/planetscale';
import { validationSchema } from '../../app/validations/formSchema';
import * as Yup from 'yup';

interface ErrorResponse {
  error: string; // Adjust the type based on the actual error structure
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const formData = req.body;

      // Perform server-side validation using Yup schema
      await validationSchema.validate(formData, { abortEarly: false });

      // Insert data into the database
      const insertQuery = queryBuilder
        .insertInto('job_applications')
        .values(formData);

      const result = await insertQuery.execute();

      // Send a success response
      res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error: any) {
      // Handle validation errors or database errors
      const errorResponse: ErrorResponse = { error: error.message };
      res.status(400).json(errorResponse);
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).end();
  }
}
