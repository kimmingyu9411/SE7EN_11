const sqMock = require('../db.test.js');

describe('Order as Model has tested by mocking',()=>{

    let orderMock;

    beforeEach(()=>{
        orderMock = sqMock.define('order',{
            'productList' : '[1,5,6,8,15]',
            'totalPrice' : 35000,
            'userId' : 23,
        },{
            instanceMethods:{
                getTotalPrice: function(){
                    return this.totalPrice;
                },
                getProductList: function(){
                    return this.productList;
                }
            }
        });
        
    })

    it('userId Test',async ()=>{
        let user = await orderMock.findOne({
            where:{
                userId:23
            }
        }).then((user)=>{
            expect(user.userId).toBe(23);    
        });
    });

    it('totalPrice Test',async ()=>{
        const user = await orderMock.findOne({
            where:{
                userId:23
            }
        }).then((user)=>{
            expect(user.totalPrice).toBe(35000);
            expect(user.id).toBe(2);
        });

        
    })

    it('productList Test',async ()=>{
        const user = await orderMock.findOne({
            where:{
                userId:23
            }
        }).then((user)=>{
            return user.dataValues
        });
        
        const list = user.productList;

        expect(JSON.parse(list).length).toBe(5);
    })
})