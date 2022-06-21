import { CSSProperties, useEffect, useState } from 'react';
import { Accordion, Spinner } from 'react-bootstrap';
import { useAppDispatch } from '../hooks';
import { useGetAssetsQuery, useGetVolumeInfoQuery } from '../playApi';
import { setVolume } from '../slices';
import { Asset } from '../types';
import AccordionHeader from './AccordionHeader';
import Session from './Session';
// import "./Custom.css";

type Props = {
  volumeId: string;
  eventkey: string;
  style?: CSSProperties;
  className?: string;
};
const Volume = ({
  volumeId,
  eventkey,
  style = undefined,
  className = undefined,
}: Props) => {
  const dispatch = useAppDispatch();
  const [sessionsMap, setSessionsMap] = useState<Record<string, Asset[]>>({});
  const [sessionsSize, setSessionsSize] = useState(0);
  const [volumeName, setVolumeName] = useState<string | null>(null);
  const { data: assetList, isFetching: isGetAssetsFetching } =
    useGetAssetsQuery({
      volumeId,
    });
  const { data: volumeInfo, isFetching: isVolumeInfoFetching } =
    useGetVolumeInfoQuery({
      volumeId,
    });

  const getAssetsBySession = (assetList: Asset[]): Record<number, Asset[]> => {
    if (!assetList) return {};

    const result: Record<number, Asset[]> = {};

    for (const asset of assetList) {
      if (!(asset.sessionId in result)) {
        result[asset.sessionId] = [asset];
        continue;
      }

      result[asset.sessionId].push(asset);
    }

    return result;
  };

  useEffect(() => {
    setSessionsMap({ ...getAssetsBySession(assetList || []) });
  }, [assetList]);

  useEffect(() => {
    setSessionsSize((Object.keys(sessionsMap) || []).length);
  }, [sessionsMap]);

  useEffect(() => {
    if (!volumeInfo || !dispatch) return;
    dispatch(setVolume(volumeInfo));
    setVolumeName(volumeInfo.name);
  }, [dispatch, volumeInfo]);

  const getVolumeLabel = () => {
    return `Volume ${volumeId} ${volumeName ? `- ${volumeName}` : ``}`;
  };

  if (isGetAssetsFetching || isVolumeInfoFetching)
    return <Spinner animation="border" />;

  return (
    <Accordion.Item eventKey={eventkey}>
      <Accordion.Header>
        <AccordionHeader label={getVolumeLabel()} badgeValue={sessionsSize} />
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
