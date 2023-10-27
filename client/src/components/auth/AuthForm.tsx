import { useCallback, useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export type Variant = 'LOGIN' | 'REGISTER';

const AuthForm: React.FC = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  return (
    <>
      {variant === 'REGISTER' ? (
        <RegisterForm toggleVariant={toggleVariant} />
      ) : (
        <LoginForm toggleVariant={toggleVariant} />
      )}
    </>
  );
};

export default AuthForm;
