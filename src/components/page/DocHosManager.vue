<template>
  <el-container>
    <el-header>我的订单</el-header>
    <el-main>
      <el-table
        :data="tableData2"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="编号"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          width="">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="section"
          align="center"
          label="特色">
        </el-table-column>
        <el-table-column
          prop="desc"
          align="center"
          label="简介">
        </el-table-column>
        <el-table-column
          align="center"
          label="图片">
          <template slot-scope="scope" style="width: 50px">
            <img  :src="scope.row.avatarUrl" alt="" style="width: 100px;height: 110px;">
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          label="操作">
          <template slot-scope="scope">
            <span class="see-dd" @click="getOrder(scope.row.id)">编辑</span>
            <span class="see-dd" @click="getOrder(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        background
        layout="total,prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import qs from "qs"
  export default {
    name: "momney",
    data(){
      return {
        tableData2: [],
        token:"",
        url:"http://api.tianyushangyi.com",
        currentPage1:1,
        currentSize:10,
        total:0
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        const self=this;
        self.currentPage1=val;
        self.getList()
      },
      getToken(){
        const self = this;
        self.token =  localStorage.getItem('currentUser_token')
      },
      getList(){
        const self = this;
        const data = {
          pageNum:self.currentPage1,
          pageSize:self.currentSize
        }
        // self.axios.defaults.headers.post['token'] = self.token;
        axios.defaults.headers.post['token'] = localStorage.getItem('currentUser_token');
        axios({
          method:"post",
          url:self.url + "/user/docker",
          data:qs.stringify(data)
        }).then(function (res) {
          if (res.data.code == 0){
            self.tableData2 = res.data.data.rows;
            self.total = res.data.data.total;
            console.log(self.tableData2);
            self.tableData2.forEach(function (item,index) {
              item.type==2?item.type="医生":item.type="医院";
              return item
            })
          }
        })
      }
    },
    created(){
      this.getToken()
    },
    mounted(){
      this.getList()
    }
  }
</script>

<style scoped>
  .el-header{
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(131,131,131,1);
    line-height:80px;
  }
  .el-footer{
    text-align: center;
  }
  th{
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(48,48,48,1);
    line-height:26px;
  }
  .see-dd{
    font-size:20px;
    font-family:MicrosoftYaHei;
    color:rgba(1,143,215,1);
    line-height:26px;
    cursor: pointer;
  }
</style>
