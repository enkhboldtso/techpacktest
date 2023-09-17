'use client';

import React, { useState } from 'react';
import { Card, Title, Text, Button } from '@tremor/react';
import * as Yup from 'yup';
import { validationSchema  } from '../validations/formSchema';
import { queryBuilder } from '../../lib/planetscale';
import { Generated } from 'kysely';


interface FormField {
  type: string;
  label: string;
  name: string;
  required?: boolean;
  accept?: string;
  options?: string[];
}

interface FormGroup {
  group: string;
  fields: FormField[];
}

const jobApplicationData: FormGroup[] = [
  {
    group: 'Personal Information',
    fields: [
      {
        type: 'text',
        label: 'Full Name',
        name: 'full_name',
        required: true
      },
      {
        type: 'email',
        label: 'Email',
        name: 'email',
        required: true
      },
      {
        type: 'text',
        label: 'Phone Number',
        name: 'phone_number',
        required: true
      },
      {
        type: 'text',
        label: 'Address',
        name: 'address',
        required: true
      },
      {
        type: 'text',
        label: 'City',
        name: 'city',
        required: true
      },
      {
        type: 'text',
        label: 'State',
        name: 'state',
        required: true
      }
    ]
  },
  {
    group: 'Professional Information',
    fields: [
      {
        type: 'text',
        label: 'Resume/CV (PDF)',
        name: 'resume',
        accept: '.pdf',
        required: true
      },
      {
        type: 'select',
        label: 'Position',
        name: 'position',
        options: [
          'Software Engineer',
          'Data Analyst',
          'Product Manager',
          'Other'
        ],
        required: true
      },
      {
        type: 'text',
        label: 'Facebook',
        name: 'facebook'
      }
    ]
  },
  {
    group: 'Education',
    fields: [
      {
        type: 'text',
        label: 'University/College',
        name: 'university'
      },
      {
        type: 'text',
        label: 'Degree',
        name: 'degree'
      },
      {
        type: 'text',
        label: 'Graduation Year',
        name: 'graduation_year'
      }
    ]
  },
  {
    group: 'Work Experience',
    fields: [
      {
        type: 'text',
        label: 'Company Name',
        name: 'company_name'
      },
      {
        type: 'text',
        label: 'Job Title',
        name: 'job_title'
      },
      {
        type: 'text',
        label: 'Employment Duration',
        name: 'employment_duration'
      },
      {
        type: 'textarea',
        label: 'Job Description',
        name: 'job_description'
      }
    ]
  },
  {
    group: 'Additional Information',
    fields: [
      {
        type: 'textarea',
        label: 'Additional Comments',
        name: 'additional_comments'
      }
    ]
  }
];

interface FormData {
  [key: string]: string;
}




export default function JobApplicationForm() {
  const [formDataState, setFormDataState] = useState<FormData>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [formErrors, setFormErrors] = useState<FormData>({});

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataState({ ...formDataState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // ... (client-side validation)
  
      // Make a POST request to the API route
      const response = await fetch('/api/submitApplication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataState),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(responseData.message);
      } else {
        const errorData = await response.json();
        // Handle server-side validation errors or other errors
        console.error('Server Error:', errorData.error);
      }
    } catch (error) {
      console.error('Client Error:', error);
    }
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
<form action="/api/submitApplication" method="POST" onSubmit={handleSubmit}>
        {jobApplicationData.map((group, index) => (
          <Card key={index} className="mb-6">
            <Title className="mb-4">{group.group}</Title>
            {group.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formDataState[field.name] || ''}
                  onChange={handleFieldChange}
                  className="border rounded-md px-3 py-2 w-full"
                />
                {formErrors[field.name] && (
                  <p className="text-red-500">{formErrors[field.name]}</p>
                )}
              </div>
            ))}
          </Card>
        ))}
        <Button
    type="submit"
    className="bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600"
  >
    Submit Application
  </Button>
      </form>
      {successMessage && (
        <Card>
          <Title>Thank You!</Title>
          <Text>{successMessage}</Text>
        </Card>
      )}
    </main>
  );
}
