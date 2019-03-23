import Comment from './dbs/models/comments';
import Product from './dbs/models/products';
const schedule = require('node-schedule');

export function scheduleCronstyle() {
  schedule.scheduleJob('0 */5 * * * *', async () => {
    const commentList = await Comment.find();
    const averRate = {};
    commentList.forEach((item) => {
      if (averRate[item.productId]) {
        averRate[item.productId].rate += item.rate;
        averRate[item.productId].count ++;
      } else {
        averRate[item.productId] = {
          rate: item.rate,
          count: 1
        };
      }
    });
    Object.keys(averRate).forEach(async (item) => {
      const rate = (averRate[item].rate / averRate[item].count).toFixed(1);
      const count = averRate[item].count;
      const newProduct = await Product.updateOne({ _id: item }, { averRate: rate, commentCount: count });
      if (!newProduct.n) {
        console.error(`update error, id: ${item}`);
      }
    });
    console.log('averRate updated' + new Date());
  }); 
}
