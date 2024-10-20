import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import Password from "antd/es/input/Password";
import { useNavigate } from "react-router-dom";
import instance from "../axios/instance";

const Signup = () => {
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values) => {
    mutate(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { mutate } = useMutation({
    mutationFn: async (user) => {
      const res = await instance.post("/signin", user);
      return res.data;
    },
    onSuccess: async (data) => {
      localStorage.setItem("userId", JSON.stringify(data.user.id));
      messageApi.success("dang nhap thanh cong!");
      setTimeout(() => {
        nav("/products");
      }, 600);
    },
  });

  return (
    <>
      <h1>dang nhap</h1>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input  email!",
            },
            {
              type: "email",
              message: "khong dung dinh dang email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input password!",
            },
            {
              min: 6,
              message: "mat khau it nhat 6 ki tu",
            },
          ]}
        >
          <Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            dang nhap
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Signup;
