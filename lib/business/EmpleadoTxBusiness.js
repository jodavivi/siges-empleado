const empleadoTxDao	 = require('../dao/EmpleadoTxDao');
const empleadoRxDao	 = require('../dao/EmpleadoRxDao');  
const utils 	     = require('../utils/utils'); 
 
/**
 * @description Función que permite registrar empleado
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.registrarEmpleado = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 var oEmpresa =  JSON.parse(oRequest.oAuditRequest.oEmpresa);

		 // Consultar empleado
		 var oFiltroEmpleado = {};
		 oFiltroEmpleado.sCodEmpresa = oEmpresa.CodEmpresa;
		 oFiltroEmpleado.sNumeroDocumento = oRequest.oData.sNumeroDocumento;
		 var consultarEmpleadoResponse = await empleadoRxDao.consultarEmpleado(oFiltroEmpleado);
		 if(consultarEmpleadoResponse.iCode === 1){
			throw new Error(101 + "||" + "Ya existe un empleado con el mismo numero de documento");
		 }

		 var oRegistroEmpleado = {};
		 oRegistroEmpleado.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroEmpleado.oData		  = oRequest.oData; 
		 oRegistroEmpleado.oData.sCodEmpresa  = oEmpresa.CodEmpresa;
		 oRegistroEmpleado.oData.sEmpresa  = oEmpresa.Empresa;
		 const crearEmpleadoResponse = await  empleadoTxDao.crearEmpleado(oRegistroEmpleado);
		 if(crearEmpleadoResponse.iCode !== 1){
			throw new Error(crearEmpleadoResponse.iCode + "||" + crearEmpleadoResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= crearEmpleadoResponse.oData;
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};


/**
 * @description Función que permite actualizar empleado
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.actualizarEmpleado = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
		var oEmpresa =  JSON.parse(oRequest.oAuditRequest.oEmpresa);
		// Consultar empleado
		var oFiltroEmpleado = {};
		oFiltroEmpleado.sCodEmpresa = oEmpresa.CodEmpresa;
		oFiltroEmpleado.sNumeroDocumento = oRequest.oData.sNumeroDocumento;
		var consultarEmpleadoResponse = await empleadoRxDao.consultarEmpleado(oFiltroEmpleado);
		if(consultarEmpleadoResponse.iCode === 1){
			var oEmpleado = consultarEmpleadoResponse.oData[0];
			if(oEmpleado.Id !== parseInt(req.params.id, 10)){
				throw new Error(101 + "||" + "Ya existe un empleado con el mismo numero de documento");
			} 
		}

		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		const actualizarEmpleadoResponse = await  empleadoTxDao.actualizarEmpleado(oRegistro);
		if(actualizarEmpleadoResponse.iCode !== 1){
		   throw new Error(actualizarEmpleadoResponse.iCode + "||" + actualizarEmpleadoResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarEmpleadoResponse.oData; 
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

/**
 * @description Función que permite eliminar Empleado
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.eliminarEmpleado = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
	 
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarEmpleadoResponse = await  empleadoTxDao.eliminarEmpleado(oRegistro);
			if(eliminarEmpleadoResponse.iCode !== 1){
				throw new Error(eliminarEmpleadoResponse.iCode + "||" + eliminarEmpleadoResponse.sMessage);
			} 
		});
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

