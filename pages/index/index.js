const DB = wx.cloud.database().collection("list")
let name = ""
let age = ""
let id = ""
Page({
    data: {
        imgUrl: ""
    },

    // ----------------------------------------------------------------云数据库示例--------------------------------------------------------------
    //获取用户输入的信息
    addName(event) {
        name = event.detail.value
    },
    addAge(event) {
        age = event.detail.value
    },
    delDataInput(event) {
        id = event.detail.value
    },
    udpName(event) {
        name = event.detail.value
    },
    udpDataInput(event) {
        id = event.detail.value
    },
    //添加数据
    addData() {
        DB.add({
            data: {
                name: name,
                age: age
            }, 
            success(res) {
                console.log("数据库数据添加成功", res)
            },
            fail(res) {
                console.log("数据库数据添加失败", res)
            }
        })
    },
    //查询数据
    getData() {
        DB.get({
            success(res) {
                console.log("数据库数据查询成功", res)
            },
            fail(res) {
                console.log("数据库数据查询失败", res)
            }
        })
    },
    // 删除数据
    delData() {
        DB.doc(id).remove({
            success(res) {
                console.log("数据库数据删除成功", res)
            },
            fail(res) {
                console.log("数据库数据删除失败", res)
            }
        })
    },
    //数据修改
    udpData() {
        DB.doc(id).update({
            data: {
                name: name
            },
            success(res) {
                console.log("数据库数据修改成功", res)
            },
            fail(res) {
                console.log("数据库数据修改失败", res)
            }
        })
    },

    // ------------------------------------------------------------------云函数示例----------------------------------------------------------
    getsum() {
        wx.cloud.callFunction({
            name: "add",
            data: {
                a: 1,
                b: 2
            },
            success(res) {
                console.log("云函数----加法运行成功,结果为:",res.result)
            },
            fail(res) {
                console.log("云函数----加法运行失败",res.result)
            }
        })
    },
    getopenid() {
        wx.cloud.callFunction({
            name: "getopenid",
            success(res) {
                console.log("云函数---获取OpenID运行成功,ID为:",res.result.openid)
            },
            fail(res) {
                console.log("云函数---获取OpenID运行失败",res.result.openid)
            }
        })
    },
    fun_getdata() {
        wx.cloud.callFunction({
            name: "getdata",
            success(res) {
                console.log("云函数---数据库查询运行成功,结果为:",res)
            },
            fail(res) {
                console.log("云函数---数据库查询运行失败",res)
            }
        })
    },
    // ----------------------------------------------------------------云储存示例------------------------------------------------------------
    upload() {
        wx.chooseImage({
            success: chooseResult => {
                wx.cloud.uploadFile({
                    cloudPath: new Date().getTime() + '.png', //使用时间戳唯一命名图片
                    filePath: chooseResult.tempFilePaths[0],
                    success: res => {
                        console.log('上传成功', res)
                        this.setData({
                            imgUrl: res.fileID
                        })
                    },
                    fail: res => {
                        console.log('上传失败', res)
                    }
                })
            }
        })
    },
    

})