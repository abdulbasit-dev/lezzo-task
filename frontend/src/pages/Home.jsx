import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Divider, Card, Col, Row, Switch, Skeleton, Avatar} from 'antd';
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
    const res = await axios.get('http://localhost:8000/api/stores');
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
      const res = await axios.post('http://localhost:8000/api/stores', data);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ModalForm type='Store' onSubmit={addStore} />
      <Divider />
      <div className='site-card-wrapper'>
        {Object.keys(stores.stores).length !== 0 && (
          <h2>Total Number of Store {stores.stores.total}</h2>
        )}

        <Row gutter={16}>
          {stores.stores?.data?.map(store => {
            const data = new Buffer.from(store.logo.data).toString('ascii');

            return (
              <Col span={6} key={store.s_id}>
                <Link to={`/store/${store.s_id}/categories`}>
                  <Card style={{width: 300, marginTop: 30}} hovarable='true'>
                    <Skeleton loading={loading} avatar active>
                      <Meta
                        avatar={<Avatar src={data} size={50} />}
                        title={`${store.name}`}
                        description='This is the description'
                      />
                    </Skeleton>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Home;
