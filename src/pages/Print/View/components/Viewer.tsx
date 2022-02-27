import { renderInIframe } from '@/utils/pdf-render';
import { PureComponent, ReactNode } from 'react';

const wh = {
  height: '80vh',
  width: '80vw',
};

export default class Viewer extends PureComponent<{ pdfBytes: Uint8Array }> {
  render(): ReactNode {
    return <iframe src={renderInIframe(this.props.pdfBytes)} frameBorder="0" style={wh}></iframe>;
  }
}
