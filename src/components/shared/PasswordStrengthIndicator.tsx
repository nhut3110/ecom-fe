import { Progress } from 'antd';

const WEAK_THRESHOLD = 30;
const STRONG_THRESHOLD = 60;
const MAX_STRENGTH = 80;

const calculatePasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length > 5) strength += 10;
  if (password.length > 7) strength += 10;
  if (/[A-Z]/.test(password)) strength += 10;
  if (/[a-z]/.test(password)) strength += 10;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[^A-Za-z0-9]/.test(password)) strength += 10;
  // eslint-disable-next-line no-useless-escape
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 20;

  return strength;
};

export const PasswordStrengthIndicator = ({
  password,
}: {
  password: string;
}) => {
  const strength = calculatePasswordStrength(password);
  return (
    <Progress
      percent={(strength / MAX_STRENGTH) * 100}
      status="active"
      showInfo={false}
      strokeColor={
        strength < WEAK_THRESHOLD
          ? 'red'
          : strength < STRONG_THRESHOLD
          ? 'yellow'
          : 'green'
      }
    />
  );
};
