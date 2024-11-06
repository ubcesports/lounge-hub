import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/button";
import TextField from "../components/text-field";

const Login: React.FC = () => {
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

  function handleLogin(e: FormEvent<Element>): void {
    e.preventDefault();
    console.log("handleLogin not implemented");
    //call the User Authenitcation API
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
