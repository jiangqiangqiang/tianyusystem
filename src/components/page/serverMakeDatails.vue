<template>
  <el-container class="orderlineitem">
    <el-header>
      <div class="ty-el-header"><el-col :span="24"><i class="el-icon-date"></i> 当前订单状态：<span>{{this.status}}</span></el-col></div>
    </el-header>
    <el-main>
      <!--订单信息-->
      <div class="ty-listone">
        <div class="ty-el-main"><el-col :span="12" ><i class="el-icon-date"></i>预约信息</el-col></div>
        <el-table
          :data="tableData3"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="appointDate"
            label="预约日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="服务名称">
          </el-table-column>
          <el-table-column
            prop="consultationType"
            label="咨询类型">
          </el-table-column>
          <el-table-column
            prop="conditionComplaint"
            label="病情主诉">
          </el-table-column>
          <el-table-column
            prop="caseAppendagePath"
            label="附件">
          </el-table-column>
        </el-table>
      </div>
      <!--商品信息-->
      <div class="ty-listone">
        <div class="ty-el-main"><el-col :span="12" ><i class="el-icon-date"></i>订单信息</el-col></div>
        <el-table
          :data="tableData2"
          border
          style="width: 100%; margin-top: 20px">
          <el-table-column
            prop="no"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="订单编号">
            <!--<template scope="scope">
              <img :src="scope.row.picPath" width="60" height="40">
            </template>-->
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源">
          </el-table-column>
  <!--        TODO 服务信息-->
        </el-table>
      </div>
      <!--TODO 其他信息-->
      <div class="ty-listone">
        <div class="ty-el-main"><el-col :span="12" ><i class="el-icon-date"></i>其他信息</el-col></div>
        <div class="el-el-main-input">
          <el-form :data="tableData1" v-for="(list,index) in tableData1">
           <!-- <el-form-item label="offlineDoctorId" prop="offlineDoctorId">
              <el-input placeholder="服务时间" v-model="list.offlineDoctorId"></el-input>
            </el-form-item>-->
          <!--  <el-form-item label="onlineDoctorId："prop="onlineDoctorId">
              <el-input placeholder="onlineDoctorId" v-model="list.onlineDoctorId"></el-input>
            </el-form-item>-->
            <el-form-item label="备注：" prop="remark">
              <el-input placeholder="备注" v-model="list.remark"></el-input>
            </el-form-item>
            <el-form-item label="服务时间：" prop="serviceDate">
              <el-date-picker
                v-model="list.serviceDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <!--<el-input placeholder="服务时间" v-model="list.serviceDate"></el-input>-->
            </el-form-item>
            <el-form-item label="服务人电话：" prop="serviceMobile">
              <el-input placeholder="服务人电话" v-model="list.serviceMobile"></el-input>
            </el-form-item>
            <el-form-item label="服务人名字：" prop="serviceName">
              <el-input placeholder="服务人名字" v-model="list.serviceName"></el-input>
            </el-form-item>
            <el-form-item label="使用人电话：" prop="useMobile">
              <el-input placeholder="使用人电话" v-model="list.useMobile"></el-input>
            </el-form-item>
            <el-form-item label="使用人名字:" prop="useName">
              <el-input placeholder="使用人名字" v-model="list.useName"></el-input>
            </el-form-item>
            <el-form-item label="就诊地点:" prop="visitAddress">
              <!--就整地点-->
              <el-select placeholder="就诊地点" v-model="list.visitAddress">
                <el-option
                  v-for="item in options"
                  :value="item.value"
                  :label="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="就诊类型：" prop="visitType">
              <!--就诊类型-->
              <el-select placeholder="就诊类型" v-model="list.visitType">
                <el-option
                  v-for="item in options2"
                  :value="item.value"
                  :label="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保健医:" prop="visitAddress">
              <!--就整地点-->
              <el-select placeholder="保健医" v-model="Doctorcould">
                <el-option
                  v-for="item in optionsDoctorcould"
                  :value="item.id"
                  :label="item.name+item.mobile"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
    <el-footer>
      <div class="ty-right-anniu">
        <el-button @click="confirstatus">接受预约</el-button>
        <el-button>取消</el-button>
      </div></el-footer>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    data() {
      return {
        currentPage: 1,
        currentSize: 20000,
        Doctorcould:'', //保健医生
        optionsDoctorcould:[], //保健医生选框
        params:this.$route.params, //携带过来的id
        baseURl:'http://api.tianyushangyi.com',
        token:'',
        status:'',//付款的状态
        tableData3:[], //TODO 预约单详情
        tableData2:[],//TODO 预约信息
        tableData1:[],//TODO 服务信息
        tableData:'',
//        tableData:[
         /* {
            serviceDate:'',
            useName:'',
            useMobile:'',
            onlineDoctorId:'',
            offlineDoctorId:'',
            serviceName:'',
            serviceMobile:'',
            visitAddress:'',
            visitType:'',
            remark:'',
          }*/
//        ],
        options: [
          {
            value: "中日友好",
            label: '中日友好'
          }, {
            value: "解放军301",
            label: '解放军301'
          }, {
            value: "协和",
            label: '协和'
          }],
        options2: [
          {
            value: "专家",
            label: '专家'
          }, {
            value: "特区",
            label: '特区'
          }, {
            value: "国际",
            label: '国际'
          }, {
            value: "普通",
            label: '普通'
          }],
        content:'' //备注信息input
      };
    },
    methods: {
      gettoken(){
        var self=this
        self.token=localStorage.getItem('currentUser_token');
      },
      sublist(){ //TODO  请求页面数据
        var self=this
        var token=self.params.token_TO

//        console.log(token)
        axios.defaults.headers.post['token'] =token
        axios({
          method:'post',
          url:self.baseURl+'/appointservice/detail?id='+self.params.task_id,
          data:'',
        }).then(res=>{
          console.log(res)
          if(res.data['code']=='0'){
            self.tableData3.push(res.data.data.appointInfo);
            self.tableData2.push(res.data.data.orderInfo);
            self.tableData=res.data.data.id
            self.tableData1.push(res.data.data.serviceInfo);

          }else{
            self.$message({
              message: '请求失败',
              type: 'error'
            });
          }

//          插入数据进行页面渲染
        })

      },

      /*TODO  接受预约按钮*/
      Confirmorder(){
        var self=this;

       var  a=self.tableData1;
        var obj1='';
        a.map(function (e, item) {
          obj1=e
        });
        obj1.id=self.tableData;
        if(self.Doctorcould == "" || self.Doctorcould == null || self.Doctorcould == undefined){
          self.$message({
            message: '保健医不能为空',
            type: 'error'
          })
          return;
        }
        obj1.onlineDoctorId=self.Doctorcould;
        console.log(obj1);
        axios({
          method:'post',
          url:self.baseURl+'/appointservice/acceptappoint',
          data:obj1
        }).then(res=>{
            if(res.data['code']=='0'){
            self.$message({
              message: '请求成功',
              type: 'success'
            });
//              回到预约列表页面
              self.$router.push({name:'ServeMakeList'})
          }else {
            self.$message({
              message: res.data.desc,
              type: 'error'
            })
          }
        })
      },

      doc(){ //查询保健医生
        let self = this;
        self.token = localStorage.getItem('currentUser_token');
        let data = {
          pageSize: self.currentSize, //页数量
          pageNum: self.currentPage, //第几页
        };
        axios.defaults.headers.post['token'] = self.token ;
        axios({
          method: 'post',
          url: self.baseURl + '/user/docker',
          data:qs.stringify(data),
        }).then(res => {
          if (res.data['code'] == "0") {
           this.optionsDoctorcould = res.data.data.rows;

          console.log(this.optionsDoctorcould )
          }
        })


      },
      /* TODO 确定按钮的付款状态*/
      confirstatus(){
        if(this.status=='未付款'){
          this.$message({
            message:'未付款状态不能点击确定订单按钮',
            type:'error'
          })
        }else{
          this.Confirmorder()
        }
      }
    },
    mounted(){
      this.sublist()
      this.gettoken()
      this.status=this.params.status_TO
      this.doc()
//      console.log(this.status)
    }
  };
</script>

<style scoped>
  .ty-el-header{
    padding-left: 30px;
    height: 80px;
    line-height: 80px;
    background-color: rgba(243, 243, 243, 1);
    border: 1px solid rgba(228, 228, 228, 1);
    color: red;
    font-size: 16px;
  }
  .ty-el-main{
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #333333;
  }
  .ty-listone{
    /*padding-left: 5px;*/
    height: 100%;
  }
  .el-el-main-input{
    padding-left: 100px;
  }
  .ty-right-anniu{
    text-align: center;
  }
  .ty-right-anniu .el-button:nth-child(1){
    color: white;
    background: rgba(26, 188, 156, 0.8);
  }
  .ty-right-anniu .el-button:nth-child(2){
    color: rgba(26, 188, 156, 0.8);
    background: white;
    border: 1px solid rgba(26, 188, 156, 0.8);
  }
</style>
<style>
  .orderlineitem .el-header{
    padding: 0;
    height: 100%;
  }
  .orderlineitem .is-leaf{
    background-color: #E9EEF3;
  }
  .orderlineitem .el-input{
    width: 200px;

  }
  .orderlineitem .el-input__inner{
    height: 30px;
    line-height: 30px;
  }
</style>
