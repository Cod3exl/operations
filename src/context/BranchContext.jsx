import { createContext, useContext, useState } from 'react';

const BranchContext = createContext();

export function BranchProvider({ children }) {
  const [branch, setBranch] = useState('Alkapuri');

  return (
    <BranchContext.Provider value={{ branch, setBranch }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
}
