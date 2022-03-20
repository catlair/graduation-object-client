import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { useRouteMatch, history } from 'umi';
import ProForm, { ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import { useState } from 'react';
import { PaperEnum } from '@/enums/paper';
import { PicturesWall } from './components/PicturesWall';
import type { UploadFile } from 'antd/lib/upload/interface';
import { createCheck } from '@/services/check';
import PaperInfoViwe from '@/components/paperInfoViwe';

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
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <PageContainer>
      <ProCard>
        <PaperInfoViwe />
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
