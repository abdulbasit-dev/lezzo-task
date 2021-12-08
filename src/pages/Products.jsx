import React, {useEffect, useState} from 'react';
import {Divider, Card, Col, Row, Skeleton} from 'antd';

import {getProducts} from '../redux/actions/actions';

import {useSelector, useDispatch} from 'react-redux';

import axios from '../axios';
import ModalForm from '../components/ModalForm';
import {Link, useParams} from 'react-router-dom';

const {Meta} = Card;

function Products() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const {sid, cid} = useParams();

  //get all catagories
  const getData = async () => {
    dispatch(getProducts({}));
    try {
      const res = await axios.get(
        `http://localhost:8000/products?storeId=${sid}&categoryId=${cid}`
      );
      dispatch(getProducts(res.data));
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, [sid, cid]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const addProduct = async data => {
    data.storeId = parseInt(sid);
    data.categoryId = parseInt(cid);
    try {
      await axios.post(
        `http://localhost:8000/products`,
        data
      );

      getData();
    } catch (err) {}
  };

  return (
    <div>
      <ModalForm type='Product' onSubmit={addProduct} />
      <Divider />
      <div className='site-card-wrapper'>
        {Object.keys(products.products).length !== 0 && (
          <>
            <h2>Total Number of Product {products.products.length}</h2>
            <Row gutter={16}>
              {products.products.map(product => {
                return (
                  <Col span={6} key={product.id}>
                    <Card
                      style={{width: 200, marginTop: 30}}
                      cover={<img alt='example' src={product.image_url} />}
                      hovarable='true'
                    >
                      <Skeleton loading={loading} avatar active>
                        <Meta
                          title={product.name}
                          description={
                            <div>
                              <p>
                                Price: {product.price_type + ' '}
                                {product.price}{' '}
                              </p>
                            </div>
                          }
                        />
                      </Skeleton>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
