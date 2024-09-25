import cls from './ContactsBlock.module.scss';
import { Button, ButtonTheme, Title } from '@/components';
// import { DeleteIcon } from '@/utils/SVG';
import { PencilIcon } from '@/utils/SVG/PencilIcon';
// import { useEffect, useState } from 'react';
// import { abortScrollRemovingHeader, removeScroll } from '@/utils/scrollCounts';
import { ContactsList } from './ContactsList/ContactsList';
// import { Loading } from '@/components/Loading';
import { useProfileQuery } from '@/store/features/services/authService';
// import { toast } from 'react-toastify';
// import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { SerializedError } from '@reduxjs/toolkit';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/store/store';
// import { clearToken } from '@/store/features/authSlice/authSlice';
import { LockIcon } from '@/utils/SVG/LockIcon';

interface ContactsBlockProps {    
    setIsEditForm: (value: boolean) => void;
    setIsChangePassword: (value: boolean) => void;
}

// interface FetchData {
//     message: string;
//     user: {
//         id: string | number;
//         name: string;
//         surname: string;
//         phone: string;
//         email: string;
//         roles: string[];
//     };       
// }

const BUTTON_REDACT = 'Редагувати';
const BUTTON_REDACT_PASSWORD = 'Змінити пароль';
// const BUTTON_DELETE_ACCOUNT = 'Видалити аккаунт';
// const ERROR_TEXT = 'Упс, щось пішло не так!';
// const customId = "toastIdUserDelete";

export const ContactsBlock = ({ setIsEditForm, setIsChangePassword }: ContactsBlockProps) => {
    // const router = useRouter();
    // const dispatch = useDispatch<AppDispatch>();
    const { data: user } = useProfileQuery('', {
        refetchOnMountOrArgChange: true,
    });
    // const [deleteProfile, {isLoading: isDeleting}]= useDeleteProfileMutation();
    // const [showModal, setShowModal] = useState(false);
    // const [isAccDeletedSuccess, setIsAccDeletedSuccess] = useState(false);    

    // useEffect(() => {
    //     if (isAccDeletedSuccess) {
    //         const timer = setTimeout(() => {
    //             handleCloseModal();
    //             dispatch(clearToken());
    //             router.push('/');
    //         }, 2000);

    //         return () => {
    //             clearTimeout(timer);
    //         };
    //     }
    // }, [dispatch, isAccDeletedSuccess, router]);

    // const handleOpenModal = () => {
    //     setShowModal(true);
    //     setIsAccDeletedSuccess(false);

    //     removeScroll();
    // };

    // const handleCloseModal = () => {
    //     setShowModal(false);
       
    //     abortScrollRemovingHeader();
    // };

    // const handleDeleteUser = async () => {
    //     try {
    //         const response: {
    //             data: FetchData; } | { error?: FetchBaseQueryError | SerializedError | undefined;
    //         } = await deleteProfile(user.id);

    //         if (response && 'error' in response) {
    //             toast.error(ERROR_TEXT, {
    //                 toastId: customId
    //             })
    //         } else {
    //             setIsAccDeletedSuccess(true);
    //         }
            
    //     } catch (e) {
    //         if(e) {
    //             return <h3>Упс, щось пішло не так!</h3>
    //         }
    //     }        
    // }

    // if (isLoading) {
    //     return <Loading />;
    // }

    // if (error) {
    //     return <h3>{ERROR_TEXT}</h3>;
    // }

    return (
        <div className={cls['info-box']}>
            <div className={cls['info-title-box']}>
                <Title text={`${user?.name} ${user?.surname}`} />
            </div>

            <ContactsList phone={user?.phone} email={user?.email} />

            <ul className={cls['redact-btns-list']}>
                <li className={cls['redact-btns-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={cls['redact-button']}
                        aria-label='Redact accaunt'
                        onClick={() => setIsEditForm(true)}
                    >
                        <PencilIcon addStyle={cls.icon} />
                        {BUTTON_REDACT}                        
                    </Button>
                </li>
                <li className={cls['redact-btns-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={cls['redact-button']}
                        aria-label='Redact accaunt'
                        onClick={() => setIsChangePassword(true)}
                    >
                        <LockIcon addStyle={cls.icon} />
                        {BUTTON_REDACT_PASSWORD}                        
                    </Button>
                </li>
                {/* <li className={cls['redact-btns-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={cls['redact-button']}
                        aria-label='Delete accaunt'
                        onClick={handleOpenModal}
                    >
                        <DeleteIcon addStyle={cls.icon} />
                        {BUTTON_DELETE_ACCOUNT}
                    </Button>
                </li> */}
            </ul>

            {/* <Modal>
                <ModalContent
                    onClose={handleCloseModal}
                    modal_content_style={cls['modal-content']}
                    modal_content_style__active={cls['modal-content__active']}
                    isShown={showModal}
                    isDarkBack
                >
                    {
                        !isAccDeletedSuccess ?
                            <ConfirmDeleting onClose={handleCloseModal} deleteFunction={handleDeleteUser} isLoading={isDeleting} />
                            :
                            <SuccessConfirmation text='Аккаунт видалено' />
                    }
                </ModalContent>
            </Modal> */}
        </div>
    )
};
