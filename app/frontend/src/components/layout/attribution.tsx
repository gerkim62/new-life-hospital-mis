import { SquareArrowOutUpRight } from "lucide-react";

export default function Attribution() {
  return (
    <div className="relative bottom-4 left-1/2 -translate-x-1/2 text-center my-4 bg-primary-foreground text-primary w-max rounded-full p-3 py-1">
      <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
        Designed & developed by{" "}
        <a
          href="https://wa.me/254715870654?text=Hello%2C%20I%20need%20a%20software%20(from%20hms-new-life-hosp)"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 font-medium hover:underline flex items-center gap-1"
        >
          developer.gerison
          <SquareArrowOutUpRight className="w-4 h-4" />
        </a>
      </p>
    </div>
  );
}
