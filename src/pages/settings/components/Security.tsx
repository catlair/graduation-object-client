import { List } from 'antd';
import Password from './Password';
import { useModel } from 'umi';
import Email from './Email';
import ResetPassword from './ResetPassword';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const SecurityView: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const getData = () => {
    const email = initialState?.currentUser?.email;
    return [
      {
        title: '账户密码',
        description: <span>请经常修改密码</span>,
        actions: [<ResetPassword email={email}></ResetPassword>, <Password></Password>],
      },
      {
        title: '用户邮箱',
        description: `已绑定邮箱：${email}`,
        actions: [<Email email={email}></Email>],
      },
    ];
  };

  const data = getData();
  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default SecurityView;
