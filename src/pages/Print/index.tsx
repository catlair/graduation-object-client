import fontkit from '@pdf-lib/fontkit';
import { Spin } from 'antd';
import { degrees, PDFDocument, PDFPageDrawTextOptions, rgb } from 'pdf-lib';
import React from 'react';
import Setting from './components/Setting';
import PDFViewer from './components/Viewer';
import { slantWatermark } from './utils';

export default class Component extends React.Component {
  state: Readonly<WaterDrawTextParams & { pdfBytes: Uint8Array }> = {
    watermark: '',
    rotate: 0,
    fontsize: 200,
    color: {
      rgb: { r: 190, g: 190, b: 190, a: 0.12 },
    } as ColorResult,
    pdfBytes: null as unknown as Uint8Array,
  };

  setDrawTextParams = (v) => {
    console.log(v);
    this.setState({ ...v });
  };

  componentDidMount() {
    this.modifyPdf().then((v) => {
      this.setState({ ...v });
    });
  }

  async modifyPdf(values: Partial<WaterDrawTextParams> = {}) {
    const { color, fontsize, rotate, watermark } = { ...this.state, ...values };

    const url = 'http://localhost:3010/upload/paper/1$%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84$a.pdf';
    // const url = 'http://localhost:3010/upload/paper/1$数据结构$b.pdf';
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const fontUrl = 'http://localhost:8000/fonts/msyh.ttf';
    const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
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
      <Spin tip="Loading..." size="large" spinning={!this.state.pdfBytes}>
        <PDFViewer pdfBytes={this.state.pdfBytes}></PDFViewer>
        <Setting
          setDrawTextParams={(v) => {
            this.modifyPdf(v).then((v) => {
              this.setState({ ...v });
            });
          }}
          drawTextParams={this.state}
        ></Setting>
      </Spin>
    );
  }
}
