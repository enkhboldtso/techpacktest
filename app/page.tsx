import { Card, Title, Text } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';
import Search from './search';
import UsersTable from './table';
import JobApplicationsTable from './table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const jobApplications = await queryBuilder
    .selectFrom('job_applications')
    .select([
      'id',
      'full_name',
      'email',
      'phone_number',
      'address',
      'position',
      'facebook',
      'university',
      'degree',
      'graduation_year',
      'company_name',
      'job_title',
      'employment_duration',
      'job_description',
      'additional_comments'
    ])
    .where('full_name', 'like', `%${search}%`)
    .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Анкет</Title>
      <Text>Ажилд орох анкетийн</Text>
      <Search />
      <Card className="mt-6">
        <JobApplicationsTable jobApplications={jobApplications} />
      </Card>
    </main>
  );
}
