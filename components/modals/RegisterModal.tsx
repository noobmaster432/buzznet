import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if(isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  },[isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
        setIsLoading(true);

        await axios.post('/api/register',{
            email,
            password,
            name,
            username
        });

        setIsLoading(false);

        toast.success('Account created successfully!');

        signIn('credentials', {
          email,
          password,
        });
        
        registerModal.onClose();
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong!');
    } finally {
        setIsLoading(false);
    }
  },[registerModal, email, name, username, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Input 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
        />
        <Input 
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
        />
        <Input 
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
        />
        <Input 
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
        />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?{" "}
        <span
          onClick={onToggle}
          className="cursor-pointer hover:underline text-white"
        >
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      title="Create an account"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      disabled={isLoading}
      actionLabel="Register"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
