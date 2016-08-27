const M = require('../index.js');
const expect = require('chai').expect;
const fs = require('fs');

describe('json-sql', function() {
  var model = M('./demo.json');
  it('noexist json', function() {
    var path = './noexist.json'
      //确认文件不存在
    var result = fs.existsSync(path);
    expect(result).to.be.equal(false);

    var model = M(path);
    expect(typeof model).to.be.equal('object');
    //判断文件已经创建
    result = fs.existsSync(path);
    expect(result).to.be.equal(true);
    //删除文件
    result = fs.unlinkSync(path);
    expect(result).to.be.equal(undefined);
  });
  it('get', function() {
    var result = model.get({ 'imageName': 'gittest', 'updateTime': 1472109508494 });
    expect(result.id).to.be.equal(1472109508436);
  });
  it('get undefined', function() {
    var result = model.get({ 'imageName': 'gittest1', 'updateTime': 1472109508494 });
    expect(result).to.be.equal(undefined);
  });
  it('add', function() {
    var newData = { 'id': '1234567', 'updateTime': '1472109506494', 'imageName': 'addNewData' };
    var result = model.add(newData);
    expect(result).to.be.equal(newData);
  });
  it('find', function() {
    var result = model.find('imageName', ['gittest', 'one']);
    expect(result.length).to.be.equal(4);
  });
  it('find undefined', function() {
    var result = model.find('imageName', ['gittest1', 'one1']);
    expect(result.length).to.be.equal(0);
  });
  it('update', function() {
    var random = (new Date()).getTime();
    var result = model.update({ 'imageName': 'three', 'id': '1472109508938' }, { 'updateTime': random });
    expect(result.updateTime).to.be.equal(random);
    result = model.get({ 'imageName': 'three', 'id': '1472109508938' });
    expect(result.updateTime).to.be.equal(random);
  });
  it('updateAndAdd --update', function() {
    var random = (new Date()).getTime();
    var result = model.updateAndAdd({ 'imageName': 'four', 'id': '1472109518938' }, { 'updateTime': random });
    console.log(result);
    expect(result.updateTime).to.be.equal(random);
    result = model.get({ 'imageName': 'four', 'id': '1472109518938' });
    expect(result.updateTime).to.be.equal(random);
  });
  it('updateAndAdd --update', function() {
    var random = (new Date()).getTime();
    var result = model.updateAndAdd({ 'imageName': 'four', 'id': random }, { 'updateTime': random });
    console.log(result);
    expect(result.updateTime).to.be.equal(random);
    expect(result.id).to.be.equal(random);
    result = model.get({ 'imageName': 'four', 'id': random });
    expect(result.updateTime).to.be.equal(random);
    expect(result.id).to.be.equal(random);
  });
});