import React, { useState } from 'react';
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import { Input, Tree } from 'antd';
import './Navigation.css'
import type { TreeDataNode } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [{ title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> }],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined /> },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined /> },
        ],
      },
    ],
  },
];

const SearchableTreeMenu: React.FC = () => {

  const showLeafIcon  : React.ReactNode = true;
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredTreeData, setFilteredTreeData] = useState<TreeDataNode[]>(treeData);

  // Function to filter tree nodes based on search value
  const filterTreeData = (data: TreeDataNode[], search: string): TreeDataNode[] => {
    const lowerSearch = search.toLowerCase();
    const filteredNodes: TreeDataNode[] = [];

    data.forEach((node) => {
      // Extract title as string for searching
      const title = typeof node.title === 'string' ? node.title : node.title?.toString() || '';
      const titleMatches = title.toLowerCase().includes(lowerSearch);

      // Recursively filter children
      const filteredChildren = node.children ? filterTreeData(node.children, search) : [];

      // Include node if title matches or any child matches
      if (titleMatches || filteredChildren.length > 0) {
        filteredNodes.push({
          ...node,
          children: filteredChildren,
        });
      }
    });

    return filteredNodes;
  };

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      const filtered = filterTreeData(treeData, value);
      setFilteredTreeData(filtered);
    } else {
      setFilteredTreeData(treeData); // Reset to original treeData if search is cleared
    }
  };

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <div style={{ width: "100%" , background : "#33006F"}}>
      <div style={{ marginBottom: 16, marginTop : 16, padding: "0 5px", background : "#33006F" }}>
        <Input.Search
          placeholder="Search tree..."
          value={searchValue}
          onChange={handleSearch}
          style={{ marginBottom: 16 }}
        />
      </div>
      <Tree
        showLine={true ? { showLeafIcon } : false}
        showIcon={true}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={filteredTreeData}
        style={{
          background : "#33006F",
          color : "white"
        }}
        className='hoverWhiteBold'
      />
    </div>
  );
};

export default SearchableTreeMenu;