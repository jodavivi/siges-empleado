const empleado = require('../modelBd/entity/Empleado');  

/**
 * @description Función que permite consultar los empleados
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.consultarEmpleado = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.sNumeroDocumento !== undefined){
            oFiltroLista.where.NumeroDocumento  = oFiltro.sNumeroDocumento; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        } 
         
        oFiltroLista.where.EstadoId     = 1; 
        const consultarListaResponse = await  empleado.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información del empleado'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: empleado, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}