import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";

const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = helpHttp();
  const url = "http://localhost:5000/santos";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {        
        if (!res.err && res.length !== undefined) {
          setDb(res);
          setError(null);
        } else {
          setDb(null);
          res.status = res.status === undefined ? 500 : res.status;
          res.statusText =
            res.statusText === undefined
              ? "No esta disponible la base de datos"
              : res.status;
          setError(res);
        }
        setLoading(false);
      });
  }, [url]);

  const createData = (data) => {
    // data.id = Date.now();
    const options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.post(url, options).then((res) => {
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    const endPoint = `${url}/${data.id}`;

    const options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.put(endPoint, options).then((res) => {
      if (!res.err) {
        const newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    const isDelete = window.confirm("Estas Seguro de elimnar este registro");
    if (!isDelete) return;
    const endPoint = `${url}/${id}`;

    const options = {
      headers: { "content-type": "application/json" },
    };
    api.del(endPoint, options).then((res) => {
      if (!res.err) {
        const newData = db.filter((el) => el.id !== id);
        setDb(newData);
      } else {
        setError(res);
      }
    });
    if (dataToEdit !== null) setDataToEdit(null);
  };

  return (
    <div>
      <h2>CRUD Api</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {db && (
          <CrudTable
            data={db}
            deleteData={deleteData}
            setDataToEdit={setDataToEdit}
          />
        )}
      </article>
    </div>
  );
};

export default CrudApi;
