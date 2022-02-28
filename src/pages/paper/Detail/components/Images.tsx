import { getFile } from '@/services/upload';
import { Image } from 'antd';
import { useEffect, useState } from 'react';

export default ({ images }: { images: string[] }) => {
  const [imgData, setImgData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setImgData([]);
      await Promise.all(
        images.map(async (image) => {
          const res = await getFile(image, 'img', 'blob');
          setImgData((prev) => [...prev, URL.createObjectURL(res)]);
        }),
      );
    })();
  }, [images]);

  return (
    <Image.PreviewGroup>
      {imgData.map((item) => {
        return <Image key={item} width={200} src={item} />;
      })}
    </Image.PreviewGroup>
  );
};
