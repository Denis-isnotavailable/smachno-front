import { Loading } from '@/components/Loading';
import cls from './AdminRequisites.module.scss';
import { useProfileQuery } from '@/store/features/services/authService';
import { Button, ButtonTheme } from '@/components';
// import { PencilIcon } from '@/utils/SVG/PencilIcon';
// import { StatsArrowIcon } from '@/utils/SVG/StatsArrowIcon';
import { LockIcon } from '@/utils/SVG/LockIcon';
import { FormChangePassword } from '../../Forms/FormChangePassword/FormChangePassword';
// import { FormAdmin } from '../../Forms/FormAdmin/FormAdmin';

interface IAdminRequisitesProps {    
    currentOperation: string;
    setCurrentOperation: (value: string) => void;
}

const ERROR_TEXT = 'Упс, щось пішло не так!';
// const BUTTON_STATISTICS = 'Статистика';
// const BUTTON_REDACT = 'Редагувати';
const BUTTON_REDACT_PASSWORD = 'Змінити пароль';
// const BUTTON_ADD_ADMIN = 'Додати адміна';


export const AdminRequisites = ({currentOperation, setCurrentOperation}: IAdminRequisitesProps) => {
    const { data: admin, isLoading, error } = useProfileQuery('', {
        refetchOnMountOrArgChange: true,
    });

    // const handleStatsBtnClick = () => {
    //     if (currentOperation === BUTTON_STATISTICS) setCurrentOperation('');
    //     else setCurrentOperation(BUTTON_STATISTICS);
    // }

    // const handleRedactBtnClick = () => {
    //     if (currentOperation === BUTTON_REDACT) setCurrentOperation('');
    //     else setCurrentOperation(BUTTON_REDACT);
    // }

    const handleChangePasswordBtnClick = () => {
        if (currentOperation === BUTTON_REDACT_PASSWORD) setCurrentOperation('');
        else setCurrentOperation(BUTTON_REDACT_PASSWORD);
    }

    // const handleAddAdminBtnClick = () => {
    //     if (currentOperation === BUTTON_ADD_ADMIN) setCurrentOperation('');
    //     else setCurrentOperation(BUTTON_ADD_ADMIN);
    // }

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }
    
    return (
        <div className={cls['requisities-box']}>

            <div className={cls.name}>
                {`${admin?.name} ${admin?.surname}`}
            </div>

            <ul className={cls['operation-btns-list']}>
                {/* <li className={cls['operation-btns-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={cls['redact-button']}
                        aria-label='Check Statistscs'
                        onClick={handleStatsBtnClick}
                    >
                        <StatsArrowIcon addStyle={cls.icon} />
                        {BUTTON_STATISTICS}                        
                    </Button>
                </li> */}

                {/* <li className={cls['operation-btns-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={cls['redact-button']}
                        aria-label='Redact accaunt'
                        onClick={handleRedactBtnClick}
                    >
                        <PencilIcon addStyle={cls.icon} />
                        {BUTTON_REDACT}                        
                    </Button>

                    {currentOperation === BUTTON_REDACT && <FormAdmin />}
                </li> */}

                <li className={cls['operation-btns-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={cls['redact-button']}
                        aria-label='Redact password'
                        onClick={handleChangePasswordBtnClick}
                    >
                        <LockIcon addStyle={cls.icon} />
                        {BUTTON_REDACT_PASSWORD}                    
                    </Button>

                    {currentOperation === BUTTON_REDACT_PASSWORD && <FormChangePassword />}
                </li>

                {/* <li className={cls['operation-btns-list_item']}>
                    <Button
                        type='button'
                        theme={ButtonTheme.CLEAR}
                        className={cls['redact-button']}
                        aria-label='Add admin'
                        onClick={handleAddAdminBtnClick}
                    >
                        <div className={cls['redact-button_mark']}>+</div>
                        {BUTTON_ADD_ADMIN}                    
                    </Button>

                    {currentOperation === BUTTON_ADD_ADMIN && <FormAdmin isCreatingAdmin />}
                </li> */}
            </ul>
            
        </div>
    )
};
