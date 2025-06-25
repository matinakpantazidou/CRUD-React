export default function NoResults() {
    return (
      <div className="p-6 text-center text-gray-500">
        <p className="text-lg">🔍 No tasks match your search.</p>
        <p className="text-sm mt-2">Try adjusting your keywords.</p>
      </div>
    );
  }