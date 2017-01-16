'use strict';

import Base from './base.js';
let moment = require('moment');
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
 async indexAction() {
    let info = {
      page: this.get("page") || 1,
      pagesize: this.get("pagesize") || 10
    }
    // let itemList = await this.model('index').getUserListJoinRecord({}, info.page, info.pagesize);
    let pageResult=await this.model('index').getUserPage(info);
    console.log(pageResult);
    for (var i = 0; i < pageResult["data"].length; i++) {
       pageResult["data"][i]["eTime"]=moment(  pageResult["data"][i]["eTime"]).format("YYYY-MM-DD");
    };
    this.assign("itemList", pageResult);
    return this.display();
  }
  async itemAction() {
      let id = this.get("id");
      let mydata = await this.model('index').getItemById(id);
      console.log("mydata");
      console.log(mydata);
      mydata["eTime"] = moment(mydata["eTime"]).format("YYYY-MM-DD");
      this.assign('item', mydata);
      return this.display();
    }
    //编辑或者新增接口
  async saveAction() {
    let newData = this.post();
    console.log(newData)
    let mydata = await this.model('index').doSave(newData);
    console.log("newData")
    if (mydata.status === 1) return this.success();
  }
  async deleteAction(){
    let id=this.get("id");
    let deleteResult=await this.model('index').deleteRecord(id);
    console.log(deleteResult);
    if(deleteResult)
    {
      return this.redirect("/admin");
    }
  }
}