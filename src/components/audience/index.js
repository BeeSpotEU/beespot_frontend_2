import React from "react";
import { Form, Input, Icon, Button, DatePicker, Select } from "antd";
const InputGroup = Input.Group;

const { Option } = Select;

const AddAudienceForm = props => {
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
    <Form onSubmit={handleSubmit} className="audience-form">
      <Form.Item label="Naam" colon={false}>
        {getFieldDecorator("Naam", {
          rules: [
            {
              required: true,
              message: "Vul hier je naam in :)"
            }
          ]
        })(<Input placeholder="Naam" />)}
      </Form.Item>
      <InputGroup compact>
      <Form.Item label="Postcode" colon={false}>
        {getFieldDecorator("Postcode", {
          rules: [
            {
              required: false,
              message: "Een postcode is optioneel."
            }
          ]
        })(<Input placeholder="Postcode" />)}
      </Form.Item>
      <Form.Item label="Huisnummer" colon={false}>
        {getFieldDecorator("Huisnummer", {
          rules: [
            {
              required: false,
              message: "Een huisnummer is optioneel."
            }
          ]
        })(<Input placeholder="Huisnummer" />)}
      </Form.Item>
      </InputGroup>
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
export const AudienceForm = Form.create()(AddAudienceForm);
