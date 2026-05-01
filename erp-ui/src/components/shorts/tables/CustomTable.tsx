import { ConfigProvider, Table } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}


const CustomTable= ({columns, data} : {columns : any[], data : any[]}) => (
  <ConfigProvider
    theme={{
      components: {
        Table: {
          // sizeLG: 24
        }
      }
    }}
  >
    <Table<DataType> columns={columns} dataSource={data} pagination={false} />
  </ConfigProvider>
)


export default CustomTable;