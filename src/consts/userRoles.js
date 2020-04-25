import i18next from 'i18next';

export const UserRoles = {
    ADMIN : 'admin',
    OBSERVER:'observer',
    TECHNICIAN:'technician'
};

const UserRolesMapper = () => {
    return {
        [UserRoles.ADMIN]: i18next.t('users.roles.admin'),
        [UserRoles.OBSERVER]: i18next.t('users.roles.observer'),
        [UserRoles.TECHNICIAN]: i18next.t('users.roles.technician')
    };
};

export const getLabelForUserRole = (type) => {
    return  type ? UserRolesMapper()[type] : '';
};

export const isAdmin = (role) => {
    return role === UserRoles.ADMIN;
};
export const isTechnician = (role) => {
    return role === UserRoles.TECHNICIAN;
};
export const isObserver = (role) => {
    return role === UserRoles.OBSERVER;
};

export const getUserRolesTypes = () => {
    return [
        { value: UserRoles.ADMIN, label: getLabelForUserRole(UserRoles.ADMIN) },
        { value: UserRoles.OBSERVER, label: getLabelForUserRole(UserRoles.OBSERVER) },
        { value: UserRoles.TECHNICIAN, label: getLabelForUserRole(UserRoles.TECHNICIAN) }
    ];
};
