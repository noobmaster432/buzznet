import Image from "next/image";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar";

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  return (
    <div>
        <div className="bg-neutral-700 h-40 relative">
            {fetchedUser?.coverImage && (
                <Image
                    src={fetchedUser.coverImage}
                    alt="Cover Image"
                    fill
                    style={{ objectFit: "cover" }}
                />
            )}
            <div className="absolute -bottom-12 left-4">
                <Avatar userId={userId} isLarge hasBorder />
            </div>
        </div>
    </div>
  );
};

export default UserHero;
