<template>
    <div>
        <Navbar/>
        <Header/>
        <div class="row">
            <Sidebar/>
            <Nuxt/>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import Navbar from "./products/Navbar";
    import Header from "./products/Header";
    import Sidebar from "./products/Sidebar";
    import Footer from "./front/Footer";

    export default {
        name: "products",
        components: {Footer, Sidebar, Navbar, Header}
    }
</script>

<style scoped>

</style>
