import React, {useEffect, useState} from 'react';
import {Divider, Card, Col, Row, Switch, Skeleton, Avatar} from 'antd';

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
        `http://localhost:8000/api/stores/${sid}/categories/${cid}/products`
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
    try {
      const res = await axios.post(
        `http://localhost:8000/api/stores/${sid}/categories/${cid}/products`,
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
          <h2>Total Number of Product {products.products.total}</h2>
        )}

        <Row gutter={16}>
          {products.products?.data?.map(product => {
            const data = new Buffer.from(product.image.data).toString('ascii');
            return (
              <Col span={6} key={product.p_id}>
                <Link to={`/store/${sid}/categories/${cid}/products`}>
                  <Card
                    style={{width: 200, marginTop: 30}}
                    cover={<img alt='example' src={data} />}
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
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Products;
