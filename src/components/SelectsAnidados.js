import React, { useState } from "react";
import SelecList from "./SelecList";

const urlProvince = "https://apis.datos.gob.ar/georef/api/provincias";
const urlMunicipality = "https://apis.datos.gob.ar/georef/api/municipios?provincia="

const SelectsAnidados = () => {
  const [province, setProvince] = useState("");
  const [municipality, setMunicipality] = useState("");


  return (
    <div>
      <h2>Selects Anidados</h2>
      <h3>Argentina</h3>
      <SelecList
        title="provincias"
        url={urlProvince}
        handleChange={(e) => {
          setProvince(e.target.value);
        }}
      />
      {province && (
        <SelecList
          title="municipios"
          url={`${urlMunicipality}${province}`}
          handleChange={(e) => {
            setMunicipality(e.target.value);
          }}
        />
      )}
    </div>
  );
};

export default SelectsAnidados;
