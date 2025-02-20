import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { HeroList } from "./component/heroeList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroList />
    </QueryClientProvider>
  );
}

export default App;
