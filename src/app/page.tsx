"use client";
import styles from "./page.module.css";
import { Button } from "../../components/Button";
import { StyledLink } from "../../components/StyledLink";
import { InputField } from "../../components/Input/InputField";
import { Feedback } from "../../components/Feedback";
import users from "./users.json";
import { useReducer, useState, useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { PulseLoader } from "react-spinners";
import { GoAlertFill } from "react-icons/go";

const STATE_MACHINE_NAME = "State Machine 1";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // User State
  const userInitialState = {
    email: "",
    password: "",
    showError: false,
    showSuccess: false,
    errorMessage: "",
  };

  // User Reducer
  const formReducer = (state: typeof userInitialState, action: any) => {
    switch (action.type) {
      case "SET_FIELD":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "SET_ERROR":
        return {
          ...state,
          showError: true,
          errorMessage: action.message,
        };
      case "SET_SUCCESS":
        return {
          ...state,
          showSuccess: true,
          errorMessage: action.message,
        };
      case "CLEAR_ERROR":
        return {
          ...state,
          showError: false,
          errorMessage: "",
        };
      case "RESET":
        return userInitialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(formReducer, userInitialState);
  const { email, password, showError, showSuccess, errorMessage } = state;
  const [loginButtonText, setLoginButtonText] = useState<React.ReactNode>("Ingresar");

  // Rive animation
  const { rive, RiveComponent } = useRive({
    src: "/teddy_login.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  });

  const stateSuccess = useStateMachineInput(rive, STATE_MACHINE_NAME, "success");
  const stateFail = useStateMachineInput(rive, STATE_MACHINE_NAME, "fail");
  const stateHandUp = useStateMachineInput(rive, STATE_MACHINE_NAME, "hands_up");
  const stateCheck = useStateMachineInput(rive, STATE_MACHINE_NAME, "Check");
  const stateLook = useStateMachineInput(rive, STATE_MACHINE_NAME, "Look");

  // Animation functions
  const setCheck = (check: boolean) => {
    if (stateCheck) {
      stateCheck.value = check;
    }
  };

  const setHandUp = (handUp: boolean) => {
    if (stateHandUp) {
      stateHandUp.value = handUp;
    }
  };

  const setLook = () => {
    if (!stateLook || !stateCheck || !setHandUp) {
      return;
    }
    setHandUp(false);
    setCheck(true);
    const nbChars = email.length;
    const ratio = nbChars / 25;
    const lookToSet = ratio * 100 - 25;
    stateLook.value = Math.round(lookToSet);
  };

  useEffect(() => {
    setLook();
  }, [email]);

  const triggerSuccess = () => {
    stateSuccess?.fire();
  };

  const triggerFail = () => {
    stateFail?.fire();
  };

  // Password visibility
  const togglePasswordVisibility = () => {
    if (password.length !== 0) {
      setShowPassword((prevState) => {
        const newState = !prevState;
        setHandUp(!newState);
        return newState;
      });
    }
  };
  // Input Blur
  const handleOnBlur = () => {
    setHandUp(false);
    setShowPassword(false);
  };
  // Input Focus
  const handleFocus = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoginButtonText(<PulseLoader color="#D6E2EA" size={10} aria-label="Comprobando.." data-testid="loader" />);
    setHandUp(false);
    setTimeout(() => {
      setLoginButtonText("Ingresar");
      // Input Email validation
      if (!email) {
        if (!password) {
          dispatch({
            type: "SET_ERROR",
            message: (
              <>
                <GoAlertFill /> Debes completar todos los campos
              </>
            ),
          });
          triggerFail();
          return;
        } else {
          dispatch({
            type: "SET_ERROR",
            message: (
              <>
                <GoAlertFill /> Debes completar tu correo
              </>
            ),
          });
          triggerFail();
          return;
        }
      } else {
        if (!emailRegex.test(email)) {
          dispatch({
            type: "SET_ERROR",
            message: (
              <>
                <GoAlertFill /> Ingresa un correo electrónico válido
              </>
            ),
          });
          triggerFail();
          return;
        }
      }

      // Input Password validation
      if (!password) {
        dispatch({
          type: "SET_ERROR",
          message: (
            <>
              <GoAlertFill /> Debes completar tu contraseña
            </>
          ),
        });
        triggerFail();
        return;
      }

      // Inputs User validation
      const validUser = users.find((user) => user.email === email && user.password === password);

      if (validUser) {
        setHandUp(false);
        setLook();
        alert("Acceso concedido");
        dispatch({ type: "CLEAR_ERROR" });
        dispatch({
          type: "SET_SUCCESS",
          message: (
            <>
              {" "}
              🎉 Inicio exitoso.
              <br />
              En unos segundos seras redirigido 🚀
            </>
          ),
        });
        dispatch({ type: "RESET" });
        triggerSuccess();
      } else {
        dispatch({
          type: "SET_ERROR",
          message: (
            <>
              <GoAlertFill /> Usuario o contraseña incorrectos
            </>
          ),
        });
        triggerFail();
      }
    }, 1500);
  };
  return (
    <main className={styles.main}>
      <section className={styles.login}>
        <h1 className={styles.login_title}>Login</h1>
        {/* Animación de Rive */}
        <div style={{ textAlign: "center" }}>
          <RiveComponent className={styles.login_canvas_container} />
        </div>
        <form onSubmit={handleSubmit} className={styles.login_form}>
          <InputField label="Correo electrónico" type="text" onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })} onFocus={handleFocus} />

          <InputField
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            isPassword="password"
            toggleAction={togglePasswordVisibility}
            showPassword={showPassword}
            onChange={(e) => {
              dispatch({ type: "SET_FIELD", field: "password", value: e.target.value });
              setHandUp(showPassword ? false : true);
            }}
            onFocus={handleFocus}
            onBlur={handleOnBlur}
          />

          <div className={styles.login_button_container}>
            <Button type="submit">{loginButtonText}</Button>
          </div>
          <div className={styles.login_message}>
            {showError && <Feedback type="error">{errorMessage}</Feedback>}
            {showSuccess && <Feedback type="success">{errorMessage}</Feedback>}
          </div>
        </form>

        <div className={styles.login_container}>
          <p style={{ marginBottom: ".5rem" }}>o</p>
          <StyledLink href="#">Registrate</StyledLink>
        </div>

        <div style={{ textAlign: "center" }}>
          <StyledLink variant="secondary" href="#">
            Ver términos y condiciones
          </StyledLink>
        </div>
      </section>
    </main>
  );
}
