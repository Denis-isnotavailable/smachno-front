import { ContainerMaxW1280 } from '@/components/ContainerMaxW1280';
import { ArrowBack, Text } from '@/components';
import { LoginForm } from '@/containers/LoginPage/components/LoginForm/LoginForm';
import { ForgotPasswordAndRegister } from '@/containers/LoginPage/components/ForgotPasswordAndRegister/ForgotPasswordAndRegister';

export const LoginPage = () => {
    return (
        <ContainerMaxW1280>
            <ArrowBack path={'/'} />
            <Text title={'Твій кабінет'} />
            <LoginForm />
            {/*<SocialLogin/>*/}
            <ForgotPasswordAndRegister />
        </ContainerMaxW1280>
    );
};
