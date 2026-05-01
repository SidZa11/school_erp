import React from 'react';
import { ConfigProvider, Input} from 'antd';
// import type { GetProps } from 'antd';
import './seach.css'

// type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

interface SearchBoxType {
    setWord : (word: string) => void;
    placeholder? : string;
}

const SearchBox: React.FC<SearchBoxType> = ({
    setWord,
    placeholder
}) => {
    // const onSearch: SearchProps['onSearch'] = (value) => setWord(value);
    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        activeBorderColor: "#191361",
                        hoverBorderColor:  "#191361",
                        addonBg: "#191361 !important"
                    },
                    Button: {
                        borderColorDisabled: 'true',
                    }
                }
            }}
        >
            <Search
                placeholder= {placeholder || "input search text"}
                enterButton
                allowClear
                size="middle"
                // onSearch={onSearch}
                onChange={(e) => setWord(e.target.value)}
            />
        </ConfigProvider>
    );
};

export default SearchBox;