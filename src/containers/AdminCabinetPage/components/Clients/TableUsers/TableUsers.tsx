import { useGetAllUsersPaginationQuery } from '@/store/features/services/authService';
import cls from './TableUsers.module.scss';
import { Loading } from '@/components/Loading';
import { useSelector } from 'react-redux';
import { selectSearchValue } from '@/store/features/searchSlice/searchSlice';
import { useEffect, useState } from 'react';
import { Pagination } from '@/components/Pagination/Pagination';


const ERROR_TEXT = 'Упс, щось пішло не так!';

interface IUser {
    id: string;
    name: string;
    surname: string;
    phone?: string;
    email: string;
}

export const TableUsers = () => {    
    const searchValue = useSelector(selectSearchValue);
    // const [reviews, setReviews] = useState<ReviewCard[]>([]);
    const [page, setPage] = useState(1);
    const [take] = useState(10);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageRange, setPageRange] = useState(5);  

    const options = {
        order: 'DESC',
        page,
        take,
    };
    const { data: users, isLoading, error } = useGetAllUsersPaginationQuery(options);    

    useEffect(() => {
        users?.meta?.pageCount && setNumberOfPages(users?.meta?.pageCount)

    }, [users?.meta?.pageCount]);

    useEffect(() => {
        if (page > 3 && page < numberOfPages - 2) setPageRange(3);
        else if (page === 1 || page >= numberOfPages - 1) setPageRange(5);
        else setPageRange(4);

    }, [numberOfPages, page]);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected + 1);
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <h3>{ERROR_TEXT}</h3>;
    }

    return (
        <div className={cls.table_box}>
            <table className={cls.table}>
                <thead className={cls.table_head}>
                    <tr className={cls['table_head-tr']}>
                        <th className={cls['table_head-th']}>№</th>
                        <th className={cls['table_head-th']}>Імʼя</th>
                        <th className={cls['table_head-th']}>Телефон</th>                   
                        <th className={`${cls['table_head-th']} ${cls['table_head-th__center']}`}>Адреса</th>
                    </tr>
                </thead>

                <tbody className={cls.table_body}>

                    {
                        users?.data
                            ?.filter(({ name, surname, phone, email }: IUser) =>
                                name.toLowerCase().includes(searchValue.toLowerCase()) ||
                                surname.toLowerCase().includes(searchValue.toLowerCase()) ||
                                String(phone).includes(searchValue.toLowerCase()) ||
                                email.toLowerCase().includes(searchValue.toLowerCase())
                            )
                            ?.map((user: IUser, i: number) => 
                                <tr className={cls['table_body-tr']} key={user?.id}>
                                    <td className={cls['table_body-td']}>{`${i + 1 + ((page - 1) * take)}.`}</td>
                                    <td className={cls['table_body-td']}>{`${user?.name} ${user?.surname}`}</td>
                                    <td className={cls['table_body-td']}>
                                        <a href={`tel:${user?.phone}`} className={cls['phone_link']}>{user?.phone}</a>
                                    </td>                                         
                                    <td className={`${cls['table_body-td']} ${cls['table_body-td__center']}`}>
                                        {user?.email}
                                    </td>
                                </tr>
                        )
                    }

                </tbody>
            </table>

            <div className={cls['pagination-box']}>
                <Pagination
                    pageCount={numberOfPages}
                    pageRangeDisplayed={pageRange}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                />
            </div>

            
        </div>
        
    )
};
