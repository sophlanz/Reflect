const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const reflectionSchema = new Schema ({
    title : { 
        type : String, 
        required : true
    }, 
    reflection : {
        type : String, 
        required : true
    },
    category : {
        type : String,
        enum : ['daily', 'weekly', 'monthly', 'yearly'],
        required : true
    }, 
    topic : {
        type : String, 
        enum : ['religion and spirituality', 'career', 'health', 
        'romantic relationships', 'friends and family', 'inspring stories', 'advocacy' ],
        required : true
    },
    image : { 
        type : String, 
        data : Buffer 
    },
//    comments : ({ 
//        type : Schema.Types.ObjectId
//    }),
   username: {
       type : String,
       required : true
   },
   user : {
       type : String,
       required : true
   }

    });

const reflectionModel = mongoose.model ('Reflection', reflectionSchema )
module.exports = reflectionModel
reflectionSchema.set('timestamps', true);