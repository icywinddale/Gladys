/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */

/**
 * @apiDefine DeviceTypeSuccess
 * @apiSuccess {String} name Name of the deviceType.
 * @apiSuccess {String} type The type of the deviceType (binary, temperature, color ...)
 * @apiSuccess {String} identifier An unique identifier to identify this deviceType
 * @apiSuccess {String} tag The name of the deviceType for text/voice recognition
 * @apiSuccess {boolean} sensor If the deviceType is a sensor or not
 * @apiSuccess {String} unit The unit of the deviceType
 * @apiSuccess {integer} min The min value of the deviceType
 * @apiSuccess {integer} max The max value of the deviceType
 * @apiSuccess {boolean} display If the deviceType should be displayed in the view
 * @apiSuccess {integer} device The ID of the device of this deviceType
 */

/**
 * @apiDefine DeviceTypeParam
 * @apiParam {String} [name] Name of the deviceType.
 * @apiParam {String} type The type of the deviceType (binary, temperature, color ...)
 * @apiParam {String} [identifier] An unique identifier to identify this deviceType
 * @apiParam {String} [tag] The name of the deviceType for text/voice recognition
 * @apiParam {boolean} [sensor] If the deviceType is a sensor or not
 * @apiParam {String} [unit] The unit of the deviceType
 * @apiParam {integer} min The min value of the deviceType
 * @apiParam {integer} max The max value of the deviceType
 * @apiParam {boolean} [display] If the deviceType should be displayed in the view
 * @apiParam {integer} device The ID of the device of this deviceType
 */
  
module.exports = {
    
    /**
   * @api {get} /devicetype get all deviceType
   * @apiName getDeviceType
   * @apiGroup DeviceType
   * @apiPermission authenticated
   *
   * @apiParam {Integer} take the number of deviceType to return
   * @apiParam {Integer} skip the number of deviceType to skip
   * 
   * @apiUse DeviceTypeSuccess
   */
   index: function(req, res, next){
       gladys.deviceType.getAll()
         .then(function(deviceTypes){
             return res.json(deviceTypes);
         })
         .catch(next);
   },
    
   /**
   * @api {post} /devicetype create a deviceType
   * @apiName createDeviceType
   * @apiGroup DeviceType
   * @apiPermission authenticated
   *
   * @apiUse DeviceTypeParam
   * 
   * @apiUse DeviceTypeSuccess
   */
   create: function(req, res, next){
     
     gladys.deviceType.create(req.body)
           .then(function(deviceType){
               return res.json(deviceType);
           }) 
           .catch(next);
   },
  
 /**
   * @api {post} /devicetype/:id/exec change a deviceType state
   * @apiName execDeviceType
   * @apiGroup DeviceType
   * @apiPermission authenticated
   *
   * @apiParam {float} [value] New value to apply to the deviceType
   * 
   * @apiUse DeviceStateSuccess
   */
  exec: function(req, res, next){
      gladys.deviceType.exec({devicetype: req.params.id, value: req.body.value})
            .then(function(state){
                return res.json(state);
            })
            .catch(next);
  },
  
  /**
   * @api {get} /devicetype/room get by room
   * @apiName getDeviceTypeByRoom
   * @apiGroup DeviceType
   * @apiPermission authenticated
   *
   * 
   * @apiUse DeviceTypeSuccess
   * @apiSuccess {float} lastValue The last value of the deviceType
   * @apiSuccess {integer} lastValueId The ID of the last deviceState of this deviceType
   * @apiSuccess {datetime} lastChanged The last time this deviceType changed his value
   */
  getByRoom: function(req, res, next){
      gladys.deviceType.getByRoom()
        .then(function(roomsDeviceTypes){
           return res.json(roomsDeviceTypes); 
        })
        .catch(next);
  },

  /**
   * @api {get} /devicetype/:id get by id
   * @apiName getDeviceTypeById
   * @apiGroup DeviceType
   * @apiPermission authenticated
   *
   * 
   * @apiUse DeviceTypeSuccess
   * @apiSuccess {float} lastValue The last value of the deviceType
   * @apiSuccess {integer} lastValueId The ID of the last deviceState of this deviceType
   * @apiSuccess {datetime} lastChanged The last time this deviceType changed his value
   */
  getById: function(req, res, next) {
      gladys.deviceType.getById({id: req.params.id})
        .then((deviceType) => res.json(deviceType))
        .catch(next);
  },

  /**
   * @api {delete} /devicetype/:id delete deviceType
   * @apiName deleteDeviceType
   * @apiGroup DeviceType
   * @apiPermission authenticated
   */
  delete: function(req, res, next){
      gladys.deviceType.delete({id: req.params.id})
        .then(() => res.json({success: true}))
        .catch(next);
  }
  
};