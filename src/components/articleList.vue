<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>分類查看：</span>
            <Select  style="width:110px" v-model="seachValue.tag" clearable>
                <Option v-for="item in tagList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="option">
            <span>發佈時間：</span>
            <DatePicker type="daterange" v-model="seachValue.time" placeholder="選擇時間" style="width: 120px"></DatePicker>
        </div>
        <div class="option">
            <span>文章標題：</span>
            <Input type="text"  v-model="seachValue.title" style="width:70px" />
        </div>
        <div class="serch" @click="search">查詢</div>
    </div>
    <div class="new_article">
        <Table border  :columns="columns1" :data="data1"  class="post" :loading="loading">
            <template slot="tag" slot-scope="{row}">
                <div class="actions">
                    {{tagss(row.tag)}}
                </div>
            </template>
            <template slot="content" slot-scope="{row}">
                <div class="contents" @click="openRowContent(row)">
                    {{row.content}}
                </div>
            </template>
            <template slot="action" slot-scope="{row}">
                <div class="actions">
                    <Button size="small" type="primary" @click="edit(row)">編輯</Button>
                    <Button size="small" type="error" @click="remove(row.id)">刪除</Button>
                </div>
            </template>
            <template slot="index_img" slot-scope="{row}">
                <div class="index_img">
                    <img :src="row.index_img" />
                </div>
            </template>
            <template slot="status" slot-scope="{row}">
                <div>{{row.status==1?'上架':'下架'}}</div>
            </template>
        </Table>
    </div>
    <Modal :title="imageTitle" v-model="visible">
        <div class="over" style="max-height:500px;overflow-y:scroll;">
          {{imgName}}
        </div>
    </Modal>
    <div class="page">
        <div class="_btn">
            <!-- <div class="send" @click="openModel">新增文章</div> -->
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="propUpModel">
        <div class="a_box">
            <div class="a_content">
                <div class="a_title">新增文章</div>
                <div class="a_tit aflex">
                    <span>文章標題：</span>
                    <Input v-model="inputValue.title"  style="width: 486px" />
                </div>
                <div class="a_tit aflex">
                    <div class="aflex">
                        <span>作者名稱：</span>
                        <Input v-model="inputValue.author"  style="width: 150px;margin-left:82px" />
                    </div>
                    <div class="a_tit aflex">
                        <span>推薦酒品：</span>
                        <Input v-model="inputValue.recommend"  style="width: 150px;margin-left:22px" />
                    </div>
                </div>
                <div class="a_tit aflex">
                    <span>作者簡介：</span>
                    <Input v-model="inputValue.author_introduction" type="textarea" :rows='2' style="width: 486px" />
                </div>
                <div class="a_pic aflex">
                    <span>內文圖片：</span>
                    <div style="width:486px;display:flex;">
                        <div class="demo-upload-list" v-for="(item,index) in files" :key="index" >
                            <template >
                                <img :src="item.src" />
                            </template>
                        </div>
                            <input type="file" class="files" @change="fileChanged" ref="file" multiple="multiple" name="file" accept="image/jpg,image/jpeg,image/png,image/bmp">
                            <div style="width: 58px;height:58px;line-height: 58px;text-align:center;border:1px dashed #888">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                    </div>
                </div>
                <div class="classify aflex">
                    <div class="aflex">
                        <span>文章分類：</span>
                        <Select v-model="inputValue.tag" style="width:200px;margin-left:82px">
                            <Option v-for="item in tagList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    
                    <div class="a_tit aflex">
                        <span>狀態：</span>
                        <RadioGroup v-model="inputValue.status" style="margin-left:40px">
                            <Radio :label="1">上架</Radio>
                            <Radio :label='2'>下架</Radio>
                        </RadioGroup>
                    </div>
                </div>
                <div class="a_article aflex" style="position:relative">
                    <Icon type="md-photos" size="30" color="#2d8cf0" style="position:absolute;top:0;left:132px;cursor:pointer;"  @click="addpic"/>
                    <span>內容：</span>
                    <Input v-model="inputValue.content" type="textarea" :rows='11' style="width: 486px" />
                </div>
                <div class="a_article notice">注：內文圖片為展示上傳圖片區域，在編輯文章時，在想要插入圖片的位置，點擊左邊藍色圖片圖標即可插入指定位置</div>
                <div class="btns">
                    <div class="cancel" @click="closeModels">取消</div>
                    <div class="sure" @click="suerBtn">確定</div>
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
            columns1:[
                {
                    type:'selection',
                    width:60,
                    align:'center'
                },
                {
                    title: 'ID',
                    key: 'id',
                    minWidth:90
                },
                {
                    title: '發佈時間',
                    key: 'time',
                    minWidth:160,
                    sortable: true
                },
                {
                    title: '文章標題',
                    key: 'title',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:160
                },
                {
                    title: '文章內容',
                    slot: 'content',
                    ellipsis:true,
                    minWidth:160
                },
                {
                    title:'推荐酒品',
                    key:'recommend',
                    minWidth:110
                },
                 {
                    title: '作者',
                    key: 'author',
                    minWidth:110
                },
                {
                    title: '作者简介',
                    key: 'author_introduction',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:130
                },
                {
                    title:'文章分類',
                    slot:'tag',
                    minWidth:110
                },
                {
                    title:'封面圖片',
                    slot:'index_img',
                    minWidth:120
                },
                {
                    title:'状态',
                    slot:'status',
                    minWidth:120
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
            tags:['生活','酒莊','活動','深度','大師','特色','名人'],
            tagList:[
                {value:1,label:'生活'},
                {value:2,label:'酒莊'},
                {value:3,label:'活動'},
                {value:4,label:'深度'},
                {value:5,label:'大師'},
                {value:6,label:'特色'},
                {value:7,label:'名人'},
            ],
            seachValue:{
                time:'',
                tag:'',
                title:''
            },
            inputValue:{
                user_id:'',
                author:'',
                recommend:'',
                author_introduction:'',
                tag:'',
                title:'',
                content:'',
                status:1
            },
            userId:'',
            selectData:'',
            s_modelData:"",
            a_tit:'',
            keyword:'',
            a_article:'',
            propUpModel:false,
            contrastData:[],
            defaultList: [],
            imgName: '',
            visible: false,
            uploadList: [],
            files:[],
            pics:[],
            n:0,
            id:'',
            loading:false,
            type:1,
            obj:{},
            visible:false,
            imgName:'',
            imageTitle:"",
        }
    },
    created(){
        this.getList(0);
        var userinfo = JSON.parse(sessionStorage.getItem('user_info'));
        if(userinfo){
            this.userId = userinfo.dbUser.id;
        }
    },
    methods:{
        getList(start,obj){
            var data = {}
            if(obj){
                data = obj
            }
            data.start = start
            data.rows = 10
            this.loading = true;
            this.$http('articleService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    var arr = res.rows;
                    for(let i =0;i<arr.length;i++){
                        arr[i].time = arr[i].time?this.$changeTime(arr[i].time):"";
                        arr[i].content = this.htmlDecodeByRegExp(arr[i].content);
                        // arr[i].tag = this.tags[arr[i].tag-1];
                        // arr[i].photos = arr[i].photos.join(',')
                    }
                    this.total = res.total;
                    this.data1 = arr;
                    // this.contrastData = arr;
                }
            })
            .catch(err=>{
                this.loading = false;
            })
        },
        tagss(id){
            if(!id && id!=0){return ''}
            var result = this.tagList.find(item=>item.value==id)
            if(result){
                return result.label
            }else{
                return '未知'
            }
        },
        search(){
            var obj = {};
            if(this.seachValue.title){
                obj.title = this.seachValue.title;
            }
            if(this.seachValue.time){
                obj.startTime = this.$changeTime(this.seachValue.time[0]);
                obj.endTime = this.$changeTime(this.seachValue.time[1]);
            }
            if(this.seachValue.tag){
                obj.tag = this.seachValue.tag
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
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.getList(this.current,this.obj)
            }
        },
        openModel(){
            this.propUpModel = true;
        },
        openRowContent(row){
            if(!row){return}
            this.imgName = row.content
            this.imageTitle = row.title
            this.visible = true
        },
        closeModels(){
            this.propUpModel = false;
            this.inputValue={
                user_id:'',
                author:'',
                recommend:'',
                author_introduction:'',
                tag:'',
                title:'',
                content:'',
                status:1
            }
            this.id = ''
            this.pics = []
            this.files = []
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                    var data = {id:id};
                    this.$http('articleService','deleteData',data)
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
        htmlDecodeByRegExp(str){  
            var s = "";
            if(str.length == 0) return "";
            s = str.replace(/&amp;/g,"&");
            s = s.replace(/&lt;/g,"<");
            s = s.replace(/&gt;/g,">");
            s = s.replace(/&nbsp;/g," ");
            s = s.replace(/&#39;/g,"\'");
            s = s.replace(/&quot;/g,"\"");
            s = s.replace(/&sc;/g,"src")
            return s;  
        },
        suerBtn(){
            if(!this.inputValue.title){
                this.$Message.error('請填寫文章標題')
                return
            }
            var data = this.inputValue;
            data.user_id = this.userId;
            data.photos = JSON.stringify(this.pics);
            var info = '新增成功';
            if(this.id){
                data.id = this.id;
                info = '修改成功';
            }
            console.log(data)
            return
            this.$http('articleService','addOrUpdate',data)
            .then(res=>{
                this.propUpModel = false;
                this.id = "";
                if(res.result == 'success'){
                    this.$Message.success(info);
                    this.getList(this.current);
                    this.inputValue={
                        user_id:'',
                        author:'',
                        recommend:'',
                        author_introduction:'',
                        tag:'',
                        title:'',
                        content:'',
                        status:1
                    }
                    this.pics = []
                    this.files = []
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        edit(row){
            console.log(row)
            this.propUpModel = true;
            this.inputValue = {
                user_id:row.user_id,
                tag:row.tag,
                title:row.title,
                content:row.content,
                status:row.status?row.status:1,
                author_introduction:row.author_introduction?row.author_introduction:'',
                recommend:row.recommend?row.recommend:'',
                author:row.author?row.author:''
            }
            // for(let i =0;i<this.tagList.length;i++){
            //     if(this.tagList[i].label == row.tag){
            //         this.inputValue.tag = this.tagList[i].value;
            //         break;
            //     }
            // }
            try {
               this.pics = JSON.parse(row.photos); 
            } catch (error) {
                this.pics = new Array(row.photos)
            }
            for(let j=0;j<this.pics.length;j++){
                var obj = {}
                obj.src = this.pics[j]
                this.files.push(obj)
            }
            this.id = row.id;
        },
        addpic(){
            this.$refs.file.click();
        },
        fileChanged(e){
            const list = this.$refs.file.files
            for (let i = 0; i < list.length; i++) {
                if (!this.isContain(list[i])) {
                    const item = {
                        name: list[i].name,
                        size: list[i].size,
                        file: list[i],
                    }
                    this.html5Reader(list[i], item);
                    this.files.push(item);
                }
            }
            console.log(this.files)
            if(list.length > 0) {
                let form = new FormData();  
                form.append('file', list[0]) 
                this.inputValue.content += `<img src="photos[${this.files.length-1}]">`;
                this.$http('','',form,2)
                .then(res=>{
                    console.log(res)
                    if(res.result=='success'){
                        this.$Message.success(res.message);
                        this.files[this.n].status = 'finished';
                        this.pics.push(res.data);
                        this.n++;
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            }
            this.$refs.file.value = '';
        },
        // 將圖片文件轉成BASE64格式
        html5Reader(file, item){
            const reader = new FileReader()
            reader.onload = (e) => {
                this.$set(item, 'src', e.target.result)
            }
            reader.readAsDataURL(file)
        },
        isContain(file) {
            return this.files.find((item) => item.name === file.name && item.size === file.size)
        },
    }
}
</script>
<style scoped>
.page{
    justify-content: space-between;
}
.a_box{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -360px 0 0 -275px;
    width: 720px;
    height: 720px;
    background-color:#fff;
    border-radius: 4px; 
}
.a_content{
    width: 90%;
    margin: 30px auto 0;
}
.a_title{
    width: 100%;
    text-align: center;
    font-size: 18px;
    margin-bottom: 30px;
}
.aflex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.btns{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.cancel,
.sure{
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border-radius: 6px;
    cursor:pointer;
}
.sure{
    margin-left: 20px;
}
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
input[type="file"] {
    display: none;
}
.contents{
    width: 120px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
.notice{
    font-size: 12px;
    color: #ED4014;
}
.index_img{
    height: 40px;
}
.index_img img{
    height: 100%;
}
</style>
