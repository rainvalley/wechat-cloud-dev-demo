const DB = wx.cloud.database().collection("list")
let name = ""
let age = ""
let id = ""
Page({
    data:{
        imgUrl: ""
    },
    upload() {
        wx.chooseImage({
            success: chooseResult => {
                    wx.cloud.uploadFile({
                    cloudPath: new Date().getTime()+'.png',
                    filePath: chooseResult.tempFilePaths[0],
                    success: res => {
                    console.log('上传成功', res)
                    this.setData({
                        imgUrl:res.fileID
                    })
                    }
                })
            }
        })
    },
    getsum() {
        wx.cloud.callFunction({
            name: "add",
            data: {
                a: 1,
                b: 2
            },
            success(res) {
                console.log(res.result)
            }
        })
    },
    getopenid() {
        wx.cloud.callFunction({
            name: "getopenid",
            success(res) {
                console.log(res.result.openid)
            }
        })
    },
    fun_getdata() {
        wx.cloud.callFunction({
            name: "getdata",
            success(res) {
                console.log(res)
            },
            fail(res) {
                console.log(res)
            }
        })
    },

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
    //添加数据(方法)
    addData() {
        DB.add({
            data: {
                name: name,
                age: age
            },
            success(res) {
                console.log("SUCCESS !", res)
            },
            fail(res) {
                console.log("FAILED !", res)
            }
        })
    },
    //查询数据
    getData() {
        DB.get({
            success(res) {
                console.log("SUCCESS !", res)
            },
            fail(res) {
                console.log("FAILED !", res)
            }
        })
    },
    // 删除数据
    delData() {
        DB.doc(id).remove({
            success(res) {
                console.log("SUCCESS !", res)
            },
            fail(res) {
                console.log("FAILED !", res)
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
                console.log("SUCCESS !", res)
            },
            fail(res) {
                console.log("FAILED !", res)
            }
        })
    }
})