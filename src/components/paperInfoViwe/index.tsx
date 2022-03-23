import { getPaper } from '@/services/paper';
import { Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'umi';
import PaperDescription from './PaperDescription';

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
          <PaperDescription paper={paper} style={{ margin: '12px auto' }} />
        </>
      )}
    </>
  );
};
