import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/lib/upload/interface';
import { getAccessToken } from '@/utils/token';
import { deletePicture, uploadPicture } from '@/services/upload';

export class PicturesWall extends React.Component<{
  fileList: UploadFile[];
  setFileList: (fileList: UploadFile[]) => void;
}> {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  };
  accessToken = getAccessToken();

  handleCancel = () => this.setState({ previewVisible: false });

  handleRemove = async (file: UploadFile) => {
    const path = file.response?.path;
    if (!path) {
      return true;
    }
    try {
      await deletePicture(path);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  handleChange = ({ fileList }) => this.props.setFileList?.(fileList);

  render() {
    const { previewVisible, previewImage, previewTitle } = this.state;
    const { fileList } = this.props;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          // 自定义上传
          customRequest={async ({ file, onSuccess, onError }) => {
            const formData = new FormData();
            formData.append('file', file);
            try {
              const res = await uploadPicture(formData);
              onSuccess?.(res);
            } catch (error) {
              onError?.(error as any);
            }
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
