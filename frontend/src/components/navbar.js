export const Navbar = (props) => {
    return (
        <header>
            <h1>AceCoder</h1>
            <a className="profile-button">{props.isLoggedIn ? props.username : "LogIn"}</a>
        </header>
    );
}