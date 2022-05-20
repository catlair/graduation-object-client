export const PaperEnum = {
  // 待初审
  PENDING: 'PENDING',
  // 初审通过
  PASSED: 'PASSED',
  // 初审未通过
  REJECTED: 'REJECTED',
  // 复审通过
  REVIEW_PASSED: 'REVIEW_PASSED',
  // 复审未通过
  REVIEW_REJECTED: 'REVIEW_REJECTED',
  // 试卷已打印
  PRINT: 'PRINT',
};

export const PaperLifeEnum = Object.assign({}, PaperEnum, {
  // 创建试卷
  CREATE: 'CREATE',
  // 重新上传
  UPDATE: 'UPDATE',
});

export const PaperLifeLabel = {
  CREATE: '创建',
  UPDATE: '修改',
  PENDING: '待初审',
  PASSED: '初审通过',
  REJECTED: '初审未通过',
  REVIEW_PASSED: '复审通过',
  REVIEW_REJECTED: '复审未通过',
  PRINT: '已打印',
};
