'use client';

import React, { useState } from 'react';
import { Card, Title, Text, Button } from '@tremor/react';
import * as Yup from 'yup';
import { validationSchema } from '../validations/formSchema';

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
    group: 'Ерөнхий мэдээлэл',
    fields: [
      {
        type: 'text',
        label: 'Нэр',
        name: 'full_name',
        required: true
      },
      {
        type: 'text',
        label: 'Имэйл',
        name: 'email',
        required: true
      },
      {
        type: 'text',
        label: 'Утасны дугаар',
        name: 'phone_number',
        required: true
      },
      {
        type: 'text',
        label: 'Амьдарч буй хаяг',
        name: 'address',
        required: true
      }
    ]
  },
  {
    group: 'Нэмэлт мэдээлэл',
    fields: [
      {
        type: 'select',
        label: 'Сонирхож буй албан тушаал',
        name: 'position',
        options: [
          'Сонгох',
          'Веб хөгжүүлэгч',
          'Дата аналист',
          'Мобайл хөгжүүлэгч',
          'Бусад'
        ],
        required: true
      },
      {
        type: 'text',
        label: 'Фэйсбүүк',
        name: 'facebook'
      }
    ]
  },
  {
    group: 'Боловсрол',
    fields: [
      {
        type: 'text',
        label: 'Төгссөн сургууль',
        name: 'university'
      },
      {
        type: 'select',
        label: 'Зэрэг /Баклавар, магистер гэх мэт/',
        name: 'degree',
        options: ['сонгох', 'Бага', 'Дунд', 'Бүрэн дунд', 'Дээд', 'Мастер'],
        required: true
      },
      {
        type: 'text',
        label: 'Төгссөн жил',
        name: 'graduation_year'
      }
    ]
  },
  {
    group: 'Ажлын туршлага',
    fields: [
      {
        type: 'text',
        label: 'Компаний нэр',
        name: 'company_name'
      },
      {
        type: 'text',
        label: 'Албан тушаал',
        name: 'job_title'
      },
      {
        type: 'text',
        label: 'Ажилласан жил',
        name: 'employment_duration'
      },
      {
        type: 'textarea',
        label: 'Ажилласан байсан чиг үүрэг',
        name: 'job_description'
      }
    ]
  },
  {
    group: 'Өөрийгөө тодорхойлох',
    fields: [
      {
        type: 'textarea',
        label: 'Өөрийн тухай дэлгэрэнгүй оруулна уу',
        name: 'additional_comments'
      }
    ]
  }
];

interface FormData {
  [key: string]: string;
}
interface FormErrors {
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataState({ ...formDataState, [name]: value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataState({ ...formDataState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      await validationSchema.validate(formDataState, { abortEarly: false });
  
      const response = await fetch('/api/submitApplication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataState)
      });
  
      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(responseData.message);
      } else {
        const errorData = await response.json();
        console.error('Server Error:', errorData.error);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMap: FormErrors = {};
  
        error.inner.forEach((e) => {
          const fieldName = e.path || (e.params && e.params.path);
  
          if (fieldName) {
            errorMap[fieldName+ ''] = e.message;
          }
        });
  
        setFormErrors(errorMap as FormErrors);
      } else {
        console.error('Client Error:', error);
      }
    }
  };
  
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <form
        action="/api/submitApplication"
        method="POST"
        onSubmit={handleSubmit}
      >
        {jobApplicationData.map((group, index) => (
          <Card key={index} className="mb-6">
            <Title className="mb-4">{group.group}</Title>
            {group.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'text' ? (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formDataState[field.name] || ''}
                    onChange={handleFieldChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />
                ) : null}
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formDataState[field.name] || ''}
                    onChange={handleSelectChange}
                    className="border rounded-md px-3 py-2 w-full"
                  >
                    {field.options?.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : null}
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formDataState[field.name] || ''}
                    onChange={handleTextareaChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />
                ) : null}

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
          Анкет илгээх
        </Button>
      </form>
      {successMessage && (
        <Card>
          <Title>Баярлалаа</Title>
          <Text>{successMessage}</Text>
        </Card>
      )}
    </main>
  );
}
