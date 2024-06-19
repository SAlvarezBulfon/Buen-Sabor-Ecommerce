import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Rutas from './Routes/Rutas';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
          <Rutas />
      </Provider>
    </ThemeProvider>
  );
};



export default App;
