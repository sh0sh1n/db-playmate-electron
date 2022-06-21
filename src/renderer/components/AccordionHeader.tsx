import { Badge } from 'react-bootstrap';

type Props = {
  label: string;
  badgeValue?: number | string;
};

const AccordionHeader = ({ label, badgeValue = undefined }: Props) => {
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div className="me-auto">{label}</div>
      <Badge className="me-4" bg="primary" pill>
        {badgeValue}
      </Badge>
    </div>
  );
};

export default AccordionHeader;
