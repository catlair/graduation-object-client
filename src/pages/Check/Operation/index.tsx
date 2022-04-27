import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { useRouteMatch, history } from 'umi';
import ProForm, { ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { Button, Collapse, message } from 'antd';
import { useState } from 'react';
import { PaperEnum } from '@/enums/paper';
import { PicturesWall } from './components/PicturesWall';
import type { UploadFile } from 'antd/lib/upload/interface';
import { createCheck } from '@/services/check';
import PaperInfoViwe from '@/components/PaperInfoViwe';
import PaperLife from '@/pages/paper/Detail/components/PaperLife';

const { Panel } = Collapse;

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
  const [selectValue, setSelectValue] = useState<string>(PaperEnum.PASS);

  return (
    <PageContainer>
      <ProCard>
        <PaperInfoViwe />
        <Collapse style={{ margin: '20px 0' }}>
          <Panel header="查看试卷提交历史" key="1">
            <PaperLife paperId={paperId} />
          </Panel>
        </Collapse>
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
          initialValues={{
            content: '',
            useMode: { label: '符合要求', value: PaperEnum.PASS },
          }}
          onValuesChange={(values) => {
            if (Reflect.has(values, 'useMode')) {
              setSelectValue(values.useMode.value);
            }
          }}
        >
          <ProFormSelect
            width="md"
            fieldProps={{
              labelInValue: true,
            }}
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
                required: selectValue === PaperEnum.REJECT,
              },
            ]}
          />
          <PicturesWall fileList={fileList} setFileList={setFileList} />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
