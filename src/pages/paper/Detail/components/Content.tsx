import { Divider } from 'antd';
import Images from './Images';

export default ({ paperLife }: { paperLife: API.PaperLife }) => {
  return (
    <>
      <Divider orientation="left">说明</Divider>
      <div>{paperLife.content}</div>
      {paperLife.images && paperLife.images.length > 0 ? (
        <Images images={paperLife.images}></Images>
      ) : null}
    </>
  );
};
