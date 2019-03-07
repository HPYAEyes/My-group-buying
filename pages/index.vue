<template>
  <div class="index-container">
    <div class="section-card">
      <div class="card-title">
        杭州休闲娱乐
      </div>
      <div class="card-list">
        <div class="card-container">
          <div class="card-container-title">
            <i class="iconfont tg-relax"></i>
            <span>休闲</span>
          </div>
          <ul class="card-container-main">
            <li>酒吧</li>
            <li>私人影院</li>
            <li>茶馆</li>
            <li>DIY手工坊</li>
          </ul>
        </div>
        <div class="card-container">
          <div class="card-container-title">
            <i class="iconfont tg-sing"></i>
            <span>娱乐</span>
          </div>
          <ul class="card-container-main">
            <li>K歌</li>
            <li>密室</li>
            <li>桌游</li>
            <li>轰趴馆</li>
            <li>游乐游艺</li>
          </ul>
        </div>
        <div class="card-container">
          <div class="card-container-title">
            <i class="iconfont tg-sport"></i>
            <span>运动</span>
          </div>
          <ul class="card-container-main">
            <li>健身中心</li>
            <li>游泳馆</li>
            <li>溜冰场</li>
            <li>羽毛球馆</li>
          </ul>
        </div>
        <div class="card-container">
          <div class="card-container-title">
            <i class="iconfont tg-learn"></i>
            <span>文化</span>
          </div>
          <ul class="card-container-main">
            <li>博物馆</li>
            <li>美术馆</li>
            <li>图书馆</li>
            <li>创意园区</li>
            <li>文化艺术</li>
          </ul>
        </div>
        <div class="card-container">
          <div class="card-container-title">
            <i class="iconfont tg-yangsheng"></i>
            <span>休闲</span>
          </div>
          <ul class="card-container-main">
            <li>按摩/足疗</li>
            <li>洗浴/汗蒸</li>
          </ul>
        </div>
      </div>
      <dl class="card-footer">
        <dt>热门地区：</dt>
        <dd>西湖区</dd>
        <dd>上城区</dd>
        <dd>下城区</dd>
        <dd>拱墅区</dd>
        <dd>江干区</dd>
        <dd>萧山区</dd>
        <dd>滨江区</dd>
      </dl>
    </div>
    <div class="section-card">
      <div class="card-title" style="border-bottom: 0;">
        近期热门推荐
      </div>
      <el-tabs
        class="card-tabs"
        v-model="currentTab"
        stretch 
        type="card">
        <el-tab-pane class="tabs-container" label="桌游" name="first">
          <ul class="pic-list">
            <li v-for="item in firstTab" :key="item.name">
              <a href=""><img src="../assets/img/img1.jpg" alt=""></a>
              <span>{{item.name}}</span>
              <el-rate
                v-model="item.rate"
                text-color="#ff9900"
                disabled
                allow-half
                show-score>
              </el-rate>
              <span>{{item.count}}人评分</span>
            </li>
          </ul>
          <a class="more-info" href="#">更多桌游</a>
        </el-tab-pane>
        <el-tab-pane class="tabs-container" label="酒吧" name="second">配置管理</el-tab-pane>
        <el-tab-pane class="tabs-container" label="按摩/足疗" name="third">角色管理</el-tab-pane>
      </el-tabs>
    </div>
    <div class="section-card">
      <div class="card-title" style="display:flex;align-items:center;justify-content:space-between;">
        <span>最新团购</span>
        <a class="more-info" href="" style="margin: 0 16px 0 0;">更多休闲娱乐团购</a>
      </div>
      <ul class="newest-list">
        <li v-for="item in newBuyList" :key="item.title">
          <el-card class="list-el-card" shadow="always">
            <img src="../assets/img/img1.jpg" alt="">
            <div>
              <p>{{item.title}}</p>
              <p>原价 ￥{{item.oldPrice}}</p>
              <p class="new-price">团购价<span>￥{{item.newPrice}}</span></p>
            </div>
            <el-button class="navigate-btn" type="primary" size="mini" round>去看看</el-button>
          </el-card>
        </li>
      </ul>
    </div>
    <div class="section-card" style="margin-bottom: 20px;">
      <div class="card-title">
        <span>最新点评</span>
      </div>
      <ul class="newest-comment-list">
        <li v-for="item in newCommentList" :key="item.userName">
          <div class="comment-header">
            <img src="../assets/img/img1.jpg" alt="">
            <div>
              <p>{{item.shopName}}</p>
              <el-tag size="medium" style="position: absolute;bottom:0;">{{item.tag}}</el-tag>
            </div>
          </div>
          <el-card class="comment-content" shadow="always">
            <span class="comment-user">{{item.userName}}</span>
            <span class="comment-time">{{item.updateTime}}点评：</span>
            <p>{{item.content}}</p>
            <el-rate
              v-model="item.rate"
              disabled
              allow-half></el-rate>
          </el-card>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      currentTab: 'first',
      firstTab: [
        {
          name: 'X先生桌游',
          rate: 3.7,
          count: 52
        },
        {
          name: '爆疯桌游',
          rate: 4.3,
          count: 19
        },
        {
          name: '益乐桌游剧情推理社',
          rate: 3.9,
          count: 112
        },
        {
          name: '超级密室',
          rate: 4.5,
          count: 39
        },
        {
          name: '怡聚桌游',
          rate: 4.7,
          count: 325
        },
      ],
      newBuyList: [
        {
          title: '桃花记影院式足道SPA!仅售99元，价值179元【女神节女士专享足疗】，节假日通用！',
          oldPrice: '179',
          newPrice: '99'
        },
        {
          title: '桃花记影院式足道SPA!仅售99元，价值179元【女神节女士专享足疗】，节假日通用！',
          oldPrice: '179',
          newPrice: '99'
        },
        {
          title: '桃花记影院式足道SPA!仅售99元，价值179元【女神节女士专享足疗】，节假日通用！',
          oldPrice: '179',
          newPrice: '99'
        },
        {
          title: '桃花记影院式足道SPA!仅售99元，价值179元【女神节女士专享足疗】，节假日通用！',
          oldPrice: '179',
          newPrice: '99'
        },
      ],
      newCommentList: [
        {
          shopName: '草生记',
          tag: '按摩/足疗',
          userName: '龟派气功波',
          updateTime: '15分钟前',
          content: '手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 ',
          rate: 4.7
        },
        {
          shopName: '草生记',
          tag: '按摩/足疗',
          userName: '龟派气功波',
          updateTime: '15分钟前',
          content: '手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 ',
          rate: 4.7
        },
        {
          shopName: '草生记',
          tag: '按摩/足疗',
          userName: '龟派气功波',
          updateTime: '15分钟前',
          content: '手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 ',
          rate: 4.7
        },
        {
          shopName: '草生记',
          tag: '按摩/足疗',
          userName: '龟派气功波',
          updateTime: '15分钟前',
          content: '手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 ',
          rate: 4.7
        },
        {
          shopName: '草生记',
          tag: '按摩/足疗',
          userName: '龟派气功波',
          updateTime: '15分钟前',
          content: '手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 手法专业，环境优美，性价比很高。 ',
          rate: 4.7
        },
      ]
    };
  }
}
</script>
<style lang="scss">
@import "../assets/css/variable.scss";

.index-container {
  width: 1200px;
  min-height: 100vh;
  margin: 0 auto;

  .section-card {
    margin-top: 10px;
    border: 1px solid $border;
    background-color: #fff;

    .card-title {
      padding: 16px;
      border-bottom: 1px solid $border;
    }

    .card-list {
      display: flex;

      .card-container {
        width: 20%;
        padding: 20px;
        border-right: 1px dashed $border;

        &:last-child {
          border-right: 0;
        }

        .card-container-title {
          display: flex;
          align-items: center;

          i {
            margin-right: 6px;
            font-size: 24px;
            color: $mainColor;
          }

          span {
            font-weight: 700;
          }
        }
      }

      .card-container-main {
        display: flex;
        flex-wrap: wrap;
        margin-top: 16px;
        padding: 0;
        

        li {
          padding-right: 16px;
          padding-bottom: 10px;
          color: $greyFont;
          font-size: 14px;
        }
      }
    }

    .card-footer {
      display: flex;
      align-items: center;
      margin: 0;
      padding: 16px 20px;
      border-top: 1px dashed $border;
      font-size: 14px;

      dt {
        font-weight: 700
      }

      dd {
        margin-left: 10px;
        margin-right: 20px;
        color: $greyFont;
      }
    }

    .card-tabs {
     .tabs-container {
       padding: 20px;

       .pic-list {
         display: flex;
         margin: 0;
         padding: 0;
         

         li {
          width: 20%;
          padding: 0 16px;
          font-size: 14px;

          img {
            width: 100%;
            height: 150px;
            margin-bottom: 10px;
          }

          span {

            &:last-child {
              color: $lightFont;
            }
          }
         }
       }
     }
    }

    .newest-list {
      display: flex;
      flex-wrap: wrap;
      
      li {
        width: calc(50% - 40px);
        padding: 20px;
      }

      .list-el-card {
        padding: 6px;

        .el-card__body {
          flex-direction: row;
          padding: 12px;
        }

        img {
          width: 30%;
          height: 100px;
          margin-right: 14px;
        }

        div {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 14px;
        
          p {
            &:nth-child(2) {
              text-decoration: line-through;
              color: $lightFont;
            }
          }

          .new-price {
            color: $price;

            span {
              font-size: 18px;
              font-weight: 700;
            }
          }

        }

        .navigate-btn {
          position: absolute;
          right: 10px;
          bottom: 10px;
        }
      }
    }

    .newest-comment-list {
      display: flex;
      padding: 20px;
      font-size: 14px;

      li {
        width: 20%;
        padding: 20px;
      }

      .comment-header {
        position: relative;
        display: flex;

        img {
          width: 100px;
          height: 60px;
          margin-right: 14px;
        }
        
        p {
          font-weight: 700;
        }

      }

      .comment-content {
        margin-top: 10px;
        font-size: 12px;

        .el-card__body {
          position: relative;
          padding: 14px;
        }

        .comment-user {
          color: #66c;
        }

        .comment-time {
          position: absolute;
          right: 14px;
          color: $lightFont;
        }

        p {
          margin: 14px 0;
        }
      }
    }

    .more-info {
      float: right;
      margin: 16px;
      font-size: 12px;
      color: $lightFont;
      text-decoration: none;
    }
  }
}
</style>
