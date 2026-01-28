import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router"
import AppRouting from "./routing/AppRouting";
export const queryClient = new QueryClient();
import { Toaster } from "@/components/ui/sonner"

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppRouting />
                <Toaster position="top-right" />
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;