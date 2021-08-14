const AccessControl = require('accesscontrol');

let grantsObject = {
    admin: {
        cat: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
        },
    },
    user: {
        cat: {
            'read:any': ['*'],
        },
    },
};

const roles = new AccessControl(grantsObject);

module.exports = { roles };
