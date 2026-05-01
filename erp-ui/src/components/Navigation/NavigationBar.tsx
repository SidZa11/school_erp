import React from 'react';
import { Breadcrumb, Button, Dropdown, Layout, Menu, theme } from 'antd';
import SearchableTreeMenu from './SearchableTreeMenu';
import type { MenuProps } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useLogout } from '../../hooks/auth/useLogout';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    label: 'logout',
    key: '1',
    icon: <LogoutOutlined />
  }
];



const NavigationBar: React.FC<{main : React.JSX.Element}> = ({main}) => {
  const {logout} = useLogout()
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  
  const handleButtonClick = () => {
    console.log("c;licked!!")
    logout();
  };
  const menuProps = {
    items,
    onClick: handleButtonClick,
  };
  

  
  return (
    <Layout style={{ minHeight: '100vh', background: "#f5f6f7", fontFamily: "'Lora', serif" }}>
      <Sider collapsible theme='light' style={{background : "#33006F"}} trigger={null} collapsed={false}>
        <Menu mode='inline' theme='light' style={{background: "#33006F"}}>
          <SearchableTreeMenu />
        </Menu>
      </Sider>
      <Layout style={{background : "transparent"}}>
        <Header style={{ padding: "0 16px", background : "white", display : "flex", flexDirection : "row", width : "100%", justifyContent : "space-between"}}>
          <div>
            {/* LOGO */}
            <Breadcrumb style={{ height: "100%", width : "max-content", display: "flex", alignItems: "center", fontSize : "16px", color : "#191361" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <Dropdown menu={menuProps} placement='bottomRight' arrow>
              <Button
                type='primary'
                style={{
                  background : "#33006F",
                  letterSpacing: "1px",
                  borderRadius: "5px",
                  fontWeight: "500",
                }}
                className='hoverWhiteBold'
              >
                Z
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '16px', background : "#fff", borderRadius: "5px" }}>
          <main
            style={{
              // padding: 24,
              minHeight: 360,
              borderRadius: borderRadiusLG,
              width : "100%",
              height : "100%",
              overflow : "hidden"
            }}
          >
            {main}
          </main>
        </Content>
        <Footer style={{ textAlign: 'center', background : "white" }}>
          School ERP ©{new Date().getFullYear()} Created by Siddiqui
        </Footer>
      </Layout>
    </Layout>
  );
};

export default NavigationBar;




// Resizing Logic
//   const [scale, setScale] = useState(1);

//   useEffect(() => {
//     const updateScale = () => {
//       const baseWidth = 1280; // design's base resolution width
//       const baseHeight = 832; // design's base resolution height
//       const currentWidth = window.innerWidth;
//       const currentHeight = window.innerHeight;

//       // Calculate scale factor based on width or height
//       const widthScale = currentWidth / baseWidth;
//       const heightScale = currentHeight / baseHeight;
//       const scaleFactor = Math.max(widthScale, heightScale); // Maintain aspect ratio

//       setScale(widthScale);
//     };

//     updateScale(); // Initial scale calculation
//     window.addEventListener("resize", updateScale); // Update on window resize
//     return () => window.removeEventListener("resize", updateScale);
//   }, []);