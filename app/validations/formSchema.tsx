import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    // Define validation rules for each field
    full_name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone_number: Yup.string().required('Phone Number is required')
    // Add more fields and validation rules as needed
  });   