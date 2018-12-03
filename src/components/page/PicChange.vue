<template>
  <div>
    <el-container class="catalogue">
      <el-row>
        <h3>首页动图管理</h3>
        <el-col :span="4" v-for="(o, index) in mainHomePicList" :key="index" :offset="index > 0 ? .8 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="o.img" class="image">
            <div style="padding: 8px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="delete1(o.id,1)">X</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-upload
          action="http://api.tianyushangyi.com/file/upload"
          list-type="picture-card"
          :headers="headers"
          :data="upData"
          :on-preview="handlePictureCardPreview"
          :on-success="(response, file, fileList) => { handleUrlSuccess(response, file, fileList, 1)}"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button type="primary" class="upload1" @click="upload1(1)">上传</el-button>
      </el-row>

    </el-container>
    <el-container class="catalogue">
      <el-row>
        <h3>产品与服务页动图</h3>
        <el-col :span="4" v-for="(o, index) in productPicList" :key="index" :offset="index > 0 ? .8 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="o.img" class="image">
            <div style="padding: 8px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="delete1(o.id,2)">X</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-upload
          action="http://api.tianyushangyi.com/file/upload"
          list-type="picture-card"
          :headers="headers"
          :data="upData"
          :on-preview="handlePictureCardPreview"
          :on-success="(response, file, fileList) => { handleUrlSuccess(response, file, fileList, 2)}"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button type="primary" class="upload1" @click="upload1(2)">上传</el-button>
      </el-row>
    </el-container>
    <el-container class="catalogue">
      <el-row>
        <h3>医生与医院动图管理</h3>
        <el-col :span="4" v-for="(o, index) in doctorPicList" :key="index" :offset="index > 0 ? .8 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="o.img" class="image">
            <div style="padding: 8px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="delete1(o.id,3)">X</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-upload
          action="http://api.tianyushangyi.com/file/upload"
          list-type="picture-card"
          :headers="headers"
          :data="upData"
          :on-preview="handlePictureCardPreview"
          :on-success="(response, file, fileList) => { handleUrlSuccess(response, file, fileList, 3)}"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button type="primary" class="upload1" @click="upload1(3)">上传</el-button>
      </el-row>
    </el-container>
    <!--<el-container class="catalogue">
      <el-row>
        <h3>联系我们动图管理</h3>
        <el-col :span="4" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? .8 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../assets/img/login.jpg" class="image">
            <div style="padding: 8px;">
              <div class="bottom clearfix">
                <el-button type="text" class="button">X</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-upload
          action="http://api.tianyushangyi.com/file/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-button type="primary" class="upload1" @click="upload1(3)">上传</el-button>
      </el-row>
    </el-container>-->
  </div>

</template>

<script>
  import axios from 'axios'
  import qs from "qs"
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        mainHomePicList: [],
        productPicList:[],
        doctorPicList:[],
        connectPicList:[],
        baseURl: 'http://api.tianyushangyi.com',
        headers:{
          token:localStorage.getItem('currentUser_token')
        },
        upData:{
          type:3
        },
      }
    },
    name: "PicChange",
    methods: {
      handleUrlSuccess(response, file, fileList,type){
        console.log(response);
        const self = this;
        if (response.code == 0){
          if(type==1){
            console.log(1111);
            self.mainHomePicList.push({img:response.data.url})
          }else if(type==2){
            self.productPicList.push({img:response.data.url})
          }else if(type==3){
            self.doctorPicList.push({img:response.data.url})
          }
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getMainHomePic(type) {
        var self = this;
        var token = localStorage.getItem('currentUser_token'),
          data = {
            type:type,
            pageNum:1,
            pageSize:10
          };
        axios.defaults.headers.get['token'] = token;
        axios({
          method: 'post',
          url: self.baseURl + '/resource/list',
          data:qs.stringify(data),
        }).then(function (res) {
          if(res.data.code==0){
            if(type==1){
              self.mainHomePicList=res.data.data.rows
            }else if(type==2){
              self.productPicList=res.data.data.rows;
            }else if(type==3){
              self.doctorPicList=res.data.data.rows;
            }
          }else{
            self.$message({
              showClose: true,
              message: '获取失败',
              type: 'error'
            });
          }
          console.log(res);
        })
      },
      upload1(type){
        const self=this;
        console.log(self.mainHomePicList);
        var token=localStorage.getItem('currentUser_token');
        var img="";
        if(type==1){
          img=self.mainHomePicList[self.mainHomePicList.length-1].img;
        }else if(type==2){
          img=self.productPicList[self.productPicList.length-1].img;
        }else if(type==3){
          img=self.doctorPicList[self.doctorPicList.length-1].img;
        }
        var data={
          type:type ,//上传类型
          img:img, //上传图片
        };
        axios.defaults.headers.post['token'] =token;
        axios({
          method:'post',
          url:self.baseURl+'/resource/add',
          data:qs.stringify(data)
        }).then(function (res) {
          if(res.data.code==0){
            self.$message({
              showClose: true,
              message: '上传成功',
              type: 'success'
            });
            self.getMainHomePic(type)
          }else{
            self.$message({
              showClose: true,
              message: '上传失败',
              type: 'error'
            });
          }
        })
      },
      delete1(id,type){
        const self=this;
        console.log(self.mainHomePicList);
        var token=localStorage.getItem('currentUser_token');
        var data={
          id:id
        };
        axios.defaults.headers.post['token'] =token;
        axios({
          method:'post',
          url:self.baseURl+'/resource/delete',
          data:qs.stringify(data)
        }).then(function (res) {
         /* self.getMainHomePic(1);
          self.getMainHomePic(2);
          self.getMainHomePic(3);*/
          if(type==1){
            self.getMainHomePic(1)
          }else if(type==2){
            self.getMainHomePic(2)
          }else if(type==3){
            self.getMainHomePic(3)
          }
        })
      }
    },
    mounted() {
      for (var i = 0; i < 3; i++) {
        this.getMainHomePic(i+1);
      }
    },
updated(){
  console.log(this.mainHomePicList,this.productPicList,this.doctorPicList);
}
  }

</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .el-col {
    margin: 0 10px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  h3 {
    padding: 20px 10px;
  }
  .upload1{
    float: right;
    margin: 10px;
  }
</style>
