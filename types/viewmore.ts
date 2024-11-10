export type InfoCardProps = {

    title: string;     // Card title
    content: string;   // Card content or description
    date: string;      // Date as a string
    onRequestService?: () => void;
  };