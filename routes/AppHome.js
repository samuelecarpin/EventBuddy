// questa pagina serve perchè lo stack della Home non funziona a causa del fatto che come primo componente dovrebbe essere chiamato il navigator che a sua volta chiama la home, di conseguenza lo schema è App -> TabNav -> Home -> Stack -> Pagina selezionata 
import React from 'react';
import Navigator from './homeStack';

const App = () => {
  return(
    <Navigator />
  );
};

export default App;