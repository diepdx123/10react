import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Skeleton } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../axios/instance";

const ProductEdit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const onFinish = (values) => {
    mutate(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await instance.get(`/products/${id}`);
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (product) => {
      await instance.put(`/products/${id}`, product);
    },
    onSuccess: async () => {
      messageApi.success("update thanh cong!");
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
      setTimeout(() => {
        nav("/products");
      }, 1000);
    },
  });

  if (isLoading) {
    <div>....loding....</div>;
  }
  return (
    <>
      <h1>update san pham</h1>
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
          ...data,
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
            update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ProductEdit;
