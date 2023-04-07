import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import useCurrentUser from "../../hooks/useCurrentUser";
import useLike from "../../hooks/useLike";
import useLoginModal from "../../hooks/useLoginModal";
import Avatar from "../Avatar";

interface PostItemProps {
    data: Record<string, any>;
    userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({ postId: data.id });

    const goToUser = useCallback((event: any) => {
        event.stopPropagation();

        router.push(`/users/${data.user.id}`);
    },[router, data.user.id]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    },[router, data.id]);

    const onLike = useCallback((event: any) => {
        event.stopPropagation();

        if (!currentUser) {
          return loginModal.onOpen();
        }

        toggleLike();

    },[loginModal, currentUser, toggleLike]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data?.createdAt]);

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <p
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data.user.username}
            </p>
            <p className="text-neutral-500 text-sm">{createdAt}</p>
          </div>
          <p className="text-neutral-300 mt-1">{data.body}</p>
            <div className="flex flex-row items-center gap-10 mt-3">
                <div className="flex flex-row items-center text-neutral-500 cursor-pointer transition gap-2 hover:text-sky-500">
                    <AiOutlineMessage size={20} />
                    <p>{data.comments?.length}</p>
                </div>
                <div onClick={onLike} className="flex flex-row items-center text-neutral-500 cursor-pointer transition gap-2 hover:text-red-500">
                    <LikeIcon size={20} color={hasLiked ? 'red' : ''} />
                    <p>{data.likedIds.length}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem