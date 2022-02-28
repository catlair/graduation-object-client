import { Drawer } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Link } from 'umi';
import { getPapersByCollege } from '@/services/paper';
import { PaperEnum } from '@/enums/paper';

const CheckList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Paper>();

  const columns: ProColumns<API.Paper>[] = [
    {
      title: '课程名称',
      dataIndex: 'course',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '学院',
      dataIndex: 'college',
      valueType: 'textarea',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInForm: true,
      renderText: (val: string) => (val.length > 20 ? `${val.slice(0, 20)}...` : val),
    },
    {
      title: '审核完成时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return [
          <Link
            key="config"
            to={`/print/view/${encodeURIComponent(`${record.teacherId}$${record.course}$`)}`}
          >
            打印试卷
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
        request={async () => {
          const papers = await getPapersByCollege();
          return {
            ...papers,
            data: papers.data.filter((paper) => paper.status === PaperEnum.PASS),
          };
        }}
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
