import Login from "../../components/auth/Login"



const LoginPage = () => {
    return (
        <div
            style={
                {
                    margin : "auto",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center"
                }
            }
        >
            <Login />
        </div>
    );
};

export default LoginPage