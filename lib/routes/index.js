const express = require('express');
const router = express.Router();

const empleadoRxBusiness        = require('../business/EmpleadoRxBusiness');  
const empleadoTxBusiness        = require('../business/EmpleadoTxBusiness');  

module.exports = function(){

    //empleado
    router.post('/', empleadoTxBusiness.registrarEmpleado); 
    router.put('/:id', empleadoTxBusiness.actualizarEmpleado); 
    router.delete('/', empleadoTxBusiness.eliminarEmpleado);  
    router.get('/', empleadoRxBusiness.consultarEmpleado); 
 
    return router;
}

