<template>
<div class="wrappar">
    <div class="_title">產區管理</div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1" class="post">
            <template slot="country_id" slot-scope="{row,index}">
                <div>{{countrys(row.country_id)}}</div>
            </template>
            <template slot="action" slot-scope="{row,index}">
                <Button size="small" type="primary" @click="modify(row)">修改</Button>
                <Button size="small" type="error" @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增</div>
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁'  @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">{{t_text}}</div>
                <div class="list">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">產區名稱:</td>
                            <td>
                                <Input v-model="inputValue.region_name"  placeholder="點擊輸入" style="width: 160px;" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">國家:</td>
                            <td>
                                <!-- <Input v-model="inputValue.country_id"  placeholder="點擊輸入" style="width: 160px" /> -->
                                <Select v-model="inputValue.country_id" style="width:160px" filterable>
                                    <Option v-for="(item,index) in countryList" :value="item.value" :key="index">{{ item.label }}</Option>
                                </Select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="newAdd">確定</div>
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
            columns1: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '產區名稱',
                    key: 'region_name',
                    minWidth:180
                },
                {
                    title: '國家',
                    slot: 'country_id',
                    minWidth:110
                },
                {
                    title:'操作',
                    slot:'action',
                    width:140
                }
            ],
            data1: [],
            total:0,
            current:0,
            propModel:false,
            inputValue:{
                country_id:'',
                region_name:''
            },
            t_text:'新增',
            countryList:[]
        }
    },
    created(){
        this.getCountry()
        this.getList(0)
    },
    methods:{
        getList(start){
            var data = {
                start:start,
                rows:10
            }
            this.$http('moRegionService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = res.rows
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        getCountry(){
            var data = {
                start:0
            }
            this.$http('moCountryService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = [];
                    for(let i=0;i<res.rows.length;i++){
                        var obj={};
                        obj.value = res.rows[i].id;
                        obj.label = res.rows[i].country_name;
                        arr.push(obj)
                    }
                    this.countryList = arr;
                }
            })
        },
        countrys(id){
            if(!id && id!=0){
                return ''
            }
            let result = this.countryList.find(item=>item.value==id)
            if(result){
                return result.label
            }else{
                return ''
            }
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('moRegionService','deleteData',data)
                    .then(res=>{
                        if(res.result == 'success'){
                            this.$Message.success('刪除成功');
                            this.getList(this.current);
                        }else{
                            this.$Message.error('操作失敗');
                        }
                    })
                },
                onCancel: () => {
                }
            })  
        },
        selectChange1(selection){
            console.log(selection)
        },
        modify(row){//修改
            this.inputValue.region_name=row.region_name
            this.inputValue.country_id = row.country_id
            this.id = row.id;
            this.t_text = '修改'
            this.propModel = true;
        },
        newAdd(){
            if(!this.inputValue.region_name || !this.inputValue.country_id){
                this.$Message.warning('請輸入信息');
                return;
            }
            var data = {
                region_name:this.inputValue.region_name,
                country_id:parseInt(this.inputValue.country_id)
            }
            if(this.id){
                data.id = this.id
            }
            this.$http('moRegionService','addOrUpdate',data)
            .then(res=>{
                this.propModel = false;
                if(res.result == 'success'){
                    this.$Message.success('添加成功');
                    this.id = '';
                    this.inputValue.region_name=''
                    this.inputValue.country_id = ''
                    this.getList(this.current);
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
        },
        openModel(){
            this.propModel = true;
            this.t_text = '新增'
        },
        closeModel(){
            this.propModel = false;
            this.inputValue.region_name=''
            this.inputValue.country_id = ''
        },
    }  
}
</script>
<style scoped>
@import '../../static/title.css';
.wrapper{
    position: relative;
}
.page{
    justify-content: flex-end;
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
</style>
