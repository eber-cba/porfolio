import Intro from "../components/Intro";
import { SnackbarProvider } from "notistack";

export default function Home() {
  return (
    <div>

      <SnackbarProvider maxSnack={3}>
        <Intro />
      </SnackbarProvider>
    </div>
  );
}
