<template>
    <div class="container">
        <!--UserRegister-->
        <RoleRegister v-if="hasPermissionCreateRole === createRole" :role="role" :editMode="editMode"></RoleRegister>
        <!--//-->
        <div class="row">
            <!--//-->
            <div class="col-md-12 text-center">
                <div class="row">
                    <div class="col-md-4">
                        <h3>Role Register</h3>
                    </div>
                    <div v-if="hasPermissionCreateRole === createRole" class="col-md-3 offset-5">
                        <button @click="registerUser()" class="btn btn-success">
                            <span><i class="fa fa-user-plus"></i>Register</span>
                        </button>
                        <button id="close"
                                ref="closeRegister"
                                class="btn btn-primary"
                                @click="closeModal()">open
                        </button>
                    </div>
                </div>
            </div>
            <!--//-->
            <form @submit.prevent="onFullTextSearch()" class="form-inline w-50 m-auto">
                <div class="input-group w-100 my-3">
                    <input type="text"
                           name="full_text_search"
                           id="full-text-search"
                           v-model="full_text_search"
                           class="form-control"
                           placeholder="Search...">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
            <!--//-->
            <h1 class="text-center">Acl for {{ permissions.username }}</h1>
            <!--//-->
            <table class="table
            table-hover
            table-light
            shadow-lg
            table-striped
            tab-content
            table-bordered">
                <!--//-->
                <thead class="text-center">
                <tr class="text-center">
                    <th class="text-center">Employees</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-for="permission in permissions.PermissionUsers">
                    <td>
                        <span v-text="permission.Permission.name"></span>
                        <input type="checkbox">
                    </td>
                </tr>
                </tbody>
                <!--//-->
            </table>
            <!---------pagination----------->
            <nav aria-label="...">
                <ul class="pagination pagination-sm">
                    <li v-if="current_page > 1"
                        class="page-item">
                        <a @click.prevent="changePage(current_page - 1)"
                           disabled="disabled"
                           class="page-link" href="#" tabindex="-1">
                            Previous
                        </a>
                    </li>
                    <li v-for="page in pages"
                        id="colorBtn"
                        class="page-item">
                        <a @click.prevent="changePage(page)" class="page-link" href="#">{{ page }}</a>
                    </li>
                    <li v-if="current_page < last_page" class="page-item">
                        <a @click.prevent="changePage(current_page + 1)" class="page-link"
                           href="#">Next</a>
                    </li>
                </ul>
            </nav>
            <!--:key="page === current_page"-->
            <!---------pagination----------->
        </div>
    </div>

</template>

<script>
    import $ from 'jquery';
    import RoleRegister from '../../components/panel/RoleRegister';
    import UserShow from '../../components/panel/modal/UserShow';
    import HelperFunctions from '../../helpers/HelperFunctions';

    import {mapState} from 'vuex'

    window.$ = $;
    export default {
        //middleware: 'checkAuthEmployee',
        //props: ['user', 'editMode'],
        layout: 'panel',
        name: "Acl",
        components: {RoleRegister, UserShow},
        data() {
            return {
                allRole: 'all-role',
                viewRole: 'view-role',
                createRole: 'create-role',
                updateRole: 'update-role',
                destroyRole: 'destroy-role',
                allAcl: 'all-acl',
                viewAcl: 'view-acl',
                createAcl: 'create-acl',
                updateAcl: 'update-acl',
                destroyAcl: 'destroy-acl',
                full_text_search: '',
                page: 1,
                getUsers: {},
                offset: 4,
                name: '',
                permission: '',
                role: '',
                editMode: false,
                showUser: {
                    first_name: '',
                    last_name: '',
                    username: '',
                    email: '',
                },
            }
        },
        mounted() {
            return this.$store.dispatch('Roles/getRoles')
                .then(() => {
                    this.$store.dispatch('Acl/isPermissions')
                });
        },
        computed: {
            ...mapState({
                permissions: state => state.Acl.isPermissions.data,
                per_page: state => state.Roles.getRoles.per_page,
                last_page: state => state.Roles.getRoles.last_page,
                from: state => state.Roles.getRoles.from,
                to: state => state.Roles.getRoles.to,
                current_page: state => state.Roles.getRoles.current_page,
                total: state => state.Roles.getRoles.total,
                roles: state => state.Roles.getRoles.data,
                //showUser: state => state.Users.isUser,
                editUser: state => state.Roles.isUser,
                //deleteUser: state => state.Users.isUser,
            }),
            pages() {
                let pagesArray = [];
                var form = this.current_page - this.offset;
                if (form < 1) {
                    form = 1
                }
                var to = form + (this.offset * 2);
                if (to >= this.last_page) {
                    to = this.last_page;
                }
                while (form <= to) {
                    pagesArray.push(form);
                    form++;
                }
                return pagesArray;
            },
            hasPermissionAllRole() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.allRole).toString();
            },
            hasPermissionViewRole() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.viewRole).toString();
            },
            hasPermissionCreateRole() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.createRole).toString();
            },
            hasPermissionUpdateRole() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.updateRole).toString();
            },
            hasPermissionDestroyRole() {
                let permissions = window.localStorage.getItem('permissions').split(",");
                return permissions.filter(x => x === this.destroyRole).toString();
            },
        },
        methods: {
            changePage(page) {
                //this.current_page = page;
                return this.$store.dispatch('Roles/getRoles', page);
            },
            closeModal() {
                HelperFunctions.closeModal();
            },
            roleShow(user) {
                this.showUser = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    email: user.email,
                };
            },
            roleEdit(role) {
                this.editMode = true;
                this.role = role;
            },
            roleDelete(id) {
                return this.$store.dispatch('Users/deleteUser', {id});
            },
            registerUser() {
                this.editMode = false;
                this.user = '';
                $('#register').toggle();
            },
            onFullTextSearch() {
                const full_text_search = this.full_text_search;
                return this.$store.dispatch('Users/searchUser', {full_text_search});
            },
        }
    }
</script>

<style scoped>

</style>
