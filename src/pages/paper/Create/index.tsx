import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { StepsForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import UploadDrag from './UploadDrag';
import { Button, message } from 'antd';
import { useState } from 'react';
import { uploadPaperFiles } from '@/services/upload';
import { getColleges } from '@/services/api';
import { createPaper } from '@/services/paper';
import { history } from 'umi';

interface PaperName {
  a: string;
  b: string;
}

export default () => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [paperName, setPaperName] = useState<PaperName>({} as PaperName);
  const [baseInfo, setBaseInfo] = useState<API.UploadPaperParams>({} as API.UploadPaperParams);

  const handleUpload = () => {
    if (fileList.length !== 2) {
      message.warn('请上传两个文件');
      return;
    }
    setUploading(true);
    uploadPaperFiles(fileList, baseInfo)
      .then((res) => {
        setFileList([]);
        setPaperName(res as PaperName);
        message.success('upload successfully.');
      })
      .catch((err) => {
        setPaperName({} as PaperName);
        console.error(err);
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <PageContainer content="从这里提交你的试卷！" className={styles.main}>
      <ProCard>
        <StepsForm<{
          course: string;
        }>
          onFinish={async (values) => {
            try {
              await createPaper(values as unknown as API.CreatePaperParams, paperName);
              message.success('提交成功');
              history.push('/paper/list');
            } catch (error) {
              message.error('提交失败，请重试');
            }
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
          <StepsForm.StepForm<API.UploadPaperParams>
            name="base"
            title="基础信息"
            onFinish={async (values) => {
              setBaseInfo(values);
              return true;
            }}
          >
            <ProFormSelect
              showSearch
              label="学院"
              name="college"
              width="md"
              request={async () => {
                const data = await getColleges();
                return data.map((item) => ({ label: item.name, value: item.name }));
              }}
              placeholder="请输入学院名称"
              rules={[{ required: true }]}
            />
            <ProFormText
              name="course"
              label="课程名称"
              width="md"
              tooltip="最长为 24 位，用于标定的唯一 id"
              placeholder="请输入课程名称"
              rules={[{ required: true }]}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="checkbox"
            title="上传试卷"
            onFinish={async () => {
              if (paperName.a && paperName.b) {
                return true;
              } else {
                message.error('请先上传试卷');
                return false;
              }
            }}
          >
            <span className={styles.tip}>请依次上传 A，B 试卷</span>
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
