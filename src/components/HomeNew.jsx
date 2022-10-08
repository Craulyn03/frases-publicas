import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../Style/home.css";
import { supabase } from "../supabaseClient";

const HomeNew = () => {
  const [estado, setEstado] = useState(false);
  const [frasePublica, setFrasePublica] = useState("Cargando...");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editarFrase = () => {
    setEstado(true);
  };
  const handleInputChange = (event) => {
    setFrasePublica(event.target.value);
  };

  const guardarCambios = () => {
    // setEstado(false);
  };

  const onSubmit = async (data) => {
    await supabase.from("Frase").insert([data]);
    setEstado(false);
  };

  useEffect(() => {
    const fetchClient = async () => {
      const { data } = await supabase.from("Frase").select();
      setFrasePublica(data.pop().frase);
      // setFrasePublica(data.map((el) => el.frase));
    };
    fetchClient();
  }, []);

  return (
    <Fragment>
      {estado ? (
        <div className="editar-frase-publica">
          <h1 className="title">MOTIVAME CON TU FRASE</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register("frase", {
                required: true,
                minLength: 20,
                maxLength: 200,
              })}
              type="text"
              defaultValue={frasePublica}
              className="input-frase"
              onChange={handleInputChange}
            />

            {errors.frase?.type === "required" && (
              <div className="error-container">
                <h2 className="error">Campo Obligatorio</h2>
              </div>
            )}
            {errors.frase?.type === "minLength" && (
              <div className="error-container">
                <h2 className="error">
                  !!Ooops!! El minimo de caracteres es de 20
                </h2>
              </div>
            )}
            {errors.frase?.type === "maxLength" && (
              <div className="error-container">
                <h2 className="error">
                  !!Ooops!! El maximo de caracteres es de 200
                </h2>
              </div>
            )}
            <button type="submit" className="btn-ok" onClick={guardarCambios}>
              Guardar Cambios
            </button>
          </form>
        </div>
      ) : (
        <div className="frase-publica-container">
          <h1 className="title">"" MOTIVAME CON TU FRASE ""</h1>
          <p className="frase-publica">{frasePublica}</p>
          <button className="btn-editar" onClick={editarFrase}>
            EDITAR FRASE
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default HomeNew;
