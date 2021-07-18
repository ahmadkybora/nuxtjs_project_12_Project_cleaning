import {success, error} from '../../helpers/ErrorHandler';

const state = () => ({
    isAdmin: window.localStorage.getItem('is-admin'),
    username: window.localStorage.getItem('username'),
    full_name: window.localStorage.getItem('full-name'),
    roles: window.localStorage.getItem('roles'),
    permissions: window.localStorage.getItem('permissions'),
    forgetPassword: window.localStorage.getItem('forget-password'),

    /*isAdmin: '',
    username: '',
    full_name: '',
    roles: '',
    permissions: '',
    forgetPassword: '',*/
});

const getters = {
    isAdmin(state) {
        return state.isAdmin
    },
    username(state) {
        return state.isAdmin
    },
    full_name(state) {
        return state.isAdmin
    },
    roles(state) {
        return state.isAdmin
    },
    permissions(state) {
        return state.isAdmin
    },
    forgetPassword(state) {
        return state.forgetPassword
    },
    myPermissions(state) {
        return state.myPermissions
    },
    isAuthenticated(state) {
        return state.auth.loggedIn
    },
    getUsers(state) {
        return state.forgetPassword
    },
};

const actions = {

    /**
     *
     * @param context
     * @param payload
     */
    async isUserRegister(context, payload) {
        const register = {
            first_name: payload.first_name,
            last_name: payload.last_name,
            username: payload.username,
            email: payload.email,
            mobile: payload.mobile,
            home_phone: payload.home_phone,
            zip_code: payload.zip_code,
            password: payload.password,
            confirmation_password: payload.confirmation_password,
            home_address: payload.home_address,
            work_address: payload.work_address,
        };
        await this.$axios.post('register', register)
            .then(async res => {
                const isRegister = res.data.data;
                context.commit('isRegister', isRegister);
                await success(res);
                this.$router.push('/panel/login');
            }).catch(err => {
                error(err);
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isAdminLogin(context, payload) {
        const login = {
            google_rECAPTCHA: payload.google_rECAPTCHA,
            username: payload.username,
            password: payload.password,
        };

        await this.$axios.post('login', login)
            .then(async (result) => {
                if (result) {
                    const auth = await this.$auth.loginWith('local',
                        {data: login}
                    );
                    if (auth) {
                        const isAdmin = auth.data.data.isAdmin;
                        const username = auth.data.data.username;
                        const full_name = auth.data.data.first_name + ' ' + auth.data.data.last_name;
                        const token = auth.data.data.accessToken;
                        const roles = auth.data.data.roles;
                        const permissions = auth.data.data.permissions;

                        /*context.commit('isAdmin', isAdmin);
                        context.commit('username', username);
                        context.commit('full_name', full_name);
                        context.commit('roles', roles);
                        context.commit('permissions', permissions);*/

                        window.localStorage.setItem('is-admin', isAdmin);
                        window.localStorage.setItem('username', username);
                        window.localStorage.setItem('full-name', full_name);
                        window.localStorage.setItem('roles', roles);

                        let myPermissions = [];
                        for (let i = 0; i < permissions.length; i++) {
                            myPermissions[i] = permissions[i].Permission.name;
                        }

                        window.localStorage.setItem('permissions', myPermissions);
                        await this.$auth.setUser(username);
                        await this.$auth.setUserToken(token);

                        return this.$router.push('panel/dashboard');
                    }
                }
            })
            .catch(async err => {
                await error(err);
                return this.$router.push('errors/401')
            });
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async isUserLogin(context, payload) {
        const login = {
            google_rECAPTCHA: payload.google_rECAPTCHA,
            username: payload.username,
            password: payload.password,
        };

        await this.$axios.post('login', login)
            .then(async (result) => {
                if (result) {
                    const auth = await this.$auth.loginWith('local',
                        {data: login}
                    );
                    if (auth) {
                        const isAdmin = auth.data.data.isAdmin;
                        const username = auth.data.data.username;
                        const full_name = auth.data.data.first_name + ' ' + auth.data.data.last_name;
                        const token = auth.data.data.accessToken;
                        const roles = auth.data.data.roles;
                        const permissions = auth.data.data.permissions;

                        /*context.commit('isAdmin', isAdmin);
                        context.commit('username', username);
                        context.commit('full_name', full_name);
                        context.commit('roles', roles);
                        context.commit('permissions', permissions);*/

                        window.localStorage.setItem('is-admin', isAdmin);
                        window.localStorage.setItem('username', username);
                        window.localStorage.setItem('full-name', full_name);
                        window.localStorage.setItem('roles', roles);

                        let myPermissions = [];
                        for (let i = 0; i < permissions.length; i++) {
                            myPermissions[i] = permissions[i].Permission.name;
                        }

                        window.localStorage.setItem('permissions', myPermissions);
                        await this.$auth.setUser(username);
                        await this.$auth.setUserToken(token);

                        if (isAdmin === true) {
                            return this.$router.push('panel/dashboard');
                        } else {
                            return this.$router.push('/');
                        }
                    }
                }
            })
            .catch(async err => {
                await error(err);
                return this.$router.push('errors/401')
            });
    },

    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async isUserLogout(context) {
        await this.$axios.get('logout')
            .then(async result => {
                if (result) {
                    await this.$auth.logout();
                    window.localStorage.removeItem('is-admin');
                    window.localStorage.removeItem('username');
                    window.localStorage.removeItem('full-name');
                    window.localStorage.removeItem('roles');
                    window.localStorage.removeItem('permissions');

                    /*const isAdmin = context.isAdmin;
                    const username = context.username;
                    const full_name = context.full_name;
                    const roles = context.roles;
                    const permissions = context.permissions;

                    context.commit('isAdmin', isAdmin);
                    context.commit('username', username);
                    context.commit('full_name', full_name);
                    context.commit('roles', roles);
                    context.commit('permissions', permissions);*/
                }
            })
            .catch(err => {
                error(err);
            });
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async forgetPassword(context, payload) {
        const forgetPassword = {
            google_rECAPTCHA: payload.google_rECAPTCHA,
            email: payload.email,
        };
        await this.$axios.post('forget-password', forgetPassword)
            .then(async (res) => {
                const forgetPassword = res.data.data.data;
                console.log(forgetPassword);
                //window.localStorage.setItem('forget-password', forgetPassword);
                context.commit('forgetPassword', forgetPassword);
                //console.log(forgetPassword);
                await success(res);
                return this.$router.push('/')
            }).catch((err) => {
                error(err)
            });
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     */
    async resetPassword(context, payload) {
        const resetPassword = {
            google_rECAPTCHA: payload.google_rECAPTCHA,
            signature: payload.signature,
            current_password: payload.current_password,
            new_password: payload.new_password,
            new_confirmation_password: payload.new_confirmation_password,
        };
        await this.$axios.post('reset-password/:signature', resetPassword)
            .then(async (res) => {
                const forgetPassword = res.data.data.data;
                //window.localStorage.setItem('forget-password', forgetPassword);
                context.commit('forgetPassword', forgetPassword);
                await success(res);
                return this.$router.push('/')
            }).catch((err) => {
                error(err)
            });
    },
};

const mutations = {
    isAdmin(state, payload) {
        state.isAdmin = payload.isAdmin
    },
    username(state, payload) {
        state.isAdmin = payload.username
    },
    full_name(state, payload) {
        state.isAdmin = payload.full_name
    },
    roles(state, payload) {
        state.isAdmin = payload.roles
    },
    permissions(state, payload) {
        state.isAdmin = payload.permissions
    },
    forgetPassword(state, payload) {
        state.forgetPassword = payload
    },
    myPermissions(state, payload) {
        console.log(payload.myPermissions);
        state.myPermissions = payload.myPermissions;
    },
    accessToken(state, payload) {
        state.token = payload.token
    },
    isUserRegister(state, payload) {
        state.status = 'success';
        state.token = payload.token;
        state.user = payload.user;
    },
    isUserLogin(state, payload) {
        state.isAdmin = payload.isAdmin;
        state.username = payload.username;
        state.full_name = payload.full_name;
        state.roles = payload.roles;
        state.permissions = payload.permissions;
    },
    isUserLogout(state) {
        state.token = '';
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
