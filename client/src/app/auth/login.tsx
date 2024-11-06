import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/button";
import TextField from "../components/text-field";

export default function Login() {
  return (
    <div>
      <h1>Log in</h1>
      <ExecLogIn />
    </div>
  );
}


function ExecLogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  function handleLogin(e: FormEvent<Element>): void {
    throw new Error("Function not implemented.");
    //call the User Authenitcation API
  }

  return(
    <div>
    <h2>Login</h2>
    <form>
        <TextField
          label="Username"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
      </form>
      <Button onClick={handleLogin} label="Authenticate" />
  </div>
  );
}
