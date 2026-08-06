import React from 'react';
import AppNavigator from './components/app-navigator';
import { ThemeProvider } from "@material-ui/core/styles";
import Modal from './components/UI/modal';
import { theme } from "./helpers/theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppNavigator />
      <Modal />
      <ToastContainer position="bottom-right" theme="dark" />
    </ThemeProvider>
  );
};

export default App;