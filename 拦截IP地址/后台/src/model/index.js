'use strict';
/**
 * model
 */
 let moment = require('moment');
export default class extends think.model.base {

    addQuery(data) {
        return this.model('query').thenAdd(data, {
            name: data.name
        });
    }
    updateQuery(data) {
        return this.model('query').where({
            name: data.name
        }).update(data);
    }
    selectId(name) {
        return this.model('query').where({
            name: name
        }).find();
    }
    addIpList(data) {
       let days=moment().subtract(30, 'days').format("YYYY-MM-DD HH:mm:ss");
        let affectedRows = this.model("ip").where({
            gid: data[0]["gid"],time: {"<" : days}
        }).delete();
        for (var i = 0; i < data.length; i++) {
            this.model('ip').thenAdd({"address":data[i]["address"],"time":data[i]["time"],"gid":data[i]["gid"]}, {"address":data[i]["address"],"time":data[i]["time"],"gid":data[i]["gid"]});
        }
        return 1;
    }
    queryIpList(gid) {
        return this.model('ip').where({
            gid: gid
        }).select();
    }
    addBmd(data) {
        let affectedRows = this.model("bmd").where({
            gid: data[0]["gid"]
        }).delete();
        return this.model('bmd').addMany(data);
    }
    getBmdList(gid) {
        return this.model('bmd').where({
            gid: gid
        }).select();
    }
   async getItem(name) {
     return this.model('user').where({
            name: name
        }).select();
    }
    async getItemById(id) {
     return this.model('user').where({
            id: id
        }).find();
    }
        async doSave(info) {
        let status = 0
        if (!think.isEmpty(info.id)) {
            let rs = await this.model("user").where({
                id: info.id
            }).update(info);
            if (rs) status = 1;
        } else {
            let rs = await this.model("user").add(info);
            if (rs) status = 1;
        }

        return {
            status: status
        }
    }

    getUserPage(info)
    {
        return this.model('user').page(info.page, info.pagesize).countSelect();
    }
     //删除数据
    deleteRecord(id){
        return this.model("user").where({id:id}).delete();
    }
    getUserByName(name)
    {
        return this.model("user").where({name:name}).find();
    }
}