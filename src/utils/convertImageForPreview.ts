export const convertImageForPreview = async (image: string | Blob, setMethod: (value: string) => void) => {
    if (typeof image === 'string') {
        setTimeout(() => {
            setMethod(image);
        }, 1000);
        
    } else {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {           
            typeof reader.result === 'string' && setMethod(reader.result);
        };
    }
}