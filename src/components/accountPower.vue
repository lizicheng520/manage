<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>角色名：</span>
            <Input type="text" v-model="inputValue" style="width:160px"/>
        </div>
        <div class="serch" >查詢</div>
    </div>
    <div class="activity">
        <Table border  :columns="columns1" :data="data1"  class="post">
            <template slot="r_name" slot-scope="{row,index}">
                <Input type="text" v-model="editValue.r_name" v-if="editIndex === index" />
                <span v-else>{{ row.r_name }}</span>
            </template>
            <template slot="status" slot-scope="{row,index}">
                <Select v-model="editValue.status" v-if="editIndex === index">
                    <Option v-for="(item,index) in statusList" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
                <span v-else>{{ row.status }}</span>
            </template>
            <template slot="menus" slot-scope="{row,index}">
                <Button size="small" type="primary" @click="openMenus(row.id)">展開菜單</Button>
            </template>
            <template slot="action" slot-scope="{row,index}">
                <div v-if="editIndex === index">
                    <Button size='small' type="primary" @click="saveHandle(row,row.id)" style="margin-right:5px">保存</Button>
                    <Button size='small' type="error" @click="editIndex = -1">取消</Button>
                </div>
                <div v-else>
                    <Button size='small' type="primary" @click="editHandle(row,index)" style="margin-right:5px">編輯</Button>
                    <Button size='small' type="error" @click="remove(row)">刪除</Button>
                </div>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增角色</div>
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁'/>
    </div>
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">菜單權限管理</div>
                <div class="list">
                    <Tree :data="treeData" show-checkbox multiple @on-check-change="getmenusData" ref="trees"></Tree>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="setMenuHandle">確定</div>
                </div>
            </div>
        </div>
    </div>
    <div class="prop_model" v-show="propModel1">
        <div class="_box _bbox">
            <div class="contant">
                <div class="tit">新增角色</div>
                <div class="list _list">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">角色名:</td>
                            <td>
                                <Input v-model="addValue.r_name"  placeholder="點擊輸入" style="width: 160px;margin-left:20px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right;">狀態:</td>
                            <td>
                                <Select v-model="addValue.status" style="width: 160px;margin-left:20px">
                                    <Option v-for="(item,index) in statusList" :value="item.value" :key="index"  >{{ item.label }}</Option>
                                </Select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="setJuese">確定</div>
                </div>
            </div>
        </div>
    </div>
</div>   
</template>
<script>
export default {
    data(){
        return{
            inputValue:'',
            addValue:{
               r_name:"",
               status:"",
               create_user:''
            },
            propModel:false,
            propModel1:false,
            total:0,
            editIndex:-1,
            editValue:{
                r_name:'',
                status:0
            },
            columns1: [
                {
                    type:'selection',
                    align:'center',
                    width:60
                },
                {
                    title: '角色名',
                    slot: 'r_name',
                    minWidth:145
                },
                {
                    title: '創建人',
                    key: 'create_user',
                    minWidth:145
                },
                {
                    title: '創建時間',
                    key: 'create_time',
                    minWidth:160
                },
                {
                    title:'菜單管理',
                    slot:'menus',
                    minWidth:160
                },
                {
                    title: '狀態',
                    slot: 'status',
                    minWidth:105
                },
                {
                    title:'操作',
                    slot:'action',
                    minWidth:135
                }
            ],
            data1: [],
            statusList:[
                {
                    label:'啟用',
                    value:1,
                },
                {
                    label:'不啟用',
                    value:0
                }
            ],
            menuname:[],
            treeData:[],
            newtreeData:[],
            currentId:0,
            options:[],
            userInfo:{}
        }
    },
    created(){
        this.getList();
        this.getMenuList();
        var user = JSON.parse(sessionStorage.getItem('user_info'));
        if(user){
            this.userInfo = user.dbUser;
        }
    },
    methods:{
        getList(){
            var data = {
                start:0,
                rows:40
            }
            this.$http('zAdminRoleService','findDatas',data)
            .then(res=>{
                if(res.rows){
                    for(let i=0;i<res.rows.length;i++){
                        res.rows[i].status = res.rows[i].status=='1'?'啟用':'未啟用'
                        res.rows[i].create_time = this.$changeTime(res.rows[i].create_time);
                        var newArr = [];
                        if(res.rows[i].menuname){
                            newArr = res.rows[i].menuname.split(',');
                        }
                        var menus = [];
                        for(let j=0;j<newArr.length;j++){
                            var arr= newArr[j].split('#');
                            var obj ={};
                            obj.id = arr[0];
                            obj.name =arr[1];
                            menus.push(obj);
                        }
                        res.rows[i].menuList =menus;
                        
                    }
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        remove (row) { //刪除
            var data = {
                id:row.id
            }
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                    var data = {
                        id:row.id
                    }
                    this.$http('zAdminRoleService','deleteData',data)
                    .then(res=>{
                        if(res.result == 'success'){
                            this.$Message.success('刪除成功');
                            this.getList();
                        }else{
                            this.$Message.error('操作失敗');
                        }
                    })
                },
                onCancel: () => {
                }
            })
        },
        getTreess (tree = []) { //選擇框樹形結構
            let arr = [];
            if (tree.length !== 0) {
            tree.forEach(item => {
                let obj = {};
                obj.label = item.m_name;
                obj.id = item.id;
                if(item.children) {
                    obj.children = this.getTreess(item.children);
                }
                arr.push(obj);
            });
        }
        return arr
      },
        getMenuList(){
            var data={
                start:0,
                rows:60
            }
            this.$http('zAdminMenuService','findDatas',data)
            .then(res=>{
                if(res.rows){
                    var data = res.rows;
                    var arr1 = [];
                    for(let i =0;i<data.length;i++){
                        if(!data[i].pid){
                            data[i].create_time = this.$changeTime(data[i].create_time);
                            data[i].status = data[i].status?'啟用':'未啟用';
                            arr1.push(data[i]);
                        }
                    }
                    for(let k =0;k<arr1.length;k++){
                        var arr= [];
                        for(let j =0;j<data.length;j++){
                            if(data[j].pid && arr1[k].id == data[j].pid){
                                data[j].create_time = this.$changeTime(data[j].create_time);
                                data[j].status = data[j].status?'啟用':'未啟用';
                                arr.push(data[j]);
                            }
                        }
                        arr1[k].children = arr;
                    }
                    this.options = this.getTreess(arr1);
                    console.log(this.options)
                    sessionStorage.setItem('MENULIST',JSON.stringify(this.options));
                }
            })
        },
        openMenus(id){  //展開菜單
            console.log(id)
            this.currentId = id;
            var menus = JSON.parse(sessionStorage.getItem('MENULIST'));
            console.log(menus);
            if(!menus){
                this.getMenuList();
                return
            }
            var arr = [];
            this.propModel = true;
            for(let i =0;i<this.data1.length;i++){
                if(this.data1[i].id == id){
                    arr = this.data1[i].menuList;
                }
            }
            console.log(arr)
            this.treeData = this.getTree(menus,arr)

            console.log(this.treeData);
        },
        getTree(tree = [],arr=[]) { //選擇框樹形結構
            if (tree.length !== 0) {
                tree.forEach(item => {
                    item.expand = true;
                    item.title = item.label;
                    // arr.forEach(it =>{
                    //     if(item.id ==it.id){
                    //         item.checked = true;
                    //     }
                    // })
                    if(item.children){
                      return  this.getTreeChild(item.children,arr);
                    }
                });
            }
            return tree
        },
        getTreeChild(tree = [],arr=[]){
            if (tree.length !== 0) {
                tree.forEach(item => {
                    item.expand = true;
                    item.title = item.label;
                    arr.forEach(it =>{
                        if(item.id ==it.id){
                            item.checked = true;
                        }
                    })
                    // if(item.children){
                    //     this.getTree(item.children,arr);
                    // }
                });
            }
            return tree
        },
        editHandle(row,index){ //編輯列表
            this.editValue={
                r_name:row.r_name,
                status:row.status == '啟用'?1:0
            }
            this.editIndex = index;
        },
        saveHandle(row,id){ //保存修改信息
            var data = {};
            var newrow = row;
            newrow.status = newrow.status == '啟用'?1:0
            this.editIndex = -1;
            for(let key in this.editValue){  //參數沒改變的就不傳接口
                if(this.editValue[key] != newrow[key]){
                    data[key] = this.editValue[key];
                }
            }
            data.id = id;
            this.$http('zAdminRoleService','addOrUpdate',data)
            .then(res=>{
                if(res.result == 'success'){
                    this.$Message.success('修改成功');
                    this.getList();
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        openModel(){
            this.propModel1 = true;
        },
        closeModel(){
            this.propModel1 = false;
            this.propModel = false;
        },
        setMenuHandle(){ //保存修改
            console.log(this.newtreeData)
            // var newtreeData = this.$refs.trees.getCheckedAndIndeterminateNodes(); //獲取選擇的菜單和半選菜單
            var newtreeData = this.newtreeData
            var str = [];
            for(let i = 0;i<newtreeData.length;i++){
                str.push(newtreeData[i].id);
            }
            var data = {
                role_id:this.currentId,
                menuIds:str.join(',')
            }
            this.$http('zAdminRoleService','addRoleMenu',data)
            .then(res=>{
                this.propModel = false;
                if(res.result == 'success'){
                    this.$Message.success('修改成功');
                    this.getList();
                }else{
                    this.$Message.error('操作失敗');
                }
            })
        },
        getmenusData(data){ //在tree形樹上點擊確定
            console.log(data)
            this.newtreeData = data
        },
        setJuese(){
            var data = this.addValue;
            data.create_user = this.userInfo.id;
            this.$http('zAdminRoleService','addOrUpdate',data)
            .then(res=>{
                this.propModel1 = false;
                if(res.result == 'success'){
                    this.$Message.success('添加成功');
                    this.getList();
                }else{
                    this.$Message.error('操作失敗');
                }
            })
        }
    }
}
</script>
<style scoped>
.page{
    justify-content: space-between;
}
._box{
    width: 460px;
    height: 650px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -325px 0 0 -230px;
    border-radius: 4px;
    background-color: #fff;
}
._bbox{
    width: 400px;
    height: 350px;
    margin: -125px 0 0 -200px;
}
.contant{
    width: 90%;
    margin: 0 auto;
}

.btns{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
    position: absolute;
    bottom: 20px;
}
.cancel,
.sure{
    width: 136px;
    height:40px;
    line-height: 40px; 
}
.sure{
    margin-left: 20px;
}
.tit{
    width: 100px;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
}
.list{
    width: 400px;
    height: 450px;
    margin: 0 auto;
    overflow-y: scroll;
}
._list{
    width: 300px;
    height: 200px;
    margin: 0 auto;
    overflow: hidden;
}
table td{
    height: 45px;
}
</style>
