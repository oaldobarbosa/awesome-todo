<template>
    <q-layout view="hHh LpR fff">

        <q-header elevated>
        <q-toolbar>

            <q-toolbar-title class="absolute-center"> 
            Awesome Todo 
            </q-toolbar-title>

            <q-btn v-if="!loggedIn" to="/auth" flat icon-right="account_circle" label="Login" class="absolute-right" />
            <q-btn v-if="loggedIn" @click="logoutUser" flat icon-right="logout" label="Logout" class="absolute-right" />
        </q-toolbar>
        </q-header>

        <q-footer reveal>
            <q-tabs>
                <q-route-tab
                v-for="nav in navs"
                :key="nav.index"
                :to="nav.to"
                :icon="nav.icon"
                :label="nav.label"
                exact
                />
            </q-tabs>
        </q-footer>

        <q-drawer
        v-model="leftDrawerOpen"
        :breakpoint="767"
        :width="250"
        show-if-above
        bordered
        content-class="bg-primary"
        >
        <q-list dark>
            <q-item-label header >Navigation</q-item-label>

            <q-item
            v-for="nav in navs"
            v-bind:key="nav.label"
            :to="nav.to"
            class="text-grey-4"
            exact
            clickable
            >
            <q-item-section avatar>
                <q-icon :name="nav.icon" />
            </q-item-section>
            <q-item-section>
                <q-item-label>{{ nav.label }}</q-item-label>
            </q-item-section>
            </q-item>
        </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
    import { mapState, mapActions } from "vuex";//mapear o State e as Actions

    export default {
        name: "MainLayout",
        data() {
            return {
            leftDrawerOpen: false,
            navs: [
                {
                label: "Todo",
                icon: "list",
                to: "/",
                },
                {
                label: "Settings",
                icon: "settings",
                to: "/settings",
                },
                {
                label: "About",
                icon: "info",
                to: "/about",
                },
            ],
            };
        },
        computed:{
            ...mapState('auth', ['loggedIn']) //mapear o state do auth
        },
        methods: {
            ...mapActions('auth', ['logoutUser'] ) //mapear ação de logout
        }
    };
</script>

<style lang="scss" >

@media screen and (min-width: 768px){
    .q-footer{
        display: none;
    }
}

.q-drawer{
    .q-router-link--exact-active{
        color: white !important;
    }
} 

</style>