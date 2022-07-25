import { useState } from 'react';
import { Accordion, Button, Form, ListGroup } from 'react-bootstrap';
import { CloudDownload } from 'react-bootstrap-icons';
import { useAppSelector } from '../hooks';
import { getSessionParticipant } from '../slices';
import { RootState } from '../store';
import { Asset as AssetType, Participant } from '../types';
import AccordionHeader from './AccordionHeader';
import Asset from './Asset';

type Props = {
  sessionId: string;
  assetList: AssetType[];
  participantList?: Participant[];
  eventKey: string;
};

function downloadAssets(e: Event) {
  alert('COMING SOON!');
}

const Session = ({
  sessionId,
  assetList,
  participantList,
  eventKey,
}: Props) => {
  const [checkAll, setCheckAll] = useState(false);
  const onCheckAllClick = (e: any) => {
    setCheckAll(e.target.checked);
  };

  const getSessionLabel = (
    sessionId: string,
    participantList: Participant[]
  ) => {
    return `Session ${sessionId} ${
      participantList && participantList.length > 0
        ? `- Participant ID: ${participantList
            .map((participant) => participant.id)
            .join(',')}`
        : ``
    }`;
  };

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        <AccordionHeader
          label={getSessionLabel(sessionId, participantList)}
          badgeValue={(assetList || []).length}
        />
      </Accordion.Header>
      <Accordion.Body>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-start align-items-center">
            <Form.Check
              checked={checkAll}
              onChange={() => null}
              onClick={onCheckAllClick}
              className="mx-2 me-auto"
              aria-label="option 1"
            />
            <Button>
              <CloudDownload />
            </Button>
          </ListGroup.Item>
          {(assetList || []).map((asset, idx) => (
            <Asset key={idx} asset={asset} checked={checkAll} />
          ))}
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Session;
