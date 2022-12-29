const empleado = require('../modelBd/entity/Empleado'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear un Empleado
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.crearEmpleado = async function (oParam) { 
    const oResponse = {};
    try {
        var seqEmpleado = "'" +config.seqEmpleado +"'";
        var seq = await utilsDao.obtenetSequencia(seqEmpleado); 
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal; 
        oRegistro.CodEmpresa = oParam.oData.sCodEmpresa;
        oRegistro.Empresa = oParam.oData.sEmpresa;
        oRegistro.CodTipoDocumento = oParam.oData.sCodTipoDocumento;
        oRegistro.TipoDocumento    = oParam.oData.sTipoDocumento;
        oRegistro.NumeroDocumento  = oParam.oData.sNumeroDocumento;
        oRegistro.Nombre                = oParam.oData.sNombre;
        oRegistro.Apellido              = oParam.oData.sApellido; 
        oRegistro.CodDepartamento       = oParam.oData.sCodDepartamento;
        oRegistro.Departamento          = oParam.oData.sDepartamento;
        oRegistro.CodProvincia          = oParam.oData.sCodProvincia;
        oRegistro.Provincia             = oParam.oData.sProvincia;
        oRegistro.CodDistrito           = oParam.oData.sCodDistrito;
        oRegistro.Distrito              = oParam.oData.sDistrito;
        oRegistro.Direccion             = oParam.oData.sDireccion;
        oRegistro.Telefono              = oParam.oData.sTelefono;
        oRegistro.CodEstadoEmpleado     = oParam.oData.iCodEstadoEmpleado; 
        oRegistro.EstadoEmpleado        = oParam.oData.sEstadoEmpleado; 
         
        const crearRegistroPromise = await empleado.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: empleado, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar Empleado 
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.actualizarEmpleado = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.sCodTipoDocumento !== undefined){
            oRegistro.CodTipoDocumento     = oParam.oData.sCodTipoDocumento; 
        }
        if(oParam.oData.sTipoDocumento !== undefined){
            oRegistro.TipoDocumento     = oParam.oData.sTipoDocumento; 
        }
        if(oParam.oData.sNumeroDocumento !== undefined){
            oRegistro.NumeroDocumento     = oParam.oData.sNumeroDocumento; 
        }
        if(oParam.oData.sNombre !== undefined){
            oRegistro.Nombre     = oParam.oData.sNombre; 
        }
        if(oParam.oData.sApellido !== undefined){
            oRegistro.Apellido     = oParam.oData.sApellido; 
        }
        if(oParam.oData.sRazonSocial !== undefined){
            oRegistro.RazonSocial     = oParam.oData.sRazonSocial; 
        }
        if(oParam.oData.sCodDepartamento !== undefined){
            oRegistro.CodDepartamento     = oParam.oData.sCodDepartamento; 
        }
        if(oParam.oData.sDepartamento !== undefined){
            oRegistro.Departamento     = oParam.oData.sDepartamento; 
        }
        if(oParam.oData.sCodProvincia !== undefined){
            oRegistro.CodProvincia     = oParam.oData.CodProvincia; 
        }
        if(oParam.oData.sProvincia !== undefined){
            oRegistro.Provincia     = oParam.oData.sProvincia; 
        }
        if(oParam.oData.sCodDistrito !== undefined){
            oRegistro.CodDistrito     = oParam.oData.sCodDistrito; 
        }
        if(oParam.oData.sDistrito !== undefined){
            oRegistro.Distrito     = oParam.oData.sDistrito; 
        }
        if(oParam.oData.sDireccion !== undefined){
            oRegistro.Direccion     = oParam.oData.sDireccion; 
        }
        if(oParam.oData.sTelefono !== undefined){
            oRegistro.Telefono     = oParam.oData.sTelefono; 
        }
        if(oParam.oData.iCodEstadoEmpleado !== undefined){
            oRegistro.CodEstadoEmpleado     = oParam.oData.iCodEstadoEmpleado; 
        }
        if(oParam.oData.sEstadoEmpleado !== undefined){
            oRegistro.EstadoEmpleado     = oParam.oData.sEstadoEmpleado; 
        }
       
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await empleado.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: empleado, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar Empleado 
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.eliminarEmpleado = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await empleado.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: empleado, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}