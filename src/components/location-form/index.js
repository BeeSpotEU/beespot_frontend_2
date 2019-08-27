import React from "react";
import { Form, Input, Icon, Button, DatePicker, Select } from "antd";

const { Option } = Select;

const AddLocationForm = props => {
  const {
    form: { getFieldDecorator },
    // handleAddMachtiging,
    loading
  } = props;

  const handleSubmit = e => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        // handleAddMachtiging(values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="location-form">
      <Form.Item label="Bijenstandnaam" colon={false}>
        {getFieldDecorator("Bijenstandnaam", {
          rules: [
            { 
              required: true,
              message: "Vul hier de naam van de bijenstand in."
            }
          ]
        })(<Input placeholder="Bijenstandnaam" />)}
      </Form.Item>
      <Form.Item label="Lengtegraad" colon={false}>
        {getFieldDecorator("longitude", {
          rules: [
            {
              required: true,
              message: "Vul een lengtegraad in!"
            }
          ]
        })(<Input placeholder="Lengtegraad" />)}
      </Form.Item>
      <Form.Item label="Breedtegraad" colon={false}>
        {getFieldDecorator("latitude", {
          rules: [
            {
              required: true,
              message: "Vul een breedtegraad in!"
            }
          ]
        })(<Input placeholder="Breedtegraad" />)}
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export const LocationForm = Form.create()(AddLocationForm);
