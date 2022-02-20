import styles from './index.less';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { DraggerProps } from 'antd/lib/upload';
import { paperTypes } from '@/enums/mimetype';

const { Dragger } = Upload;

export default ({ setFileList, fileList }) => {
  const props: DraggerProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    maxCount: 2,
    fileList,
    onRemove: (file) => {
      setFileList(() => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload(file) {
      const isDocument = paperTypes.includes(file.type);
      if (!isDocument) {
        message.error(`${file.name} 不是文档文件`);
        // 过滤掉非文档文件
        return Upload.LIST_IGNORE;
      }
      setFileList(() => [...fileList, file]);
      // 不上传文件，需要手动调用上传
      return false;
    },
  };

  return (
    <div className={styles.container}>
      <div id="components-upload-demo-drag">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
          <p className="ant-upload-hint">支持单个或批量上传。严禁上传非文档文件</p>
        </Dragger>
      </div>
    </div>
  );
};
