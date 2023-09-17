// import 'server-only';
import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface User {
  id: Generated<number>;
  name: string;
  username: string;
  email: string;
}
interface FormDataState {
  id?: Generated<number>;
  full_name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  state?: string;
  resume?: string;
  position?: string;
  facebook?: string;
  university?: string;
  degree?: string;
  graduation_year?: string;
  company_name?: string;
  job_title?: string;
  employment_duration?: string;
  job_description?: string;
  additional_comments?: string;
}


interface Database {
  users: User;
  job_applications: FormDataState
  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
