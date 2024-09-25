import { PencilIcon } from '@/utils/SVG/PencilIcon';
import cls from './AddressItem.module.scss';
import { Button, ButtonTheme, ConfirmDeleting, Modal, ModalContent, SuccessConfirmation, Title } from '@/components';
import { DeleteIcon } from '@/utils/SVG';
import { useEffect, useState } from 'react';
import { abortScrollRemovingHeader, removeScroll } from '@/utils/scrollCounts';
import { AddressList } from './AddressList/AddressList';
import { IAddress } from '../AddressInfo';
import { toast } from 'react-toastify';
import { useDeleteAddressMutation } from '@/store/features/services/addressService';

interface AddressItemProps {
    address: IAddress;
    setAddresToUpdate: (value: IAddress | null) => void;
    setIsEditForm: (value: boolean) => void;
}

const BUTTON_REDACT = 'Редагувати';
const BUTTON_DELETE_ACCOUNT = 'Видалити адресу';
const ERROR_TEXT = 'Упс, щось пішло не так!';
const customId = "toastIdUserDelete";

export const AddressItem = ({ address, setAddresToUpdate, setIsEditForm }: AddressItemProps) => {
    const [deleteAddress, {isLoading}] = useDeleteAddressMutation();
    const [showModal, setShowModal] = useState(false);
    const [isAccDeletedSuccess, setIsAccDeletedSuccess] = useState(false);

    useEffect(() => {
        if (isAccDeletedSuccess) {
            const timer = setTimeout(() => {
                handleCloseModal();                            
            }, 2000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isAccDeletedSuccess]);

    const handleOpenModal = () => {
        setShowModal(true);
        setIsAccDeletedSuccess(false);

        removeScroll();
    };

    const handleCloseModal = () => {
        setShowModal(false);
       
        abortScrollRemovingHeader();
    };

    const handleDeleteAddress = async () => {        
        try {
            const response = await deleteAddress(address.id);

            if (response && 'error' in response) {
                toast.error(ERROR_TEXT, {
                    toastId: customId
                })
            } else {
                setIsAccDeletedSuccess(true);
                abortScrollRemovingHeader();
            }
            
        } catch (e) {
            if(e) {
                return <h3>Упс, щось пішло не так!</h3>
            }
        }
    }

    const handleUpdateUser = () => {
        setAddresToUpdate(address)
        setIsEditForm(true);
    }
    
    return (
        <div>
            <div className={cls['info-title-box']}>
                <Title text={address?.title || ''} />
            </div>

            <AddressList
                city={address?.city || ''}
                postAddress={address?.novaPostOffice || address?.novaPostLocker || address?.personalAddress || ''}
            />

            <ul className={cls['redact-btns-list']}>
                <li className={cls['redact-btns-list_item']}>
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
                    
                </li>
                <li className={cls['redact-btns-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={cls['redact-button']}
                        aria-label='Redact accaunt'
                        onClick={handleUpdateUser}
                    >
                        <PencilIcon addStyle={cls.icon} />
                        {BUTTON_REDACT}                        
                    </Button>
                </li>
            </ul>

            <Modal>
                <ModalContent
                    onClose={handleCloseModal}
                    modal_content_style={cls['modal-content']}
                    modal_content_style__active={cls['modal-content__active']}
                    isShown={showModal}
                    isDarkBack
                >
                    {
                        !isAccDeletedSuccess ?
                            <ConfirmDeleting onClose={handleCloseModal} deleteFunction={handleDeleteAddress} isLoading={isLoading} />
                            :
                            <SuccessConfirmation text='Адресу видалено' />
                    }
                </ModalContent>
            </Modal>
        </div>
    )
};
