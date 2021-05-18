var utils = require('./utils')

function study () {
  console.log('该模块为训练本地题库，正在开发中..。');
  utils.delay(3)
  console.hide()
  engines.stopAllAndToast();
}
exports.study = study
