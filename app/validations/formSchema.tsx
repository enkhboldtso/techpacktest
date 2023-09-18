import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('Нэрээ заавал оруулна уу'),
    email: Yup.string().email('Имэйл буруу байна').required('Имэйл заавал оруулна уу?'),
    phone_number: Yup.string().required('Утасны дугаар заавал оруулна уу').matches(/^\d{8}$/, 'Утасны дугаар 8 оронтой тоо байх ёстой'),
    address: Yup.string().required('Хаягаа заавал оруулна уу'),
    position: Yup.string().required('Заавал оруулна уу'),
    degree: Yup.string().required('Заавал оруулна уу')
  });   