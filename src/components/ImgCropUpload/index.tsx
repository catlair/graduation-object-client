import { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadFile } from 'antd/lib/upload/interface';

export default () => {
  const [fileList, setFileList] = useState([] as UploadFile[]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <ImgCrop rotate>
      <Upload
        listType="picture-card"
        showUploadList={false}
        fileList={fileList}
        onChange={onChange}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};
