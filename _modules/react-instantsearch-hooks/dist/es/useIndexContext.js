import { useContext } from 'react';
import { IndexContext } from './IndexContext.js';
export function useIndexContext() {
  var context = useContext(IndexContext);

  if (context === null) {
    throw new Error('`useIndexContext` must be used within `IndexContext.Provider`.');
  }

  return context;
}
