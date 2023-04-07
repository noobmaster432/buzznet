import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "../hooks/useCurrentUser";
import useLoginModal from "../hooks/useLoginModal";
import usePost from "../hooks/usePost";
import usePosts from "../hooks/usePosts";
import useRegisterModal from "../hooks/useRegisterModal";
import Avatar from "./Avatar";
import Button from "./Button";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
        setIsLoading(true);

        const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

        await axios.post(url, {body});

        toast.success("Post created");
        
        setBody('');
        
        mutatePosts();
        mutatePost();
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    } finally {
        setIsLoading(false);
    }
  },[body, mutatePosts, mutatePost, isComment, postId]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
            <div>
                <Avatar userId={currentUser?.id} />
            </div>
            <div className="w-full">
                <textarea placeholder={placeholder} disabled={isLoading} onChange={(e) => setBody(e.target.value)} value={body} className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[16px] placeholder-neutral-500">

                </textarea>
                <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition -mt-1" />
                <div className="mb-2 flex flex-row justify-end">
                    <Button
                        label="Tweet"
                        onClick={onSubmit}
                        disabled={isLoading || !body}
                    />
                </div>
            </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-2xl text-center mb-4 font-bold">
            Welcome to Buzznet
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={() => loginModal.onOpen()} />
            <Button
              label="Register"
              secondary
              onClick={() => registerModal.onOpen()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
