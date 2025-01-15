import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/button";
import TextField from "../components/text-field";
import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  interface LoginFormState {
    username: string;
    password: string;
  }
  const [formState, setFormState] = useState<LoginFormState>({
    username: "",
    password: "",
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  async function handleLogin(e: FormEvent<Element>): Promise<void> {
    e.preventDefault();
    console.log("handleLogin not implemented");
    //call the User Authenitcation API
    await loginWithRedirect();
  }
  return (
    <div>
      <h1>Log in</h1>
      <form>
        <TextField
          label="Username"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
        />
        <TextField //todo change the component to obfuscate the text
          label="Password"
          name="password"
          value={formState.password}
          type="password"
          onChange={handleInputChange}
        />
      </form>
      <Button onClick={handleLogin} label="Authenticate" type="submit" />
    </div>
  );
};

export default Login;
