import { React } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/Layout';

const YieldTrialPage = () => {
  const { id } = useParams()

  return (
    <PageLayout>
      <h1>{id}</h1>
    </PageLayout>
  )
}

export default YieldTrialPage