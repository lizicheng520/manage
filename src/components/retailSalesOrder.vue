<template>
<div class="wrappar">
    <!-- <div class="_title">訂單查詢</div> -->
    <div class="nav">
        <div class="option">
            <span>訂單編號：</span>
            <Input type="text"  v-model="inputValue.id" style="width:70px" />
        </div>
        <div class="option">
            <span>配送廠家：</span>
            <Input type="text"  v-model="inputValue.delivery_home" style="width:90px" />
        </div>
        <div class="option">
            <span>商品名稱</span>
            <Input type="text"  v-model="inputValue.title" style="width:90px" />
            <!-- <DatePicker type="daterange" v-model="inputValue.time" placeholder="選擇時間" style="width: 160px"></DatePicker> -->
        </div>
        <div class="option">
            <span>配送編號：</span>
            <Input type="text"  v-model="inputValue.delivery_num" style="width:70px" />
        </div>
        <div class="serch" @click="search">查詢</div>
        <!-- <Button icon="md-download" type="primary" style="position:absolute;right:20px" :loading="exportLoading" @click="exportExcel">導出excel</Button> -->
    </div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"  class="post"  @on-row-click="selectChange1" @on-selection-change="clickChange">
            <template slot="peisong" slot-scope="{row,index}">
                <div>
                    <p>{{row.payment==1?'貨到付款':'門店自取'}}</p>
                    <p style="margin-left:10px">{{row.delivery_home?row.delivery_home:"-"}}</p>
                    <p style="margin-left:20px">{{row.delivery_num?row.delivery_num:"-"}}</p>
                </div>
            </template>
            <template slot="orders" slot-scope="{row,index}">
                <div>
                    <p>{{row.time}}</p>
                    <!-- <p style="margin-left:10px">{{row.status==1?'訂單正常':"訂單用戶刪除"}}</p> -->
                    <!-- <p style="margin-left:20px">-</p> -->
                    <p style="margin-left:25px">{{row.source}}</p>
                </div>
            </template>
            <template slot="goods" slot-scope="{row,index}">
                <div>
                    <p>{{row.title}}</p>
                    <p style="margin-left:10px">{{row.alcohol_id}}</p>
                </div>
            </template>
            <template slot="prices" slot-scope="{row,index}">
                <div>
                    <p>{{row.origin_price}}</p>
                    <p style="margin-left:10px">{{row.discounts_money}}</p>
                    <p style="margin-left:20px">{{row.total_price}}</p>
                </div>
            </template>
            <template slot="users" slot-scope="{row,index}">
                <div>
                    <!-- <p>-</p> -->
                    <p>{{row.sh_name}}</p>
                    <!-- <p>-</p> -->
                    <p>{{row.address}}</p>
                </div>
            </template>
            <template slot="type" slot-scope="{row}">
                <!-- <div>{{types(row.type)}}</div> -->
                <div>
                    <Select v-model="row.type" @on-change="selectChange" size="small">
                        <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                </div>
            </template>
            <template slot="action" slot-scope="{row,index}">
                <Button size="small" type="error" @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">一件備貨</div>
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁'  @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="propModel">
        <!-- <div class="_box">
            <div class="contant">
                <div class="tit">發貨信息</div>
                <div class="list">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">訂單編號:</td>
                            <td>
                                <Input v-model="editValue.id"  placeholder="點擊輸入" style="width: 160px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">配送編號:</td>
                            <td>
                                <Input v-model="editValue.delivery_num"  placeholder="點擊輸入" style="width: 160px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">配送廠家:</td>
                            <td>
                                <Input v-model="editValue.delivery_home"  placeholder="點擊輸入" style="width: 160px;" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="newAdd">確定</div>
                </div>
            </div>
        </div> -->
        <div class="tttt">正在備貨中...</div>
    </div>
</div>        
</template>
<script>
import {times} from '../until/tool.js'
import excel from '../until/excel.js'
export default {
    data(){
        return{
            columns1: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '負責門店',
                    key: 'shop_name',
                    minWidth:120
                },
                {
                    title: '訂單編號',
                    key: 'id',
                    minWidth:120
                },
                {
                    slot: 'peisong',
                    minWidth:150,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','配送方式'),
                                h('p',{style:{marginLeft:'10px'}},'配送廠家'),
                                h('p',{style:{marginLeft:'20px'}},'配送編號'),
                            ]);
                        },
                },
                {
                    slot: 'orders',
                    minWidth:150,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','下單時間'),
                                h('p',{style:{marginLeft:'25px'}},'訂單來源'),
                            ]);
                        },
                },
                {
                    slot: 'goods',
                    minWidth:180,
                    ellipsis:true,
                    tooltip:true,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','商品名稱'),
                                h('p',{style:{marginLeft:'10px'}},'商品編號')
                            ]);
                        },
                },
                {
                    title:'數量',
                    key:'num',
                    minWidth:100
                },
                {
                    slot: 'prices',
                    minWidth:130,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','商品單價'),
                                h('p',{style:{marginLeft:'10px'}},'折扣金額'),
                                h('p',{style:{marginLeft:'15px'}},'銷售金額(折扣後)')
                            ]);
                        },
                },
                {
                    slot: 'users',
                    minWidth:130,
                    ellipsis:true,
                    tooltip:true,
                    renderHeader:(h, params) => {
                            return h('div', [
                                // h('p','會員編號'),
                                h('p',{style:{marginLeft:'10px'}},'收件人'),
                                // h('p',{style:{marginLeft:'15px'}},'收件人電話'),
                                h('p',{style:{marginLeft:'20px'}},'收件人地址')
                            ]);
                        },
                },
                {
                    title:'發票類型',
                    key:'order1',
                    width:110
                },
                {
                    title:'訂單狀態',
                    slot:'type',
                    width:120
                },
                {
                    title:'訂單備註',
                    key:'order2',
                    width:110
                },
                {
                    title:'消費者備註',
                    key:'order3',
                    width:120
                }
            ],
            data1: [],
            grape_type:'',
            total:0,
            current:0,
            propModel:false,
            shopName:[], //所有門店
            inputValue:{
                id:"",
                title:'',
                delivery_num:'',
                delivery_home:""
            },
            typeList:[
                {value:2,label:'待出貨'},
                {value:9,label:'出貨中'}
            ],
            id:'',
            paymentList:[
                {value:'1',label:'貨到付款'},
                {value:'2',label:'門店自取'}
            ],
            editValue:{
                id:'',
                delivery_home:'',
                delivery_num:''
            },
            type:1,
            obj:{},
            exportLoading:false,
            sendData:[]  //發貨數據
        }
    },
    created(){
        this.getList(0)
    },
    methods:{
        exportExcel (data) {
            // var formdata = {start:0,type:2}
            // this.$http('orderInfoService','findDatas',formdata)
            // .then(res=>{
                if(!!data){
                    this.exportLoading = true
                    var title_arr = ['負責門店','訂單編號','配送方式','配送廠家','配送編號','下單時間','訂單來源','商品名稱','商品編號','數量','商品單價','折扣金額','銷售金額(折扣後)','收件人','收件人地址','發票類型','訂單狀態','訂單備註','消費者備註'];
                    var key_arr = ['shop_name','id','payments','delivery_home','delivery_num','time','source','title','alcohol_id','num','origin_price','discounts_money','total_price','sh_name','address','','typess','',''];
                    for(let i =0;i<data.length;i++){
                        data[i].typess = '出貨中'
                        if(data[i].payment==1){
                            data[i].payments = '活到付款'
                        }else{
                            data[i].payments = '門市自取'
                        }
                    }
                    const params = {
                        // title: ['一級分類', '二級分類', '三級分類'],
                        title:title_arr,
                        // key: ['category1', 'category2', 'category3'],
                        key:key_arr,
                        data:data,
                        autoWidth: true,
                        filename: '訂單確定'
                    }
                    excel.export_array_to_excel(params)
                    this.exportLoading = false
                }else{
                    this.$Message.info('表格數據不能為空！')
                }
            // })
        },
        getList(start,obj){
            var data = {}
            if(obj){
                data = obj;
            }
            data.start = start;
            data.type =2;
            data.rows = 5;
            this.$http('orderInfoService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = res.rows
                    for(let i =0;i<arr.length;i++){
                        arr[i].time =arr[i].time?this.$changeTime(arr[i].time):'-'
                        // arr[i].update_time = arr[i].update_time?this.$changeTime(arr[i].update_time):'-'
                    }
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        newAdd(){
            if(!this.editValue.delivery_home || !this.editValue.delivery_num){
                this.$Message.warning('請輸入信息');
                return;
            }
            var data = {
                delivery_num:this.editValue.delivery_num,
                delivery_home:this.editValue.delivery_home
            }
            if(this.id){
                data.id = this.id
            }
            this.$http('orderFormService','addOrUpdate',data)
            .then(res=>{
                this.propModel = false;
                if(res.result == 'success'){
                    this.$Message.success('出貨成功');
                    this.id = '';
                    this.editValue.delivery_num=''
                    this.editValue.delivery_home = ''
                    this.getList(this.current);
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        clickChange(data){
            console.log('data',data)
            this.sendData = data
        },
        openModel(){
            var that = this;
            that.propModel = true;
            var len = that.sendData.length;
            if(len==0){
                that.$Message.error('請選擇訂單！');
                return
            }
            console.log(len)
            function send(n){
                if(n<len){
                    console.log('len')
                    var data = {
                        type:9,
                        id:that.sendData[n].id
                    }
                    that.$http('orderFormService','addOrUpdate',data)
                    .then(res=>{
                        if(res.result=='success'){
                            send(n+1)
                        }else{
                            that.$Message.error('備貨失敗，請檢查！');
                        }
                    })
                }else{
                    that.exportExcel(that.sendData);
                    that.$Message.success('備貨成功!')
                    that.propModel = false;
                    that.sendData = [];
                    that.getList(0)
                }
            }
            send(0)
        },
        types(id){
            if(!id){return ''}
            var result = this.typeList.find(item=>item.value==id);
            if(result){
                return result.label
            }else if(id==0){
                return '取消(用戶信件)'
            }else{
                return ''
            }
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*5;
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.getList(this.current,this.obj)
            }
        },
        selectChange1(row){
            console.log(row)
            this.id = row.id
        },
        revise(value){ //修改狀態
            var data = {
                type:parseInt(value),
                id:this.id
            }
            this.$http('orderFormService','addOrUpdate',data)
            .then(res=>{
                if(res.result=='success'){
                    this.$Message.success('修改成功');
                    this.getList(this.current);
                    this.id = '';
                }else{
                    this.$Message.error('操作失敗');
                }
            })
        },
        selectChange(value){
            console.log(value)
            this.revise(value)
        },
        search(){
            var obj = {};
            if(this.inputValue.id){
                obj.id = this.inputValue.id;
            }
            if(this.inputValue.title){
                obj.title = this.inputValue.title
            }
            if(this.inputValue.delivery_num){
                obj.delivery_num = this.inputValue.delivery_num
            }
            if(this.inputValue.payment){
                obj.delivery_home = this.inputValue.delivery_home
            }
            var arr =Object.keys(obj)
            if(arr.length>0){
                this.obj = obj
                this.type=2
                this.getList(0,obj)
            }else{
                this.type=1
                this.obj={}
                this.getList(0)
            }
        },
        closeModel(){
            this.propModel = false;
            this.editValue.delivery_home=''
            this.editValue.delivery_num = ''
        },
    }  
}
</script>
<style scoped>
.wrapper{
    position: relative;
}
.page{
    justify-content: space-between;
}
._box{
    width: 360px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -125px 0 0 -150px;
    border-radius: 4px;
    background-color: #fff;
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
table td{
    height: 45px;
}
.option{
    margin: 0;
    margin-right: 20px;
}
.tttt{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    font-size: 20px;
}
</style>

