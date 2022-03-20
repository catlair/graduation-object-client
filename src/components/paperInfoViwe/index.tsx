import { getPaper } from '@/services/paper';
import { getFile } from '@/services/upload';
import { download } from '@/utils/download';
import { pdfPreview } from '@/utils/pdf-render';
import { Button, Descriptions, message } from 'antd';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'umi';

const handleDownload = async (filename: string, savename?: string) => {
  const res = await getFile(filename);
  message.success('获取成功，请等待自动下载！');
  if (savename) {
    download(res, `${savename}.${filename.split('.').at(-1)}`);
    return;
  }
  download(res, filename);
};

export default () => {
  const {
    params: { id: paperId },
  } = useRouteMatch();
  const [paper, setPaper] = useState<API.Paper>({} as API.Paper);

  useEffect(() => {
    getPaper(paperId).then(setPaper);
  }, [paperId]);

  return (
    <>
      {paper.teacher && (
        <Descriptions title="教师信息" bordered>
          <Descriptions.Item label="姓名">{paper.teacher.name}</Descriptions.Item>
          <Descriptions.Item label="学院">{paper.teacher.college}</Descriptions.Item>
        </Descriptions>
      )}
      {paper.id && (
        <>
          <Descriptions title="试卷基本信息" bordered style={{ margin: '12px auto' }}>
            <Descriptions.Item label="学院">{paper.college}</Descriptions.Item>
            <Descriptions.Item label="课程">{paper.course}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="试卷" bordered style={{ margin: '12px auto' }}>
            <Descriptions.Item label="A 卷">
              <Button type="link" onClick={() => pdfPreview(paper.aName, paper.course + 'A卷')}>
                预览
              </Button>
              <Button type="link" onClick={() => handleDownload(paper.aName, paper.course)}>
                下载
              </Button>
            </Descriptions.Item>
            <Descriptions.Item label="B 卷">
              <Button type="link" onClick={() => pdfPreview(paper.bName, paper.course + 'B卷')}>
                预览
              </Button>
              <Button type="link" onClick={() => handleDownload(paper.bName, paper.course)}>
                下载
              </Button>
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </>
  );
};
