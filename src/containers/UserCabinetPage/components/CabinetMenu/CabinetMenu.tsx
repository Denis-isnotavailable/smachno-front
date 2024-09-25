import { Button, ButtonTheme } from '@/components';
import cls from './CabinetMenu.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import { CabinetMenuItem } from './CabinetMenuItem/CabinetMenuItem';
import { useLogoutMutation } from '@/store/features/services/authService';

interface CabinetMenuProps {
    positions: {
        id: number,
        name: string,
        title: string
    }[],
    currentPosition: number,
    setCurrentPosition: (value: number) => void,
}

const BUTTON_LOGOUT = 'Вийти';

export const CabinetMenu = ({ positions, currentPosition, setCurrentPosition }: CabinetMenuProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [logout] = useLogoutMutation();
    const router = useRouter();

    const handleLogOutButtonClick = async () => {
        await logout(dispatch).unwrap();
        router.push('/');
    };


    return (
        <div className={cls['positions-box']}>
            <ul className={cls['positions-list']}>
                {
                    positions.map(({ name, id }) =>
                        <CabinetMenuItem 
                            key={id}
                            id={id}
                            name={name}
                            currentPosition={currentPosition}
                            setCurrentPosition={setCurrentPosition}
                        />
                    )
                }
                
            </ul>

            <Button
                type='button'
                theme={ButtonTheme.CLEAR}
                className={cls['logout-button']}
                aria-label='Logout'
                onClick={handleLogOutButtonClick}
            >
                {BUTTON_LOGOUT}
            </Button>
        </div>
    )
};
