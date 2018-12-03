<template>
  <el-container class="orderlineitem">
    <el-header>
      <div class="ty-el-header">
        <el-col :span="24"><i class="el-icon-date"></i> 当前订单状态：<span>{{this.status}}</span></el-col>
      </div>
    </el-header>
    <el-main>
      <!--订单信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>订单信息</el-col>
        </div>
        <el-table
          :data="tableData1"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="no"
            label="订单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="用户账号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源">
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            label="总价">
          </el-table-column>
        </el-table>
      </div>
      <!--商品信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>商品信息</el-col>
        </div>
        <el-table
          :data="tableData4"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="no"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="picPath"
            label="商品图片">
            <template scope="scope">
              <img :src="scope.row.picPath" width="60" height="40">
            </template>
          </el-table-column>
          <el-table-column
            prop="commodityName"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="count"
            label="数量">
          </el-table-column>
          <!--规格名称-->
          <el-table-column
            :data="tableData"
            label="规格名称">
            <template slot-scope="scope" v-for="item in tableData">
              <span>{{item.name}}</span>
            </template>
          </el-table-column>

          <el-table-column :data="tableData5" label="规格详细信息">
            <template slot-scope="scope" v-for="item in tableData5">
              <span>{{item.productName}}</span>:<span>{{item.count}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--产品使用人信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>产品使用人信息</el-col>
        </div>
        <el-table
          :data="tableData3"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="name"
            label="使用人"
            width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="用户账号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.mobile" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop='age'
            label="年龄">
            <template slot-scope="scope">
              <el-input v-model="scope.row.age" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="idCardNum"
            label="身份证号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.idCardNum" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="idCardUrl"
            label="身份证正面">
            <template slot-scope="scope">
              <img :src="scope.row.idCardUrl"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sex = 1?'男':'女'" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--TODO 发票信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>发票信息</el-col>
        </div>
        <el-table
          :data="tableData2"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="content"
            label="发票内容"
            width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.content" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="发票类型">
            <template slot-scope="scope">
              <el-input v-model="scope.row.type" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="单位">
            <template slot-scope="scope">
              <el-input v-model="scope.row.title" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="number"
            label="纳税人识别号">
            <template slot-scope="scope">
              <el-input v-model="scope.row.number" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--TODO 其他信息-->
      <div class="ty-listone">
        <div class="ty-el-main">
          <el-col :span="12"><i class="el-icon-date"></i>其他信息</el-col>
        </div>
        <div class="el-el-main-input">
          <el-form>
            <el-form-item label="备注：">
              <el-input placeholder="备注信息" v-model="content"></el-input><!--v-model="content"-->
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
    <el-footer>
      <div class="ty-right-anniu">
        <el-button @click="confirstatus">确认下单</el-button>
        <el-button @click="goBack">取消</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        params: this.$route.params, //携带过来的id
        baseURl: 'http://api.tianyushangyi.com',
        token: '',
        status: '',//付款的状态
        tableData5: [], //商品信息的规格详情
        tableData4: [], //商品信息
        tableData3: [],//产品使用人信息
        tableData2: [],//发票信息管理   备注信息也写在这个里表单
        tableData1: [],//订单详情
        tableData: [],//规格名称
        /*      tableData6: [{
                id: '12987122',
                name: '18000000000',
                amount1: '2018-6-18 13:00:00',
                amount2: '已付款',
                amount3: 'APP订单'
              }, ],*/
        content: '' //备注信息input
      };
    },
    methods: {
      gettoken() {
        var self = this
        self.token = localStorage.getItem('currentUser_token');
      },
      goBack(){
        history.go(-1);
      },
      sublist() { //TODO  请求页面数据
        var self = this
        var token = self.params.token_TO

//        console.log(token)
        axios.defaults.headers.post['token'] = token
        axios({
          method: 'post',
          url: self.baseURl + '/purchaseorder/detail?id=' + self.params.task_id,
          data: ""
        }).then(res => {
          console.log(res)
          if (res.data['code'] == '0') {
//            self.tableData1=res.data.data
            self.tableData1.push(res.data.data.orderInfo) //订单编号
            self.tableData4.push(res.data.data.purchaseInfo) //商品详情
            self.tableData5 = res.data.data.purchaseInfo.specificationDetail.spec2prod //商品信息 里边的规格详情
            self.tableData3.push(res.data.data.servicePeople) //产品使用人信息
            self.tableData.push(res.data.data.purchaseInfo.specificationDetail)//商品信息 规格名称
            //发票信息
//            console.log( self.tableData2)
            if (res.data.data.invoiceInfo == null) {
//              console.log("156")
              self.tableData2.push({
                name: '',
                mobile: '',
                no: '',
                source: '',
                status: '',
                totalPrice: '',
                createDate: ''
              })
            } else {
              console.log("151")
              self.tableData2.push(res.data.data.invoiceInfo)
            }

          } else {
            self.$message({
              message: '请求失败',
              type: 'error'
            });
          }

//          插入数据进行页面渲染
        })

      },

      /*确认订单按钮*/
      Confirmorder() {
        var self = this
        var token = self.params.token_TO
//        console.log(token)
        axios.defaults.headers.post['token'] = token
        var a = self.tableData3
        var b = self.tableData2
        var obj = {}
        var obj2 = {}

        a.map(function (e, item) {
          /*console.log(e.name);
          obj[e.name] = e.value;
          console.log(e)*/
          obj = e
        });
        b.map(function (e, item) {
          /*console.log(e.name);
           obj[e.name] = e.value;
           console.log(e)*/
          obj2 = e
        });
        console.log(111);
        console.log(obj, obj2);
        if (obj != null && obj != undefined) {
          if (obj["sex"] == "男") {
            obj["sex"] = 1;
          } else if (obj["sex"] == "女") {
            obj["sex"] = 2;
          } else {
            self.$message({
              message: "请正确填写性别",
              type: 'error'
            })
          }
        }

        var data = {
          id: self.params.task_id,
          servicePeople: obj,
          invoice: obj2,
          remark: self.content,
        }
        axios({
          method: 'post',
          url: self.baseURl + '/purchaseorder/confirm',
          data: data,
        }).then(res => {
          if (res.data.code==0) {
            self.$message({
              message: "操作成功",
              type: 'success'
            });
            self.$router.push("/orderlist")
          } else {
            self.$message({
              message: res.data.desc,
              type: 'error'
            })
          }
        })
//    console.log(token)
      },

      /*确定按钮的付款状态*/
      confirstatus() {
        if (this.status == '未付款') {
          this.$message({
            message: '未付款状态不能点击确定订单按钮',
            type: 'error'
          })
        } else {
          this.Confirmorder()
        }
      }
    },
    mounted() {
      this.sublist()
      this.gettoken()
      this.status = this.params.status_TO
//      console.log(this.status)
    }
  };
</script>

<style scoped>
  .ty-el-header {
    padding-left: 30px;
    height: 80px;
    line-height: 80px;
    background-color: rgba(243, 243, 243, 1);
    border: 1px solid rgba(228, 228, 228, 1);
    color: red;
    font-size: 16px;
  }

  .ty-el-main {
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #333333;
  }

  .ty-listone {
    /*padding-left: 5px;*/
    height: 100%;
  }

  .el-el-main-input {
    padding-left: 100px;
  }

  .ty-right-anniu {
    text-align: center;
  }

  .ty-right-anniu .el-button:nth-child(1) {
    color: white;
    background: rgba(26, 188, 156, 0.8);
  }

  .ty-right-anniu .el-button:nth-child(2) {
    color: rgba(26, 188, 156, 0.8);
    background: white;
    border: 1px solid rgba(26, 188, 156, 0.8);
  }
</style>
<style>
  .orderlineitem .el-header {
    padding: 0;
    height: 100%;
  }

  .orderlineitem .is-leaf {
    background-color: #E9EEF3;
  }

  .orderlineitem .el-input {
    width: 200px;

  }

  .orderlineitem .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
</style>
