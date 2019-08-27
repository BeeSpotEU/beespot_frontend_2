import React from "react";
import { Form, Input, InputNumber, Icon, Button } from "antd";

const ButtonGroup = Button.Group;

const AddLocationForm = props => {
  const {
    form: { getFieldDecorator },
    handleAddLocation,
    loading
  } = props;

  const handleSubmit = e => {
    e.preventDefault();

    props.form.validateFields((err, values) => {
      if (!err) {
        handleAddLocation(values);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="location-form">
      <Form.Item label="Bijenstandnaam" colon={false}>
        {getFieldDecorator("name", {
          rules: [
            {
              required: true,
              message: "Vul hier de naam van de bijenstand in."
            }
          ]
        })(<Input placeholder="Bijenstandnaam" />)}
      </Form.Item>
      <Form.Item label="Aantal volken in afgelopen jaar" colon={false}>
        {getFieldDecorator("hives", {
          rules: [
            {
              required: true,
              message: "Vul hier het aantal volken van afgelopen jaar in."
            }
          ]
        })(<InputNumber min={0} max={99} />)}
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
      <ButtonGroup>
        <Button
          loading={loading}
          type="danger"
          htmlType="submit"
          className="login-form-button"
        >
          Ik heb geen bijenstand
        </Button>
        <Button
          loading={loading}
          type="default"
          htmlType="submit"
          className="login-form-button"
        >
          Nog een stand...
        </Button>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Klaar
        </Button>
      </ButtonGroup>
    </Form>
  );
};
export const LocationForm = Form.create()(AddLocationForm);
