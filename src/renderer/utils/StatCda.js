import { getEdit } from './EditServerFile';
export default function statCda(obj) {
  console.log('============================');
  getEdit(obj, ['127.0.0.1', '80'], 'test@test.com.cn-1_20180619131935.cda', 'server', '');
  const file = obj.$store.state.Edit.file[0].split(',');
  const stat = {}
  file.forEach((item) => {
    const [key, val] = item.split(' ');
    stat[key] = val.split('，');
  });
  console.log(stat['主诉']);

  console.log('----------------------');
}

// 清空对比
export function test(obj) {
  console.log(obj);
  return true
}
