<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>商品名稱：</span>
            <Input type="text"  v-model="inputValue.product_name" style="width:160px" />
        </div>
        <div class="option">
            <span>商品類型：</span>
            <Input type="text"  v-model="inputValue.product_type" style="width:160px" />
        </div>
        <div class="option">
            <span>用戶名稱：</span>
            <Input type="text"  v-model="inputValue.user" style="width:160px" />
        </div>
        <div class="serch" @click="search">查詢</div>
    </div>
    <div class="car">
        <Table border  :columns="columns1" :data="data1"  class="post" :loading="loading"></Table>
    </div>
    <div class="page">
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
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
                    title: '用戶名稱',
                    key: 'user',
                    minWidth:160
                },
                {
                    title: '商品名稱',
                    key: 'product_name',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:160
                },
                {
                    title: '商品類型',
                    key: 'product_type',
                    minWidth:160
                },
                {
                    title: '時間',
                    key: 'time',
                    minWidth:160
                },
                {
                    title:'操作',
                    key:'action',
                    width:90,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row.id)
                                    }
                                }
                            }, '刪除')
                        ]);
                    }
                }
            ],
            data1: [],
            loading:false,
            current:0,
            total:0,
            types:"",
            inputValue:{
                product_name:"",
                product_type:"",
                price:0,
                user:''
            },
            type:1,
            obj:{}
        }
    },
    created(){
        this.getList(0);
    },
    methods:{
        getList(start,obj){
            var data = {}
            if(obj){
                data = obj;
            }
            data.start = start;
            data.rows = 10
            this.loading = true;
            this.$http('enshrineService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    var arr = res.rows;
                    for(let i =0;i<arr.length;i++){
                        arr[i].time = this.$changeTime(arr[i].time);   
                    }
                    this.total = res.total;
                    this.data1 = arr;
                }
            })
            .catch(err=>{
                this.loading = false;
            })
        },
        search(){ //按條件查詢
            var obj = {};
            if(this.inputValue.product_name){
                obj.productName = this.inputValue.product_name;
            }
            if(this.inputValue.product_type){
                obj.productType = this.inputValue.product_type;
            }
            if(this.inputValue.user){
                obj.user = this.inputValue.user;
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
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('enshrineService','deleteData',data)
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
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.getList(this.current,this.obj)
            }
            
        },
    }
}
</script>
<style scoped>
.page{
    justify-content: flex-end;
}
</style>
