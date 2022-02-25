import { renderInIframe } from '@/utils/pdf-render';

const wh = {
  height: '80vh',
  width: '80vw',
};

export default function ({ pdfBytes }) {
  return <iframe src={renderInIframe(pdfBytes)} frameBorder="0" style={wh}></iframe>;
}
