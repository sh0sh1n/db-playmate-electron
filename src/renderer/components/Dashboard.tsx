import { Accordion, Spinner } from 'react-bootstrap';
import { useGetVolumesQuery } from '../playApi';
import Volume from './Volume';

const Dashboard = () => {
  const { data: volumeList, isFetching } = useGetVolumesQuery(null);

  if (isFetching) return <Spinner animation="border" />;

  return (
    <Accordion defaultActiveKey="0">
      {(volumeList || []).map((volumeId, idx) => (
        <Volume key={volumeId} volumeId={volumeId} eventkey={`${idx}`} />
      ))}
    </Accordion>
  );
};

export default Dashboard;
