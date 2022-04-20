import { getColleges } from '@/services/api';

interface Data {
  colleges: { [key: string]: string };
}

export default () => {
  // 获取学院列表
  const data = {} as Data;
  getColleges()
    .then((res) => {
      data.colleges = res.reduce((acc, cur) => ((acc[cur.name] = cur.name), acc), {});
    })
    .catch(console.error);
  return data;
};
