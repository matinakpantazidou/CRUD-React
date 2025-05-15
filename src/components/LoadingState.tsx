import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 size={32} className="text-blue-600 animate-spin mb-4" />
      <h3 className="text-lg font-medium text-gray-900">Loading tasks...</h3>
    </div>
  );
}
