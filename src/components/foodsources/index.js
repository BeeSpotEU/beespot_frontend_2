import React from "react";
import { Form, Input, Icon, Button, Select, Slider } from "antd";
const InputGroup = Input.Group;

const { Option } = Select;

const SourceExpectationForm = props => {
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
      <Form.Item label="Dracht hoeveelheid" colon={false}>
        {getFieldDecorator("Dracht", {
          rules: [
            {
              required: true,
              message: "Vul hier een schatting van de dracht in."
            }
          ],
        })(<Slider min={1} max={10} defaultValue={5} />)}
      </Form.Item>
      <Form.Item label="Diversiteit" colon={false}>
        {getFieldDecorator("Diversiteit", {
          rules: [
            {
              required: true,
              message: "Vul hier een schatting van de diversiteit gedurende het jaar in."
            }
          ],
        })(<Slider min={1} max={10} defaultValue={5} />)}
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
export const FoodSources = Form.create()(SourceExpectationForm);
