<template>
<div class="wrappar">
    <div class="nav">
        <!-- <div class="option">
            <span>會員編號：</span>
            <Input type="text" v-model="inputValue.userno" style="width:160px"/>
        </div> -->
        <div class="option">
            <span>開始時間：</span>
            <!-- <Input type="text" name="phone" style="width:160px"/> -->
            <DatePicker type="date" v-model="inputValue.startdate" placeholder="選擇時間" style="width: 160px"></DatePicker>
        </div>
        <div class="option">
            <span>結束時間：</span>
            <!-- <Input type="text" name="time" style="width:160px"/> -->
            <DatePicker type="date" v-model="inputValue.enddate" placeholder="選擇時間" style="width: 160px"></DatePicker>
        </div>
        <div class="serch" @click="serchData(0)">查詢</div>
    </div>
    <div class="activity">
        <Table border  :columns="columns1" :data="data1"  class="post" :loading="loading"></Table>
    </div>
    <div class="page">
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div> 
</div>   
</template>
<script>
import {times} from '../until/tool.js'
export default {
    data(){
        return{
            columns1: [
                {
                    title: '時間',
                    key: 'datestr',
                    minWidth:160
                },
                {
                    title: '創建人數',
                    key: 'createnum',
                    minWidth:120
                },
                {
                    title: '次日留存',
                    key: 'onedaynum',
                    minWidth:120
                },
                {
                    title: '三日留存 ',
                    key: 'threedayum',
                    minWidth:120
                },
                {
                    title: '四日留存 ',
                    key: 'fourdayum',
                    minWidth:120
                },
                {
                    title: '五日留存 ',
                    key: 'fivedayum',
                    minWidth:120
                },
                {
                    title: '七日留存',
                    key: 'sevendayum',
                    minWidth:120
                }
            ],
            data1: [],
            total:0,
            current:0,
            type:1,
            loading:false,
            inputValue:{
                startdate:'',
                enddate:''
            }
        }
    },
    created(){
        this.getList(0);
        this.type = 1
    },
    methods:{
        getList(start){
            var data = {
               start:start,
               rows:10 
            }
            this.loading = true;
            this.$http('statsDataServiceImpl','findKeepUserDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.serchData(this.current);
            }
        },
        serchData(start){
            if(!this.inputValue.startdate){
                this.$Message.error('開始時間不能為空');
                return;
            }
            if(!this.inputValue.enddate){
                this.$Message.error('結束時間不能為空');
                return;
            }
            var data = {
                startdate:times(this.inputValue.startdate),
                enddate:times(this.inputValue.enddate),
                start:start,
                rows:10 
            };
            this.loading = true;
            this.$http('statsDataServiceImpl','findKeepUserDatas',data)
            .then(res=>{
                this.loading = false;
                this.type = 2
                console.log(res)
                if(res.rows.length>0){
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        }
    }
}
</script>
<style scoped>


</style>
