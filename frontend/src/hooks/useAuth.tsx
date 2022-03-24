import * as React from "react";
import axios from "axios";
import { Endpoints } from "../utils/constants";

interface User {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
}

interface AuthContext {
  authed: boolean;
  user: User;
  login(email: string): Promise<unknown>;
  logout(): Promise<unknown>;
}

const initialUser: User = {
  id: undefined,
  name: undefined,
  email: undefined,
};

const authContext = React.createContext<AuthContext>({} as AuthContext);

const useAuth = (): AuthContext => {
  const [authed, setAuthed] = React.useState(false);
  const [user, setUser] = React.useState<User>(initialUser);
  return {
    authed,
    user,
    login(email) {
      return new Promise<void>((resolve, reject) => {
        axios
          .post(Endpoints.login, { email })
          .then((response) => {
            setAuthed(true);
            const { id, name, email } = response.data;
            setUser({
              id,
              name,
              email,
            });
            resolve();
          })
          .catch((e) => {
            reject();
          });
      });
    },
    logout() {
      return new Promise<void>((resolve) => {
        setAuthed(false);
        setUser(initialUser);
        resolve();
      });
    },
  };
};

export const AuthProvider: React.FC<{}> = (props) => {
  const auth = useAuth();

  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  );
};

const AuthConsumer = () => {
  return React.useContext(authContext);
};

export default AuthConsumer;
