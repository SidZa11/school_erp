import React, { useEffect, useState } from 'react';
import { ConfigProvider, Pagination } from 'antd';

interface CustomPaginationType {
    total : number;
    defaultPageSize? : number;
    pageSize : number;
    setCurrentPage: (page:number) => void;
    setPageSize : (pageSize: number) => void;
}

const CustomPagination: React.FC<CustomPaginationType> = ({total, pageSize, defaultPageSize, setCurrentPage, setPageSize}) => {
    const [totalPage, setTotalPage] = useState(total);
    function handleChange(page:number, pageSize:number) {
        setCurrentPage(page);
        setPageSize(pageSize);
        setTotalPage(total*pageSize)
    }
    useEffect(() => {setTotalPage(pageSize*total)}, [pageSize, total])
    return (
        <div style={{ width: "max-content" }}>
            <ConfigProvider
                theme={{
                    components: {
                        Pagination: {
                            // itemActiveBg: "#D5D5D5",
                        }
                    }
                }}
            >        
                <Pagination 
                    size="small" 
                    total={totalPage} 
                    showSizeChanger 
                    pageSizeOptions={[5, 10, 15, 20]} 
                    defaultPageSize={defaultPageSize || 5} 
                    showQuickJumper
                    onChange={(page, pageSize) => handleChange(page, pageSize)} />
            </ConfigProvider>
        </div>
    );
};

export default CustomPagination;