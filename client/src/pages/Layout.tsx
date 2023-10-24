import AuthForm from '../components/AuthForm';

const Layout: React.FC<any> = ({ children }) => {
  let layout;
  if (document.cookie.includes('AUTH')) {
    layout = <div className='container mx-auto'>{children}</div>;
  } else {
    layout = <AuthForm />;
  }

  return layout;
};

export default Layout;
