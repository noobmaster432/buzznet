import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

import useCurrentUser from "../../hooks/useCurrentUser";
import useLoginModal from "../../hooks/useLoginModal";

interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType
    onClick?: () => void;
    auth?: boolean;
    alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, icon: Icon, onClick, auth, alert }) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const handleClick = useCallback(() => {
    if(onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  },[href, router, onClick, auth, currentUser, loginModal]);
  
  return (
    <div onClick={handleClick} className="flex flex-row items-center">
        <div className="relative rounded-full h-12 w-12 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
            <Icon size={26} color="white" />
            {alert ? <BsDot className="absolute -top-1 left-2 text-sky-500" size={40} /> : null}
        </div>
        <div className="relative hidden items-row rounded-full gap-3 lg:flex items-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
            <Icon size={20} color="white" />
            <span className="text-lg hidden lg:block ">{label}</span>
            {alert ? <BsDot className="absolute -top-1 left-[0.45rem] text-sky-500" size={50} /> : null}
        </div>
    </div>
  )
}

export default SidebarItem