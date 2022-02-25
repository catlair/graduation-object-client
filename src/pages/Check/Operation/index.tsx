import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { getPaper } from '@/services/paper';
import { useRouteMatch, history } from 'umi';
import ProForm, { ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { Button, Descriptions, message } from 'antd';
import { useEffect, useState } from 'react';
import { PaperEnum } from '@/enums/paper';
import { PicturesWall } from './components/PicturesWall';
import { getFile } from '@/services/upload';
import { isNull } from '@/utils/is';
import { download } from '@/utils/download';
import type { UploadFile } from 'antd/lib/upload/interface';
import { createCheck } from '@/services/check';

const handlePreview = async (filename: string = '') => {
  const tempArr = filename.split('.');
  tempArr[tempArr.length - 1] = 'pdf';
  const name = tempArr.join('.');
  const res = await getFile(name);
  const src = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(res);
    reader.onload = () => resolve(reader.result);
  });

  const pdfWindow = window.open('about:blank', `查看文件 - ${filename}`);
  if (isNull(pdfWindow)) {
    message.error('请允许弹窗');
    return;
  }
  const iframe = `<iframe src="${src}" style="width:100%;height:100%;border:none;"></iframe>`;
  if (window.navigator.userAgent.includes('Firefox')) {
    // Firefox 使用
    pdfWindow.document.write(iframe);
  } else {
    //  chrome 使用 write 方法可能会一致转圈，故使用 innerHTML
    pdfWindow.document.body.innerHTML = iframe;
  }

  pdfWindow.document.body.style.margin = '0';
  pdfWindow.document.title = `查看文件 - ${filename}`;
};

const handleDownload = async (filename: string) => {
  const res = await getFile(filename);
  message.success('获取成功，请等待自动下载！');
  download(res, filename);
};

type FormType = {
  content: string;
  useMode: {
    value: string;
    label: string;
  };
};

export default () => {
  const {
    params: { id: paperId },
  } = useRouteMatch<{ id: string }>();
  const [paper, setPaper] = useState<API.Paper>({} as API.Paper);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
                <Button type="link" onClick={() => handlePreview(paper.aName)}>
                  预览
                </Button>
                <Button type="link" onClick={() => handleDownload(paper.aName)}>
                  下载
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="B 卷">
                <Button type="link" onClick={() => handlePreview(paper.bName)}>
                  预览
                </Button>
                <Button type="link" onClick={() => handleDownload(paper.bName)}>
                  下载
                </Button>
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
        <ProForm<FormType>
          onFinish={async (values) => {
            const { content, useMode } = values;
            const data: API.CreateCheckParams = {
              content,
              status: useMode.value,
              paperId,
            };
            if (fileList.length) {
              data.images = fileList.map((img) => img.response.path);
            }
            try {
              await createCheck(data);
              history.push('/check/list');
              message.success('提交成功');
            } catch (error) {
              console.error(error);
            }
          }}
          submitter={{
            render: (props) => {
              return [
                <Button type="primary" key="goToTree" onClick={() => props?.submit()}>
                  提交 √
                </Button>,
              ];
            },
          }}
        >
          <ProFormSelect
            width="md"
            fieldProps={{
              labelInValue: true,
            }}
            initialValue={{ label: '符合要求', value: PaperEnum.PASS }}
            options={[
              { label: '符合要求', value: PaperEnum.PASS },
              { label: '不符合要求', value: PaperEnum.REJECT },
            ]}
            name="useMode"
            label="审核结果"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormTextArea
            name="content"
            label="备注"
            width="lg"
            placeholder="请输入备注"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <PicturesWall fileList={fileList} setFileList={setFileList} />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
