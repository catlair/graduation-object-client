import { useState } from 'react';
import { Alert, Modal } from 'antd';

const ForgetPasswordModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <a
        style={{
          float: 'right',
        }}
        onClick={showModal}
      >
        忘记密码 ?
      </a>
      <Modal title="忘记密码 ?" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Alert
          message="温馨提示"
          description=" 请使用其他方式登录后修改密码，如果您无法登录，请立即联系管理员处理！"
          type="info"
          showIcon
        />
      </Modal>
    </>
  );
};

export default ForgetPasswordModal;
