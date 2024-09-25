export type ModalProps = {
    children?: React.ReactNode;
};

export type ModalContentProps = {
    children?: React.ReactNode;
    onClose: () => void;
    isDarkBack?: boolean;
    modal_content_style?: string;
    modal_content_style__active?: string;
    isShown?: boolean;
    isScrollY?: boolean;
};
