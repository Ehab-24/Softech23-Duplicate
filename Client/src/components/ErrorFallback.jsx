export default function ErrorFallback({error, resetErrorBoundary, componentStack}) {
    return (
         <div className="w-full text-3xl font-bold">
            An error occurred!
         </div>
    );
}