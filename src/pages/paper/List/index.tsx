import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { history, Link } from 'umi';
import { getPapersByTeacher } from '@/services/paper';
import { PaperEnum } from '@/enums/paper';
import { sortByTimeString } from '@/utils/time';
import useColumnSearch from '@/hooks/useColumnSearch';

const TableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Paper>();
  const courseSearchProps = useColumnSearch('course');

  const columns: ProColumns<API.Paper>[] = [
    {
      title: '课程名称',
      dataIndex: 'course',
      ...courseSearchProps,
    },
    {
      title: '学院',
      dataIndex: 'college',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        [PaperEnum.WAITING]: {
          text: '等待审核',
          status: 'Processing',
        },
        [PaperEnum.PASS]: {
          text: '审核通过',
          status: 'Success',
        },
        [PaperEnum.REJECT]: {
          text: '审核拒绝',
          status: 'Error',
        },
        [PaperEnum.PRINT]: {
          text: '已打印',
          status: 'Default',
        },
      },
      filters: true,
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInForm: true,
      renderText: (val: string) => {
        if (val) {
          return val.length > 20 ? `${val.slice(0, 20)}...` : val;
        }
        return '';
      },
    },
    {
      title: '状态变更时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      sorter: (a, b) => sortByTimeString(a.updatedAt, b.updatedAt),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return record.status === PaperEnum.REJECT
          ? [
              <Link key="config" to={`/paper/detail/${record.id}`}>
                查看试卷
              </Link>,
              <Link key="config" to={`/paper/edit/${record.id}`}>
                重新上传
              </Link>,
            ]
          : [
              <Link key="config" to={`/paper/detail/${record.id}`}>
                查看试卷
              </Link>,
            ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Paper, API.PageParams>
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push('/paper/create');
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={getPapersByTeacher}
        columns={columns}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.course && (
          <ProDescriptions<API.Paper>
            column={2}
            title={currentRow?.course}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.course,
            }}
            columns={columns as ProDescriptionsItemProps<API.Paper>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
