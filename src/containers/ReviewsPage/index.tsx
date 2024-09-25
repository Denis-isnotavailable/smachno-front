import {ContainerMaxW1280} from "@/components/ContainerMaxW1280";
import {ArrowBack} from "@/components";
import {ReviewsList} from "@/containers/ReviewsPage/components/ReviewsList";

export const ReviewsPage = () => {
    return (
        <ContainerMaxW1280>
            <ArrowBack path={'/'}/>
            <ReviewsList/>
        </ContainerMaxW1280>
    );
};
