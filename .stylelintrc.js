const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  rules: {
    'selector-class-pattern': null,
    'rule-empty-line-before': null,
  },
};
