import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { StepsForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import UploadDrag from './UploadDrag';
import { Button, message } from 'antd';
import { useState } from 'react';
import { uploadPaperFiles } from '@/services/ant-design-pro/upload';

export default () => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleUpload = () => {
    setUploading(true);
    uploadPaperFiles(fileList)
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch((err) => {
        console.error(err);
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
      <ProCard>
        <StepsForm<{
          name: string;
        }>
          onFinish={async (values) => {
            console.log(values);
            message.success('提交成功');
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}
          submitter={{
            render: (props) => {
              if (props.step === 0) {
                return (
                  <Button type="primary" onClick={() => props.onSubmit?.()}>
                    去第二步 {'>'}
                  </Button>
                );
              }

              if (props.step === 1) {
                return [
                  <Button key="pre" onClick={() => props.onPre?.()}>
                    返回第一步
                  </Button>,
                  <Button
                    type="primary"
                    key="upload"
                    onClick={handleUpload}
                    disabled={false}
                    loading={uploading}
                  >
                    {uploading ? '上传中' : '上传文件'}
                  </Button>,
                  <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                    去第三步 {'>'}
                  </Button>,
                ];
              }

              return [
                <Button key="gotoTwo" onClick={() => props.onPre?.()}>
                  {'<'} 返回第二步
                </Button>,
                <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
                  提交 √
                </Button>,
              ];
            },
          }}
        >
          <StepsForm.StepForm<{
            name: string;
          }>
            name="base"
            title="基础信息"
            onFinish={async ({ name }) => {
              console.log(name);
              return true;
            }}
          >
            <ProFormText
              name="major"
              label="专业名称"
              width="md"
              tooltip="最长为 24 位，用于标定的唯一 id"
              placeholder="请输入名称"
              rules={[{ required: false }]}
            />
            <ProFormText
              name="name"
              label="课程名称"
              width="md"
              tooltip="最长为 24 位，用于标定的唯一 id"
              placeholder="请输入名称"
              rules={[{ required: false }]}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm<{
            checkbox: string;
          }>
            name="checkbox"
            title="上传试卷"
          >
            <UploadDrag setFileList={setFileList} fileList={fileList} />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="time" title="提交审核">
            <ProFormTextArea name="remark" label="备注" width="lg" placeholder="请输入备注" />
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </PageContainer>
  );
};
