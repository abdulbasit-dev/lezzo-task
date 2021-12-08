import React, {useState} from 'react';
import {PlusCircleOutlined, CloudUploadOutlined} from '@ant-design/icons';
import {Button, Modal, Form, Input, Upload, Select} from 'antd';

const {Option} = Select;

function ModalForm({onSubmit, name, type, price}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [priceType, setPriceType] = useState('$');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <>
        <Button
          type='primary'
          icon={<PlusCircleOutlined />}
          size='large'
          onClick={showModal}
          shape='round'
        >
          Add New {type}
        </Button>

        <Modal
          title={`Add New ${type}`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          onOk={() => {
            form
              .validateFields()
              .then(values => {
                form.resetFields();
                onSubmit(values);
                setIsModalVisible(false);
              })
              .catch(info => {});
          }}
        >
          <Form
            form={form}
            layout='vertical'
            initialValues={{
              modifier: 'public',
            }}
          >
            <Form.Item
              name='name'
              label={`${type} Name`}
              rules={[
                {
                  required: true,
                  message: "name can' be empty",
                },
              ]}
            >
              <Input defaultValue={name ? name : ''} />
            </Form.Item>

            {type === 'Category' ? (
              <></>
            ) : type === 'Product' ? (
              <>
                <Form.Item
                  name='price_type'
                  label='Price Type'
                  rules={[
                    {
                      required: true,
                      message: 'please select a price type',
                    },
                  ]}
                >
                  <Select
                    defaultValue='$'
                    style={{width: 120}}
                    onChange={value => setPriceType(value)}
                  >
                    <Option value='$'>$</Option>
                    <Option value='IQD'>IQD</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name='price'
                  label='Product Price'
                  rules={[
                    {
                      required: true,
                      message: 'please enter a price',
                    },
                  ]}
                >
                  <Input defaultValue={price ? price : ''} />
                </Form.Item>
              </>
            ) : (
                <Form.Item
                name='location'
                label="location"
                rules={[
                  {
                    required: true,
                    message: "location can' be empty",
                  },
                ]}
              >
                 <Input />
              </Form.Item>
            )}

            {name ? (
              <></>
            ) : (
              <Form.Item
                name='image_url'
                label={`Enter Url ${
                  type !== 'Store' ? 'Image' : 'Logo'
                } for the ${type}`}
                rules={[
                  {
                    required: true,
                    message: "image url can' be empty",
                  },
                ]}
              >
                 <Input />
              </Form.Item>
            )}
          </Form>
        </Modal>
      </>
    </div>
  );
}

export default ModalForm;
