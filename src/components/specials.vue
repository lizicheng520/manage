<template>
<div class="coupon">
    <div class="_title">特價商品</div>
    <div class="content">
        <Table border  :columns="columns1" :data="data1" :loading="loading">
            <template slot="special_type" slot-scope="{row}">
                <div>{{row.special_type==1?'折扣值':'優惠後'}}</div>
            </template>
            <template slot="action" slot-scope="{row,index}">
                <Button size="small" type="primary" @click="edit(row)">編輯</Button>
                <Button size="small" type="error" @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增活動</div>
            <!-- <div class="b_delete" >批量刪除</div> -->
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">特價商品活動</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">活動名稱:</td>
                            <td>
                                <Input v-model="inputValue.special" type="text" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">商品ID（用#隔開）:</td>
                            <td>
                                <Input v-model="inputValue.goods_id" type="text" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">折扣券類型:</td>
                            <td>
                                <Select v-model="inputValue.special_type" style="width:300px">
                                    <Option v-for="item in discountType" :value="item.value" :key="item.value" :disabled='item.disabled'>{{ item.label }}</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">抵扣%數:</td>
                            <td>
                                <!-- <Input v-model="inputValue.discount_value" type="number" placeholder="點擊輸入" style="width: 300px" /> -->
                                <InputNumber
                                    style="width: 300px"
                                    :max="100"
                                    v-model="inputValue.special_num"
                                    :formatter="value => `${value}%`"
                                    :parser="value => value.replace('%', '')">
                                </InputNumber>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">使用時間:</td>
                            <td>
                                <DatePicker v-model="inputValue.special_start" type="date" placement="bottom-end" placeholder="選擇日期" style="width: 300px"></DatePicker>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">結束時間:</td>
                            <td>
                                <DatePicker v-model="inputValue.special_end" type="date" placement="bottom-end" placeholder="選擇日期" style="width: 300px"></DatePicker>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="sureBtn">確定</div>
                </div>
            </div>
        </div>
    </div>
</div>    
</template>
<script>
export default {
    name:'coupon',
    data(){
        return{
            columns1: [
                {
                    title: '活動名稱',
                    key: 'special',
                    minWidth:140
                },
                {
                    title: '開始時間',
                    minWidth:160,
                    key: 'special_start'
                },
                {
                    title: '結束時間',
                    minWidth:160,
                    key: 'special_end'
                },
                {
                    title: '折扣類型',
                    minWidth:120,
                    slot: 'special_type'
                },
                {
                    title: '優惠值(分)',
                    key: 'special_num',
                    minWidth:110
                },
                {
                    title: '商品編號',
                    key: 'goods_id',
                    minWidth:140
                },
                {
                    title:'操作',
                    slot:'action',
                    width:140
                }
            ],
            data1: [],
            loading:false,
            current:0,
            total:0,
            propModel:false,
            inputValue:{
                special:'',
                special_end:"",
                special_type:"",
                special_num:0,
                goods_id:'',
                special_start:''
            },
            discountType:[
                {
                    value:1,
                    label:'折扣券'
                },
                {
                    value:2,
                    label:'優惠價',
                    disabled:true
                }
            ],
            id:''
        }
    },
    created(){
        this.getList(0);
    },
    methods:{
        getList(start){
            var data = {
                start:start,
                rows:10
            }
            this.loading = true;
            this.$http('alcoholSpecialService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    var arr = res.rows;
                    for(let i =0;i<arr.length;i++){
                        arr[i].special_end =arr[i].special_end?this.$changeTime(arr[i].special_end):"";
                        arr[i].special_start = arr[i].special_start?this.$changeTime(arr[i].special_start):'';
                    }
                    this.total = res.total;
                    this.data1 = arr;
                }
            })
            .catch(err=>{
                this.loading = false;
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
        },
        openModel(){
            this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
            this.inputValue={
                special:'',
                special_end:"",
                special_type:"",
                special_num:0,
                goods_id:'',
                special_start:''
            }
            this.id=''
        },
        edit(row){ //編輯
            this.inputValue={
                special:row.special,
                special_end:row.special_end,
                special_type:row.special_type,
                special_num:row.special_num,
                goods_id:row.goods_id,
                special_start:row.special_start
            }
            this.propModel = true
            this.id = row.id;
        },
        sureBtn(){ //增加
            console.log(this.inputValue)
            var value = this.inputValue;
            value.special_start = this.$changeTime(value.special_start);
            value.special_end = this.$changeTime(value.special_end);
            if(this.id){
                value.id = this.id
            }
            var data = value;
            this.$http('alcoholSpecialService','addOrUpdate',data)
            .then(res=>{
                this.propModel = false;
                if(res.result == 'success'){
                    if(this.id){
                        this.$Message.success('修改成功');
                    }else{
                        this.$Message.success('新增成功');
                    }
                    this.product(res.data)
                    this.getList(this.current);
                    this.id = ''
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        product(data){  //關聯產品表
            if(!data.goods_id){return}
            var that = this;
            var product_ids = data.goods_id.split('#');
            var len = product_ids.length;
            function https(n){
                if(n < len){
                    var datas = {
                        id:parseInt(product_ids[n]),
                        special:data.special,
                        special_id:data.id,
                        special_num:data.special_num,
                        special_start:data.special_start,
                        special_end:data.special_end,
                        special_type:data.special_type
                    }
                    that.$http('moWineService','addOrUpdate',datas)
                    .then(res=>{
                        if(res.result == 'success'){
                            https(n+1)
                        }else{
                            that.$Message.error(res.message);
                        }
                    })
                }
            }
            https(0)
            
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('alcoholSpecialService','deleteData',data)
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
    }
}
</script>
<style scoped>
@import '../../static/title.css';
.page{
    justify-content: space-between;
}
.tit{
    width: 430px;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
}
._box{
    width: 600px;
    height: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -240px 0 0 -300px;
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
table tr td{
    height: 40px;
    text-align: center;
}
</style>
