<template>
  <div class="index">
	  
	  <!-- 头部-->
	  <div slot="header" class="card_header">
	    <span>配置详情</span>
	    <div style="float: right">
	      <el-button style="padding: 8px 21px;margin-left: 10px" type="primary" @click="addSettingBtn('add')">添加</el-button>
	    </div>
	  </div>
	  
	 
		<!-- 表格显示 -->
      <el-table 
        :data="dataList"
        style="width: 100%"
		:row-key="getRowKeys"
		:expand-row-keys="expands"
		 >
		<!-- 展开行功能 -->
		<el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item label="检测名称" v-for="item in props.row.children" :key="item.ID">
		            <div style="display: flex;align-items: center;">
						<p style="width: 100px;">{{ item.CheckName }}</p>
						<p style="width: 100px;">{{ item.CheckValue }}</p>
						<el-button
						  size="small"
						  type="danger"
						  @click="delData(item,props.row)">删除</el-button>
					</div>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		<!-- 项目名称 project-->
        <el-table-column
          label="项目名称"
		  prop="Project"
          width="400">
        </el-table-column>
		<!-- 交换机名 -->
        <el-table-column
          label="交换机名"
		  prop="ExchangeName"
          width="400">
        </el-table-column>
		<!-- 转发队列名称 -->
		<el-table-column
		  label="转发队列名称"
		  prop="RoutingKey"
		  width="400">
		</el-table-column>
		<!-- 其他说明性文字 -->
		<el-table-column
		  label="其他说明性文字"
		  prop="Marked"
		  width="400">
		</el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
			<el-button
			size="small"
			type="primary"
			@click="handleEdit('edit',scope.row)">新增</el-button>
            <el-button
              size="small"
              type="danger"
              @click="saveDelData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
	  
	  <!-- 弹框展现-->
	  <el-dialog
	        :title="settingType === 'add' ?'新增配置':'新增详情配置'"
	        :close-on-click-modal="false"
	        :close-on-press-escape="false"
	        :show-close="false"
	        :visible.sync="settingDialog"
	        width="500px">
	        <el-form label-width="100px">
	          <el-form-item label="项目名称">
	            <el-input v-model="settingForm.project" clearable :disabled="settingType === 'edit'" placeholder="项目名称"></el-input>
	          </el-form-item>
			  <el-form-item label="检测名称" v-if="settingType === 'edit'">
			    <el-input v-model="settingForm.checkName" clearable placeholder="检测名称"></el-input>
			  </el-form-item>
			  <el-form-item label="检测值" v-if="settingType === 'edit'">
			    <el-input v-model="settingForm.checkValue" clearable placeholder="检测值"></el-input>
			  </el-form-item>
	          <el-form-item label="交换机名" v-if="settingType === 'add'">
	            <el-input v-model="settingForm.exchangeName" clearable placeholder="交换机名"></el-input>
	          </el-form-item>
			  <el-form-item label="转发队列名称" v-if="settingType === 'add'">
			    <el-input v-model="settingForm.routingKey" clearable placeholder="转发队列名称"></el-input>
			  </el-form-item>
	          <el-form-item label="说明性文字" v-if="settingType === 'add'">
	            <el-input v-model="settingForm.marked" clearable placeholder="说明性文字"></el-input>
	          </el-form-item>
	        </el-form>
			<!-- 确定和取消的按钮	 -->
	        <div slot="footer" class="dialog-footer">
	          <el-button @click="settingDialog = false">取 消</el-button>
	          <el-button type="primary" @click="saveSettingData">确 定</el-button>
	        </div>
	      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'index',

  data(){
    return {
		expands: [], // 展开列表数组
		expandsID: '', // 展开列表ID
		
		settingData: {},  // 配置详情数据
		query:{},
		settingDialog: false, // 配置弹窗
		settingType: '', // 配置弹窗类型
		
		settingForm: {
		  message_way: []
		}, // 配置对象数据
		
		editForm:{
			message:[]
		},//编辑项目
		
		dataList: [],  /* 表格数组*/
		
		detailsData: [],  // 详情列表
		
		userName:'', //用户名

    }
  },
  
  methods: {
	  
	  // 展开列表
	  getRowKeys(row){
	    return row.id
	  },
	  
	  // 获取展开列表
	  getExpands(id){
		  console.log('展开ID',id)
		  this.expands = []
		  if(id){
			 this.expands.push(id)
		  }
		  console.log(this.expands)
	  },
	  
	  /* 显示表格数据 */
	  getData(){
	  	/* 请求接口 */
	  	this.$axios.get('/testCenter/project/query')
	  	  .then(res =>{
	  	    if(res.data.code === 0){
	  		  this.dataList = res.data.data
			  this.dataList.forEach((item, index) =>{
				  console.log(item)
				  item['id'] = item.Project +'_' +index
			  })
			  this.getDetailsData()
	  	    }else{
	  			this.$message.error(res.data.message)
	  		}
	  	  })
	  	  .catch(res =>{
	  			
	  	  })
	  	
	  },
	  
	  // 获取项目详细信息
	  getDetailsData(){
		  
		  this.$axios.get('/testCenter/web')
		    .then(res =>{
		      if(res.data.code === 0){
		  	  this.detailsData = res.data.data
				 this.dataList.forEach(oitem =>{
					 oitem['children'] = []
			  this.detailsData.forEach(item =>{
					  if(item.Project === oitem.Project){
						  oitem.children.push(item)
					  }
				  })
			  })
			  console.log('详细信息',this.dataList)
			  this.getExpands(this.expandsID)
		      }else{
		  		this.$message.error(res.data.message)
		  	}
		    })
	  },
	  

	
	/* 增加按钮 */
	addSettingBtn(type,val){
		  
		  console.log(type, val);
		  this.settingType = type
		  this.settingDialog = true
		  if(type !== 'add'){
		    val.message_way = val.message_way instanceof Array?val.message_way:val.message_way.split(",")
		    this.settingForm = JSON.parse(JSON.stringify(val))
		  }else {
		    this.settingForm = {
		      message_way: []
		    }
		  }
		  
	 
	},
	
	/* 编辑每条数据内的元素 */
	handleEdit(type,val){
		
		console.log(type,val);
		
		this.expandsID = val.id
		
		this.settingType = type
		this.settingDialog = true
		if(type !== 'edit'){
		  val.message_way = val.message_way instanceof Array?val.message_way:val.message_way.split(",")
		  this.settingForm = JSON.parse(JSON.stringify(val))
		}else {
		  this.settingForm.project = val.Project
		}
		
		
	},
	
	/* 删除按钮 */
	saveDelData(val){
		console.log(val)
	 this.$confirm('是否删除该条数据?', '提示', {
	           confirmButtonText: '确定',
	           cancelButtonText: '取消',
	           type: 'warning'
	         }).then(() => {
			
	           this.$axios.get('/testCenter/project/delete?project='+val.Project) /* 传参 已知参数*/
	             .then(res =>{
	               if(res.data.code === 0){
	           	  this.$message.success(res.data.message)
	           	 this.settingDialog = false	/* 弹框 */
	           	 this.getData()
	               }
	             })
	         })
		
		  
	},
	
	/* 删除某一行的数据 */
	delData(val,even){
		console.log(val,even);
		this.expandsID = even.id
		even['status'] = true
		console.log(this.dataList)
		let data ={
			project: val.Project, //项目名称
			checkValue: val.CheckValue, //删除值
		}
		console.log(123,data);
		this.$axios.delete('/testCenter/web',{params: data}) 
		.then(res =>{
		  if(res.data.code === 0){
		  this.$message.success(res.data.message)
		  this.settingForm = {}
		  this.settingDialog = false
		  this.getData()
		  
		  }
		  })
		  
	
		
	},
	
	
	/* 确定按钮 */
	saveSettingData(){
		if(this.settingType === 'add'){
			this.$axios.post('/testCenter/project/add',this.settingForm) /* 传参 未知数据*/
			  .then(res =>{
			    if(res.data.code === 0){
				  this.$message.success(res.data.message)
					  this.settingDialog = false	/* 弹框 */
					  this.getData()	/* 显示数据 */
			    }
			  })
			  .catch(res =>{
					
			  })
		}else if('edit'){
			let data ={
				project: this.settingForm.project,
				checkName: this.settingForm.checkName,
				checkValue: this.settingForm.checkValue
			}
			console.log(data)
			this.$axios.post('/testCenter/web',data) /* 传参 已知参数*/
			  .then(res =>{
			    if(res.data.code === 0){
				  this.$message.success(res.data.message)
				 this.settingDialog = false	/* 弹框 */
				this.settingForm = {}
				this.getData()
			    }
			  })
		}
	  
	},
	
  },
  created(){
	  this.userName = JSON.parse(localStorage.getItem('login')).username
	  console.log('111')
	  this.getData()
  }
}
</script>

<style scoped lang="less">
	
	.demo-table-expand {
	    font-size: 0;
	  }
	  /deep/.demo-table-expand label {
	    width: 100px;
	    color: #99a9bf;
	  }
	  /deep/.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 100%;
	  }

</style>
