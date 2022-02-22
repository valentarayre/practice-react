import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";
import Message from "./Message";

const SelecList = ({ title, url, handleChange }) => {
  const { data, error, loading } = useFetch(url);

  if (!data) return null;
  if (error)
    return (
      <Message
        msg={`Error ${error.status}: ${error.message}`}
        bgColor="#dc3545"
      />
    );

  const id = `select-${title}`;
  const labelName = title.charAt(0).toUpperCase() + title.slice(1);

  const options = data[`${title}`];

  return (
    <>
      <label htmlFor={id}>{labelName}</label>
      {loading && <Loader />}
      <select name={id} id={id} onChange={handleChange}>
        <option value="">----</option>
        {data &&
          options.map((el) => (
            <option value={el.id} key={el.id}>
              {el.nombre}
            </option>
          ))}
      </select>
    </>
  );
};

export default SelecList;
