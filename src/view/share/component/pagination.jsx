import React from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import { Link } from 'react-router-dom';


export default ({ services, match, linkPage }) => {

    if (services.length != 0)
        return (
            <Pagination>
                <PaginationItem disabled={ services.first }>
                    {
                        services.first
                        ? <Link
                            to={`${linkPage}${1}`}
                            onClick={ e=> e.preventDefault() }
                        >
                            <PaginationLink previous />
                        </Link>
                        : <Link to={`${linkPage}${1}`}>
                            <PaginationLink previous />
                        </Link>
                    }
                </PaginationItem>
                <PaginationItem disabled={ services.first }>
                    {
                        services.first
                        ? <Link
                            to={`${linkPage}${match.params.page - 1}`}
                            onClick={ e => e.preventDefault() }
                        >
                            <PaginationLink>
                                { 'Previous' }
                            </PaginationLink>
                        </Link>
                        : <Link
                            to={`${linkPage}${match.params.page - 1}`}
                        >
                            <PaginationLink>
                                { 'Previous' }
                            </PaginationLink>
                        </Link>
                    }
                </PaginationItem>
                {
                    <PaginationNumber
                        totalPages={services.totalPages}
                        currentPage={match.params.page}
                        linkPage={ linkPage }
                    />
                }
                <PaginationItem disabled={ services.last }>
                    {
                        services.last
                        ? <Link
                            to={`${linkPage}${+match.params.page + 1}`}
                            onClick={e => e.preventDefault()}
                        >
                            <PaginationLink>
                                { 'Next' }
                            </PaginationLink>
                        </Link>
                        : <Link
                            to={`${linkPage}${+match.params.page + 1}`}
                        >
                            <PaginationLink>
                                { 'Next' }
                            </PaginationLink>
                        </Link>
                    }
                </PaginationItem>
                <PaginationItem disabled={ services.last }>
                    {
                        services.last
                        ? <Link
                            to={`${linkPage}${services.totalPages}`}
                            onClick={e => e.preventDefault()}
                        >
                            <PaginationLink next />
                        </Link>
                        : <Link to={`${linkPage}${services.totalPages}`}>
                            <PaginationLink next />
                        </Link>
                    }
                </PaginationItem>
            </Pagination>
        )
    else
        return null;
}

const PaginationNumber = ({ totalPages, currentPage, linkPage }) => {
    /*
     * @action Split range of page when total page is very much
     * @return PaginationItem with range
     */
    const paginationRange = 9;
    const pages = [];

    if (totalPages > paginationRange) {
        // If page range is too much, pagination is [current-paginationRange <- current -> current+paginationRange]
        let rangeStart = currentPage - Math.trunc(paginationRange/2);
        let rangeEnd = Math.trunc(paginationRange/2) + +currentPage;

        if (rangeStart < 1) { // Range start cannot less than 1
            rangeStart = 1;
            rangeEnd = paginationRange;
        }
        if (rangeEnd > totalPages) // Range end cannot more total page
            rangeEnd = totalPages;

        if (pages.length < totalPages)
            for (let i = rangeStart; i <= rangeEnd; i++)
                pages.push(i);
    }
    else {
        // If page range is not too much, pagination is [1 - Total page]
        if (pages.length < totalPages)
            for (let i = 1; i <= totalPages; i++)
                pages.push(i);
    }

    return (
        pages.map((page, i) => (
            <PaginationItem active={page == currentPage}>
                {
                    page == currentPage
                    ? <Link
                        to={`${linkPage}${page}`}
                        onClick={ e => e.preventDefault() }
                    >
                        <PaginationLink>
                            { page }
                        </PaginationLink>
                    </Link>
                    : <Link to={`${linkPage}${page}`}>
                        <PaginationLink>
                            { page }
                        </PaginationLink>
                    </Link>
                }
            </PaginationItem>
        ))
    )
}
