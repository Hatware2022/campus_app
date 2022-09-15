import React, {useState} from 'react';

export const initialContext = {
  loginAsClub: false,
  setLoginAsClub: () => null,
};

const CampusContext = React.createContext(initialContext);

export const CampusContextProvider = ({children}) => {
  const [loginAsClub, setLoginAsClub] = useState(false);

  return (
    <CampusContext.Provider
      value={{
        loginAsClub,
        setLoginAsClub: value => {
          setLoginAsClub(value);
        },
      }}>
      {children}
    </CampusContext.Provider>
  );
};

export default CampusContext;
