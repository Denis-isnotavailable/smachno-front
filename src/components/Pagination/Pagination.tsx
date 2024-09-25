'use client';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import cls from './Pagination.module.scss';
import { ArrowBackIcon } from '@/utils/SVG/ArrowBack';

interface PaginationProps extends ReactPaginateProps {
  onPageChange: (selectedItem: { selected: number }) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ onPageChange, ...props }) => {
    return (
        <ReactPaginate
            
            previousLabel={props.pageCount > 0 && <ArrowBackIcon addStyle={cls.icon} />}
            nextLabel={props.pageCount > 0 && <ArrowBackIcon addStyle={cls.icon} />}
            breakLabel="..."
            // marginPagesDisplayed={1}
            nextAriaLabel="Next page"
            disabledClassName={cls.disabled}
            breakClassName={cls.break}
            breakLinkClassName={cls['break-link']}
            breakAriaLabels={{
                forward: "Jump forward",
                backward: "Jump backward",
            }}
            activeClassName={cls.selected}
            containerClassName={cls.Pagination}
            onPageChange={onPageChange}
            pageLinkClassName={cls['Pagination__page-link']}
            nextLinkClassName={cls['Pagination__next-link']}
            previousLinkClassName={cls['Pagination__previous-link']}
            pageClassName={cls['Pagination__page-item']}
            nextClassName={cls['Pagination__next-item']}
            previousClassName={cls["previous"]}
            renderOnZeroPageCount={null}
            previousAriaLabel="Previous page"
            {...props}
        />
    )
};