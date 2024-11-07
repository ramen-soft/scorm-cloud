import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./auth/provider/auth.provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes.tsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router}></RouterProvider>
		</AuthProvider>
	</StrictMode>
);
