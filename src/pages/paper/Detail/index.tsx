import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { useRouteMatch } from 'umi';
import PaperLife from './components/PaperLife';
import PaperInfoViwe from '@/components/paperInfoViwe';

export default () => {
  const {
    params: { id: paperId },
  } = useRouteMatch();

  return (
    <PageContainer>
      <ProCard>
        <PaperInfoViwe />
        <PaperLife paperId={paperId}></PaperLife>
      </ProCard>
    </PageContainer>
  );
};
