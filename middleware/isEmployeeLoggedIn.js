export default function ({store, redirect}) {
    //if (store.state.auth.loggedIn && window.localStorage.getItem('is-admin')) {
    if (store.state.auth.loggedIn || window.localStorage.getItem('is-admin')) {
        return redirect('/panel/dashboard')
    }
}
