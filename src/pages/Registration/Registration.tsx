import { Button, DatePicker, Flex, Form, Input, Radio } from "antd";
import styles from "./Registration.module.scss";
import { Participant } from "../../types";
import { useParams } from "react-router-dom";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    string: "${label} is not a valid number!",
    date: "${label} is not a valid date!",
  },
};

export const Registration = () => {
  const [form] = Form.useForm();
  const { id } = useParams();

  const onFinish = (values: Participant) => {
    console.log(values);
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values }),
    });
  };

  return (
    <Flex justify="center">
      <Form
        form={form}
        labelCol={{ span: 20 }}
        layout="vertical"
        className={styles.wrapper}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <h1>Event Registration</h1>
        <Form.Item
          label="Full name"
          name="fullName"
          rules={[
            {
              required: true,
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date of birth"
          name="dateOfBirth"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="whereHear"
          label="Where did you hear about this event?"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group>
            <Radio value="social">Social media</Radio>
            <Radio value="friend">Friends</Radio>
            <Radio value="myself">Found myself</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
