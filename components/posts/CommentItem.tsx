import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface CommentItemProps {
    data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
    const router = useRouter();

    const goToUser = useCallback((event: any) => {
        event.stopPropagation();
        router.push(`/users/${data.user.id}`);
    },[router, data.user.id]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-700 p-5 cursor-pointer hover:bg-neutral-900 transition">
        <div className="flex flex-row gap-3 items-start">
            <Avatar userId={data.user.id} />
            <div>
                <div className="flex flex-row items-center gap-2">
                    <p className="text-sm font-semibold text-neutral-100 cursor-pointer hover:underline" onClick={goToUser}>
                        {data.user.name}
                    </p>
                    <p className="text-sm text-neutral-500 cursor-pointer hidden md:block">
                        @{data.user.username}
                    </p>
                    <p className="text-sm text-neutral-500">
                        {createdAt}
                    </p>
                </div>
                <div className="mt-1 text-neutral-300">
                    {data.body}
                </div>
            </div>
        </div>

    </div>
  )
}

export default CommentItem