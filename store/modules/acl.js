import {success, error} from '../../helpers/ErrorHandler';

/*
|--------------------------------------------------------------------------
| State Part
|--------------------------------------------------------------------------
*/
const state = () => ({
    allPermissions: {},
    isPermissions: {},
    getPermissions: {},
    allRoles: {},
    isRoles: {},
    getRoles: {},
});

/*
|--------------------------------------------------------------------------
| Getters Part
|--------------------------------------------------------------------------
*/
const getters = {
    allPermissions(state) {
        return state.allPermissions
    },
    isPermissions(state) {
        return state.isPermissions
    },
    getPermissions(state) {
        return state.getPermissions
    },
    /*allRoles(state) {
        return state.allRoles
    },*/
};

/*
|--------------------------------------------------------------------------
| Actions Part
|--------------------------------------------------------------------------
*/
const actions = {

    /**
     *
     * @param context
     * @param all
     * @returns {Promise<void>}
     */
    async allPermissions(context, all = 'all') {
        await this.$axios.get(`panel/roles/permissions?all=${all}`)
            .then(res => {
                const allPermissions = res.data.data;
                context.commit('allPermissions', allPermissions);
                //success(res)
            }).catch(err => {
                error(err)
            })
    },

    /**
     *
     * @param context
     */
    async isPermissions(context, payload) {
        await this.$axios.get(`panel/users/user-acl/${payload.id}`)
            .then(res => {
                const isPermissions = res.data.data;
                context.commit('isPermissions', isPermissions);
                return this.$router.push('acl')
            }).catch(err => {
                error(err)
            })
    },

    /**
     *
     * @param context
     */
    async getPermissions(context, page = 1) {
        await this.$axios.get(`panel/article-categories?page=${page}`)
            .then(res => {
                const getArticleCategories = res.data.data;
                context.commit('getArticleCategories', getArticleCategories);
            }).catch(err => {
                error(err)
            })
    },

    /**
     *
     * @param context
     * @param payload
     * @returns {Promise<void>}
     * @constructor
     */
    async registerAcl(context, payload) {
        let formData = new FormData();

        formData.append('userId', payload.userId);
        formData.append('role', payload.role);
        formData.append('permissions', payload.permissions);

        await this.$axios.post('panel/roles/permissions', formData)
            .then(res => {
                const getArticleCategories = res.data.data;
                context.commit('getArticleCategories', getArticleCategories);
                success(res);
                this.$router.push('/panel/article-categories');
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
    async updateAcl(context, payload) {
        let formData = new FormData();
        formData.append('employeeId', payload.employeeId);
        formData.append('name', payload.name);
        formData.append('description', payload.description);
        formData.append('state', payload.state);
        formData.append('image', payload.image);

        await this.$axios.post('panel/article-categories/store', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            .then(res => {
                const getArticleCategories = res.data.data;
                context.commit('getArticleCategories', getArticleCategories);
                success(res);
                this.$router.push('/panel/article-categories');
            }).catch(err => {
                error(err);
            })
    },
};

/*
|--------------------------------------------------------------------------
| Mutations Part
|--------------------------------------------------------------------------
*/
const mutations = {
    allPermissions(state, payload) {
        state.allPermissions = payload
    },
    isPermissions(state, payload) {
        state.isPermissions = payload
    },
    getPermissions(state, payload) {
        state.getPermissions = payload
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
