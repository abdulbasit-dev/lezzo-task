import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {VariableSizeGrid as Grid} from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import {Table} from 'antd';

import {getStores} from '../redux/actions/actions';
import axios from '../axios';

import 'antd/dist/antd.css';

const VirtualTable = props => {
  const {columns, scroll} = props;
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns.filter(({width}) => !width).length;
  const mergedColumns = columns.map(column => {
    if (column.width) {
      return column;
    }

    return {...column, width: Math.floor(tableWidth / widthColumnCount)};
  });
  const gridRef = useRef();
  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: scrollLeft => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          });
        }
      },
    });
    return obj;
  });

  const renderVirtualList = (rawData, {scrollbarSize, ref, onScroll}) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;
    return (
      <Grid
        ref={gridRef}
        className='virtual-grid'
        columnCount={mergedColumns.length}
        columnWidth={index => {
          const {width} = mergedColumns[index];
          return totalHeight > scroll.y && index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({scrollLeft}) => {
          onScroll({
            scrollLeft,
          });
        }}
      >
        {({columnIndex, rowIndex, style}) => (
          <div style={style}>
            {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({width}) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        className='table'
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};

const VirtualData = () => {
  const dispatch = useDispatch();

  const stores = useSelector(state => state.stores);

  const columns = [
    {
      title: 'Store Id',
      dataIndex: 'id',
      width: 150,
    },
    {
      title: 'Store Name',
      dataIndex: 'name',
      width:300
    },
  ];

  //get all stores
  const getData = async () => {
    const res = await axios.get('http://localhost:8000/stores');
    dispatch(getStores(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2 className='table_text'>List of The available Stores</h2>
        {Object.keys(stores.stores).length !== 0 && (

       <VirtualTable
        columns={columns}
        dataSource={stores.stores}
        scroll={{
          y: 1000,
          x: '800vw',
        }}
      /> 
        )}
    </>
  );
};

export default VirtualData;
