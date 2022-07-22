import { CSSProperties, useEffect, useState } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';
import { IVolumeInfo, IRecord } from '../../interfaces';
import AccordionHeader from './AccordionHeader';
import Session from './Session';

type Props = {
  volume: IVolumeInfo;
};
const Volume = (props: Props) => {
  const vLabel = (props.volume && props.volume.name) || `Volume ${props.volume.id}`
  const [sessionsMap, setSessionsMap] = useState({});

  return (
    <Accordion.Item>
      <Accordion.Header>
        <AccordionHeader
          label={vLabel}
          badgeValue={(Object.keys(sessionsMap) || []).length}
        />
      </Accordion.Header>
      <Accordion.Body>
        <Accordion defaultActiveKey="0">
          {(Object.keys(sessionsMap) || []).map((sessionId, idx) => {
            const assetList = sessionsMap[sessionId];
            return (
              <Session
                key={sessionId}
                sessionId={sessionId}
                assetList={assetList}
                eventKey={`${idx}`}
              />
            );
          })}
        </Accordion>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Volume;
