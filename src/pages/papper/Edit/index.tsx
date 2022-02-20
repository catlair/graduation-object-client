import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import ProCard from '@ant-design/pro-card';
import { getPaper, patchPaper } from '@/services/paper';
import { history, useRouteMatch } from 'umi';
import ProForm, { ProFormGroup, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { paperTypes } from '@/enums/mimetype';
import { uploadPaperUpdate } from '@/services/upload';

interface UploadButtonProps {
  feildName: string;
}

export default () => {
  const {
    params: { id: paperId },
  } = useRouteMatch<{ id: string }>();

  const UploadButton = (props: UploadButtonProps) => {
    return (
      <Upload
        beforeUpload={(file) => {
          const isDocument = paperTypes.includes(file.type);
          if (!isDocument) {
            message.error(`${file.name} 不是文档文件`);
            return Upload.LIST_IGNORE;
          }
          uploadPaperUpdate(file, props.feildName, paperId)
            .then(() => {
              message.success(`${file.name} 上传成功`);
            })
            .catch(() => {
              message.error(`${file.name} 上传失败`);
            });
          return false;
        }}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Upload (试卷 {props.feildName})</Button>
      </Upload>
    );
  };

  return (
    <PageContainer content="修改您的试卷并重新提交！" className={styles.main}>
      <ProCard>
        <ProForm
          onFinish={async (values) => {
            // @ts-ignore
            const { content } = values;
            try {
              await patchPaper(paperId, content);
              history.push('/paper/list');
              message.success('修改成功');
            } catch (error) {
              console.log(error);
            }
          }}
          request={() => getPaper(paperId)}
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
          <ProFormGroup title="基本信息">
            <ProFormText
              name="college"
              label="学院"
              width="md"
              placeholder="请输入学院名称"
              disabled={true}
            />
            <ProFormText
              name="course"
              label="课程名称"
              width="md"
              tooltip="最长为 24 位，用于标定的唯一 id"
              placeholder="请输入课程名称"
              disabled={true}
            />
          </ProFormGroup>
          <ProFormGroup title="试卷上传（上传修改的即可）" style={{ marginBottom: '12px' }}>
            <UploadButton feildName="a" />
            <UploadButton feildName="b" />
          </ProFormGroup>
          <ProFormTextArea name="content" label="备注" width="lg" placeholder="请输入备注" />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
