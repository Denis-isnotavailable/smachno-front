import { PdfClientsDownloadFile } from '../Clients/PdfClients/PdfClientsDownloadButton';
import { PdfGrowthDownloadFile } from '../TableOrder/PdfTableOrder/DownloadButtons/PdfGrowthDownloadButton';
import cls from './AdminTitle.module.scss';
import { ButtonClose, Modal, ModalContent, SpinnerDots, Title } from '@/components';
import { Search } from './Search/Search';
import { ChangeEvent, useState } from 'react';
import { PdfArmyDownloadFile } from '../TableOrder/PdfTableOrder/DownloadButtons/PdfArmyDownloadButton';
import { PdfSelfDownloadFile } from '../TableOrder/PdfTableOrder/DownloadButtons/PdfSelfDownloadButton';
import { IGoogleSheetsData, RangeVar } from '@/utils/googleSheets/convertOrders';
import { toast } from 'react-toastify';
import { ToastImg } from '@/components/ToastImg/ToastImg';
import { ButtonsList } from './ButtonsList/ButtonsList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { selectOrderPaymentStatus, setOrderPaymentStatus } from '@/store/features/orderPaymentStatus/orderPaymentStatus';


interface AdminInfoProps {
    titleText: string;
    isSearch?: boolean;
    setSearchValueMethod?: (value: string) => void;
    isClientsButton?: boolean;
    isGrowthButton?: boolean;
    isArmyButton?: boolean;
    isSelfPostButton?: boolean;
    isSelfKyivButton?: boolean;
    googleSheetOrders?: IGoogleSheetsData['row'][];
}

const ERROR_TEXT = 'Упс, щось пішло не так!';
const customId = "toastIdAdminTitle";

export const AdminTitle = (
    {
        titleText,
        isClientsButton,
        isGrowthButton,
        isArmyButton,
        isSelfPostButton,
        isSearch,
        setSearchValueMethod,
        googleSheetOrders
    }: AdminInfoProps) => {
    
    const isPdfButton = isClientsButton || isArmyButton || isGrowthButton || isSelfPostButton;
    const isGSButton = isArmyButton || isGrowthButton || isSelfPostButton;
    const [showModal, setShowModal] = useState(false);
    const [isUploadingGoogleSheets, setIsUploadingGoogleSheets] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const orderPaymentStatusValue = useSelector(selectOrderPaymentStatus);    

    const setOrderPaymentStatusMethod = (e: ChangeEvent<HTMLInputElement>) => {        
        dispatch(setOrderPaymentStatus(e.target.checked));
    };

    const handleOpenModal = () => {
        setShowModal(true);

        // removeScroll();
    };

    const handleCloseModal = () => {
        setShowModal(false);

        // abortScrollRemovingHeader();
    };

    const handleSetDataToGoogleSheets = async () => { 
        setIsUploadingGoogleSheets(true);
        let append;

        if (isSelfPostButton) append = RangeVar.FOR_MYSELF;
        if (isArmyButton) append = RangeVar.FOR_ZSU;
        if (isGrowthButton) append = RangeVar.FOR_GROWTH;

        const keyMass = {
            append,
            change: googleSheetOrders
        }        

        const res = await fetch('/api/set-google-sheet-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyMass }),
            });

        const result = await res.json();

        setIsUploadingGoogleSheets(false)
        
        if (result.success) {
            toast.success('Дані оновлено!', {
                icon: <ToastImg />,
                toastId: customId
            });
        } else {
            toast.error(ERROR_TEXT, {
                toastId: customId,
            });
        }
    }

    return (
        <div className={cls['header-box']}>           

            <div className={cls['title-box']}>
                <Title text={titleText} customClass={cls['title']} />
                
                {isSearch && setSearchValueMethod && <Search setSearchValueMethod={setSearchValueMethod} />}                
            </div>

            
            <div className={cls['buttons-box']}>
                {isGSButton && <div>     
                    <label className={cls.label}>
                        <input
                            type="checkbox"
                            name="orderPaymentStatus"
                            className={cls['input-checkbox']}
                            checked={orderPaymentStatusValue}
                            onChange={setOrderPaymentStatusMethod}
                        />
                        <span className={cls['custom-checkbox']} ></span>
                        <span className={cls['label_text']} >Показати лише оплачені замовлення</span>
                    </label>
                </div>}
                
                {isUploadingGoogleSheets ?
                    <SpinnerDots /> :
                    <ButtonsList
                        isGSButton={isGSButton}
                        isPdfButton={isPdfButton}
                        handleSetDataToGoogleSheets={handleSetDataToGoogleSheets}
                        handleOpenModal={handleOpenModal}
                    />
                }
                    
            </div>

            <Modal>
                <ModalContent
                    onClose={handleCloseModal}
                    modal_content_style={cls['modal-content']}
                    modal_content_style__active={
                        cls['modal-content__active']
                    }
                    isShown={showModal}
                    isDarkBack
                >
                    <div className={cls['close-button-box']}>
                        <ButtonClose onClose={handleCloseModal} />
                    </div>
                    {showModal && isClientsButton && <PdfClientsDownloadFile />}
                    {showModal && isGrowthButton && <PdfGrowthDownloadFile />}
                    {showModal && isArmyButton && <PdfArmyDownloadFile />}
                    {showModal && isSelfPostButton && <PdfSelfDownloadFile />}
                </ModalContent>
            </Modal>          
        </div>
    )
};
