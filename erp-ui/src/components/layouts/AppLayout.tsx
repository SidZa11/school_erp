import NavigationBar from "../Navigation/NavigationBar"



const APPLayout : React.FC<{children : React.JSX.Element}> = ({children}) => {
    return (
        <NavigationBar
            main={children}
        />
    );
};

export default APPLayout;