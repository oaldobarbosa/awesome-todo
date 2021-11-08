import { LocalStorage } from "quasar";

//verificar se o usuário está logado, caso não esteja, redireciona para página de login/registro
export default ({ router }) => {
    
    router.beforeEach((to, from, next) => {

        let loggedIn = LocalStorage.getItem('loggedIn');
        
        if (!loggedIn && to.path !== '/auth' ) {
            next('/auth')            
        } else {
            next()
        }
    })
}
