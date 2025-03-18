import React, { createContext, useContext, useState } from 'react';

// Definición del tipo 'Block'
type Block = '1' | '2' | '3' | '4' | '5';

// Definición de la interfaz para el contexto
interface UserLevelContextType {
  // Estado del bloque actual
  block: Block; 
  // Función para actualizar el bloque
  setBlock: (block: Block) => void; 
}

// Aqui es Creación del contexto con valor por defecto
const UserLevelContext = createContext<UserLevelContextType | undefined>(undefined);

// Proveedor del contexto
export const UserLevelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Aqui el Estado por defecto es '1'
  const [block, setBlock] = useState<Block>('1'); 

  return (
    <UserLevelContext.Provider value={{ block, setBlock }}>
      {children} {}
    </UserLevelContext.Provider>
  );
};

//Aqui el Hook para acceder al contexto
export const useUserLevel = (): UserLevelContextType => {
  // Aqui nos Accede al contexto
  const context = useContext(UserLevelContext); 
  if (!context) {
    // Aqui nos mandara Error si no está envuelto en el proveedor
    throw new Error('useUserLevel must be used within a UserLevelProvider'); 
  }
  // Nos Devuelve el contexto
  return context; 
};