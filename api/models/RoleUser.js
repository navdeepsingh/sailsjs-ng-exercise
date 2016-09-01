/**
 * RoleUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: "users_roles",

	attributes: {
		'userId': {
            columnName:'user_id',
            type:'integer',
            foreignKey:'true',
            references:'user',
            on:'id',
            via:'user'
        },
        'roleId': {
            columnName:'role_id',
            type:'integer',
            foreignKey:'true',
            references:'role',
            on:'id',
            via:'role'
        }
}
};

