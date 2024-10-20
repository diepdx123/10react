import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";
import instance from "../axios/instance";

const ProductAdd = () => {
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const onFinish = (values) => {
    mutate(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { mutate } = useMutation({
    mutationFn: async (product) => {
      await instance.post("/products", product);
    },
    onSuccess: async () => {
      messageApi.success("them thanh cong!");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setTimeout(() => {
        nav("/products");
      }, 1000);
    },
  });

  return (
    <>
      <h1>them san pham</h1>
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
          label="name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input  name!",
            },
            {
              min: 0,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price!",
            },
            {
              type: "number",
              min: 0,
              message: "gia phai la so duong",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="description" name="description" rules={[{}]}>
          <Input />
        </Form.Item>
        <Form.Item label="image" name="image" rules={[]}>
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ProductAdd;
