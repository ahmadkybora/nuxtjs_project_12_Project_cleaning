<template>
    <div class="container-fluid">
        <!--//-->
        <nav class="navbar navbar-expand-lg navbar-light shadow-sm">
            <button class="navbar-toggler" data-toggle="collapse" data-target="#mynav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mynav">
                <ul class="navbar-nav justify-content-center w-100 list-unstyled my-3 my-md-0">
                    <div class="row justify-content-center w-100">
                        <!--//-->
                        <li class="nav-item
                mx-4
                col-xl-1
                col-lg-1
                col-md-2
                col-sm-4
                col-xs-12">
                            <nuxt-link to="/" class="nav-link">
                                <i class="fa fa-home btn"></i>
                                Home
                            </nuxt-link>
                        </li>
                        <!--//-->
                        <li class="nav-item
                mx-4
                dropdown
                col-xl-1
                col-lg-1
                col-md-2
                col-sm-4
                col-xs-12">
                            <a href="#"
                               class="nav-link dropdown-toggle"
                               data-toggle="dropdown">
                                <i class="fa fa-home btn"></i>
                                Products
                            </a>
                            <div class="dropdown-menu">
                                <nuxt-link to="/" class="dropdown-item">
                                    Pro1
                                </nuxt-link>
                            </div>
                        </li>
                        <!--//-->
                        <li class="nav-item
                mx-4
                dropdown
                col-xl-1
                col-lg-1
                col-md-2
                col-sm-4
                col-xs-12">
                            <a href=""
                               class="nav-link dropdown-toggle"
                               data-toggle="dropdown">
                                <i class="fa fa-home btn"></i>
                                Articles
                            </a>
                            <div class="dropdown-menu">
                                <nuxt-link to="/" class="dropdown-item">
                                    Ar1
                                </nuxt-link>
                            </div>
                        </li>
                        <!--//-->
                        <li class="nav-item
                mx-4
                dropdown
                col-xl-1
                col-lg-1
                col-md-2
                col-sm-4
                col-xs-12">
                            <a href="#"
                               class="nav-link dropdown-toggle"
                               data-toggle="dropdown">
                                <i class="fa fa-home btn"></i>
                                Threads
                            </a>
                            <div class="dropdown-menu">
                                <nuxt-link to="/" class="dropdown-item">
                                    Th1
                                </nuxt-link>
                            </div>
                        </li>
                        <!--//-->
                        <li class="nav-item
                mx-4
                col-xl-1
                col-lg-1
                col-md-2
                col-sm-4
                col-xs-12">
                            <a href="" class="nav-link">
                                <i class="fa fa-home btn"></i>
                                About
                            </a>
                        </li>
                        <!--//-->
                        <li class="nav-item
                mx-4
                col-xl-1
                col-lg-1
                col-md-2
                col-sm-4
                col-xs-12">
                            <a href="" class="nav-link">
                                <i class="fa fa-home btn"></i>
                                Contact Us
                            </a>
                        </li>
                        <!--//-->
                        <li class="nav-item
                mx-4
                col-xl-1
                col-lg-1
                col-md-2
                col-sm-4
                col-xs-12">
                            <nuxt-link to="/chats" class="nav-link">
                                <i class="fa fa-home btn"></i>
                                Chat Room
                            </nuxt-link>
                        </li>
                        <!--//-->
                    </div>
                </ul>
            </div>
        </nav>
        <!--//-->
        <!--<div class="row">
            <div class="col" v-for="item in items" :key="item.id">
                <div :style="item.color">
                    <nuxt-link class="btn" v-text="item.title" :to="item.route" prefetch></nuxt-link>
                    <div class="text-center" :style="item.color"><i :class="item.icon"></i></div>
                </div>
            </div>
        </div>-->
    </div>
</template>

<script>
    import HeaderItems from '../../api/front/HeaderItems.json';

    export default {
        name: 'Header',
        data() {
            return {
                items: HeaderItems,
                responsive: {
                    XS: 576, // XS < 576 px
                    SM: 576, // SM >= 576 px
                    MD: 768, // MD >= 768 px
                    LG: 992, // LG >= 992 px
                    XL: 1200, // XL >= 1200 px
                    XXL: 1400, // XXl >= 1400 px
                }
            }
        }
    }
</script>

<style scoped>
    .btn {
        background-color: aquamarine;
        border-radius: 15px;
    }

    .container-fluid {
        background-color: skyblue;
        border-radius: 15px;
    }
</style>
