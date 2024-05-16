import { RouterProvider } from "react-router-dom";
import { Spin } from "antd";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { routes } from "./components/routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} fallbackElement={<Spin fullscreen />} />
    </QueryClientProvider>
    
  );
}

export default App;
