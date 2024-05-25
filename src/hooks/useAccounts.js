import React, { useCallback, useEffect } from "react";
import api from "../helpers/api";
import downloadApi from "../helpers/downloadExcel";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

const useAccounts = (endpoint, params, setData) => {

  const token = jwtDecode(localStorage.getItem("accessToken"));
  const fetch = useCallback(() => {
    api
      .get(
        `${endpoint}/${token._id}?date=${params.date}&filterType=${
          params.filterType
        }&page=${Number(params.page)}&size=${Number(params.size)}`
      )
      .then((res) => {
        if (res.data.data.length) {
          setData(() => ({
            total: res.data.total,
            tableData: res.data.data.map((value, index) => ({
              sl: params.page === 0 ? index + 1 : index + 1 + 40 * params.page,
              _id: value._id,
              client: value.client,
              product: value.product,
              carton: value.carton,
              amount: value.amount,
              status: value.status,
              paymentMethod: value.paymentMethod,
              createdOn: moment(value.createdOn).format("DD-MM-YYYY"),
              updateAt: moment(value.updateAt).format("DD-MM-YYYY"),
            })),
          }));
        } else {
          setData({
            tableData: [],
            total: 0,
          });
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  const handleSubmit = (value) => {
    api
      .post(endpoint, {...value,userId:token._id})
      .then((res) => {
        console.log(res);
        fetch()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (e) => {
    api
      .delete(`${endpoint}/${e._id}`)
      .then((res) => {
        fetch();
      })
      .catch((error) => {});
  };

  const handleDownload = async () => {
    downloadApi
      .get(
        `${endpoint}/download?date=${params.date}&filterType=${params.filterType}`
      )
      .then((response) => {
        if (response.status === 200) {
          const contentDisposition = response.headers["content-disposition"];
          let fileName = "downloaded_file.xlsx"; // Default file name

          if (contentDisposition) {
            const matches = contentDisposition.match(/filename="(.+?)"/);
            if (matches && matches.length === 2) {
              fileName = matches[1];
            }
          }

          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);

          // Create a link element and trigger the download
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();

          // Clean up by removing the link element and revoking the object URL
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          console.error(
            "Failed to download file:",
            response.status,
            response.statusText
          );
        }
      });
  };

  const handleEdit = (e) => {
    api
      .patch(`${endpoint}/${e._id}`, {
        client: e.client,
        carton: e.carton,
        amount: e.amount,
        product: e.product,
        status: e.status,
        paymentMethod: e.paymentMethod,
      })
      .then((res) => {
        console.log(res);
        fetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch();
  }, [params,endpoint]);

  return {handleDelete,handleDownload,handleEdit,fetch,handleSubmit};
};

export default useAccounts;
