import React from "react";
import { Form, Input, InputNumber, Icon, Button, Select, Slider } from "antd";
const InputGroup = Input.Group;

const { Option } = Select;

const ProductionForm = props => {
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
    <Form onSubmit={handleSubmit} className="source-expectation-form">
      <Form.Item label="Naam" colon={false}>
        // Get name from server 
        {getFieldDecorator("Naam", {
          rules: [
            {
              required: true,
              message: "Vul hier je naam in :)"
            }
          ]
        })(<Input placeholder="Naam" />)}
      </Form.Item>
      <Form.Item label="Opbrengst honing in kilo's honing afgelopen jaar" colon={false}>
        {getFieldDecorator("Honing", {
          rules: [
            { 
              required: true,
              message: "Vul hier het aantal kilo's honing van afgelopen jaar in."
            }
          ]
        })(<InputNumber min={0} max={500} />)}
      </Form.Item>
      <Form.Item label="Aantal kilo suiker gevoerd in het afgelopen jaar" colon={false}>
        {getFieldDecorator("Suiker", {
          rules: [
            { 
              required: true,
              message: "Vul hier het aantal kilo's suiker van afgelopen jaar in."
            }
          ]
        })(<InputNumber min={0} max={99} />)}
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
export const Production = Form.create()(ProductionForm);
