const empleadoRxDao = require('../dao/EmpleadoRxDao'); 
const utils 		 = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar empleado
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.consultarEmpleado = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroEmpleado = {};
		 oFiltroEmpleado.sNumeroDocumento  = req.query.sNumeroDocumento;
		 oFiltroEmpleado.iId 	  		= req.query.iId; 
		 var consultarEmpleadoResponse =  await empleadoRxDao.consultarEmpleado(oFiltroEmpleado);
		 if(consultarEmpleadoResponse.iCode !== 1){
			throw new Error(consultarEmpleadoResponse.iCode + "||" + consultarEmpleadoResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarEmpleadoResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 