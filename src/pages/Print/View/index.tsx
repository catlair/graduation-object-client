import fontkit from '@pdf-lib/fontkit';
import { Spin } from 'antd';
import { degrees, PDFDocument, rgb } from 'pdf-lib';
import React from 'react';
import Setting from './components/Setting';
import PDFViewer from './components/Viewer';
import { slantWatermark } from '../utils';
import { getFile } from '@/services/upload';

export default class Component extends React.Component {
  state: Readonly<WaterDrawTextParams & { pdfBytes: Uint8Array; page: string; loading: true }> = {
    watermark: '',
    rotate: 0,
    fontsize: 200,
    color: {
      rgb: { r: 190, g: 190, b: 190, a: 0.12 },
    } as ColorResult,
    pdfBytes: null as unknown as Uint8Array,
    page: 'a',
    loading: true,
  };

  setDrawTextParams = (v) => {
    this.setState({ ...v });
  };

  setPaperPage = () => {
    switch (this.state.page) {
      case 'b':
        this.setState({ page: 'a' }, () => {
          this.renderPdf();
        });
        break;
      default:
        this.setState({ page: 'b' }, () => {
          this.renderPdf();
        });
        break;
    }
  };

  componentDidMount() {
    this.renderPdf();
  }

  renderPdf(v?: any) {
    this.setState({ loading: true, ...v });
    this.modifyPdf(v).then((v) => {
      this.setState({ ...v, loading: false });
    });
  }

  async modifyPdf(values: Partial<WaterDrawTextParams> = {}) {
    const { color, fontsize, rotate, watermark } = { ...this.state, ...values };
    const existingPdfBytes = await getFile(
      // @ts-ignore
      `${this.props.match.params.id}${this.state.page}.pdf`,
      'paper',
      'arrayBuffer',
    );
    const [pdfDoc, fontBytes] = await Promise.all([
      PDFDocument.load(existingPdfBytes),
      fetch(`${location.protocol}//${location.host}/fonts/msyh.ttf`).then((res) =>
        res.arrayBuffer(),
      ),
    ]);
    pdfDoc.registerFontkit(fontkit);
    const helveticaFont = await pdfDoc.embedFont(fontBytes);

    const {
      rgb: { r, g, b, a },
    } = color;

    const drawTextParams = {
      lineHeight: 50,
      font: helveticaFont,
      size: fontsize,
      color: rgb(r / 255 || 0.74, g / 255 || 0.74, b / 255 || 0.74),
      opacity: a || 0.12,
    };
    const pages = pdfDoc.getPages();

    let slantWatermarkParams;
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      slantWatermarkParams = slantWatermark(fontsize, width, height, watermark.length);

      page.drawText(watermark, {
        ...drawTextParams,
        ...slantWatermarkParams,
        rotate: rotate ? degrees(rotate) : slantWatermarkParams.rotate,
      });
    });

    return {
      pdfBytes: await pdfDoc.save(),
      rotate: slantWatermarkParams.rotate.angle,
    };
  }

  render() {
    return (
      <Spin tip="Loading..." size="large" spinning={this.state.loading}>
        {this.state.pdfBytes ? (
          <PDFViewer pdfBytes={this.state.pdfBytes}></PDFViewer>
        ) : (
          <div style={{ width: '80vw', height: '80vh' }}></div>
        )}
        <Setting
          setDrawTextParams={(v) => {
            this.renderPdf(v);
          }}
          drawTextParams={this.state}
          setPaperPage={this.setPaperPage}
        ></Setting>
      </Spin>
    );
  }
}
