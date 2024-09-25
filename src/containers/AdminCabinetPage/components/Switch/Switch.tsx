import { useEffect, useState } from 'react';
import cls from './Switch.module.scss';
import { ConfirmChanging, Modal, ModalContent } from '@/components';

interface SwitchProps {
    id: string;
    agreed: boolean;
    setApprovement: (value: boolean) => Promise<boolean | JSX.Element | undefined>;
    isWithConfirmation?: boolean
}

export const Switch = ({id, agreed, isWithConfirmation, setApprovement}: SwitchProps) => {
    const [isApprove, setIsApprove] = useState(false);
    const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

    const changeStatus = async (checked: boolean) => {        
        const result = await setApprovement(checked);
        result && setIsApprove(checked);        
    }

    useEffect(() => {
        setIsApprove(agreed);
    }, [agreed]);

    useEffect(() => {
        const confirm = async () => {
            if (isConfirm) {
                setIsConfirm(false);
                const result = await setApprovement(!agreed);
                result && setIsApprove(!agreed);                
            }
        }

        confirm();
    }, [agreed, isConfirm, setApprovement]);

    const handleChange = async (e: { target: { checked: boolean; }; }) => {
        const { checked } = e.target;

        if (isWithConfirmation) {
            setIsConfirmWindowOpen(true);
        } else {
            changeStatus(checked);
        }
    };

    const handleChangeSendStatus = async () => {        
        setIsConfirmWindowOpen(false);
        setIsConfirm(true)
    }

    const handleCloseConfirming = () => {
        setIsConfirmWindowOpen(false);        
    }

    return (
        <div className={cls['toggle-switch']} >
            <input
                className={cls['toggle-input']}
                id={id}
                type="checkbox"
                checked={isApprove}
                onChange={handleChange}
            />
            <label
                className={cls['toggle-label']}
                htmlFor={id}
            ></label>
            {isConfirmWindowOpen && <Modal>
                <ModalContent
                    onClose={handleCloseConfirming}
                    modal_content_style={cls['modal-content']}
                    modal_content_style__active={cls['modal-content__active']}
                    isShown={isConfirmWindowOpen}
                    isDarkBack
                >
                    <ConfirmChanging onClose={handleCloseConfirming} changeFunction={handleChangeSendStatus} />
                </ModalContent>
            </Modal>}
        </div>
    )
};
