import { useState } from "react";
import {
  Formulario,
  Label,
  ContenedorTerminos,
  ContenedorBtnCentrado,
  Boton,
  MensajeExito,
  MensajeError,
} from "./elementos/Formularios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import ComponenteInput from "./Components/Input";

const App = () => {
  const [usuario, setUsuario] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [password, setPassword] = useState({ campo: "", valido: null });
  const [password2, setPassword2] = useState({ campo: "", valido: null });
  const [correo, setCorreo] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [terminos, setTerminos] = useState(false);
  const [formularioValido, setFormularioValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9\\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        setPassword2((prevState) => {
          return {
            ...prevState,
            valido: "false",
          };
        });
      } else {
        setPassword2((prevState) => {
          return {
            ...prevState,
            valido: "true",
          };
        });
      }
    }
  };

  const onChangeTerminos = (e) => {
    setTerminos(e.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      usuario.valido === "true" &&
      nombre.valido === "true" &&
      password.valido === "true" &&
      password2.valido === "true" &&
      correo.valido === "true" &&
      telefono.valido === "true" &&
      terminos
    ) {
      setFormularioValido(true);
      setUsuario({ campo: "", valido: null });
      setNombre({ campo: "", valido: null });
      setPassword({ campo: "", valido: null });
      setPassword2({ campo: "", valido: null });
      setCorreo({ campo: "", valido: null });
      setTelefono({ campo: "", valido: null });
    } else {
      setFormularioValido(false);
    }
  };

  return (
    <main>
      <Formulario action="" onSubmit={onSubmit}>
        <ComponenteInput
          estado={usuario}
          cambiarEstado={setUsuario}
          tipo="text"
          label="Usuario"
          placeholder="jhon123"
          name="usuario"
          leyendaError="El usuario tiene que ser de 4 a 16 caracteres y sólo puede contener letras, numeros y guion bajo."
          expresionRegular={expresiones.usuario}
        />

        <ComponenteInput
          estado={nombre}
          cambiarEstado={setNombre}
          tipo="text"
          label="Nombre"
          placeholder="Jhon Bonachon"
          name="usuario"
          leyendaError="El nombre sólo puede contener letras y espacios"
          expresionRegular={expresiones.nombre}
        />

        <ComponenteInput
          estado={password}
          cambiarEstado={setPassword}
          tipo="password"
          label="Contraseña"
          name="password1"
          leyendaError="La contraseña tiene que ser de 4 a 12 digitos."
          expresionRegular={expresiones.password}
        />

        <ComponenteInput
          estado={password2}
          cambiarEstado={setPassword2}
          tipo="password"
          label="Repetir Contraseña"
          name="password2"
          leyendaError="Ambas contraseñas deben ser iguales"
          funcion={validarPassword2}
        />

        <ComponenteInput
          estado={correo}
          cambiarEstado={setCorreo}
          tipo="email"
          label="Correo"
          placeholder="jhon123@correo.com"
          name="correo"
          leyendaError="El correo solo puede tener letras, numeros, puntos, guiones y guion bajo."
          expresionRegular={expresiones.correo}
        />

        <ComponenteInput
          estado={telefono}
          cambiarEstado={setTelefono}
          tipo="text"
          label="Teléfono"
          placeholder="55546999"
          name="telefono"
          leyendaError="El telefono solo puede contener numeros y el maximo son 14 digitos"
          expresionRegular={expresiones.telefono}
        />

        <ContenedorTerminos>
          <Label>
            <input
              type="checkbox"
              name="terminos"
              id="terminos"
              checked={terminos}
              onChange={onChangeTerminos}
            />
            Acepto los Terminos y Condiciones
          </Label>
        </ContenedorTerminos>

        {formularioValido === false && (
          <MensajeError>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <b>Error:</b> Por favor rellena el formulario correctamente.
          </MensajeError>
        )}

        <ContenedorBtnCentrado>
          <Boton type="submit">Enviar</Boton>
          {formularioValido === true && (
            <MensajeExito>Formulario enviado con éxito!</MensajeExito>
          )}
        </ContenedorBtnCentrado>
      </Formulario>
    </main>
  );
};

export default App;
