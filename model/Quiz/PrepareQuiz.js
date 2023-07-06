const mongoose = require('mongoose')

const prepareQuizSchema = new mongoose.Schema({
    userId : {
        type : String,
    },
    title : {
        type : String,
        default : "",
    },
    description : {
        type : String,
        default : "",
    },
    AcceptResponse : {
        type : Boolean,
        default : true,
    },
    fields : {
        type : Array,
        default : []
    }
})


prepareQuizSchema.methods.addField = async function(data,index){
    try{
        console.log("under add model");
        if(data !== null){

            if(index >= this.fields.length){
                this.fields.push(data);
            }else{
                this.fields.splice(index, 0, data)
            }
            await this.save();
        }
        return this.fields;
    } catch(err){
        console.log(err);
    }
}


prepareQuizSchema.methods.updateField = async function(data,index){
    try{
        if(data !== null){
            this.fields.splice(index, 1, data);
            console.log("update fiels",this.fields);
            await this.save();
        }
        return this.fields;
    } catch(err){
        console.log(err);
    }
}

prepareQuizSchema.methods.deleteField = async function(data){
    try{
        console.log('under delete field')
        this.fields = [...data];
        this.save();
        return this.fields;
    } catch(err){
        console.log(err);
    }
}

prepareQuizSchema.methods.reorderFields = async function(startIndex,endIndex){
    try{
        const [removed] = this.fields.splice(startIndex, 1);
        this.fields.splice(endIndex, 0, removed);
        this.save();
        return this.fields;
    } catch(err){
        console.log(err);
    }
}

prepareQuizSchema.methods.updateTitDec = async function(tit,des){
    try{
        this.title = tit,
        this.description = des,
        this.save();
        return this.fields;
    } catch(err){
        console.log(err);
    }
}

prepareQuizSchema.methods.updateFiledImg = async function(index,fileUrl){
    try{
        var obj = {
            ...this.fields[index],
            'question_img' : fileUrl
        };

        this.fields.splice(index, 1, obj);
        
        this.save();
        return this.fields;
    } catch(err){
        console.log(err);
    }
}

prepareQuizSchema.methods.changeView = async function(view){
    try{
        
        this.AcceptResponse = view;
        this.save();
        return this.fields;
    } catch(err){
        console.log(err);
    }
}




const PrepareQuiz = mongoose.model('PrepareQuiz', prepareQuizSchema);
module.exports = PrepareQuiz;