import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/50">
      <div className="bg-card rounded-lg p-6 flex flex-col items-center shadow-lg border">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground text-lg">{message}</p>
      </div>
    </div>
  );
};

export default Loader;