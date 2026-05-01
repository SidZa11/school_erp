import { Button, ConfigProvider, Flex, Layout, Space, Spin, TableProps, Tag } from "antd";
import SearchBox from "../shorts/search/SearchBox";
import { useEffect, useState } from "react";
import DropDown from "../shorts/dropdown/DropDown";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons'
import CustomTable from "../shorts/tables/CustomTable";
import CustomPagination from "../shorts/tables/CustomPagination";
import { useUser } from "../../hooks/user/useUser";
import NotificationMessage from "../Notification/NotificationMessage";
import CentralModal from "./CentralModal";
import EditUserDrawer from "./EditUserDrawer";

interface userList {
    iu_ID : number;
    iu_UserID : string;
    iu_Username: string;
    PasswordHash: string;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Gender: String;
    iu_RoleID: number;
    RoleName: String;
    IsActive: boolean;
    IsApproved: number;
    ApprovedDate: Date;
    ApprovedBy: number;
    Remark: String;
    CreatedDate: Date;
    DOB : Date;
}

const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };
  
  const content = <div style={contentStyle} />;

  const UserList: React.FC = () => {
    const [words, setWords] = useState<string>("");
    const [currentItem, setCurrentItem] = useState("Active");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [notification, setNotification] = useState<{
      message: string;
      icon: React.ReactNode;
      description?: string;
    } | null>(null);
    const [userData, setUserData] = useState<userList[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
  
    const { getUserList, loading, error } = useUser();
  
    useEffect(() => {
      const fetchUsers = async () => {
        const result = await getUserList({
          search: words,
          active: currentItem === "Active" ? 1 : 0,
          page: currentPage,
          pageSize,
        });
  
        if (result?.status === 200) {
          setUserData(result.data || []);
          setTotalPages(result.pagination?.TotalPages);
          setPageSize(result.pagination.PageSize)
        } else {
          setNotification({
            message: error?.message || "Request Failed",
            icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
            description: "Request timeout or Invalid request.",
          });
        }
      };
  
      fetchUsers();
    }, [words, currentItem, currentPage, pageSize]); // Run when any of these change
  
    const columns: TableProps<userList>["columns"] = [
      {
        title: "User ID",
        key: "iu_UserID",
        dataIndex: "iu_UserID",
      },
      {
        title: "Username",
        key: "iu_Username",
        dataIndex: "iu_Username",
      },
      {
        title: "Role",
        key: "RoleName",
        dataIndex: "RoleName",
      },
      {
        title: "Created Date",
        key: "CreatedDate",
        dataIndex: "CreatedDate",
        render: (text) => (new Date(text).toLocaleString().replace(',', ' '))
      },
      {
        title: "Status",
        key: "IsActive",
        dataIndex: "IsActive",
        render: (text: number) => (
          <Tag color={text == 1 ? "green" : "volcano"}>
            {text == 1 ? "Active" : "Inactive"}
          </Tag>
        ),
      },
      {
        title: "Actions",
        key: "PasswordHash",
        render: (_: any, record: userList) => (
          <Space size={"middle"} style={{cursor: "pointer"}}>
            <EditUserDrawer 
              triggerButton={
                <EditOutlined title="Edit" />
              }
              record={record}
            />
            <DeleteOutlined title="Delete" />
          </Space>
        ),
      },
    ];
  
    return (
      <div>
        <Layout style={{ background: "white" }}>
          {notification && (
            <NotificationMessage
              message={notification.message}
              icon={notification.icon}
              description={notification.description}
              placement="topLeft"
              duration={5}
            />
          )}
  
          <Layout.Header style={{ background: "transparent" }}>
            <Flex justify="space-between">
              <div style={{ width: "250px" }}>
                <SearchBox setWord={setWords} placeholder="search name" />
              </div>
              <Flex style={{ width: "150px" }} justify="space-between">
                <DropDown
                  items={[
                    {
                      key: "Active",
                      label: "Active",
                      onClick: () => setCurrentItem("Active"),
                    },
                    {
                      key: "Inactive",
                      label: "Inactive",
                      onClick: () => setCurrentItem("Inactive"),
                    },
                  ]}
                  currentItem={currentItem}
                />
                <CentralModal
                  triggerButton={
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          defaultActiveBorderColor: "#191361",
                          defaultActiveColor: "#191361",
                          defaultHoverBorderColor: "#191361",
                          defaultColor: "#191361",
                          defaultHoverColor: "#191361",
                        },
                      },
                    }}
                  >
                    <Button title="Create New User">
                      <PlusOutlined />
                    </Button>
                  </ConfigProvider>
                  }
                />
              </Flex>
            </Flex>
          </Layout.Header>
  
          <Layout.Content>
            {loading ? (
              <Spin tip="Loading">
                <div style={contentStyle} />
              </Spin>
            ) : (
              <CustomTable
                columns={columns}
                data={userData.map((item, i) => ({
                  key: (i + 1).toString(),
                  ...item,
                }))}
              />
            )}
          </Layout.Content>
  
          <Layout.Footer
            style={{
              width: "100%",
              height: "60px",
              background: "transparent",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <CustomPagination
              total={totalPages}
              setCurrentPage={setCurrentPage}
              setPageSize={setPageSize}
              pageSize={pageSize}
            />
          </Layout.Footer>
        </Layout>
      </div>
    );
  };
  
  export default UserList;
  