import { Form, ListGroup } from 'react-bootstrap';
import { Asset as AssetType } from '../types';

type Props = {
  asset: AssetType;
  checked?: boolean;
};

const Asset = ({ asset, checked = false }: Props) => {
  return (
    <ListGroup.Item className="d-flex justify-content-start align-items-center">
      <Form.Check
        disabled
        checked={checked}
        className="mx-2"
        aria-label="Select asset for download"
      />
      {asset.assetName}
    </ListGroup.Item>
  );
};

export default Asset;
