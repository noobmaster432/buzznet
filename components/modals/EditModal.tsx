import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "../../hooks/useCurrentUser"
import useEditModal from "../../hooks/useEditModal";
import useUser from "../../hooks/useUser";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [currentUser]);
  
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async() => {
    try {
        setIsLoading(true);

        await axios.patch('/api/edit', {
            profileImage,
            coverImage,
            name,
            username,
            bio
        });
        mutateFetchedUser();

        toast.success('Profile updated!');

        editModal.onClose();
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
    } finally {
        setIsLoading(false);
    }
  },[bio, coverImage, name, profileImage, username, editModal, mutateFetchedUser]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
        <ImageUpload 
          value={profileImage}
          onChange={(image) => setProfileImage(image)}
          disabled={isLoading}
          label="Upload Profile image"
        />
        <ImageUpload 
          value={coverImage}
          onChange={(image) => setCoverImage(image)}
          disabled={isLoading}
          label="Upload Cover image"
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
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={isLoading}
        />
    </div>
  )

  return (
    <div>
        <Modal
          disabled={isLoading}
          isOpen={editModal.isOpen}
          onClose={editModal.onClose}
          title="Edit your Profile"
          onSubmit={onSubmit}
          actionLabel="Save"
          body={bodyContent}
        />
    </div>
  )
}

export default EditModal