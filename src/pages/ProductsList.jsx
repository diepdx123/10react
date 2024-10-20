import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import instance from "../axios/instance";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      await instance.delete(`/products/${id}`);
    },
    onSuccess: async () => {
      messageApi.success("xoa thanh cong!");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await instance.get("/products");
      return res.data.map((item) => ({
        key: item.id,
        ...item,
      }));
    },
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <>
          <Popconfirm
            description="ban chac chan xoa?"
            onConfirm={() => mutate(item.id)}
          >
            <Button>delete</Button>
          </Popconfirm>
          <Link to={`/products/${item.id}/edit`}>
            <Button>edit</Button>
          </Link>
        </>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default ProductsList;
