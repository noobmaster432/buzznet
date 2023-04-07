import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";
import toast from "react-hot-toast";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
        setIsLoading(true);
        
        await signIn('credentials', {
          email,
          password,
        });

        toast.success("Login successful!");

        setIsLoading(false);
        loginModal.onClose();
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
    } finally {
        setIsLoading(false);
    }
  },[loginModal, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Input 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
        />
        <Input 
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
        />
    </div>
  )

    const footerContent = (
      <div className="text-neutral-400 text-center mt-4">
        <p>
          First time using Buzznet?{" "}
          <span
            onClick={onToggle}
            className="cursor-pointer hover:underline text-white"
          >
            Create an account
          </span>
        </p>
      </div>
    );

  return (
    <Modal 
        title="Login"
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        disabled={isLoading}
        actionLabel="Sign in"
        body={bodyContent}
        footer={footerContent}
    />
  );
};

export default LoginModal;
