import { Collapse } from 'antd';
import PaperDescription from './PaperDescription';

const { Panel } = Collapse;

export default ({ paperLife }: { paperLife: API.PaperLife }) => {
  return (
    <>
      <Collapse defaultActiveKey={[]} ghost>
        <Panel header="查看本次提交的试卷" key="1">
          <PaperDescription
            paper={{
              aName: paperLife.aName,
              bName: paperLife.bName,
              course: '',
            }}
            style={{ margin: '12px auto' }}
          />
        </Panel>
      </Collapse>
    </>
  );
};
