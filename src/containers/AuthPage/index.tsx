import { ContainerMaxW1280 } from '@/components/ContainerMaxW1280';
import { ArrowBack, Text } from '@/components';
import { RegisterForm } from '@/containers/AuthPage/components/RegisterForm/RegisterForm';
import { SocialLogin } from '@/containers/AuthPage/components/RegisterForm/SocialLogin/SocialLogin';

export const AuthPage = () => {
    return (
        <ContainerMaxW1280>
            <ArrowBack path={'/'} />
            <Text title={'Твій кабінет'} />
            <RegisterForm />
            <SocialLogin />
        </ContainerMaxW1280>
    );
};
