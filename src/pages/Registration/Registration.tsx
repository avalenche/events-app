import { useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Button, DatePicker, Flex, Form, Input, Radio, message } from "antd";

import { registerParticipant } from "../../api/eventsApi";
import { Participant } from "../../types";
import styles from "./Registration.module.scss";

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
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (participantData: Participant) =>
      registerParticipant(participantData, id!),
    onSuccess: () => {
      message.success("Registration successful!");
      form.resetFields();
      navigate("/events");
    },
    onError: () => {
      message.error("Registration failed. Please try again.");
    },
  });

  const onFinish = (values: Participant) => {
    mutate(values);
  };

  return (
    <>
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
            name="referral"
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
          <Flex justify="space-around">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isPending}
                className={styles.button}
              >
                Register
              </Button>
            </Form.Item>
            <Button
              type="primary"
              htmlType="button"
              className={styles.button}
              onClick={() => navigate("/events")}
            >
              Cancel
            </Button>
          </Flex>
        </Form>
      </Flex>
    </>
  );
};
