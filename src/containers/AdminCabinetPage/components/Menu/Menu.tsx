import cls from './Menu.module.scss';
import { Button, ButtonTheme } from '@/components';
import { classNames } from '@/utils/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import { LogOutIcon } from '@/utils/SVG/LogOutIcon';
import Link from 'next/link';
import { useLogoutMutation } from '@/store/features/services/authService';
import { selectPagePosition, setPagePosition } from '@/store/features/adminPagePositionSlice/adminPagePositionSlice';

interface MenuProps {
    positions: {
        id: number,
        name: string,
        title: string
    }[],
}

const BUTTON_LOGOUT = 'Вийти';
const TITLE_PART_ONE = 'Смачно';
const TITLE_PART_TWO = 'На селі';

export const Menu = ({ positions }: MenuProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [logout] = useLogoutMutation();
    const router = useRouter();
    const pagePosition = useSelector(selectPagePosition);   

    const handleLogOutButtonClick = async () => {        
        await logout(dispatch).unwrap();
        router.push('/');
    };

    return (
        <div className={cls['menu-box']}>
            <Link href={'/'}>
                <h2 className={cls['title']}>
                    <p className={cls['title_part-one']}>{TITLE_PART_ONE}</p>
                    <p className={cls['title_part-two']}>{TITLE_PART_TWO}</p>
                </h2>
            </Link>            
            
            <ul className={cls['positions-list']}>
                {
                    positions.map(({name, id}) =>
                        <li
                            key={id}
                            className={classNames(cls['positions-list_item'], {[cls['positions-list_item__active']]: pagePosition === id})}
                            onClick={() => dispatch(setPagePosition(id))}
                        >
                            {name}
                        </li>
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
                <LogOutIcon />
                {BUTTON_LOGOUT}
            </Button>
            
        </div>
    )
};
