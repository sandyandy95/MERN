const mongoose= require ('mongoose');
const {Schema}=mongoose;
const AdminSchema=new Schema({
    nombreAdmin: {type: String, require:true},
    apellidoAdmin: {type: String, require:true},
    superAdmin: {type: Boolean, require: true },
    fechaNacimientoAdmin: {type:String,require:true},
    correoAdmin:{type:String,require:true}
});
module.exports= mongoose.model('Admin',AdminSchema);