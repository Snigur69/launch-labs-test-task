interface Props {
  error: string;
}

const ErrorState = ({ error }: Props) => (
  <div className="h-64 flex flex-col items-center justify-center gap-3 text-red-500">
    <p className="text-sm font-medium">{error}</p>
  </div>
);

export default ErrorState;
