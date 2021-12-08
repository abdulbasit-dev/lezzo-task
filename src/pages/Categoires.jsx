import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Divider, Card, Col, Row, Skeleton} from 'antd';
import {Link, useParams} from 'react-router-dom';

import {getCategories} from '../redux/actions/actions';
import ModalForm from '../components/ModalForm';
import axios from '../axios';

const {Meta} = Card;

function Categoires() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {sid} = useParams();
  const categories = useSelector(state => state.categories);

  //get all catagories
  const getData = async () => {
    dispatch(getCategories({}));
    try {
      const res = await axios.get(
        `http://localhost:8000/stores/${sid}/categories`
      );

      dispatch(getCategories(res.data));
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, [sid]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const addCategory = async data => {
      data.storeId = parseInt(sid);
    try {
        await axios.post(
        `http://localhost:8000/categories`,
        data
      );
      getData();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <ModalForm type='Category' onSubmit={addCategory} />
      <Divider />
      <div className='site-card-wrapper'>
        {Object.keys(categories?.categories).length !== 0 && (
            <>
            <h2>Total Number of Category {categories.categories.length}</h2>
            <Row gutter={16}>
          {categories.categories.map(category => {
            return (
              <Col span={6} key={category.id}>
                <Link to={`/store/${sid}/categories/${category.id}/products`}>
                  <Card
                    style={{width: 200, marginTop: 30}}
                    cover={<img alt='example' src={category.image_url} />}
                    hovarable
                  >
                    <Skeleton loading={loading} avatar active>
                      <Meta
                        title={category.name}
                        description='Description'
                      />
                    </Skeleton>
                  </Card>
                </Link>
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

export default Categoires;
