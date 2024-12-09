import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
const httpLink = new HttpLink({
  uri: "https://charity-api.fullstacksjs.com/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "/TmyeQmELjsgBdG26gGps7+KZ6F5A5WfJYhhwMURM00=", // مقدار کلید مدیریت Hasura را وارد کنید
  },
});

const client = new ApolloClient({
  uri: "https://charity-api.fullstacksjs.com/v1/graphql",
  link: httpLink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
