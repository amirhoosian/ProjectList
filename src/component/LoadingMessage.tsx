export const LoadingMessage = () => (
  <p className="mt-4 text-center">در حال بارگذاری...</p>
);

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <p className="mt-4 text-center">خطا: {message}</p>
);
