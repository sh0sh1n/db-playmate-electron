import { useEffect, useState } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';
import Volume from './Volume';

const Dashboard = () => {
  const [volumeList, setVolumeList] = useState(['899']);
  const vols = (volumeList || []).map( (volumeId) => {
    const v = {"id": volumeId};
    return v;
  });
  return (
    <Accordion defaultActiveKey="0">
      {vols.map( (v) => <Volume key={v.id} volume={v} />)}
    </Accordion>
  );
};

export default Dashboard;
