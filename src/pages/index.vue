<template>
    <div class="container">
        <div class="navs">
            <div class="logo">
                巴克斯運營管理平臺
            </div>
            <div class="user">
                <span>{{user.username}}</span>
                <span>歡迎你！</span>
            </div>
            <div class="operation">
                <!-- <Dropdown trigger="click" style="margin-left: 20px" :transfer="true">
                    <a href="javascript:void(0)">
                        菜單管理
                        <Icon type="ios-arrow-down" color="#fff"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>修改密碼</DropdownItem>
                        <DropdownItem>更換主題</DropdownItem>
                    </DropdownMenu>
                </Dropdown> -->
                <Dropdown trigger="click" style="margin-left: 20px" :transfer="true" @on-click="outlogin">
                    <a href="javascript:void(0)">
                        退出系統
                        <Icon type="ios-arrow-down" color="#fff"></Icon>
                    </a>
                    <DropdownMenu slot="list" >
                        <DropdownItem name="重新登录">重新登錄</DropdownItem>
                        <DropdownItem name="安全退出">安全退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div class="contant">
            <div class="menu">
                <Menu :theme="theme2" :open-names="['商品管理']" accordion active-name='商品查詢' @on-open-change="selectChange" @on-select="selectItem">
                    <div class="menu-nav">
                        <Icon type="ios-grid" color="#ffffff"/>
                        <span >導航功能</span>
                    </div>
                    <Submenu name="關鍵數據">
                        <template slot="title">
                            <Icon type="ios-paper" />
                            關鍵數據
                        </template>
                        <MenuItem name="即時數據" to='/cruxdata'> 即時數據</MenuItem>
                        <!-- <MenuItem name="近期數據" to="/recentdata">近期數據</MenuItem> -->
                    </Submenu>
                    <Submenu name="用戶管理">
                        <template slot="title">
                            <Icon type="ios-people" />
                            用戶管理
                        </template>
                        <MenuItem name="用戶信息" to="/user">用戶信息</MenuItem>
                        <MenuItem name="折扣券" to="/coupon">折扣券</MenuItem>
                        <!-- <MenuItem name="錢包明細" to="/wallet">錢包明細</MenuItem> -->
                        <!-- <MenuItem name="評酒貼文列表" to="/posts">評酒貼文列表</MenuItem> -->
                        <MenuItem name="用戶購物車" to="/car">用戶購物車</MenuItem>
                        <MenuItem name="用戶收藏" to='/collect'>用戶收藏</MenuItem>
                        <MenuItem name="商品浏览记录" to='/goodsRecord'>商品浏览记录</MenuItem>
                    </Submenu>
                    <!-- <Submenu name="酒窖">
                        <template slot="title">
                            <Icon type="md-beer" />
                            酒窖
                        </template>
                        <MenuItem name="酒類管理" to="/wine">酒類管理</MenuItem>
                        <MenuItem name="用戶酒窖" to="/userwine">用戶酒窖</MenuItem>
                    </Submenu> -->
                    <Submenu name="商品管理">
                        <template slot="title">
                            <Icon type="ios-stats" />
                            商品管理
                        </template>
                        <MenuItem name="商品查詢" to="/goodsQuery">商品查詢</MenuItem>
                        <MenuItem name="商品风格" to="/createGoods">商品风格</MenuItem>
                        <MenuItem name="分店库存" to="/branchInventory">分店库存</MenuItem>
                        <MenuItem name="产区风格" to="/productArea">产区风格</MenuItem>
                        <MenuItem name="国家管理" to="/country">国家管理</MenuItem>
                        <MenuItem name="葡萄种类" to="/grape">葡萄种类</MenuItem>
                        <MenuItem name="酒庄管理" to="/winery">酒庄管理</MenuItem>
                        <MenuItem name="门店管理" to="/shopName">门店管理</MenuItem>
                        <!-- <MenuItem name="庫存管理" to="/stockManage">庫存管理</MenuItem> -->
                    </Submenu>
                    <!-- <Submenu name="訂單查詢">
                        <template slot="title">
                            <Icon type="ios-list" />
                            訂單查詢
                        </template>
                        <MenuItem name="訂單查詢" to="/orderQuery">訂單查詢</MenuItem>
                        <MenuItem name="取消訂單" to="/ordersCancel">取消訂單</MenuItem>
                    </Submenu> -->
                    <!-- <Submenu name="宅配出貨">
                        <template slot="title">
                            <Icon type="md-bicycle" />
                            宅配出貨
                        </template>
                        <MenuItem name="宅配訂單確定" to="/homeDelivery">宅配訂單確定</MenuItem>
                        <MenuItem name="宅配出貨" to="/homeDeliveryGoods">宅配出貨</MenuItem>
                    </Submenu>
                    <Submenu name="超取出貨">
                        <template slot="title">
                            <Icon type="ios-alarm" />
                            超取出貨
                        </template>
                        <MenuItem name="超取訂單確認" to="/overtime">超取訂單確認</MenuItem>
                        <MenuItem name="超取出貨" to="/overtimeGoods">超取出貨</MenuItem>
                    </Submenu>
                    <Submenu name="門市操作">
                        <template slot="title">
                            <Icon type="md-cog" />
                            門市操作
                        </template>
                        <MenuItem name="門市訂單確認" to="/retailSalesOrder">門市訂單確認</MenuItem>
                        <MenuItem name="門市寶貝" to="/retailSales">門市寶貝</MenuItem>
                        <MenuItem name="門市取貨" to="/retailSalesUp">門市取貨</MenuItem>
                    </Submenu>
                    <Submenu name="換貨處理_預設">
                        <template slot="title">
                            <Icon type="logo-pinterest" />
                            換貨處理_預設
                        </template>
                        <MenuItem name="換貨處理" to="/barterHandle">換貨處理</MenuItem>
                        <MenuItem name="換貨查詢" to="/barterQuery">換貨查詢</MenuItem>
                    </Submenu>
                    <Submenu name="退貨處理">
                        <template slot="title">
                            <Icon type="md-return-right" />
                            退貨處理
                        </template>
                        <MenuItem name="退貨處理" to="/returnHandle">退貨處理</MenuItem>
                        <MenuItem name="退貨查詢" to="returnQuery">退貨查詢</MenuItem>
                    </Submenu> -->
                    <Submenu name="文章日誌">
                        <template slot="title">
                            <Icon type="logo-buffer" />
                            文章日誌
                        </template>
                        <!-- <MenuItem name="新增文章" to="/newArticle">新增文章</MenuItem> -->
                        <MenuItem name="文章列表" to="/articleList">文章列表</MenuItem>
                    </Submenu>
                    <!-- <Submenu name="公告&廣告管理">
                        <template slot="title">
                            <Icon type="md-megaphone" />
                            公告&廣告管理
                        </template>
                        <MenuItem name="編輯公告" to="/editNotice">編輯公告</MenuItem>
                        <MenuItem name="審核公告" to="/auditingNotice">審核公告</MenuItem>
                        <MenuItem name="編輯廣告" to="/advertisementEdit">編輯廣告</MenuItem>
                        <MenuItem name="審核廣告" to="/advertisementAuditing">審核廣告</MenuItem>
                    </Submenu> -->
                    <!-- <Submenu name="運營管理">
                        <template slot="title">
                            <Icon type="md-globe" />
                            運營管理
                        </template>
                        <MenuItem name="用戶賬號操作" to="/userHandle">用戶賬號操作</MenuItem>
                        <MenuItem name="用戶貼文管理" to="/userArticleHandle">用戶貼文管理</MenuItem>
                        <MenuItem name="商品活動" to="/goodsActivity">商品活動</MenuItem>
                        <MenuItem name="會員分級" to="/memberLevel">會員分級</MenuItem>
                        <MenuItem name="加買商品" to="/buygoods">加買商品</MenuItem>
                        <MenuItem name="免運活動" to="/freeMail">免運活動</MenuItem>
                        <MenuItem name="折扣券活動" to="/couponActivity">折扣券活動</MenuItem>
                        <MenuItem name="特價商品區" to="/specials">特價商品區</MenuItem>
                        <MenuItem name="生日禮" to="/birthdaygift">生日禮</MenuItem>
                        <MenuItem name="多日活動" to="/continuousActivity">多日活動</MenuItem>
                        <MenuItem name="簽到活動" to="/signInActive">簽到活動</MenuItem>
                        <MenuItem name="成就" to="/achievement">成就</MenuItem>
                    </Submenu> -->
                    <Submenu name="後臺賬號管理">
                        <template slot="title">
                            <Icon type="ios-key" />
                            後臺賬號管理
                        </template>
                        <MenuItem name="用户管理" to="/accountManage">用户管理</MenuItem>
                        <MenuItem name="1角色权限管理" to="/accountPower">角色权限管理</MenuItem>
                        <MenuItem name="菜单管理" to="/menuManage">菜单管理</MenuItem>
                        <!-- <MenuItem name="後臺賬號操作紀錄" to="/accountHandRecord">後臺賬號操作紀錄</MenuItem> -->
                    </Submenu>
                    <Submenu name="數據分析">
                        <template slot="title">
                            <Icon type="md-analytics" />
                            數據分析
                        </template>
                        <MenuItem name="綜合報表" to="/comprehensiveData">綜合報表</MenuItem>
                        <MenuItem name="會員數據" to="/memberData">會員數據</MenuItem>
                        <MenuItem name="葡萄數據" to="/retainData">葡萄數據</MenuItem>
                        <MenuItem name="社群數據" to="/communityData">社群數據</MenuItem>
                        <MenuItem name="商品數據" to="/goodsData">商品數據</MenuItem>
                        <MenuItem name="文章數據" to="/articleData">文章數據</MenuItem>
                    </Submenu>
                    <!-- <Submenu name="客服相關">
                        <template slot="title">
                            <Icon type="ios-call" />
                            客服相關
                        </template>
                        <MenuItem name="客服信件" to="/waiterLetter">客服信件</MenuItem>
                        <MenuItem name="補發功能" to="/repairFunc">補發功能</MenuItem>
                        <MenuItem name="用戶檢舉" to="/userImpeach">用戶檢舉</MenuItem>
                    </Submenu>
                    <Submenu name="賬務管理">
                        <template slot="title">
                            <Icon type="logo-bitcoin" />
                            賬務管理
                        </template>
                        <MenuItem name="賬務核對" to="/financeCheck">賬務核對</MenuItem>
                        <MenuItem name="出貨資料核對" to="/shipmentCheck">出貨資料核對</MenuItem>
                        <MenuItem name="發票另寄" to="/invoice">發票另寄</MenuItem>
                    </Submenu> -->
                </Menu>
            </div>
            <div class="tables">
                <div class="nav_menu">
                    <div class="adress">
                        <Icon type="ios-pin" color="#009688" size="30"/>
                        <span>您當前的位置：首頁<span>>{{submenu}}</span><span v-if="menuitem != ''">>{{menuitem}}</span></span>
                    </div>
                    <div class="time">{{time}}</div>
                </div>
                <div class="footer">巴克斯版權所有</div>
                <router-view/>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data () {
        return {
            theme2: 'dark',
            time:'',
            submenu:'',
            menuitem:'',
            user:{}
        }
    },
    created(){
        this.getTime();
        var userInfo = JSON.parse(sessionStorage.getItem('user_info'));
        this.user = userInfo.dbUser;
        var data = [
            {
                icon:'ios-people',
                name:'userMnage',
                meta:{icon:'ios-people',title:'用户管理'},
                children:[
                    {icon:'',name:'user',meta:{icon:'',title:'用户信息'}},
                    {icon:'',name:'coupon',meta:{icon:'',title:'折扣券'}},
                    {icon:'',name:'car',meta:{icon:'',title:'用戶購物車'}},
                    {icon:'',name:'collect',meta:{icon:'',title:'用戶收藏'}},
                    {icon:'',name:'goodsRecord',meta:{icon:'',title:'商品浏览记录'}},
                ]
            },
            {
                icon:'ios-stats',
                name:'goodsMnage',
                meta:{icon:'ios-stats',title:'商品管理'},
                children:[
                    {icon:'',name:'goodsQuery',meta:{icon:'',title:'商品查詢'}},
                    {icon:'',name:'createGoods',meta:{icon:'',title:'商品风格'}},
                    {icon:'',name:'branchInventory',meta:{icon:'',title:'分店库存'}},
                    {icon:'',name:'productArea',meta:{icon:'',title:'产区风格'}},
                    {icon:'',name:'country',meta:{icon:'',title:'国家管理'}},
                    {icon:'',name:'grape',meta:{icon:'',title:'葡萄种类'}},
                    {icon:'',name:'winery',meta:{icon:'',title:'酒庄管理'}},
                    {icon:'',name:'shopName',meta:{icon:'',title:'门店管理'}},
                ]
            },
            {
                icon:'logo-buffer',
                name:'article',
                meta:{icon:'logo-buffer',title:'文章日誌'},
                children:[{icon:'',name:'articleList',meta:{icon:'',title:'文章列表'}}]
            },
            {
                icon:'ios-key',
                name:'manage',
                meta:{icon:'ios-key',title:'後臺賬號管理'},
                children:[
                    {icon:'',name:'accountManage',meta:{icon:'',title:'用户管理'}},
                    {icon:'',name:'accountPower',meta:{icon:'',title:'角色权限管理'}},
                    {icon:'',name:'menuManage',meta:{icon:'',title:'菜单管理'}}
                ]
            },
            {
                icon:'md-analytics',
                name:'datas',
                meta:{icon:'md-analytics',title:'數據分析'},
                children:[
                    {icon:'',name:'comprehensiveData',meta:{icon:'',title:'綜合報表'}},
                    {icon:'',name:'memberData',meta:{icon:'',title:'會員數據'}},
                    {icon:'',name:'retainData',meta:{icon:'',title:'葡萄數據'}},
                    {icon:'',name:'communityData',meta:{icon:'',title:'社群數據'}},
                    {icon:'',name:'goodsData',meta:{icon:'',title:'商品數據'}},
                    {icon:'',name:'articleData',meta:{icon:'',title:'文章數據'}},
                ]
            },
        ]
    },
    watch:{
        submenu(val){
            this.menuitem = ''
        }
    },
    methods:{
        getTime(){
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var week = date.getDay();
            var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
            this.time = `${year}年${month}月${day}日 ${weekday[week]}`;
        },
        outlogin(name){
            console.log('...',name)
            // return
            sessionStorage.clear()
            this.$router.push({path:'/login'});
        },
        selectChange(name){
            console.log(name)
            this.submenu = name.join(' ');
        },
        selectItem(name){
            console.log('子菜單',name)
            this.menuitem = name;
        }
    }
}
</script>
<style scoped>
    .container{
        width: 100%;
        height:100vh ;
    }
    .navs{
        width: 100%;
        height: 56px;
        position: relative;
        /* background-color: #143F6D; */
        background-color:#009688;
        overflow: hidden;
    }
    
    .logo{
        font-size: 28px;
        color: #fff;
        text-shadow:  0 8px 9px #4583b3;
        height: 56px;
        line-height: 56px;
        width: auto;
        padding-left: 30px;
    }
    .user{
        position: absolute;
        top: 20px;
        right: 120px;
        font-weight: bold;
        color: #fff;
    }
    .operation{
        position: absolute;
        /* bottom: 10px; */
        top: 20px;
        right: 20px;
        color: #17233d;
        
    }
    .contant{
        width: 100%;
        height: calc(100% - 80px);
        display: flex;
    }
    .menu{
        height: 100%;
        overflow-y: scroll;
        background-color: #283440;
    }
    ::-webkit-scrollbar {
    display: none;
    }
    .menu-nav{
        color: #fff;
        font-size: 16px;
        height: 51px;
        line-height: 51px;
        position: relative;
        left: 23px;
    }
    .menu-nav span{
        margin-left: 10px;
    }
    .tables{
        padding: 20px;
        padding-top: 60px;
        width: calc(100% - 240px);
        position: relative;
        overflow-x:scroll; 
    }
    .routers{
        display: inline-block;
    }
    .nav_menu{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        background-color: #f4f4f4;
        border: 1px solid #ccc;
        position: absolute;
        left: 0;
        top: 0;
    }
    .adress{
        margin-left: 20px;
        color:#5F5F5F;
    }
    .time{
        margin-right: 20px;
    }
    .footer{
        width: 100%;
        height: 30px;
        line-height: 30px;
        background-color: #363E4F;
        text-align: center;
        color: #fff;
        position: fixed;
        left: 0;
        bottom: 0;
    }
</style>
