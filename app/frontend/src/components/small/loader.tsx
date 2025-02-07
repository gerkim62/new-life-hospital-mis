import { Loader2 } from "lucide-react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background-foreground/50 backdrop-blur-xs z-50">
      <div className="bg-card/80 backdrop-blur-lg border border-border/40 shadow-2xl rounded-2xl p-8 flex flex-col items-center gap-4 ">
        <Loader2 className="w-10 h-10 text-primary animate-spin scale-100 transition-transform duration-500 ease-in-out" />
        <p className="text-lg text-muted-foreground animate-pulse">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
