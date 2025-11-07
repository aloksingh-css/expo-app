import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, variant = 'primary', ...props }: ButtonProps) {
  const variantStyles = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
  };

  return (
    <TouchableOpacity
      className={`rounded-lg px-6 py-3 ${variantStyles[variant]}`}
      {...props}>
      <Text className="text-center text-base font-semibold text-primary-foreground">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

