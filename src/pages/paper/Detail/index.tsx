import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { getPaper } from '@/services/paper';
import { useRouteMatch } from 'umi';
import { Button, Descriptions, message } from 'antd';
import { useEffect, useState } from 'react';
import { getFile } from '@/services/upload';
import { download } from '@/utils/download';
import PaperLife from './components/PaperLife';
import { pdfPreview } from '@/utils/pdf-render';

const handleDownload = async (filename: string) => {
  const res = await getFile(filename);
  message.success('获取成功，请等待自动下载！');
  download(res, filename);
};

export default () => {
  const {
    params: { id: paperId },
  } = useRouteMatch<{ id: string }>();
  const [paper, setPaper] = useState<API.Paper>({} as API.Paper);

  useEffect(() => {
    getPaper(paperId).then(setPaper);
  }, [paperId]);

  return (
    <PageContainer>
      <ProCard>
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
                <Button type="link" onClick={() => pdfPreview(paper.aName)}>
                  预览
                </Button>
                <Button type="link" onClick={() => handleDownload(paper.aName)}>
                  下载
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="B 卷">
                <Button type="link" onClick={() => pdfPreview(paper.bName)}>
                  预览
                </Button>
                <Button type="link" onClick={() => handleDownload(paper.bName)}>
                  下载
                </Button>
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
        <PaperLife paperId={paperId} ></PaperLife>
      </ProCard>
    </PageContainer>
  );
};
