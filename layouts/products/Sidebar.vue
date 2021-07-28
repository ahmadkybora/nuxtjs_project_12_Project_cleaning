<template>
    <div class="container-fluid col-lg-3">
        <!--//-->
        <div class="jumbotron">
            <!--//-->
            <div class="col">
                <form action="" class="form-inline w-100 m-auto">
                    <div class="input-group w-100">
                        <input type="text"
                               v-model="search"
                               class="form-control"
                               placeholder="Search by Brand...">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <!--//-->
            <div class="col">
                <input type="checkbox">
            </div>
            <!--//-->
        </div>
        <!--//-->
        <div class="jumbotron">
            <!--//-->
            <div class="col">
                <form action="" class="form-inline w-100 m-auto">
                    <div class="input-group w-100">
                        <input type="text"
                               v-model="search"
                               class="form-control"
                               placeholder="Search by category...">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <!--//-->
            <div class="col">
                <input type="checkbox">
            </div>
            <!--//-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {
                search: ''
            }
        }
    }
</script>

<style scoped>

</style>
