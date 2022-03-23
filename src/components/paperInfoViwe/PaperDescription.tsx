import { pdfPreview, handleDownload } from '@/utils/pdf-render';
import { Descriptions, Button } from 'antd';

export default function ({ paper, style }) {
  return (
    <Descriptions title="试卷" bordered style={style}>
      {paper.aName && (
        <Descriptions.Item label="A 卷">
          <Button type="link" onClick={() => pdfPreview(paper.aName, paper.course + 'A卷')}>
            预览
          </Button>
          <Button type="link" onClick={() => handleDownload(paper.aName, paper.course)}>
            下载
          </Button>
        </Descriptions.Item>
      )}
      {paper.bName && (
        <Descriptions.Item label="B 卷">
          <Button type="link" onClick={() => pdfPreview(paper.bName, paper.course + 'B卷')}>
            预览
          </Button>
          <Button type="link" onClick={() => handleDownload(paper.bName, paper.course)}>
            下载
          </Button>
        </Descriptions.Item>
      )}
    </Descriptions>
  );
}
