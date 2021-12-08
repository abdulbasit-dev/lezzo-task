import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Divider, Card, Col, Row, Skeleton, Avatar} from 'antd';
import {Link} from 'react-router-dom';

import {getStores} from '../redux/actions/actions';
import ModalForm from '../components/ModalForm';
import axios from '../axios';

const {Meta} = Card;

function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const stores = useSelector(state => state.stores);

  //get all stores
  const getData = async () => {
    const res = await axios.get('http://localhost:8000/stores');
    dispatch(getStores(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const addStore = async data => {
    try {
     await axios.post('http://localhost:8000/stores', data);
      getData();
    } catch (err) {}
  };

  return (
    <div>
      <ModalForm type='Store' onSubmit={addStore} />
      <Divider />
      <div className='site-card-wrapper'>
        {Object.keys(stores.stores).length !== 0 && (
          <h2>Total Number of Store {stores.stores.length}</h2>
        )}{Object.keys(stores.stores).length !== 0 && (
             <Row gutter={16}>
             {stores.stores?.map(store => {
               return (
                 <Col span={6} key={store.id}>
                   <Link to={`/store/${store.id}/categories`}>
                     <Card style={{width: 300, marginTop: 30}} hovarable='true'>
                       <Skeleton loading={loading} avatar active>
                         <Meta
                           avatar={<Avatar src={store.image_url} size={50} />}
                           title={`${store.name}`}
                           description={`Location : ${store.location}`}
                         />
                       </Skeleton>
                     </Card>
                   </Link>
                 </Col>
               );
             })}
           </Row>
        )}
   
      </div>
    </div>
  );
}

export default Home;
