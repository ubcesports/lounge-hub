import { ChangeEvent, FormEvent } from "react";
import Button from "../components/button";
import TextField from "../components/text-field";

export default function Activity() {
  return (
    <div>
      <h1>Activity</h1>
      <ExecLogIn />
    </div>
  );
}

function ExecLogIn() {
  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function handleLogin(e: FormEvent<Element>): void {
    throw new Error("Function not implemented.");
  }

  return(
    <div>
    <h2>Login</h2>
    <form>
        <TextField
          label="Username"
          name="username"
          value=""
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          name="password"
          value=""
          onChange={handleInputChange}
        />
      </form>
      <Button onClick={handleLogin} label="Login" />
  </div>
  );
}
