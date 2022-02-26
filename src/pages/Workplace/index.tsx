import type { FC } from 'react';
import { Avatar, Card, Col, List, Skeleton, Row } from 'antd';
import type { PieConfig } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';
import { Link, useAccess, useRequest, useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import type { ActivitiesType } from './data.d';
import { queryProjectNotice, queryActivities, fakeChartData } from './service';
import { getGreeting } from '@/utils/time';

function getLinks() {
  const links: { title: string; href: string; id?: string }[] = [
    {
      title: '工作台',
      href: '',
    },
    {
      title: '个人设置',
      href: '/settings',
    },
  ];
  const access = useAccess();
  if (access.canTeacher) {
    links.push(
      {
        title: '试卷列表',
        id: 'paper/list',
        href: '/paper/list',
      },
      {
        title: '上传试卷',
        href: '/paper/create',
      },
    );
  }
  if (access.canDirectors) {
    links.push({
      title: '试卷列表',
      href: '/check/list',
      id: 'check/list',
    });
  }
  if (access.canSecretary) {
    links.push({
      title: '打印试卷',
      href: '/print',
    });
  }
  return links;
}

const PageHeaderContent: FC<{ currentUser: Partial<API.User> }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar
          size="large"
          src={'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>{getGreeting(currentUser.name)}</div>
      </div>
    </div>
  );
};

const DemoPie = () => {
  const data = [
    {
      type: '待审核',
      value: 27,
    },
    {
      type: '已审核',
      value: 25,
    },
    {
      type: '已拒绝',
      value: 18,
    },
  ];
  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

const Workplace: FC = () => {
  const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
  const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
  const { data } = useRequest(fakeChartData);
  // 使用 Access
  const links = getLinks();
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser!;

  const renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  return (
    <PageContainer content={<PageHeaderContent currentUser={currentUser} />}>
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.projectList}
            style={{ marginBottom: 24 }}
            title="审核中的试卷"
            bordered={false}
            extra={<Link to="/">全部试卷</Link>}
            loading={projectLoading}
            bodyStyle={{ padding: 0 }}
          >
            {projectNotice.map((item) => (
              <Card.Grid className={styles.projectGrid} key={item.id}>
                <Card bodyStyle={{ padding: 0 }} bordered={false}>
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle}>
                        <Avatar size="small" src={item.logo} />
                        <Link to={item.href}>{item.title}</Link>
                      </div>
                    }
                    description={item.description}
                  />
                  <div className={styles.projectItemContent}>
                    <Link to={item.memberLink}>{item.member || ''}</Link>
                    {item.updatedAt && (
                      <span className={styles.datetime} title={item.updatedAt}>
                        {moment(item.updatedAt).fromNow()}
                      </span>
                    )}
                  </div>
                </Card>
              </Card.Grid>
            ))}
          </Card>
          <Card
            bodyStyle={{ padding: 0 }}
            bordered={false}
            className={styles.activeCard}
            title="动态"
            loading={activitiesLoading}
          >
            <List<ActivitiesType>
              loading={activitiesLoading}
              renderItem={(item) => renderActivities(item)}
              dataSource={activities}
              className={styles.activitiesList}
              size="large"
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{ marginBottom: 24 }}
            title="快速开始 / 便捷导航"
            bordered={false}
            bodyStyle={{ padding: 0 }}
          >
            <EditableLinkGroup links={links} linkElement={Link} />
          </Card>
          <Card
            style={{ marginBottom: 24 }}
            bordered={false}
            title="试卷审核情况"
            loading={data?.radarData?.length === 0}
          >
            <div className={styles.chart}>
              <DemoPie />
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Workplace;
