const express =require ('express');
const router  =express.Router();
const Admin= require('../models/task')

router.get('/',async (req, res)=>{
    const admins = await Admin.find(); 
   res.json(admins);
});
router.get('/:id',async (req, res)=>{
   const admin =await Admin.findById(req.params.id);
    res.json(admin);
});

router.post('/',async(req,res)=>{
    const {nombreAdmin, apellidoAdmin,
        superAdmin,fechaNacimientoAdmin,correoAdmin}=req.body;
        const admin= new Admin(
            {
                nombreAdmin,
                apellidoAdmin,
                superAdmin,
                fechaNacimientoAdmin,
                correoAdmin
            })
        await admin.save();

    res.json({status: 'task save'});
});
router.put('/:id',async(req,res)=>{
    const {nombreAdmin, apellidoAdmin,
        superAdmin,fechaNacimientoAdmin,correoAdmin}=req.body;
        const newadmin= {
                nombreAdmin,
                apellidoAdmin,
                superAdmin,
                fechaNacimientoAdmin,
                correoAdmin
            }
       await Admin.findByIdAndUpdate(req.params.id,newadmin);
       console.log(req.params.id);
       res.json({status:'Task update'});
       // await admin.save();

});
router.delete('/:id',async(req,res)=>{
    await Admin.findByIdAndDelete(req.params.id);
    res.json({status: 'Task eliminado'})
});
module.exports=router;