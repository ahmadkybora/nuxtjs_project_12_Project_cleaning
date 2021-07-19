export default function ({ store, redirect }) {
    if (window.localStorage.getItem('roles') === "User" || "Super Admin" || "Admin") {
        return redirect('/')
    }
}
