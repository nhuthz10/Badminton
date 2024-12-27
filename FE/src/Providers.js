"use client";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";
import store, { persistor } from "./redux-toolkit/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocketProvider from "./SocketContext";
import ConfigAxios from "./ConfigAxios";

const PersistGate = dynamic(
  () =>
    import("redux-persist/integration/react").then((mod) => mod.PersistGate),
  { ssr: false }
);

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          <ConfigAxios>{children}</ConfigAxios>
        </SocketProvider>
      </PersistGate>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Provider>
  );
};

export default Providers;
