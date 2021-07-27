<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg shadow-lg navbar-light bg-light">
            <ul class="navbar-nav justify-content-center w-100"
                v-for="item in items"
                :key="item.id">
                <div class="row justify-content-center w-100">
                    <li class="
                    nav-item
                    btn
                    mx-3
                    col-xl-2
                    col-lg-2
                    col-md-6
                    col-sm-12
                    col-xs-12"
                        :class="item.border"
                        :style="item.color">
                        <i :class="item.icon"></i>
                        <nuxt-link class="nav-link"
                                   :to="item.route"
                                   v-text="item.title">
                        </nuxt-link>
                    </li>
                </div>
            </ul>
        </nav>
    </div>
</template>

<script>
    import HeaderItems from '../../api/panel/HeaderItems.json';

    export default {
        middleware: 'checkAuthEmployee',
        name: "Header",
        data() {
            return {
                items: HeaderItems
            }
        }
    }
</script>

<style scoped>

</style>
