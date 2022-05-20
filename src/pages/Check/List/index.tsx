import { Drawer } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Link } from 'umi';
import { getPapersByCollege } from '@/services/paper';
import { PaperEnum, PaperLifeLabel } from '@/enums/paper';
import { sortByTimeString } from '@/utils/time';
import useColumnSearch from '@/hooks/useColumnSearch';

const CheckList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Paper>();
  const courseSearchProps = useColumnSearch('course', { setCurrentRow, setShowDetail });
  // const { colleges } = useModel('list');

  const columns: ProColumns<API.Paper>[] = [
    {
      title: '课程名称',
      dataIndex: 'course',
      ...courseSearchProps,
    },
    // {
    //   title: '学院',
    //   dataIndex: 'college',
    //   valueType: 'textarea',
    //   valueEnum: colleges,
    //   filters: true,
    //   onFilter: (value, record) => value === record.college,
    // },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        [PaperEnum.PENDING]: {
          text: PaperLifeLabel.PENDING,
          status: 'Processing',
        },
        [PaperEnum.PASSED]: {
          text: PaperLifeLabel.PASSED,
          status: 'Processing',
        },
        [PaperEnum.REVIEW_PASSED]: {
          status: 'Success',
          text: PaperLifeLabel.REVIEW_PASSED,
        },
        [PaperEnum.REJECTED]: {
          text: PaperLifeLabel.REJECTED,
          status: 'Error',
        },
        [PaperEnum.REVIEW_REJECTED]: {
          status: 'Error',
          text: PaperLifeLabel.REVIEW_REJECTED,
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
        return record.status === PaperEnum.PENDING || record.status === PaperEnum.PASSED
          ? [
              <Link key="operation" to={`/check/operation/${record.id}`}>
                审核试卷
              </Link>,
            ]
          : [
              <Link key="detail" to={`/paper/detail/${record.id}`}>
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
        request={getPapersByCollege}
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

export default CheckList;
