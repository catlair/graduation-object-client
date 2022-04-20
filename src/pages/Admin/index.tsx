import React, { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio } from '@ant-design/pro-form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { message, Select, Tag } from 'antd';
import { RoleLabels } from '@/enums/role.enum';
import { getColleges } from '@/services/api';
import { createUser, getUsers, updateUser } from '@/services/user';
import { isEqual } from 'lodash';
import { randomPassword } from '@/utils/string';
import useColumnSearch from '@/hooks/useColumnSearch';
import { useModel } from 'umi';

type User = Partial<Omit<API.User, 'password'>>;

const TagList: React.FC<{
  value?: string[];
  onChange?: (role: string[]) => void;
}> = ({ value, onChange }) => {
  const [newTags, setNewTags] = useState<string[]>([]);

  const handleInputChange = (v: string[]) => {
    setNewTags(v);
  };

  const handleInputConfirm = () => {
    onChange?.(newTags);
  };

  return (
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={value || []}
      onChange={handleInputChange}
      onBlur={handleInputConfirm}
    >
      {Object.keys(RoleLabels).map((item) => (
        <Select.Option key={item}>{RoleLabels[item]}</Select.Option>
      ))}
    </Select>
  );
};

const CollegeSelect: React.FC<{
  value?: string[];
  onChange?: (role: string[]) => void;
}> = ({ value, onChange }) => {
  const [newTags, setNewTags] = useState<string[]>([]);
  const [colleges, setColleges] = useState<JSX.Element[]>([]);

  const handleInputChange = (v: string[]) => {
    setNewTags(v);
  };

  const handleInputConfirm = () => {
    onChange?.(newTags);
  };

  const getData = async () => {
    const data = await getColleges();
    return data.map((item) => <Select.Option key={item.name}>{item.name}</Select.Option>);
  };

  useEffect(() => {
    getData().then((data) => {
      setColleges(data);
    });
  }, []);

  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={value || []}
      onChange={handleInputChange}
      onBlur={handleInputConfirm}
    >
      {colleges}
    </Select>
  );
};

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<User[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
  const emailSearchProps = useColumnSearch('email');
  const nameSearchProps = useColumnSearch('name');
  const { colleges } = useModel('list');

  const columns: ProColumns<User>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      tooltip: '唯一标识',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [
            { required: true, message: '此项为必填项' },
            { type: 'number', message: '请输入数字', transform: (v) => Number(v) },
          ],
        };
      },
      // 不允许编辑
      editable: (_text, record) => {
        return !record.name;
      },
      sorter: (a, b) => a.id! - b.id!,
      sortDirections: ['descend', 'ascend'],
      width: '15%',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      formItemProps: () => {
        return {
          rules: [
            { required: true, message: '此项为必填项' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
            },
          ],
        };
      },
      width: '15%',
      ...emailSearchProps,
    },
    {
      title: '用户名',
      dataIndex: 'name',
      width: '12%',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      ...nameSearchProps,
    },
    {
      title: '学院',
      dataIndex: 'college',
      width: '15%',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      renderFormItem(_, { isEditable }) {
        return isEditable ? <CollegeSelect /> : null;
      },
      valueEnum: colleges,
      filters: true,
      onFilter: (value, record) => value === record.college,
    },
    {
      title: '角色',
      key: 'roles',
      dataIndex: 'roles',
      renderFormItem: (_, { isEditable }) => {
        return isEditable ? <TagList /> : null;
      },
      render: (_, row) => row.roles?.map((item) => <Tag key={item}>{RoleLabels[item]}</Tag>),
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      valueEnum: RoleLabels,
      filters: true,
      onFilter: (value, record) => record.roles?.includes(value as string) || false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id!);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <PageHeaderWrapper>
      <EditableProTable<User>
        rowKey="id"
        headerTitle="用户信息管理"
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record(_, dataSource) {
                  const last = dataSource.at(-1),
                    id = last ? +last.id! + 1 : 1;
                  return {
                    id,
                  };
                },
              }
            : false
        }
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '添加到顶部',
                value: 'top',
              },
              {
                label: '添加到底部',
                value: 'bottom',
              },
              {
                label: '隐藏',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        request={getUsers}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, newData, row) => {
            if (isEqual(newData, row)) {
              return;
            }

            if (typeof rowKey !== 'number') {
              message.warn('rowKey必须为数字');
            }

            if (row.name) {
              // 更新
              await updateUser(+rowKey, getChangedValues(row, newData));
              message.success(row.name + '更新成功');
            } else {
              // 新增
              try {
                await createUser({
                  ...newData,
                  index: undefined,
                  id: Number(newData.id) || +rowKey,
                  password: randomPassword(10),
                } as API.CreateUser);
                message.success('新增成功');
              } catch (error) {
                message.error('新增失败');
                console.error(error);
              }
            }
          },
          onChange: setEditableRowKeys,
          actionRender(_row, _config, dom) {
            return [dom.save, dom.cancel];
          },
        }}
      />
    </PageHeaderWrapper>
  );
};

/** 返回被改变值的对象 */
function getChangedValues(data, newData) {
  // 找出 data 被修改的属性
  const changedData: { [key: string]: any } = {};
  Object.keys(data).forEach((key) => {
    if (!isEqual(data[key], newData[key])) {
      Object.defineProperty(changedData, key, {
        value: newData[key],
        enumerable: true,
      });
    }
  });
  return changedData;
}

async function getCollegesEnum() {
  const data = await getColleges();
  return data.map((item) => ({ label: item.name, value: item.name }));
}
