'use strict';

import Base from './base.js';
let moment = require('moment');
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    //auto render template file index_index.html
    let mydata = await this.post();
    let bmdList = mydata["bmdList[]"];
    let locationIp=this.ip();
    delete mydata["bmdList[]"];
    let name=mydata.name;
    let ifexist=await this.model("index").getItem(name);
    if(ifexist.length==0){
      this.write("error_hy");
      this.end();
    }
    let insertQuery = await this.model("index").addQuery(mydata); 
    let bmdGid = insertQuery.id;
    if (insertQuery.type == "exist") {
      let updateResult = await this.model("index").updateQuery(mydata);
    }
    let bmdArray = [];
    let bmdJson = {};
    if (typeof(bmdList)=="string") {
      bmdJson["ip"] = bmdList;
      bmdJson["gid"] = bmdGid;
      bmdArray.push(bmdJson);
    } else if (typeof(bmdList)=="object") {
      for (let i = 0; i < bmdList.length; i++) {
        bmdJson["ip"] = bmdList[i];
        bmdJson["gid"] = bmdGid;
        bmdArray.push(bmdJson);
      }
    }
    bmdArray.push({"ip":locationIp,"gid":bmdGid});
      let bmdResult = await this.model("index").addBmd(bmdArray);
      this.write("success");
      this.end();
  }
  async postipAction() {
    
    let mydata = await this.post();
    let gid = await this.model("index").selectId(mydata.gobalCompanyName);
    gid = gid.id;
    let list = [];
    let ww = "";
    var ipList=eval(mydata.ipList);
    for (var i = 0; i < ipList.length; i++) {
      let json = {};
        json["address"] = ipList[i]["address"];
        json["time"] = ipList[i]["time"];
        json["gid"] = gid;
        list.push(json);
    }
    let addManyRes = await this.model("index").addIpList(list);
    this.write("success");
    this.end();
  }

  async getipAction() {
    let mydata = await this.post();
    let query = await this.model("index").selectId(mydata.companyName);
    let queryId = query.id;
    let ipList = await this.model("index").queryIpList(queryId);
    let bmdIpList=await this.model("index").getBmdList(queryId);
    let ipArray = [];
    let ipdArray = [];
    let list2 = [];
    let list3 = [];
    let now = moment().format("YYYY-MM-DD HH:mm:ss");
    let listMap = {};
    let listMap1 = {};
    if (query.isIp == 1) {
      let subtractDay = moment().subtract(query.ip_day, 'days').format("YYYY-MM-DD HH:mm:ss");
      console.log(subtractDay);
      for (let i = 0, len = ipList.length, address, key; i < len; i++) {
        let queryDay = moment(ipList[i]["time"]).format("YYYY-MM-DD HH:mm:ss");
        if (moment(queryDay).isAfter(moment(subtractDay))) {
          address = ipList[i]["address"];
          key = address; // key为id和name的组合，值为number
          if (!!listMap[key]) {
            listMap[key]++;
          } else {
            listMap[key] = 1;
          }
        }
      };
      for (let item in listMap) {
        list2.push({
          address: item.split('-')[0],
          number: listMap[item]
        })
      }
      for (let i = 0; i < list2.length; i++) {
        console.log(i);
          for (let k = 0; k < bmdIpList.length; k++) {
            if(bmdIpList[k]["ip"]!=list2[i].address&&list2[i].number >=query.ip_time)
            {
                ipArray.push(list2[i].address);
            }
          };
      };
    }
    if (query.isIpD == 1) {
      let subtractDay = moment().subtract(query.ipD_day, 'days').format("YYYY-MM-DD HH:mm:ss");
      for (let i = 0, len = ipList.length, address, key; i < len; i++) {
        let queryDay = moment(ipList[i]["time"]).format("YYYY-MM-DD HH:mm:ss");
        if (moment(queryDay).isAfter(moment(subtractDay))) {
          address = ipList[i]["address"];
          let p = address.lastIndexOf(".");
          address = address.substring(0, p);
          key = address; // key为id和name的组合，值为number
          if (!!listMap1[key]) {
            listMap1[key]++;
          } else {
            listMap1[key] = 1;
          }
        }
      };
      for (let item in listMap1) {
        list3.push({
          address: item.split('-')[0],
          number: listMap1[item]
        })
      }

      for (let i = 0; i < list3.length; i++) {
        if (list3[i].number > query.ipD_time) {
          ipdArray.push(list3[i].address);
        }
      };
    }
    this.json({
      ipArray: ipArray,
      ipdArray: ipdArray
    });
  }
}